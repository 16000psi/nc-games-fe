import { Votes } from "."
import { howLongAgo } from "../Utils/how-long-ago"
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { Link } from "react-router-dom";

import './../styles/IndividualComments.css';




const IndividualComment = ({ commentObject}) => {

    const { user } = useContext(UserContext);


    return (<>

            <section className='individual-comment'>

                <h2 className="individual-comment-author">{commentObject.author}</h2>
                <p className="individual-comment-where">On review "{commentObject.title}" {howLongAgo(commentObject.created_at)}</p>

                <p className="individual-comment-body">{commentObject.body}</p>
                <div className="votes-delete">
                    {(user && user.username !== commentObject.author) ?
                        <Votes id={commentObject.comment_id} votes={commentObject.votes} parentType={"comment"} className="individual-comment-votes"/>
                        : <p>{commentObject.votes} votes</p>       
                    }
                    <Link to={`/reviews/${commentObject.review_id}`}>
                        <button>Go to review</button></Link>
                </div>


            </section>

        


    </>
    )
}

export default IndividualComment;