import { howLongAgo } from "../Utils/how-long-ago"
import { UserContext } from '../context/UserContext';
import { useContext, useState } from 'react';
import { deleteComment } from "../api";



const Comment = ({ commentObject, hasCommentDeleted, setHasCommentDeleted }) => {

    const { user } = useContext(UserContext);
    const [deleteOpened, setDeleteOpened] = useState(false)
    const [optimisticDeleted, setOptimisticDeleted] = useState(false)
    const [notDeletedError, setNotDeletedError] = useState(false)
    const [acceptedDeletion, setAcceptedDeletion] = useState(false)

    function deleteClick(event) {
        event.stopPropagation()
        setDeleteOpened(true)
    }

    function cancelDeletion(event) {
        event.stopPropagation()
        setDeleteOpened(false)

    }

    function executeDeletion(event) {
        event.stopPropagation()
        setOptimisticDeleted(true)



        deleteComment(commentObject.comment_id).then(() => {
            setHasCommentDeleted(true)
        }).catch(() => {
            setHasCommentDeleted(false)
            setOptimisticDeleted(false)
            setNotDeletedError(true)
        })


    }

    function acceptDeletedComment(event) {
        event.stopPropagation()
        setAcceptedDeletion(true)


    }


    return (<>
        {!optimisticDeleted &&
            <section className='comment'>

                <h2 className="comment-author">{commentObject.author}</h2>
                <p className="comment-time">{howLongAgo(commentObject.created_at)}</p>
                <p className="comment-body">{commentObject.body}</p>
                <div className="votes-delete">
                    {(user && user.username !== commentObject.author) ?
                        <></>
                        :
                        (user && user.username === commentObject.author && !deleteOpened) ?
                            <>
                                <p>{commentObject.votes} votes</p>
                                <button onClick={deleteClick} className="comment-delete-options">DELETE</button>
                            </>
                            : (user && user.username === commentObject.author && deleteOpened) ?
                                <>
                                    <p>{commentObject.votes} votes</p>
                                    <div className="comments-delete-prompt-container comment-delete-options">
                                        <button onClick={executeDeletion}>Delete my comment</button>
                                        <button onClick={cancelDeletion}>No, keep my comment</button>
                                    </div>
                                </>
                                :
                                <></>
                    }
                </div>


            </section>

        }
        {(optimisticDeleted && !acceptedDeletion) &&
            <div className="comment-deleted-container">
                <h2>Comment deleted</h2>
                <button onClick={acceptDeletedComment}>Okay</button>
            </div>
        }
        {(optimisticDeleted && acceptedDeletion) &&
            <>
            </>
        }
        {notDeletedError &&
            <h2>Error deleting comment</h2>
        }

    </>
    )
}

export default Comment;