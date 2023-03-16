import {Review} from "./index"
import { useEffect, useState } from "react";
import { getAllReviews } from "../api";
import { useParams, useSearchParams, useNavigate} from "react-router-dom"


import './../styles/Reviews.css';



  
const Reviews = () => {

  const navigate = useNavigate()

  const [reviewsData, setReviewsData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams] = useSearchParams();
  const {category_slug} = useParams()
  const sort_by = searchParams.get("sort_by")
  const order = searchParams.get("order")


  useEffect(() => {
    setIsLoading(true)
    getAllReviews(category_slug, sort_by, order).then(({data}) => {
      const {reviews} = data
      setReviewsData(reviews);
      setIsLoading(false)
    }).catch((error) => {
    console.log(error)
    navigate("/404")
  });
  }, [sort_by, category_slug, order]);
   


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