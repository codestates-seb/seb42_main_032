//TODO 캘린더 구현
import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, TableContainer } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

// 각 칸의 스타일링을 자유롭게 하기 위해 Box 컴포넌트 사용
import { Box } from '@chakra-ui/react';
import axios from 'axios';
import Loading from './Loading';
import {
  clickedDateState,
  locationState,
  userInfoState,
} from '../../util/store';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useLinkClickHandler } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin-top: 2vh;
  }
`;
const Container = styled.div`
  border: 1px solid black;
  box-shadow: 1px 1px 4px;
  border-radius: 10px;
  div:first-child {
    padding-top: 10px;
    /* padding-bottom: 30px; */
  }
  thead {
    tr {
      th:first-child {
        color: red;
      }
      th:last-child {
        color: blue;
      }
    }
    th {
      font-size: 20px;
      border-bottom: 1px solid black;
      padding: 10px;
      margin-bottom: 10px;
    }
  }
  td:hover {
    border-radius: 10px;
    background-color: #ede1f0;
    cursor: pointer;
  }
`;

/**
 * day: 요일, date: 일자 의미로 주석을 작성했습니다.
 */

// 요일을 어떤 형태로 표시할지 저장
// ToDo: (향후 언어 변경 기능을 지원한다면) 언어별 요일 데이터 지정
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = ({ date }: { date: Date }) => {
  // 월별 지출, 수입: 데이터 idx === 날짜 / 수입, 지출 이중배열
  const [dailySummary, setDailySummary] = useState<number[][]>([[0, 0]]);
  const [loading, setLoading] = useState<boolean>(true);

  // GET 요청 URI parameter 용 memberID, date (month) 받아오기
  let member_id = useRecoilValue(userInfoState)?.id;
  let headerMonth =
    date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0');
  console.log(headerMonth);
  // 월별 지출, 수입 데이터 받아오기
  // TODO async / await을 써야 의도한 순서대로 작동함
  useEffect(() => {
    const getDailySummary = async () => {
      axios
        .get(
          `${
            import.meta.env.VITE_SERVER
          }/transaction_histories/${member_id}/${headerMonth}`
        )
        .then((res) => {
          setDailySummary(res.data.dailySummary.slice(1));
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };

    getDailySummary();
  }, [headerMonth]);

  // 현재 날짜를 불러올 수 있도록 Date 타입의 상태로 생성하고, 초기값을 Date 객체로 설정
  // ! 초기값은 'Home' 페이지에서 설정함.
  // const [date, setCurrentDate] = useState<Date>(date);

  // 선택한 날짜를 활성화해주기 위한 상태
  const [isSelected, setIsSelected] = useState<Boolean>(false);

  // 현재 날짜 상태를 기준으로 첫 날(현재 연도, 현재 월, 1일)을 변수로 저장
  const firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  // 현재 날짜 상태를 기준으로 마지막 날(현재 연도, 현재 월, 마지막 날)을 변수로 저장
  // Date 객체를 생성할 때 날(day) 인자를 0으로 전달하면 이전 달의 마지막 날로 설정됨
  // 출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate#description
  const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  // firstDateOfMonth를 기준으로 첫 날이 무슨 요일인지 저장
  const dayOfFirstDate = firstDateOfMonth.getDay();

  // 요일 표시 칸 렌더링
  const renderDaysOfWeek = daysOfWeek.map((day) => (
    <Box key={day} as="th">
      {day}
    </Box>
  ));

  // 달력 시작일 전까지 빈 칸 렌더링
  // 0부터 날짜가 시작되는 요일까지 빈 칸을 렌더링한 배열
  const renderBlank = [];

  for (let i = 0; i < dayOfFirstDate; i++) {
    renderBlank.push(<Box key={`blank-${i}`} as="td" w={52} h={24} />);
  }

  // 1일부터 마지막 날짜까지 일자별로 담긴 배열 생성
  const dateArr = [];
  for (let i = 1; i <= lastDateOfMonth.getDate(); i++) {
    dateArr.push(i);
  }
  // dateArr= [1,2,3,4, .. 31]
  // dailySummary = [[0,0], [1000, 123000]]
  // 일자를 나타내는 칸 렌더링

  // 날짜 클릭 시 핸들러 -> 클릭된 날짜 받아오기 -> 해당 날짜의 거래내역으로 스크롤 이동
  const [clickedDate, setClickedDate] = useRecoilState(clickedDateState);
  const location = useRecoilValue(locationState);
  const clickHandler = () => {
    if (location) {
      window.scrollTo(0, location);
    }
  };
  const renderDate = dailySummary.map((daily, idx) => {
    return (
      // w-52 === 13rem
      // h-24 === 6rem
      <Box
        key={idx}
        as="td"
        w={52}
        h={24}
        onClick={() => {
          setClickedDate(idx + 1);
          clickHandler();
        }}
      >
        <Box
          fontSize={[12, 16, 18]}
          h="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {idx + 1}
        </Box>
        <Box fontSize={[8, 10, 12]}>
          {/* 받아온 데이터로 수입 레이블 표시 */}
          <Text color={'blue'}>{daily[0] !== 0 ? `+${daily[0]}` : null}</Text>
          {/* 받아온 데이터로 지출 레이블 표시 */}
          <Text color={'red'}>{daily[1] !== 0 ? `-${daily[1]}` : null}</Text>
        </Box>
      </Box>
    );
  });

  // 최종적으로 빈 칸과 일자 칸을 합쳐 렌더링할 칸을 한 배열로 합침
  let renderCell = [...renderBlank, ...renderDate];

  // 렌더링할 칸을 7칸 단위로 끊으면서 splice를 통해 모든 칸이 제거될 때까지 행 생성
  const renderRow = [];
  while (renderCell.length > 0) {
    renderRow.push(
      <Tr key={renderRow.length}>
        {/* 첫번째부터 일곱번째 칸(Td)를 한 행(Tr)으로 묶기 */}
        {renderCell.splice(0, 7)}
      </Tr>
    );
  }

  return !loading ? (
    <PageContainer>
      <Container>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>{renderDaysOfWeek}</Tr>
            </Thead>
            <Tbody>{renderRow}</Tbody>
          </Table>
        </TableContainer>
      </Container>
      <p>날짜 클릭 시, 해당 날짜의 거래내역으로 이동합니다.</p>
    </PageContainer>
  ) : (
    <Loading />
  );
};

export default Calendar;
