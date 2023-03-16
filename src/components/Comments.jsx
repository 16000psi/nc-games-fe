import { useState, useEffect } from "react"
import {PostComment, Comment} from "./index"
import { getCommentsByReview } from "../api"



const Comments = ({review_id, hasCommentPosted, setHasCommentPosted, hasCommentDeleted, setHasCommentDeleted}) => {

    const [ commentsData, setCommentsData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    





    useEffect(() => {
      setIsLoading(true)
      getCommentsByReview(review_id).then(({data}) => {
        const {comments} = data
        setCommentsData(comments);
        setIsLoading(false)
      }).catch((error) =>
      console.log(error));
 
    }, [review_id, hasCommentPosted]);

    




    return (<>

        {!isLoading &&
        <section className='comments-container'>
            <PostComment review_id={review_id} hasCommentPosted={hasCommentPosted} setHasCommentPosted={setHasCommentPosted}/>

            
            {
                (commentsData.length > 1) ? 
                commentsData.map((comment) => {
                    return <Comment key={comment.comment_id} commentObject={comment} hasCommentDeleted={hasCommentDeleted} setHasCommentDeleted={setHasCommentDeleted} />
                })
                :
                <h2>There are no comments for this post yet.</h2>
            }
        </section>
        }
        {isLoading &&
        <h2>Loading</h2>
        }
        </>)
}

export default Comments;