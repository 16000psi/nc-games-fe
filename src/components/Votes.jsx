import { useState } from "react"
import { incrementVotes } from "../api"

const Votes = ({id, votes}) => {

    const [votesNumber, setVotesNumber] = useState(votes)
    const [voteError, setVoteError] = useState(false)

    function activateUpVote (event) {

        setVotesNumber((currentVotesNumber) => {
            const newVotes = currentVotesNumber + 1
            return newVotes
        })
        event.stopPropagation()


        incrementVotes(id, 1).catch(() => {

            setVoteError(true)

            setVotesNumber((currentVotesNumber) => {
                const newVotes = currentVotesNumber - 1
                return newVotes
            })

        }
        )
    }

    function activateDownVote (event) {

        setVotesNumber((currentVotesNumber) => {
            const newVotes = currentVotesNumber - 1
            return newVotes
        })
        event.stopPropagation()


        incrementVotes(id, -1).catch(() => {

            setVoteError(true)

            setVotesNumber((currentVotesNumber) => {
                const newVotes = currentVotesNumber + 1
                return newVotes
            })

        }
        )
    }


    return (<>
        {!voteError &&
        <section className='review-votes'>
            <p>{votesNumber} votes</p>
            <button className="vote-button" onClick={activateUpVote}><p className="vote-innertext">+</p> </button>
            <button className="vote-button" onClick={activateDownVote}><p className="vote-innertext">-</p></button>
        </section>
        }
        {voteError &&
                <section className='review-votes'>
                <p>Error - plase try again later</p>

            </section>
        
        }
        </>
    )
}

export default Votes;