import { Header, Navbar, Footer, Home, Reviews } from './components/index';
import {Route, Routes} from "react-router-dom"

import './styles/App.css';

function App() {

  return (
    <div className='gradient-overlay'>
      <div className="App">
        <section className='header-navbar'>
          <Header />
          <Navbar />
        </section>
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
