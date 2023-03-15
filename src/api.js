import axios from "axios"

const api = axios.create({
    baseURL: "https://nc-games-dave.onrender.com/api",
});


export const getCommentsByReview = (review_id) => {
    return api.get(`/reviews/${review_id}/comments`)

}

export const getAllReviews = (category_slug) => {
    return api.get("/reviews", {
        params: {
            category: category_slug
        }
    })

}



export const incrementVotes = (parent_id, increment) => {

    return api.patch(`/reviews/${parent_id}`, {
        inc_votes: increment,
})

}


export const getSingleReview = (review_id) => {
    return api.get(`/reviews/${review_id}`)

}


export const getAllCategories = () => {
    return api.get('/categories')
}