import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { RecoilRoot } from 'recoil';
import BudgetSetting from './pages/BudgetSetting';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    // Recoil 사용을 위해 최상위에서 RecoilRoot 컴포넌트로 감싸줘야 함
    <RecoilRoot>
      <div className="App">
        <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <Routes>
            <Route path="/" element={<Home selectedDate={selectedDate} />} />
            <Route path="/home" element={<Home selectedDate={selectedDate} />} />
            <Route path="/login" element={<Login />} />
            <Route path='/budget-setting' element={<BudgetSetting />} />
          </Routes>
        <Footer />
      </div>
    </RecoilRoot>
  );
}

export default App;
