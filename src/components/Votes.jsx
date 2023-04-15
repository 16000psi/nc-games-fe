import { useEffect, useState } from "react"
import { incrementVotes } from "../api"
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Votes = ({ id, votes, setVotesIncrement }) => {

    const [votesNumber, setVotesNumber] = useState(votes)
    const [voteError, setVoteError] = useState(false)
    const { user } = useContext(UserContext);
    const [isUpVoted, setIsUpVoted] = useState(false)
    const [isDownVoted, setIsDownVoted] = useState(false)

    useEffect(() => {
        let upvoted = JSON.parse(localStorage.getItem(`${user.username}-${id}-upvotes`))
        let downvoted = JSON.parse(localStorage.getItem(`${user.username}-${id}-downvotes`))
        if (upvoted && upvoted === 1) {
            setIsUpVoted(true)
        } else if (downvoted && downvoted === 1) {
            setIsDownVoted(true)
        }
    }, [id, user.username])

    function activateUpVote(event) {

        event.stopPropagation()

        let upvoted = JSON.parse(localStorage.getItem(`${user.username}-${id}-upvotes`))
        let downvoted = JSON.parse(localStorage.getItem(`${user.username}-${id}-downvotes`))

        if ((upvoted && upvoted === 0) || !upvoted) {

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

            if (downvoted && downvoted === 1) {
                localStorage.setItem(`${user.username}-${id}-downvotes`, JSON.stringify(0))
                setIsDownVoted(false)
            } else {
                localStorage.setItem(`${user.username}-${id}-upvotes`, JSON.stringify(1))
                setIsUpVoted(true)
            }


        }
    }

    function activateDownVote(event) {
        event.stopPropagation()


        let upvoted = JSON.parse(localStorage.getItem(`${user.username}-${id}-upvotes`))
        let downvoted = JSON.parse(localStorage.getItem(`${user.username}-${id}-downvotes`))



        if ((downvoted && downvoted === 0) || !downvoted) {



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
            if (upvoted && upvoted === 1) {
                localStorage.setItem(`${user.username}-${id}-upvotes`, JSON.stringify(0))
                setIsUpVoted(false)
            } else {
                localStorage.setItem(`${user.username}-${id}-downvotes`, JSON.stringify(1))
                setIsDownVoted(true)
            }
        }

    }

    return (<>
        {!voteError &&
            <section className='review-votes'>
                <p>{votesNumber} votes</p>
                <button className="vote-button" style={(isUpVoted) ? {color: "green"} : {color: "white"}} onClick={activateUpVote}><p className="vote-innertext">+</p> </button>
                <button className="vote-button" style={(isDownVoted) ? {color: "red"} : {color: "white"}} onClick={activateDownVote}><p className="vote-innertext">-</p></button>
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