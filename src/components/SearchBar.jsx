import { useState } from "react"
import '../style/searchbar.scss'
import SearchLogo from "../assets/icon-search.svg";

const SearchBar = () => {
    const [search, setSearch] = useState();

    const handleSubmit = () => {
        e.preventDefault();

        
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <img src={SearchLogo} alt="search" />
            <input type="text" placeholder="Search for Questions" id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button type="submit" id="button">Search</button>
        </form>
    )
}

export default SearchBar;