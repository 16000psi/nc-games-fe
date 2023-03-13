import './../styles/Header-Navbar-Footer.css';

const Header = ({setEndpoint}) => {
    return (
        <section className='header'>
            <h1 onClick={() => setEndpoint("/")}>NC GAMES</h1>
        </section>
    )
}

export default Header;