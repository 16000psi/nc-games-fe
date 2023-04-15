
import { Header, Navbar, Footer, Home, Reviews, IndividualReview, Users, Categories, ErrorPage, FourOhFour, PostReview, RecentComments, CreateAccount} from './components/index';

import {Route, Routes} from "react-router-dom"

import './styles/App.css';
import Profile from './components/Profile';

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
              <Route path="/comments" element={<RecentComments />}/>
              <Route path="/users" element={<Users />} />
              <Route path="/post" element={<PostReview />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="*" element={<FourOhFour />} />
              <Route path="/404" element={<FourOhFour />} />
            </Routes>
          </section>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default App;
