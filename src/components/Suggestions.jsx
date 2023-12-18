import Suggestion from "../assets/suggestions/icon-suggestions.svg";
import DropDownMenu from "./DropDownMenu";
import CreateChat from "./CreateChat";
import "../style/suggestions.scss"
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

const Suggestions = ({ homeData, setData, selectedSortType, setSelectedSortType }) => {
    const { isLoggedIn } = useContext(UserContext);
    const [newChat, setNewChat] = useState(false);
    const sortTypeArr = [
        "Most Comments",
        "Least Comments",
        "Most Upvotes",
        "Least Upvotes"
    ];

    console.log(isLoggedIn);

    useEffect(() => {
        document.body.style.overflowY = newChat ? 'hidden' : 'scroll';
    }, [newChat]);

    return(
        <div className="suggestion-container">
            <div className="suggestion-info">
                <img src={Suggestion} alt="suggestion" />
                <div className="suggestion-sort-container">
                    <div>Sort by :</div>
                    <DropDownMenu typesArr={sortTypeArr} selectedType={selectedSortType} setSelectedType={setSelectedSortType} />
                </div>       
            </div>
                {isLoggedIn && <button className="suggestion-btn" onClick={() => setNewChat(true)}>+ Add New Chat</button>}
                {newChat && <CreateChat homeData={homeData} setData={setData} setNewChat={setNewChat} />}         
        </div>
    )
}
 
export default Suggestions;