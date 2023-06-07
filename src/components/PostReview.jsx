import { useEffect, useState, useContext } from "react";
import { getAllCategories } from "../api";
import { UserContext } from '../context/UserContext';
import { addReview } from "../api";
import { useNavigate } from "react-router-dom";

import './../styles/PostReview.css';

function PostReview() {

    const navigate = useNavigate()

    const { user } = useContext(UserContext);

    const [categoriesData, setCategoriesData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [categorySelection, setCategorySelection] = useState("strategy")
    const [titleInput, setTitleInput] = useState("")
    const [titleEmpty, setTitleEmpty] = useState(false)
    const [designerInput, setDesignerInput] = useState("")
    const [designerEmpty, setDesignerEmpty] = useState(false)
    const [bodyInput, setBodyInput] = useState("")
    const [bodyEmpty, setBodyEmpty] = useState(false)
    const [urlInput, setUrlInput] = useState("")
    const [urlEmpty, setUrlEmpty] = useState(false)
    const [urlInvalid, setUrlInvalid] = useState(false)

    const [postSubmitted, setPostSubmitted] = useState(false)
    const [errorPosting, setErrorPosting] = useState(false)


    useEffect(() => {
        setIsLoading(true)
        getAllCategories().then(({ data }) => {
            const { categories } = data
            setCategoriesData(categories)
            setIsLoading(false)
        })
    }, []
    )

    function submitReview(event) {
        event.preventDefault()


        if (user && titleInput.length > 0 && designerInput.length > 0 && bodyInput.length > 0 && urlInput.length > 0 && !urlInvalid && !postSubmitted) {

            setPostSubmitted(true)
            setErrorPosting(false)

            addReview(user.username, titleInput, categorySelection, designerInput, urlInput, bodyInput).then((response) => {
                navigate(`/reviews/${response.data.review.review_id}`)
            }).catch((error) => {
                console.log(error)
                setErrorPosting(true)
                setPostSubmitted(false)

            })

        } else if (postSubmitted) {
            // do nothing - stops repeat submissions
            return
        } else {
            if (bodyInput.length < 1) {
                setBodyEmpty(true)
            }
            if (urlInput.length < 1) {
                setUrlEmpty(true)
            }
            if (designerInput.length < 1) {
                setDesignerEmpty(true)
            }
            if (titleInput.length < 1) {
                setTitleEmpty(true)
            }
        }



    }

    function titleChange(event) {
        setTitleInput(event.target.value)
        if (event.target.value.length > 0) {
            setTitleEmpty(false)
        }

    }

    function designerChange(event) {
        setDesignerInput(event.target.value)
        if (event.target.value.length > 0) {
            setDesignerEmpty(false)
        }

    }

    function bodyChange(event) {
        setBodyInput(event.target.value)
        if (event.target.value.length > 0) {
            setBodyEmpty(false)
        }



    }

    function urlChange(event) {
        setUrlInput(event.target.value)
        if (event.target.value.length > 0) {
            setUrlEmpty(false)
            if (!/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(event.target.value)) {
                setUrlInvalid(true)
            } else {
                setUrlInvalid(false)
            }
        }
        if (event.target.value.length < 1) {
            setUrlInvalid(false)
        }

    }





    return (
        <div className="post-review-form-container">

            {(isLoading && user) &&
                <div className="review-card loading-card">
                    <h2 className="loading-message">Loading...</h2>
                </div>
            }
            {(!isLoading && user) &&
                <form className="post-review-form">
                    <label htmlFor="review-title-input"
                        style={(titleEmpty) ? { color: "red" } : { color: "inherit" }}
                    >Review Title
                    </label>

                    <input id="review-title-input" className="post-review-input" type="text"
                        onChange={titleChange}
                        placeholder={(titleEmpty) ? "You must enter a title" : ""}

                        value={titleInput}
                    >
                    </input>


                    <label htmlFor="select-category" className="select-category-drop-down">
                        Game category
                    </label>

                    <select id="select-category" value={categorySelection}
                        onChange={(event) => { setCategorySelection(event.target.value) }} className="post-review-category-drop">
                        {categoriesData.map((category) => {
                            return <option key={category.slug} value={category.slug}>{category.slug}</option>
                        })}

                    </select>

                    <label htmlFor="review-designer-input"
                        style={(designerEmpty) ? { color: "red" } : { color: "inherit" }}
                    >
                        Game designer
                    </label>

                    <input id="review-designer-input" className="post-review-input" type="text"
                        onChange={designerChange}
                        placeholder={(designerEmpty) ? "You must enter a designer" : ""}
                        value={designerInput}
                    ></input>

                    <label htmlFor="review-url-input"
                        style={(urlEmpty || urlInvalid) ? { color: "red" } : { color: "inherit" }}

                    >
                        {(urlInvalid) ? "You must include a valid URL:" : "Review image URL:"}                    </label>

                    <input id="review-url-input" className="post-review-input" type="text"
                        onChange={urlChange}
                        placeholder={(urlEmpty) ? "You must include an image url" : ""}
                        value={urlInput}
                    ></input>


                    <label htmlFor="review-body-input"
                        style={(bodyEmpty) ? { color: "red" } : { color: "inherit" }}

                    >
                        Your review:
                    </label>

                    <textarea id="review-body-input" className="post-review-input post-review-body-input" type="text"
                        onChange={bodyChange}
                        placeholder={(bodyEmpty) ? "Please write a review" : ""}
                        value={bodyInput}
                    ></textarea>

                    <div className="review-submit-button" >
                        <button onClick={submitReview}>
                            {(errorPosting) ? "There was an error submitting your review" : (postSubmitted) ? "Sumbitting your review..." : "Submit review"}
                        </button>
                    </div>
                </form>
            }
            {(!user) &&
                <h2 className="post-message">You must be logged in to post a review.</h2>
            }
        </div>
    )
}


export default PostReview