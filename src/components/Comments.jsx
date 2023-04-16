import { useState, useEffect } from "react"
import {PostComment, Comment} from "./index"
import { getCommentsByReview } from "../api"
import { useNavigate } from "react-router-dom"



const Comments = ({review_id, hasCommentPosted, setHasCommentPosted, hasCommentDeleted, setHasCommentDeleted}) => {

    const [ commentsData, setCommentsData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {

      if(/\D/.test(review_id)) {
        return
      }
      
      setIsLoading(true)
      getCommentsByReview(review_id).then(({data}) => {
        const {comments} = data
        setCommentsData(comments);
       setIsLoading(false)
      }).catch((error) => {
        navigate("/error")
      
      console.log(error)});
 
    }, [review_id, hasCommentPosted, navigate]);

    return (<>

        {!isLoading &&
        <section className='comments-container'>
            <PostComment review_id={review_id} hasCommentPosted={hasCommentPosted} setHasCommentPosted={setHasCommentPosted}/>

            
            {
                (commentsData.length > 0) ? 
                commentsData.map((comment) => {
                    return <Comment key={comment.comment_id} commentObject={comment} hasCommentDeleted={hasCommentDeleted} setHasCommentDeleted={setHasCommentDeleted} />
                })
                :
                <h2>There are no comments for this post yet.</h2>
            }
        </section>
        }
        {isLoading &&
                <div className="loading-card">
                <h2 className="loading-message">Loading...</h2>
                </div>
        }
        </>)
}

export default Comments;