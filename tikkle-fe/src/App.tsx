import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import Calendar from './components/layout/Calendar';
import Transaction from './components/layout/Transaction';
import SignUp from './pages/SignUp';
import UserSetting from './pages/UserSetting';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';


// Transaction 컴포넌트용 거래내역 dummydata
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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    <div className="App">
      
      <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Routes>
        <Route path="/home" element={<Home selectedDate={selectedDate} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/usersetting" element={<UserSetting />} />
      </Routes>
      <Footer />
      {/* <Calendar date={new Date()} />
      <Transaction transactions={transactions} /> */}
    </div>
  );
}

export default App;
