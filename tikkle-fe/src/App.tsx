import './App.css';
import Calendar from './components/layout/Calendar';
import Transaction from './components/layout/Transaction';

// Transaction 컴포넌트용 거래내역 dummy data
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
function App() {
  return (
    <div className="App">
      <Calendar date={new Date()} />
      <Transaction transactions={transactions} />
    </div>
  );
}

export default App;
