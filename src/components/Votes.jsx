import { useState } from "react"
import { incrementVotes } from "../api"

const Votes = ({id, votes, setVotesIncrement}) => {

    const [votesNumber, setVotesNumber] = useState(votes)
    const [voteError, setVoteError] = useState(false)

    function activateUpVote (event) {

        setVotesIncrement((currentVotesIncrement) => {
            const newVotesIncrement = currentVotesIncrement + 1
            return newVotesIncrement
        })

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

        setVotesIncrement((currentVotesIncrement) => {
            const newVotesIncrement = currentVotesIncrement - 1
            return newVotesIncrement
        })

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