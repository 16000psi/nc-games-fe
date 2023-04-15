import { Review } from "./index"
import { useEffect, useState } from "react";
import { getReviewsByUser } from "../api";
import { useNavigate } from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';



import './../styles/Reviews.css';




const Profile = () => {

    const navigate = useNavigate()

    const [reviewsData, setReviewsData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedOut, setLoggedOut] = useState(false)
    const { user } = useContext(UserContext);


    useEffect(() => {
        if (user) {


            setIsLoading(true)
            getReviewsByUser(user.username).then(({ data }) => {
                const { reviews } = data
                setReviewsData(reviews);
                setIsLoading(false)
            }).catch((error) => {
                console.log(error)
                navigate("/404")
            });
        } else {
            setLoggedOut(true)

        }
    }, [navigate, user]);



    return (
        <div className="reviews">

            {isLoggedOut &&

                <div className="review-card profile-card">
                    <h2 className="profile-message">You must be logged in to view your profile.</h2>
                </div>



            }
            {!isLoggedOut &&
                <>



                    {(isLoading) ?
                        <div className="review-card loading-card">
                            <h2 className="loading-message">Loading...</h2>
                        </div>
                        :
                        <>
                            <div className="review-card profile-card">
                                <h2 className="profile-message">Your Reviews...</h2>
                            </div>
                            {reviewsData.map((review) => {
                                return (
                                    <Review key={review.review_id} reviewObject={review} />
                                )

                            })}
                        </>}
                </>

            }



        </div>
    )
}

export default Profile;