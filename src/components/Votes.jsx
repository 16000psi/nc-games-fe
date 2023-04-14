import { useState } from "react"
import { incrementVotes } from "../api"
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Votes = ({ id, votes, setVotesIncrement }) => {

    const [votesNumber, setVotesNumber] = useState(votes)
    const [voteError, setVoteError] = useState(false)
    const { user } = useContext(UserContext);

    function activateUpVote(event) {

        event.stopPropagation()

        let upvoted = JSON.parse(localStorage.getItem(`${user.username}-${id}-upvotes`))
        let downvoted = JSON.parse(localStorage.getItem(`${user.username}-${id}-downvotes`))





        setVotesIncrement((currentVotesIncrement) => {
            const newVotesIncrement = currentVotesIncrement + 1
            return newVotesIncrement
        })

        setVotesNumber((currentVotesNumber) => {
            const newVotes = currentVotesNumber + 1
            return newVotes
        })

        incrementVotes(id, 1).catch(() => {

            setVoteError(true)

            setVotesNumber((currentVotesNumber) => {
                const newVotes = currentVotesNumber - 1
                return newVotes
            })

        }
        )
        console.log(downvoted, "<<<< downvoted")
        console.log(upvoted, "<<<< upvoted")


    }






    function activateDownVote(event) {
        event.stopPropagation()


        let upvoted = JSON.parse(localStorage.getItem(`${user.username}-${id}-upvotes`))
        let downvoted = JSON.parse(localStorage.getItem(`${user.username}-${id}-downvotes`))




        setVotesIncrement((currentVotesIncrement) => {
            const newVotesIncrement = currentVotesIncrement - 1
            return newVotesIncrement
        })
        setVotesNumber((currentVotesNumber) => {
            const newVotes = currentVotesNumber - 1
            return newVotes
        })
        incrementVotes(id, -1).catch(() => {

            setVoteError(true)

            setVotesNumber((currentVotesNumber) => {
                const newVotes = currentVotesNumber + 1
                return newVotes
            })

        }
        )


        console.log(downvoted, "<<<< downvoted")
        console.log(upvoted, "<<<< upvoted")


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