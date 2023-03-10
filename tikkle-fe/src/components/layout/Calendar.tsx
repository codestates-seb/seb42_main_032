//TODO 캘린더 구현
import { useState } from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

/**
 * day: 요일, date: 일자 의미로 주석을 작성했습니다.
 */

// 요일을 어떤 형태로 표시할지 저장
// ToDo: (향후 언어 변경 기능을 지원한다면) 언어별 요일 데이터 지정
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar() {
  // 현재 날짜를 불러올 수 있도록 Date 타입의 상태로 생성하고, 초기값을 Date 객체로 설정
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // 현재 날짜 상태를 기준으로 첫 날(현재 연도, 현재 월, 1일)을 변수로 저장
  const firstDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  // 현재 날짜 상태를 기준으로 마지막 날(현재 연도, 현재 월, 마지막 날)을 변수로 저장
  // Date 객체를 생성할 때 날(day) 인자를 0으로 전달하면 이전 달의 마지막 날로 설정됨
  // 출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate#description
  const lastDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // firstDateOfMonth를 기준으로 첫 날이 무슨 요일인지 저장
  const dayOfFirstDate = firstDateOfMonth.getDay();

  console.log(`firstDateOfMonth: ${firstDateOfMonth}`);
  console.log(`lastDateOfMonth: ${lastDateOfMonth}`);
  console.log(`dayOfFirstDate: ${dayOfFirstDate}`);

  // 요일 표시 칸 렌더링
  const renderDaysOfWeek = daysOfWeek.map((day) => (
    <Th key={day}>{day}</Th>
  ));

  // 달력 시작일 전까지 빈 칸 렌더링
  // 0부터 날짜가 시작되는 요일까지 빈 칸을 렌더링한 배열
  const renderBlank = [];
  for (let i = 0; i < dayOfFirstDate; i++) {
    renderBlank.push(
      <Td key={`blank-${i}`}></Td>
    )
  }

  // 1일부터 마지막 날짜까지 일자별로 담긴 배열 생성
  const dateArr = [];
  for (let i = 1; i <= lastDateOfMonth.getDate(); i++) {
    dateArr.push(i);
  }

  // 일자를 나타내는 칸 렌더링
  const renderDate = dateArr.map((date) => {
    return (
      <Td key={date}>
        <div className="dateLabel">{date}</div>
        <ul className="transactionLabelList">
          {/* 지출, 예산 레이블을 표시하는 목록 */}
          {/* ToDo: 받아온 데이터를 해당 ul 안에 li로 표시할 방법을 고민해야 함 */}
        </ul>
      </Td>
    )
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
    )
  }

  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            {renderDaysOfWeek}
          </Tr>
        </Thead>
        <Tbody>
          {renderRow}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default Calendar
