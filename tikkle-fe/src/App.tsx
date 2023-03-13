import './App.css'
import Calendar from './components/layout/Calendar'

function App() {
  return (
    <div className="App">
      <Calendar date={new Date()} />
    </div>
  )
}

export default App
