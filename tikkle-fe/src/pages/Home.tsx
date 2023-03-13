import Header from '../components/layout/Header';
import Calendar from '../components/layout/Calendar';
import Footer from '../components/layout/Footer';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Transaction from '../components/layout/Transaction';

// transaction 컴포넌트용 거래내역 dummydata
const transactions: Transaction[] = [
  {
    date: new Date('2023-03-01'),
    bankInfo: '국민은행',
    payee: '버거킹',
    category: '식비',
    amount: -9200,
  },
  {
    date: new Date('2023-03-03'),
    bankInfo: '우리은행',
    payee: '스타벅스',
    category: '음료',
    amount: -5200,
  },
  {
    date: new Date('2023-03-06'),
    bankInfo: '토스뱅크',
    payee: '볼링장',
    category: '오락',
    amount: -30000,
  },
];
const HomeContainer = styled.div`
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

function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    <HomeContainer>
      <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Body>
        <Calendar date={selectedDate} />
        <Transaction transactions={transactions} />
      </Body>
      <Footer />
    </HomeContainer>
  );
}

export default Home;
