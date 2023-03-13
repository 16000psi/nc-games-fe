import axios from "axios"

const api = axios.create({
    baseURL: "https://nc-games-dave.onrender.com/api",
});

export const getAllReviews = () => {
    return api.get("/reviews")

}