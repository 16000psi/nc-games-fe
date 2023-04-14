import { useEffect, useState } from "react";
import { getAllCategories } from "../api";
import {Link} from "react-router-dom"

const Categories = () => {

    const [categoriesData, setCategoriesData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getAllCategories().then(({ data }) => {
            const { categories } = data
            categories.forEach((category) => {  // capitalise first letter of slug
                let arr = category.slug.split('')
                arr[0] = arr[0].toUpperCase()
                category.slug = arr.join('')
            })
            setCategoriesData(categories)
            setIsLoading(false)
        })
    }, []
    )


    return (<section className="categories-display">
        {!isLoading &&
            categoriesData.map((category) => {
                return (
                    <div className="category-card" key={category.slug} >
                        <h2>{category.slug}</h2>
                        <p>{category.description}</p>
                        <Link  to={`/reviews/category/${category.slug.toLowerCase()}`} className="category-link">
                            <button className="view-category-button" >View {category.slug} reviews.</button>
                        </Link>
                    </div>
                )
            })
        }
        {isLoading &&
                   <div className="review-card loading-card">
                   <h2 className="loading-message">Loading...</h2>
                   </div>

        }
    </section>

    )
}

export default Categories;