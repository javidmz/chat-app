import { useState } from "react";
import useFetch from "../hooks/useFetch";
import "../style/HomeTags.scss"

const HomeTags = ({ category, setCategory }) => {
    const {data, isLoading, error} = useFetch("http://localhost:5200/categories");
    console.log(category)
    return(
        <div className="home-tags">
            {   data &&
                    data.map(tag => <div key={tag} className={`home-tag ${tag === category ? 'selected' : ''}`} onClick={() => setCategory(tag)}>{tag}</div>)
            }
        </div>
    )
}

export default HomeTags;