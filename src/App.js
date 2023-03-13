import { Header, Navbar, Footer, Home, Reviews } from './components/index';
import { useState, useEffect } from 'react';
import { useNavigate, Route, Routes} from "react-router-dom"

import './styles/App.css';

function App() {

  const [endpoint, setEndpoint] = useState("/")
  const navigate = useNavigate()

  useEffect(() => {
    navigate(endpoint)
    
  }, [endpoint, navigate])

  return (
    <div className='gradient-overlay'>
      <div className="App">
        <div className='header-navbar'>
          <Header setEndpoint={setEndpoint}/>
          <Navbar setEndpoint={setEndpoint}/>
        </div>
        <section className='results-display-container'>
          <section className='results-display'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reviews" element={<Reviews />}/>
            </Routes>
          </section>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default App;
