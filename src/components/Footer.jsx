import './../styles/Header-Navbar-Footer.css';

const Footer = () => {
    return (
        <div className='footer-new-widget'>
            <section className='footer'>
                <div className='footer-text-container'>

                    <div className='footer-subtitle-container footer-element'>
                        <h2 className="footer-subtitle">A React App by Dave Smith</h2>
                        <a className='footer-link' href='https://github.com/16000psi' target="_blank" rel="noreferrer">My Github</a>
                        <a className='footer-link' href='https://github.com/16000psi/Boardgame_API' target="_blank" rel="noreferrer">BE Repo</a>
                        <a className='footer-link' href='https://github.com/16000psi/nc-games-fe' target="_blank" rel="noreferrer">FE Repo</a>
                    </div>
                    <div className='footer-element'>
                        <h2>2023</h2>
                    </div>
                </div>




            </section>

        </div>
    )
}

export default Footer;