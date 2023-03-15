import { howLongAgo } from "./../Utils/how-long-ago"
import { Votes, Comments } from "./index"
import { useState, useEffect } from "react"
import { getSingleReview } from "../api"
import { useParams } from "react-router-dom"

const IndividualReview = () => {

  const { review_id } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [reviewObject, setReviewObject] = useState({})

  const [hasCommentPosted, setHasCommentPosted] = useState(false)
  const [commentCountIncrement, setCommentCountIncrement] = useState(0)

  useEffect(()=> {
    if(hasCommentPosted === true) {
      setCommentCountIncrement((currentIncrement) => {
        const newIncrement = currentIncrement + 1
        return newIncrement
      })
      setHasCommentPosted(false)
    }

  }, [hasCommentPosted, setHasCommentPosted, setCommentCountIncrement])



  useEffect(() => {
    setIsLoading(true)

    getSingleReview(review_id).then(({ data }) => {

      const { review } = data
      setReviewObject(review);
      setIsLoading(false)
    }).catch((error) =>
      console.log(error));
  }, [review_id]);

  return (<>

    {isLoading &&

      <h2> LOADING</h2>

    }

    {!isLoading &&

      <div className='individual-review-container'>

        <div className="review-header">

          {/* display if widescreen */}
          <div className="review-header-wide">

            <h2 className="review-title review-header-item" layout="position" >{reviewObject.title}</h2>
            <h3 className="review-owner review-header-item">{reviewObject.owner}</h3>
            <h3 className="review-time review-header-item">{howLongAgo(reviewObject.created_at)}</h3>

          </div>




        </div>



        <div className="designer-category-button-conatainer">
          <p>Designed by {reviewObject.designer}</p>
          <p>Category: {reviewObject.category}</p>

          <div className="review-button-container" onClick={(event) => {
            event.stopPropagation()
          }}>
          </div>
        </div>

        <div>


          <p className="review-body">
            {reviewObject.review_body}
          </p>


          <div className="review-image-container">
            <img className="review-image" src={reviewObject.review_img_url} alt="boardgame" />
          </div>





          <div className="likes-comments-buttons-container">

            <div className="review-button-container" onClick={(event) => {
              event.stopPropagation()
            }}>
              <Votes id={reviewObject.review_id} votes={reviewObject.votes} parentType={"review"} />
            </div>





            <p>{parseInt(reviewObject.comment_count) + commentCountIncrement} comments</p>





          </div>





        </div>




          <Comments review_id={review_id} hasCommentPosted={hasCommentPosted} setHasCommentPosted={setHasCommentPosted}/>




      </div>

    }
  </>



  )
}

export default IndividualReview;