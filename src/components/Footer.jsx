import './../styles/Header-Navbar-Footer.css';

import pencilSVG from "./../images/pencil.svg"

const Footer = () => {
    return (
        <div className='footer-new-widget'>
            <section className='footer'>
                <h2>NC Footer</h2>
            </section>
            <button className='new-review-widget'>
                <img className='new-review-widget-icon' src={pencilSVG} alt="create new review button"/>
            </button>
        </div>
    )
}

export default Footer;