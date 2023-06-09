import { howLongAgo } from "./../Utils/how-long-ago"
import { Votes, Comments } from "./index"
import { useState, useEffect } from "react"
import { getSingleReview } from "../api"
import { useParams, useNavigate } from "react-router-dom"

const IndividualReview = () => {

  const navigate = useNavigate()

  const { review_id } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [reviewObject, setReviewObject] = useState({})

  const [hasCommentPosted, setHasCommentPosted] = useState(false)
  const [hasCommentDeleted, setHasCommentDeleted] = useState(false)
  const [commentCountIncrement, setCommentCountIncrement] = useState(0)
  const [votesIncrement, setVotesIncrement] = useState(0)


  useEffect(() => {
    if (hasCommentPosted === true || hasCommentDeleted === true) {


      setCommentCountIncrement((currentIncrement) => {
        const newIncrement = (hasCommentPosted) ? currentIncrement + 1 : currentIncrement - 1
        return newIncrement
      })
      setHasCommentPosted(false)
    }

  }, [hasCommentPosted, setHasCommentPosted, hasCommentDeleted, setHasCommentDeleted, setCommentCountIncrement])



  useEffect(() => {

    if (/\D/.test(review_id)) {
      navigate("/error")
      return
    }
    setIsLoading(true)

    getSingleReview(review_id).then(({ data }) => {

      const { review } = data
      setReviewObject(review);
      setIsLoading(false)
    }).catch((error) => {
      navigate("/404")
      console.log(error)
    });
  }, [review_id, navigate]);

  return (<>

    {isLoading &&

      <div className="review-card loading-card">
        <h2 className="loading-message">Loading...</h2>
      </div>

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

          <div className="review-header-narrow">

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
              <Votes id={reviewObject.review_id} votes={reviewObject.votes} parentType={"review"} votesIncrement={votesIncrement} setVotesIncrement={setVotesIncrement} />
            </div>

            <p>{parseInt(reviewObject.comment_count) + commentCountIncrement} comments</p>

          </div>
        </div>
        <Comments review_id={review_id} hasCommentPosted={hasCommentPosted} setHasCommentPosted={setHasCommentPosted} hasCommentDeleted={hasCommentDeleted} setHasCommentDeleted={setHasCommentDeleted} />

      </div>

    }
  </>



  )
}

export default IndividualReview;