import Calendar from '../components/layout/Calendar';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

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

function Home({ selectedDate }: { selectedDate: Date }) {
  return (
    <HomeContainer>
      <Body>
        <Calendar date={selectedDate} />
      </Body>
    </HomeContainer>
  );
}

export default Home;
