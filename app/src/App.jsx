
import './App.css'

import { Routes, BrowserRouter, Route } from  "react-router-dom";
import Home from './pages/Home';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
              {/* <Route path="/works" element={<Favoritos />} />
              <Route path="/skils" element={<About titulo='Sobre Nos' />} />
              <Route path="/contact" element={<Registro/>} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>   
      </BrowserRouter>
    </>
  )
}

export default App
