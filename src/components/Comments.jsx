import { useState, useEffect } from "react"
import {PostComment, Comment} from "./index"
import { getCommentsByReview } from "../api"



const Comments = ({review_id}) => {

    const [ commentsData, setCommentsData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [commentPosted, setCommentPosted] = useState(false)

    console.log("rendering")

    useEffect(()=> {
      if(commentPosted === true) {
        setCommentPosted(false)
      }

    }, [commentPosted, setCommentPosted])


    useEffect(() => {
      setIsLoading(true)
      getCommentsByReview(review_id).then(({data}) => {
        const {comments} = data
        setCommentsData(comments);
        setIsLoading(false)
      }).catch((error) =>
      console.log(error));
 
    }, [review_id, commentPosted]);

    




    return (<>

        {!isLoading &&
        <section className='comments-container'>
            <PostComment review_id={review_id} commentPosted={commentPosted} setCommentPosted={setCommentPosted}/>

            
            {
                (commentsData.length > 1) ? 
                commentsData.map((comment) => {
                    return <Comment key={comment.comment_id} commentObject={comment}  />
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