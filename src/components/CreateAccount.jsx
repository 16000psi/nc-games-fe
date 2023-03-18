import { UserContext } from '../context/UserContext';
import { useEffect, useState, useContext } from "react";
import { addUser } from "../api";
import { getAllUsers } from "../api"


import './../styles/CreateAccount.css';


function CreateAccount() {

    const { user, setUser } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false)

    const [usersData, setusersData] = useState([]);

    const [usernameInput, setUsernameInput] = useState("")
    const [usernameEmpty, setUsernameEmpty] = useState(false)
    const [usernameValid, setUsernameValid] = useState(true)
    const [usernameTaken, setUsernameTaken] = useState(false)
    const [nameInput, setNameInput] = useState("")
    const [nameEmpty, setNameEmpty] = useState(false)
    const [urlInput, setUrlInput] = useState("")
    const [urlEmpty, setUrlEmpty] = useState(false)
    const [urlValid, setUrlValid] = useState(true)

    const [submitted, setSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getAllUsers().then(({ data }) => {
            const { users } = data


            setusersData(users.map((user) => user.username));
            setIsLoading(false)

        });
    }, []);

    function usernameChange(event) {
        setUsernameInput(event.target.value)

        if (usersData.includes(event.target.value)) {
            setUsernameTaken(true)
        } else {
            setUsernameTaken(false)
        }


        if (/[^a-zA-Z0-9]/.test(event.target.value) || event.target.value.length < 8 || event.target.value.length > 12) {
            setUsernameValid(false)
        }
        else {
            setUsernameValid(true)
        }

        if (event.target.value.length > 0) {
            setUsernameEmpty(false)
        } else {
            setUsernameValid(true) // for css purposes, not actually valid
        }

        

    }

    function nameChange(event) {
        setNameInput(event.target.value)
        if (event.target.value.length > 0) {
            setNameEmpty(false)
        }


    }

    function urlChange(event) {
        setUrlInput(event.target.value)
        if (event.target.value.length > 0) {
            setUrlEmpty(false)
            if (!/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(event.target.value)) {
                setUrlValid(false)
            } else {
                setUrlValid(true)
            }
        }
        if (event.target.value.length < 1) {
            setUrlValid(true)  // not actually valid, just for css purposes
        }

    }

    function submitAccountForm (event) {
        event.preventDefault()
        setSubmitError(false)

        if (!usernameValid || !urlValid || usernameInput.length < 1 || nameInput.length < 1 || urlInput.length < 1 || usernameTaken || submitted) {

            if (usernameInput.length < 1) {
                setUsernameEmpty(true)
            }

            if (nameInput.length < 1) {
                setNameEmpty(true)
            }

            if (urlInput.length < 1) {
                setUrlEmpty(true)
            }

        } else {

            setSubmitted(true)

            addUser(usernameInput, nameInput, urlInput).then((response) => {
                setSuccess(true)
                setUser(response.data.user)
            }).catch((error) => {
                console.log(error)
                setSubmitted(false)
                setSubmitError(true)
            })
        }

    }

    return (
        <section className="create-account-page">

            {(user && !success) &&

                <h2>You must be logged out to create an account</h2>


            }
            {(!user && isLoading && !success) &&
            <h2>Loading</h2>
            }
            {(!user && !isLoading && !success) &&
                <form className="create-account-form">

                    <h2>Create Account</h2>

                    <label htmlFor='username-input'
                    style={(usernameEmpty) ? { color: "red" } : { color: "inherit" }}
                    >{(usernameTaken) ? "Username alraeady taken:" : "Username:"}</label>
                    <input id='username-input' 
                    className='create-account-input'
                    onChange={usernameChange}
                    value={usernameInput}
                    placeholder={(usernameEmpty) ? "You must enter a username" : ""}
                    style={(!usernameValid) ? { color: "red" } : { color: "inherit" }}
                    ></input>
                    
                    <p className='username-message'>Username must be between 8 and 12 characters and contain only letters and numbers</p>

                    <label htmlFor='name-input'
                    style={(nameEmpty) ? { color: "red" } : { color: "inherit" }}
                    >Name:</label>
                    <input id='name-input'
                    className='create-account-input'
                    onChange={nameChange}
                    value={nameInput}
                    placeholder={(nameEmpty) ? "You must enter your name" : ""}
                    ></input>

                    <label htmlFor='avatar-url-input'
                    style={(urlEmpty) ? { color: "red" } : { color: "inherit" }}
                    >{(urlValid) ? " Avatar URL:" : "URL must be valid:"}</label>
                    <input id='avatar-url-input' 
                    className='create-account-input'
                    onChange={urlChange}
                    value={urlInput}
                    placeholder={(urlEmpty) ? "You must enter your name" : ""}
                    style={(!urlValid) ? { color: "red" } : { color: "inherit" }}
                    ></input>

                    <button onClick={submitAccountForm} className="account-submit-button" >{(submitted) ? "Creating account..." : (submitError) ? "There was an error creating your account" : "Create account"}</button>

                </form>

            }
            {success &&
            <h2>Account creation successful</h2>
            }


        </section>
    )
}

export default CreateAccount