import { Votes } from "."
import { howLongAgo} from "../Utils/how-long-ago"



const Comment = ({commentObject}) => {

    return (
        <section className='comment'>
            <h2 className="comment-author">{commentObject.author}</h2>
            <p className="comment-time">{howLongAgo(commentObject.created_at)}</p>
            <p className="comment-body">{commentObject.body}</p>
            <Votes id={commentObject.comment_id} votes={commentObject.votes} parentType={"comment"} />


        </section>
    )
}

export default Comment;