import Header from '../components/layout/Header';
import Calendar from '../components/layout/Calendar';
import Footer from '../components/layout/Footer';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

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
      </Body>
      <Footer />
    </HomeContainer>
  );
}

export default Home;
