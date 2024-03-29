import Calendar from '../components/layout/Calendar';
import styled from 'styled-components';
import Transaction from '../components/layout/Transaction';

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
