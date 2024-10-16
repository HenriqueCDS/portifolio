
import './App.css'

import { Routes, BrowserRouter, Route } from  "react-router-dom";
import Home from './pages/Home';
import { useEffect,useState } from 'react';
import Loader from './components/Loader';


function App() {
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }
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
