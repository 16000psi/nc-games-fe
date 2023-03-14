import './../styles/Header-Navbar-Footer.css';
import { Link } from 'react-router-dom';

const Header = ({setEndpoint}) => {
    return (
        <section className='header'>
            <Link to="/" ><h1>NC GAMES</h1></Link>
        </section>
    )
}

export default Header;