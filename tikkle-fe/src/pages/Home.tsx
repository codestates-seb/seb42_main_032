import Calendar from '../components/layout/Calendar';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Transaction, { TransactionType } from '../components/layout/Transaction';
import { userInfoState } from '../util/store';
import { useRecoilValue } from 'recoil';
import axios from 'axios';

// // transaction 컴포넌트용 거래내역 dummydata
// const transactions: TransactionType[] = [
//   {
//     date: new Date('2023-02-01'),
//     bankInfo: '국민은행',
//     payee: '2월테스트',
//     category: '식비',
//     amount: -9200,
//   },
//   {
//     date: new Date('2023-02-07'),
//     bankInfo: '2월로가야돼',
//     payee: '버거킹',
//     category: '식비',
//     amount: -9200,
//   },
//   {
//     date: new Date('2023-03-01'),
//     bankInfo: '국민은행',
//     payee: '버거킹',
//     category: '식비',
//     amount: -9200,
//   },
//   {
//     date: new Date('2023-03-01'),
//     bankInfo: '국민은행',
//     payee: '스타벅스',
//     category: '음료',
//     amount: -10200,
//   },
//   {
//     date: new Date('2023-03-01'),
//     bankInfo: '국민은행',
//     payee: '왕소금구이',
//     category: '식비',
//     amount: -32000,
//   },
//   {
//     date: new Date('2023-03-03'),
//     bankInfo: '우리은행',
//     payee: '스타벅스',
//     category: '음료',
//     amount: -5200,
//   },
//   {
//     date: new Date('2023-03-03'),
//     bankInfo: '토스뱅크',
//     payee: '메가커피',
//     category: '음료',
//     amount: -3200,
//   },
//   {
//     date: new Date('2023-03-06'),
//     bankInfo: '토스뱅크',
//     payee: '볼링장',
//     category: '오락',
//     amount: -30000,
//   },
//   {
//     date: new Date('2023-03-06'),
//     bankInfo: '토스뱅크',
//     payee: '코인노래방',
//     category: '오락',
//     amount: -3000,
//   },
//   {
//     date: new Date('2023-03-06'),
//     bankInfo: '토스뱅크',
//     payee: '코드스테이츠',
//     category: '오락',
//     amount: +326000,
//   },
// ];

const HomeContainer = styled.div`
  font-family: 'GmarketSansMedium';
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  min-height: calc(100vh - 340px);
`;

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 15px;
  padding-right: 15px;
`;

function Home({ selectedDate }: { selectedDate: Date }) {
  // const [accessToken, setAccessToken] = useRecoilState(tokenState);

  // console.log(`Access Token in Home: ${accessToken}`);

  // 테스트용 코드
  let member_id = useRecoilValue(userInfoState)?.id;
  let headerMonth =
    selectedDate.getFullYear() +
    String(selectedDate.getMonth() + 1).padStart(2, '0');

  // 21개 기본 카테고리 생성용 테스트 코드
  // 사용법: 로컬에서 백엔드 서버를 띄웠을 때 아래 코드의 주석을 해제하고, 저장한 뒤 홈페이지에서 새로고침
  // 사용 후: 다시 주석 처리 후 저장
  // axios
  //   .post(`${import.meta.env.VITE_SERVER}/init`)
  //   .catch((err) => console.log(err));

  axios
    .post(`${import.meta.env.VITE_SERVER}/transaction_histories`, {
      memberCategoryId: 1,
      date: '2023-03-19',
      time: '23:54:01',
      inoutType: 'SPEND',
      memo: '메모',
      amount: 10000,
      branchName: 'GS25동작엠코점',
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return (
    <HomeContainer>
      <Body>
        <CalendarContainer>
          <Calendar date={selectedDate} />
        </CalendarContainer>
        <Transaction date={selectedDate} />
      </Body>
    </HomeContainer>
  );
}

export default Home;
