import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import { RecoilRoot } from 'recoil';
import BudgetSetting from './pages/BudgetSetting';
import SignUp from './pages/SignUp';
import UserSetting from './pages/UserSetting';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import UserOut from './pages/UserOut';
import BudgetView from './pages/BudgetView';

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
          <Route path="/budgetsetting" element={<BudgetSetting />} />
          <Route path="/budgetview" element={<BudgetView />} />
          <Route path="/budget" element={<BudgetView />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/usersetting" element={<UserSetting />} />
          <Route path="/userout" element={<UserOut />} />
        </Routes>
        <Footer />
      </div>
    </RecoilRoot>
  );
}

export default App;
