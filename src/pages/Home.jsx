import SearchBar from "../components/SearchBar"
import Suggestions from "../components/Suggestions";
import Chats from "../components/Chats";
import HomeTags from "../components/HomeTags";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BgHeaderDesktop from "../assets/suggestions/desktop/background-header.png";
import BgHeaderTablet from "../assets/suggestions/tablet/background-header.png";
import BgHeaderMobile from "../assets/suggestions/mobile/background-header.png";
import "../style/home.scss"
import UserContext from "../contexts/UserContext";

const Home = () => {
    const {data, isLoading, error} = useFetch("http://localhost:5200/productRequests");
    const { isLoggedIn, userInfo } = useContext(UserContext);
    const [homeData, setHomeData] = useState(null);
    const [selectedSortType, setSelectedSortType] = useState("Most Upvotes");
    const [category, setCategory] = useState("All");
    console.log(homeData)

    useEffect(() => {
        if(data)
            setHomeData(data);
    }, [data])
    console.log(userInfo);
    return (
        <>
            {
                homeData &&
                    <div className="home">
                        <div className="home-header">
                            <picture>
                                <source media="(min-width: 961px)" srcSet={BgHeaderDesktop} />
                                <source media="(min-width: 481px)" srcSet={BgHeaderTablet} />
                                <img src={BgHeaderMobile} alt="header_img" loading="lazy" />
                            </picture>
                            <div className="home-img-ad">
                                <div>MentorMe</div>
                                <div>Chat Board</div>
                            </div>
                            <HomeTags category={category} setCategory={setCategory} />
                        </div>
                        <div className="home-main">
                            <SearchBar />
                            <Suggestions homeData={homeData} setData={setHomeData} selectedSortType={selectedSortType} setSelectedSortType={setSelectedSortType} />
                            <Chats data={homeData} sortComparator={selectedSortType} selectedCategory={category === 'All' ? '' : category} />
                        </div>
                    </div>

            }
            {!isLoggedIn && <Link to="/login" className="login-link"><button>Log in</button></Link>}
        </>
    )
} 

export default Home;