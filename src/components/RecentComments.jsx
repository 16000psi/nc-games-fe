import { useState, useEffect } from "react"
import { IndividualComment} from "./index"
import { getComments } from "../api"
import { useNavigate } from "react-router-dom"



const RecentComments = () => {

    const [ commentsData, setCommentsData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {


      
      setIsLoading(true)
      getComments().then(({data}) => {
        const {comments} = data
        setCommentsData(comments);
        setIsLoading(false)
      }).catch((error) => {
        navigate("/error")
      
      console.log(error)});
 
    }, [navigate]);

    return (<>

        {!isLoading &&
        <section className='comments-container'>


            
            {
                (commentsData.length > 0) ? 
                commentsData.map((comment) => {
                    return <IndividualComment key={comment.comment_id} commentObject={comment} />
                })
                :
                <h2>There are no comments.</h2>
            }
        </section>
        }
        {isLoading &&
               <div className="review-card loading-card">
               <h2 className="loading-message">Loading...</h2>
               </div>
        }
        </>)
}

export default RecentComments;