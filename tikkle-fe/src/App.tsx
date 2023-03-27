import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import BudgetSetting from './pages/BudgetSetting';
import UserSetting from './pages/UserSetting';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import UserOut from './pages/UserOut';
import BudgetView from './pages/BudgetView';
import CategoryEdit from './pages/CategoryEdit';
import UserInfo from './pages/UserInfo';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    <div className="App">
      <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Routes>
        <Route path="/" element={<Home selectedDate={selectedDate} />} />
        <Route path="/home" element={<Home selectedDate={selectedDate} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/budgetsetting" element={<BudgetSetting />} />
        <Route path="/budgetview" element={<BudgetView />} />
        <Route path="/budget" element={<BudgetView />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/usersetting" element={<UserSetting />} />
        <Route path="/userout" element={<UserOut />} />
        <Route path="/categoryedit" element={<CategoryEdit />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
