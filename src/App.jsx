
import './App.css'
import { Routes, BrowserRouter, Route } from  "react-router-dom";
import Home from './pages/Home';



function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>   
      </BrowserRouter>
    </>
  )
}

export default App
