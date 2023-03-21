//TODO 캘린더 구현
import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, TableContainer } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

// 각 칸의 스타일링을 자유롭게 하기 위해 Box 컴포넌트 사용
import { Box } from '@chakra-ui/react';
import { ClassNames } from '@emotion/react';
import { GiDelicatePerfume } from 'react-icons/gi';
import Transaction from './Transaction';
import { Props } from './Transaction';
import axios from 'axios';
import Loading from './Loading';

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
  // 월별 지출, 수입 데이터 받아오기
  useEffect(() => {
    axios
      .get('http://localhost:8080/dailySummary')
      .then((res) => {
        setDailySummary(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(dailySummary);

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

  // 일자를 나타내는 칸 렌더링
  const renderDate = dateArr.map((date, idx) => {
    return (
      // w-52 === 13rem
      // h-24 === 6rem
      <Box key={date} as="td" w={52} h={24}>
        <Box
          fontSize={[12, 16, 18]}
          h="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {date}
        </Box>
        <Box fontSize={[8, 10, 12]}>
          {/* 받아온 데이터로 지출 레이블 표시 */}
          <Text color={'blue'}>
            {/* {dailySummary !== undefined ? dailySummary[idx][0] : 0} */}
          </Text>
          {/* 받아온 데이터로 수입 레이블 표시 */}
          <Text color={'red'}>
            {/* {dailySummary !== undefined ? dailySummary[idx][1] : 0} */}
          </Text>
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
    <TableContainer>
      <Table>
        <Thead>
          <Tr>{renderDaysOfWeek}</Tr>
        </Thead>
        <Tbody>{renderRow}</Tbody>
      </Table>
    </TableContainer>
  ) : (
    <Loading />
  );
};

export default Calendar;
