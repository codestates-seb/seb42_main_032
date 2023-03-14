import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    <div className="App">
      <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Routes>
        <Route path="/home" element={<Home selectedDate={selectedDate} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
