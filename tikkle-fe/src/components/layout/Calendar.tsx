//TODO 캘린더 구현
import { useState } from "react"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

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

  return (
    <div>
      Implementing...
    </div>
  )
}

export default Calendar
