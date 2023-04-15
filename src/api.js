import axios from "axios"

const api = axios.create({
    baseURL: "https://nc-games-dave.onrender.com/api",
});


export const getCommentsByReview = (review_id) => {
    return api.get(`/reviews/${review_id}/comments`)

}

export const getComments = () => {
    return api.get("/comments")
}

export const getAllReviews = (category_slug,sort_by, order) => {
    return api.get("/reviews", {
        params: {
            category: category_slug,
            sort_by,
            order
            
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

export const getAllUsers = () => {
    return api.get("/users")
  
}

export const addComment = (review_id, newComment) => {
    return api.post(`/reviews/${review_id}/comments`, newComment)
};

export const deleteComment = (comment_id) => {
    return api.delete(`/comments/${comment_id}`)
}

export const addReview = (owner, title, category, designer, review_img_url, review_body) => {
    return api.post(`/reviews`, {
        owner,
        title,
        category,
        designer,
        review_img_url,
        review_body
    })
}

export const addUser = (username, name, avatar_url) => {
    return api.post(`/users`, {
        username,
        name,
        avatar_url
    })
}

export const getReviewsByUser = (username) => {
    return api.get(`/reviews/user/${username}`, {
    })

}