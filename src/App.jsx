import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Transaction from './pages/Transaction'
import Insights from './pages/Insights'
import Settings from './pages/Settings'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    console.log("Theme:", theme);
    
    localStorage.setItem("theme", theme);

    if(theme === "dark") {
      document.documentElement.classList.add("dark");
    }
    else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <BrowserRouter>
        <Header 
          theme = {theme}
          setTheme = {setTheme}
        />
        
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path='/insights' element={<Insights />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
