import { IoMdInformationCircleOutline } from "react-icons/io";
import "../style/CreateChat.scss";
import { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import DropDownMenu from "./DropDownMenu";
import toast from "react-hot-toast";
import UserContext from "../contexts/UserContext";

const CreateChat = ({ homeData, setData, setNewChat }) => {
    const createChatRef = useRef();
    const [title, setTitle] = useState('');
    const [titleErr, setTitleErr] = useState(false);
    const [description, setDescription] = useState('');
    const [descriptionErr, setDescriptionErr] = useState(false);
    const [category, setCategory] = useState("Feature");
    const { userInfo } = useContext(UserContext);
    const {data, isLoading, error} = useFetch("http://localhost:5200/categories");

    const handleChatCreate = async() => {
        const newChat = {
            // "admin": userInfo.username,
            title, 
            "tags": category, 
            // "upvotes": 0,
            description, 
            // "comments": [], 
            // "user": {
            //     "name": userInfo.name + " " + userInfo.surname,
            //     "username": userInfo.username
            // }
        }
        await fetch('http://localhost:8082/api/v1/questions/add', {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newChat)
        })
        // setData([...homeData, newChat]);
        // toast.success('New Chat created');
        // setTimeout(() => setNewChat(false), 1000);
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(!createChatRef.current.contains(e.target))
                setNewChat(false);
        }

        window.addEventListener("mousedown", handleClickOutside);

        return () => window.removeEventListener("mousedown", handleClickOutside);

    }, []);

    return(
        <>
            {data &&
                <div className="edit-chat-container" ref={createChatRef}>
                    <div className="edit-chat-header">Create New Chat</div>
                    <div className="edit-content">
                        <div className="edit-content-title">
                            <div>Chat Title</div>
                            <div>Add a short, descriptive headline</div>
                            <input type="text" value={title} onBlur={() => setTitleErr(true)} onFocus={() => setTitleErr(false)} onChange={(e) => setTitle(e.target.value)} />
                            {titleErr && title.length < 5 && <div className="error-message"><IoMdInformationCircleOutline /> Title should contain at least 5 characters </div>}
                            {titleErr && title.length > 100 && <div className="error-message"><IoMdInformationCircleOutline /> Title should contain less than 100 characters </div>}
                        </div>
                        <div className="edit-content-category">
                            <div>Category</div>
                            <div>Choose a category for your chat</div>
                            <DropDownMenu typesArr={data} selectedType={category} setSelectedType={setCategory} />                                
                        </div>
                        <div className="edit-content-detail">
                            <div>Chat Detail</div>
                            <div>Include any specific comments on your chat</div>
                            <textarea value={description} onBlur={() => setDescriptionErr(true)} onFocus={() => setDescriptionErr(false)} onChange={(e) => setDescription(e.target.value)} />
                            {descriptionErr && description.length < 10 && <div className="error-message"><IoMdInformationCircleOutline /> Description should contain at least 10 characters </div>}
                            {descriptionErr && description.length > 250 && <div className="error-message"><IoMdInformationCircleOutline /> Description should contain less than 250 characters </div>}
                        </div>
                    </div>
                    <div className="edit-chat-footer">
                        <button onClick={() => setNewChat(false)}>Cancel</button>
                        <button onClick={handleChatCreate}>Create Chat</button>
                    </div>
                </div>            
            }
        </>
)
}

export default CreateChat;