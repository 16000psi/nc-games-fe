import { Votes } from "."
import { secondsToTimeString } from "../Utils/seconds-to-time"

const Comment = ({commentObject}) => {

    const howLongAgo = secondsToTimeString(Math.floor((Date.now() - Date.parse(commentObject.created_at)) / 1000))
    const howLongAgoShort = howLongAgo.replace("years", "y").replace("year", "y").replace("days", "d").replace("day", "d").replace("hours", "h").replace("hour", "h").replace("minutes", "m").replace("minute", "m").replace("seconds", "s").replace("second", "s").replace("and", "").replace(" ago.", " ago.")

    console.log(howLongAgo)

    return (
        <section className='comment'>
            <h2 className="comment-author">{commentObject.author}</h2>
            <p className="comment-time">{howLongAgo}</p>
            <p className="comment-body">{commentObject.body}</p>
            <Votes id={commentObject.comment_id} votes={commentObject.votes} parentType={"comment"} />


        </section>
    )
}

export default Comment;