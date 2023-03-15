import { Header, Navbar, Footer, Home, Reviews, IndividualReview, Categories } from './components/index';
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
              <Route path="/reviews/:review_id" element={<IndividualReview />}/>
              
              <Route path="/reviews/category/:category_slug" element={<Reviews />}/>
              <Route path="/categories" element={<Categories />}/>
            </Routes>
          </section>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default App;
