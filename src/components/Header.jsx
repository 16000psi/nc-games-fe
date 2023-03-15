import './../styles/Header-Navbar-Footer.css';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Header = () => {

    const { user } = useContext(UserContext);
    return (
        <section className='header'>
            <Link to="/" ><h1>NC GAMES</h1></Link>
            <div className='logged-in-message'>
                <p>{(user) ? `Logged in as ${user.username}` : "You are not logged in"}</p>
            </div>
        </section>
    )
}

export default Header;