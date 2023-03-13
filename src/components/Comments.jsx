import {PostComment, Comment} from "./index"

const Comments = ({review_id}) => {

    const exampleCommentsData = JSON.parse(`{"comments":[{"comment_id":19,"body":"Quis duis mollit ad enim deserunt.","review_id":3,"author":"jessjelly","votes":3,"created_at":"2021-03-27T19:48:58.110Z"},{"comment_id":20,"body":"Laboris nostrud ea ex occaecat aute quis consectetur anim.","review_id":3,"author":"cooljmessy","votes":17,"created_at":"2021-03-27T14:15:38.110Z"},{"comment_id":21,"body":"Consequat nisi dolor nulla esse sunt eu ipsum laborum deserunt duis.","review_id":3,"author":"weegembump","votes":1,"created_at":"2021-03-27T14:15:36.110Z"},{"comment_id":22,"body":"Ex id ipsum dolore non cillum anim sint duis nisi anim deserunt nisi minim.","review_id":3,"author":"jessjelly","votes":9,"created_at":"2021-03-27T14:15:31.110Z"},{"comment_id":23,"body":"Commodo aliquip sunt commodo elit in esse velit laborum cupidatat anim.","review_id":3,"author":"happyamy2016","votes":10,"created_at":"2021-03-27T14:15:21.110Z"}]}`)

    const commentsData = exampleCommentsData.comments

    console.log(exampleCommentsData)


    return (
        <section className='comments-container'>
            <PostComment review_id={review_id} />

            
            {
                (commentsData.length > 1) ? 
                commentsData.map((comment) => {
                    return <Comment key={comment.comment_id} commentObject={comment} />
                })
                :
                <h1>There are no comments for this post yet.</h1>
            }
        </section>
    )
}

export default Comments;