import {Review} from "./index"

import { getAllReviews } from "../api";


import './../styles/Reviews.css';
import { useEffect, useState } from "react";


  
const Reviews = () => {

  const [reviewsData, setReviewsData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getAllReviews().then(({data}) => {
      const {reviews} = data
      setIsLoading(false)
      setReviewsData(reviews);
    }).catch((error) =>
    console.log(error));
  }, []);
   


    return (<div className="reviews">
      
        {(isLoading) ? 
        <h2 className="loading-message">loading</h2>
        :
            reviewsData.map((review) => {
                return (
                <Review key={review.review_id} reviewObject={review} />
                )

            })
            
        }
        </div>
    )
}

export default Reviews;