import { useState } from "react"

import './../styles/Header-Navbar-Footer.css';
import arrowRightSVG from "./../images/arrowRight.svg"
import speachBubbleSVG from "./../images/speachBubble.svg"
import userSVG from "./../images/user.svg"
import pencilSVG from "./../images/pencil.svg"
import arrowUpSVG from "./../images/upArrow.svg"
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


export const Navbar = () => {

    
    const [newEndpoint, setNewEndpoint] = useState("/")

    const [dropDownOpen, setDropDownOpen] = useState(false)

    const [activeSearchButton, setActiveSearchButton] = useState(null)


    const activeButton = {
        borderLeft: "3px solid white",
        borderBottom: "none",
        borderRight: "3px solid white",
        paddingBottom: "3px",
        paddingLeft: "0",
        paddingRight: "0"
    }

    const inactiveButton = {
        borderLeft: "none",
        borderBottom: "3px solid white",
        borderRight: "none",
        paddingBottom: "0",
        paddingLeft: "3px",
        paddingRight: "3px"

    }


    function submit () {
        setDropDownOpen(false)
        setActiveSearchButton(null)
    }

    function mainNavOnClick(endpoint) {
        setNewEndpoint(`/${endpoint}`)
        setActiveSearchButton(endpoint)
        setDropDownOpen(true)

    }

    function closeDropDown() {
        setDropDownOpen(false)
        setActiveSearchButton(null)
    }



    return (
        <div>
        <motion.nav className="navbar">

            <button className="navbar-button" 
                
                onClick={() => mainNavOnClick("reviews")}
                style={(activeSearchButton === "reviews") ? activeButton : inactiveButton}>
                <div className="nav-button-flex-container">
                    <p className="navbar-label">
                        Reviews
                    </p>
                    <img className="nav-icon" src={pencilSVG} alt="reviews" />
                </div>
            </button>

            <button className="navbar-button" 
                
                onClick={() => mainNavOnClick("users")}
                style={(activeSearchButton === "users") ? activeButton : inactiveButton}>
                <div className="nav-button-flex-container">
                    <p className="navbar-label">
                        Users
                    </p>
                    <img className="nav-icon" src={userSVG} alt="users" />
                </div>
            </button>

            <button className="navbar-button" 
                
                onClick={() => mainNavOnClick("comments")}
                style={(activeSearchButton === "comments") ? activeButton : inactiveButton}>
                <div className="nav-button-flex-container">
                    <p className="navbar-label">
                        Comments
                    </p>
                    <img className="nav-icon" src={speachBubbleSVG} alt="comments" />
                </div>
            </button>




        </motion.nav>

        <motion.div 
                
            transition={{layout: {duration: 0.2, type: "tween"}}}
            layout
               
        >

            {dropDownOpen &&
            (<>
            <section  className="drop-down-nav">

            <button className="close-navdrop-button" onClick={closeDropDown}>
                <img className="close-navdrop-icon" src={arrowUpSVG} alt="close navbar"/>
            </button>
            <button>Example</button>
            <button>Example</button>
            <button>Example</button>


    


            <Link to={newEndpoint} className="submit-button" >
                <div className="nav-button-flex-container">
                    <button onClick={submit} className="navbar-label">
                    Search for all {newEndpoint.replace("/", "")}
                    </button>
                    <img className="nav-submit-icon" src={arrowRightSVG} alt="submit" />
                </div>
            
            </Link>


            

            </section>
            </>
            )

            }
        </motion.div>

        </div>

       
    )
}

export default Navbar