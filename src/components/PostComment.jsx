import { useContext, useState } from 'react';
import { addComment } from '../api';
import { UserContext } from '../context/UserContext';



const PostComment = ({review_id, commentPosted, setCommentPosted}) => {

    const { user } = useContext(UserContext);

    const [commentContent, setCommentContent] = useState("")
    const [errorCommentEmpty, setErrorCommentEmpty] = useState(false)
   
    const [commentError, setCommentError] = useState(false)
    const [optimisticPost, setOptimisticPost] = useState(false)


    function onSubmit (event) {
        event.stopPropagation()
        event.preventDefault()
        if (commentContent.length < 1) {
            setErrorCommentEmpty(true)
        } else {
            commentAddingAndConsequences()
            
        }

    }

    function commentOnChange (event) {
        setCommentContent(event.target.value)
        if (commentContent.length > 0) {
            setErrorCommentEmpty(false)
        }

    } 

    function commentAddingAndConsequences () {

        setOptimisticPost(true)
        
        addComment(review_id, {username: user.username, body: commentContent})
        .then(() => {
            setCommentPosted(true)
            setOptimisticPost(false)
        })
        .catch(() => {
            setCommentError(true)


        })

    }

    return (
        <section className='post-comment-form-container'>

            {(user && !optimisticPost && !commentError) ? 


            <form className="post-comment-form">
                <label 
                className="add-comment-label" 
                htmlFor="comment-input"
                style={(!errorCommentEmpty) ? {color: "inherit"} : {color: "red"}}

                >
                    {(!errorCommentEmpty) ? "Add a comment on this review" : "Comment cannot be empty!"}</label>
                <textarea 

                    onChange={commentOnChange} 
                    className="comment-input-field" 
                    type="text" 
                    id="comment-input" 
                    onClick={(event) => {
                        event.stopPropagation()
                      }}>

                </textarea>
                <div className="review-button-container">
                    <button onClick={onSubmit} type="submit">Post comment</button>
                </div>
            </form>
            : (user && optimisticPost && !commentError) ?
            <h2>Your comment has been posted</h2>

            : (commentError) ? 
            <h2>There was an error posting your comment</h2>
            : 
            <h2>You must be logged in to post a comment.</h2>
                    

            }

        </section>
    )
}

export default PostComment;