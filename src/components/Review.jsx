import { useState } from "react"
import { motion} from "framer-motion"
import { secondsToTimeString } from "../Utils/seconds-to-time"
import { Votes, Comments } from "./index"



const Review = ({reviewObject}) => {

  const [isOpen, setIsOpen] = useState(false)
  const [imageIsDisplayed, setImageIsDisplayed] = useState(false)
  const [areCommentsOpen, setAreCommentsOpen] = useState(false)

  const shortArr = (reviewObject.review_body.slice(0, 100) + "...").split(' ') 
  const longArr = reviewObject.review_body.split(' ')

  const howLongAgo = secondsToTimeString(Math.floor((Date.now() - Date.parse(reviewObject.created_at)) / 1000))
  const howLongAgoShort = howLongAgo.replace("years", "y").replace("year", "y").replace("days", "d").replace("day", "d").replace("hours", "h").replace("hour", "h").replace("minutes", "m").replace("minute", "m").replace("seconds", "s").replace("second", "s").replace("and", "").replace(" ago.", " ago.")

  const word = {
    hidden: {opacity: 1},
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.002
      }
    }
  }

  const letter = {
    hidden: { opacity: 0, y: 50},
    visible: {
      opacity: 1,
      y: 0
    }
  }

  function toggleReviewOpen () {
    setImageIsDisplayed(false)
    setIsOpen(!isOpen)
    setAreCommentsOpen(false)
  }

  function toggleCommentsOpen(event) {
    event.stopPropagation()
    setAreCommentsOpen(!areCommentsOpen)

  }

  return (

      <motion.div 
      transition={{ layout: {duration: 0.005, type: "tween"}}}
      // layout 
      onClick={toggleReviewOpen} 
      className='review-card'
      style={{borderRadius: "1rem"}}
      >

      <div className="review-header">

        {/* display if widescreen */}
        <div className="review-header-wide"> 
      
          <motion.h2 className="review-title review-header-item" layout="position" >{reviewObject.title}</motion.h2>
          <h3 className="review-owner review-header-item">{reviewObject.owner}</h3>
          <h3 className="review-time review-header-item">{howLongAgo}</h3>

        </div>


        {/* display if narrow screen */}
        <div className="review-header-narrow">
      
        <motion.h2 className="review-title review-header-item" layout="position" >{reviewObject.title}</motion.h2>
        <h3 className="review-owner review-header-item">{reviewObject.owner}</h3>
        <h3 className="review-time review-header-item">{howLongAgoShort}</h3>

        </div>

      </div>

      {isOpen &&  // category and designer if open

        <div className="designer-category-button-conatainer">
          <p>Designed by {reviewObject.designer}</p>
          <p>Category: {reviewObject.category}</p>

          <div className="review-button-container" onClick={(event) => {
              setImageIsDisplayed(!imageIsDisplayed)
              event.stopPropagation()
            }}><p>{(imageIsDisplayed) ? "View review body" : "View review image" }</p>
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
            <img className="review-image" src={reviewObject.review_img_url} alt="boardgame"/>
          </div>

          
          }

          {isOpen &&        // likes and comments if open
          <div className="likes-comments-buttons-container">

            <div className="review-button-container" onClick={(event) => {
              event.stopPropagation()
            }}>
              <Votes id={reviewObject.review_id} votes={reviewObject.votes} parentType={"review"}/>
            </div>
            

          


            <div className="review-button-container"  onClick={toggleCommentsOpen}><button>{reviewObject.comment_count} comments</button></div>
          </div>
          
          
          }
      </motion.div>

      {areCommentsOpen &&

      <Comments review_id={reviewObject.review_id} />
      
      
      
      }
      
      </motion.div>


  );
  
  
}

export default Review;