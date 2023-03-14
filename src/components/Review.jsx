import { useState } from "react"
import { motion } from "framer-motion"
import { Votes, Comments } from "./index"
import { howLongAgo, howLongAgoShort } from "../Utils/how-long-ago"
import { Link } from "react-router-dom"



const Review = ({ reviewObject }) => {

  const [isOpen, setIsOpen] = useState(false)
  const [imageIsDisplayed, setImageIsDisplayed] = useState(false)
  const [areCommentsOpen, setAreCommentsOpen] = useState(false)

  const shortArr = (reviewObject.review_body.slice(0, 100) + "...").split(' ')
  const longArr = reviewObject.review_body.split(' ')

  const word = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.002
      }
    }
  }

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  function toggleReviewOpen() {
    setImageIsDisplayed(false)
    setIsOpen((currentBoolean) =>
      (currentBoolean) ? false : true
    )
    setAreCommentsOpen(false)
  }

  function toggleCommentsOpen(event) {
    event.stopPropagation()
    setAreCommentsOpen((currentBoolean) =>
      (currentBoolean) ? false : true
    )

  }

  return (

    <motion.div
      transition={{ layout: { duration: 0.005, type: "tween" } }}
      // layout 
      onClick={toggleReviewOpen}
      className='review-card'
      style={{ borderRadius: "1rem" }}
    >

      <div className="review-header">

        {/* display if widescreen */}
        <div className="review-header-wide">

          <motion.h2 className="review-title review-header-item" layout="position" >{reviewObject.title}</motion.h2>
          <h3 className="review-owner review-header-item">{reviewObject.owner}</h3>
          <h3 className="review-time review-header-item">{howLongAgo(reviewObject.created_at)}</h3>

        </div>


        {/* display if narrow screen */}
        <div className="review-header-narrow">

          <motion.h2 className="review-title review-header-item" layout="position" >{reviewObject.title}</motion.h2>
          <h3 className="review-owner review-header-item">{reviewObject.owner}</h3>
          <h3 className="review-time review-header-item">{howLongAgoShort(reviewObject.created_at)}</h3>

        </div>

      </div>

      {isOpen &&  // category and designer if open

        <div className="designer-category-button-conatainer">
          <p>Designed by {reviewObject.designer}</p>
          <p>Category: {reviewObject.category}</p>

          <div className="review-button-container" onClick={(event) => {
            setImageIsDisplayed(!imageIsDisplayed)
            event.stopPropagation()
          }}><button>{(imageIsDisplayed) ? "View review body" : "View review image"}</button>
          </div>
        </div>

      }

      <motion.div key={isOpen}
        variants={word}
        initial="hidden"
        animate="visible"

        layout="position">

        {!imageIsDisplayed &&  // if image is not displayed
          <p className="review-body">
            {(!isOpen) ?         // truncated body if not open
              shortArr.map((char, index) => {
                return (
                  <motion.span key={char + "-" + index} variants={letter}>
                    {char + " "}
                  </motion.span>
                )
              })
              :                    // full body once open
              longArr.map((char, index) => {
                return (
                  <motion.span key={char + "-" + index} variants={letter}>
                    {char + " "}
                  </motion.span>
                )
              })
            }
          </p>
        }
        {imageIsDisplayed &&
          <div className="review-image-container">
            <img className="review-image" src={reviewObject.review_img_url} alt="boardgame" />
          </div>


        }

        {isOpen &&        // likes and comments if open
          <div className="likes-comments-buttons-container">

            <div className="review-button-container" onClick={(event) => {
              event.stopPropagation()
            }}>
              <Votes id={reviewObject.review_id} votes={reviewObject.votes} parentType={"review"} />
            </div>





            <div className="review-button-container" onClick={toggleCommentsOpen}><button>{reviewObject.comment_count} comments</button></div>

            <Link to={`/reviews/${reviewObject.review_id}`} className="review-button-container" >
              <button>View review page</button></Link>
          </div>


        }
      </motion.div>

      {areCommentsOpen &&

        <Comments review_id={reviewObject.review_id} />



      }


      <div className="expand-indicator-container">


        <button className="expand-indicator">{(!isOpen) ? "Click to expand" : "Click to close"}</button>
      </div>

    </motion.div>


  );


}

export default Review;