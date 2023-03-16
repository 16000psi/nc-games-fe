import { useEffect, useState } from "react"

import './../styles/Header-Navbar-Footer.css';
import arrowRightSVG from "./../images/arrowRight.svg"
import speachBubbleSVG from "./../images/speachBubble.svg"
import userSVG from "./../images/user.svg"
import pencilSVG from "./../images/pencil.svg"
import arrowUpSVG from "./../images/upArrow.svg"
import compassSVG from "./../images/compass.svg"
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


export const Navbar = () => {

    const { user, setUser } = useContext(UserContext);

    const [newEndpoint, setNewEndpoint] = useState("/")
    const [dropDownOpen, setDropDownOpen] = useState(false)
    const [activeSearchButton, setActiveSearchButton] = useState(null)
    const [sortBySelection, setSortBySelection] = useState("created_at")
    const [orderBySelection, setOrderBySelection] = useState("DESC")
    const [lastSort, setLastSort] = useState("created_at")
    const [lastOrder, setLastOrder] = useState("DESC")

    const location = useLocation()

    useEffect(() => {  // default sort options change to user's last sort
        setSortBySelection(lastSort)
        setOrderBySelection(lastOrder)

    }, [location, lastOrder, lastSort])


    // styles for menu selection

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


    function submit() {
        setLastSort(sortBySelection)
        setLastOrder(orderBySelection)
        setDropDownOpen(false)
        setActiveSearchButton(null)
    }

    function logout () {
        setUser(null)

    }

    function mainNavOnClick(endpoint, searchTarget) {
        setNewEndpoint(`/${endpoint}`)
        setActiveSearchButton(searchTarget)
        setDropDownOpen(true)

    }

    function closeDropDown() {
        setDropDownOpen(false)
        setActiveSearchButton(null)
    }

    function sortByChange(event) {
        setSortBySelection(event.target.value)


        // sets order selection to most natural value if sort by option changes

        if (event.target.value === "created_at" || event.target.value === "comment_count" || event.target.value === "votes") {
            setOrderBySelection("DESC")
            autoChangeOrderOnSortByChange("DESC")
        }

        else {
            setOrderBySelection("ASC")
            autoChangeOrderOnSortByChange("ASC")
        }




        setNewEndpoint((currentEndpoint) => {

            const replacedEndpoint = currentEndpoint.replace(/sort_by=.*&/, `sort_by=${event.target.value}&`)

            return replacedEndpoint
        })


    }

    function orderByChange(event) {
        setOrderBySelection(event.target.value)
        setNewEndpoint((currentEndpoint) => {

            const replacedEndpoint = currentEndpoint.replace(/&order=.*/, `&order=${event.target.value}`)

            return replacedEndpoint
        })
    }

    function autoChangeOrderOnSortByChange(order) {
        setNewEndpoint((currentEndpoint) => {

            const replacedEndpoint = currentEndpoint.replace(/&order=.*/, `&order=${order}`)

            return replacedEndpoint
        })

    }



    return (
        <div>
            <motion.nav className="navbar">

                <button className="navbar-button"

                    onClick={() => mainNavOnClick(`reviews?sort_by=${sortBySelection}&order=${orderBySelection}`, "reviews")}
                    style={(activeSearchButton === "reviews") ? activeButton : inactiveButton}>
                    <div className="nav-button-flex-container">
                        <p className="navbar-label">
                            Reviews
                        </p>
                        <img className="nav-icon" src={pencilSVG} alt="reviews" />
                    </div>
                </button>

                <button className="navbar-button"

                    onClick={() => mainNavOnClick("explore", "explore")}
                    style={(activeSearchButton === "explore") ? activeButton : inactiveButton}>
                    <div className="nav-button-flex-container">
                        <p className="navbar-label">
                            Explore
                        </p>
                        <img className="nav-icon" src={compassSVG} alt="explore" />
                    </div>
                </button>

                {!user &&

                    <button className="navbar-button"

                        onClick={() => mainNavOnClick("account", "account")}
                        style={(activeSearchButton === "account") ? activeButton : inactiveButton}>
                        <div className="nav-button-flex-container">
                            <p className="navbar-label">
                                Log in
                            </p>
                            <img className="nav-icon" src={userSVG} alt="account" />
                        </div>
                    </button>

                }

                {user &&

                    <button className="navbar-button"

                        onClick={() => mainNavOnClick("account", "account")}
                        style={(activeSearchButton === "account") ? activeButton : inactiveButton}>
                        <div className="nav-button-flex-container">
                            <p className="navbar-label">
                                {user.username}
                            </p>
                            <div className="avatar-icon-container">
                                <img className="nav-icon avatar-icon" src={user.avatar_url} alt="account" />
                            </div>
                        </div>
                    </button>

                }




            </motion.nav>

            <motion.div

                transition={{ layout: { duration: 0.2, type: "tween" } }}
                layout

            >

                {dropDownOpen &&
                    (<>
                        <section className="drop-down-nav">

                            <button className="close-navdrop-button" onClick={closeDropDown}>
                                <img className="close-navdrop-icon" src={arrowUpSVG} alt="close navbar" />
                            </button>

                            {(activeSearchButton === "reviews") &&

                                <>

                                    <label htmlFor="sort-by" className="drop-down-menu-label">sort by</label>
                                    <select id="sort-by" value={sortBySelection} onChange={sortByChange} className="drop-down-menu">
                                        <option value="created_at">Created at</option>
                                        <option value="title">Title</option>
                                        <option value="designer">Designer</option>
                                        <option value="owner">Owner</option>
                                        <option value="category">Category</option>
                                        <option value="votes">Votes</option>
                                        <option value="comment_count">Comment count</option>
                                    </select>

                                    <label htmlFor="sort-by-order" className="drop-down-menu-label" >order</label>
                                    <select id="sort-by-order" value={orderBySelection} onChange={orderByChange} className="drop-down-menu">
                                        <option value="ASC">
                                            {(sortBySelection === "created_at") ? "Oldest" : (sortBySelection === "votes" || sortBySelection === "comment_count") ? "Ascending" : "A-Z"}
                                        </option>
                                        <option value="DESC">
                                            {(sortBySelection === "created_at") ? "Newest" : (sortBySelection === "votes" || sortBySelection === "comment_count") ? "Descending" : "Z-A"}
                                        </option>


                                    </select>


                                    <Link to={newEndpoint} className="submit-button" >
                                        <div className="nav-button-flex-container">
                                            <button onClick={submit} className="navbar-label">
                                                Search for {activeSearchButton.replace("/", "")}
                                            </button>
                                            <img className="nav-submit-icon" src={arrowRightSVG} alt="submit" />
                                        </div>

                                    </Link>

                                </>


                            }

                            {(activeSearchButton === "explore") &&

                                <>

                                    <Link to={"/categories"} className="submit-button" >
                                        <div className="nav-button-flex-container">
                                            <button onClick={submit} className="navbar-label">
                                                Categories
                                            </button>
                                            <img className="nav-submit-icon" src={arrowRightSVG} alt="submit" />
                                        </div>

                                    </Link>




                                    <Link to={"/comments"} className="submit-button" >
                                        <div className="nav-button-flex-container">
                                            <button onClick={submit} className="navbar-label">
                                                Recent comments
                                            </button>
                                            <img className="nav-submit-icon" src={speachBubbleSVG} alt="submit" />
                                        </div>

                                    </Link>

                                </>


                            }

                            {(activeSearchButton === "account") &&
                                <>

                                    {!user &&

                                        <>

                                            <Link to={"/users"} className="submit-button" >
                                                <div className="nav-button-flex-container">
                                                    <button onClick={submit} className="navbar-label">
                                                        View users
                                                    </button>
                                                    <img className="nav-submit-icon" src={arrowRightSVG} alt="submit" />
                                                </div>

                                            </Link>




                                            <Link to={"/create-account"} className="submit-button" >
                                                <div className="nav-button-flex-container">
                                                    <button onClick={submit} className="navbar-label">
                                                        Create account
                                                    </button>
                                                    <img className="nav-submit-icon" src={arrowRightSVG} alt="submit" />
                                                </div>

                                            </Link>

                                        </>
                                    }

                                    {user &&

                                        <>

                                            <div className="submit-button" >
                                                <div className="nav-button-flex-container">
                                                    <button onClick={logout} className="navbar-label">
                                                        Logout
                                                    </button>
                                                    <img className="nav-submit-icon" src={userSVG} alt="submit" />
                                                </div>

                                            </div>




                                            <Link to={"/profile"} className="submit-button" >
                                                <div className="nav-button-flex-container">
                                                    <button onClick={submit} className="navbar-label">
                                                        View Profile
                                                    </button>
                                                    <img className="nav-submit-icon" src={arrowRightSVG} alt="submit" />
                                                </div>

                                            </Link>

                                        </>
                                    }
                                </>


                            }




                        </section>
                    </>
                    )

                }
            </motion.div>

        </div>


    )
}

export default Navbar