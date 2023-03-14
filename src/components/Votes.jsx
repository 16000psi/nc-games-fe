const Votes = ({id, votes, parentType}) => {

    function activateVote (event) {
        event.stopPropagation()
        console.log("voteup")
    }
    return (
        <section className='review-votes'>
            <button onClick={activateVote}>{votes} votes +</button>
        </section>
    )
}

export default Votes;