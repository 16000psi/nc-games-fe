import {Review} from "./index"
import { useEffect, useState } from "react";
import { getAllReviews } from "../api";
import { useParams} from "react-router-dom"


import './../styles/Reviews.css';



  
const Reviews = () => {

  const [reviewsData, setReviewsData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {category_slug} = useParams()

  useEffect(() => {
    setIsLoading(true)
    getAllReviews(category_slug).then(({data}) => {
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