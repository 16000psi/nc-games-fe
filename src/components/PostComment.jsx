const PostComment = ({review_id}) => {
    return (
        <section className='post-comment-form-container'>
            <form className="post-comment-form">
                <label className="add-comment-label" htmlFor="comment-input"> Add a comment on this review</label>
                <textarea  className="comment-input-field" type="text" id="comment-input" defaultValue="not implemented - placeholder"></textarea>
                <div className="review-button-container">
                    <button onClick={(event) => event.preventDefault()} type="submit">Post comment</button>
                </div>
            </form>
        </section>
    )
}

export default PostComment;