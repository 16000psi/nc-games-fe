import axios from "axios"

const api = axios.create({
    baseURL: "https://nc-games-dave.onrender.com/api",
});


export const getCommentsByReview = (review_id) => {
    return api.get(`/reviews/${review_id}/comments`)

}

export const getAllReviews = () => {
    return api.get("/reviews")

}

export const getSingleReview = (review_id) => {
    return api.get(`/reviews/${review_id}`)
}