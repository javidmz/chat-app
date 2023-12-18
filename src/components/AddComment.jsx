import { useContext, useRef, useState } from "react";
import UserContext from "../contexts/UserContext";
import "../style/AddComment.scss"

const AddComment = ({ data, setData, location }) => {
    const { userInfo } = useContext(UserContext);
    const [characterLeft, setCharacterLeft] = useState(250);
    const [response, setResponse] = useState();
    const textareaRef = useRef();

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if(response.length == 0)
            return;
        const userResponse = {
            "content": response,
            "user": {
                "name": userInfo.name + " " + userInfo.surname,
                "username": userInfo.username
            }
        }
        const newComments = [userResponse, ...data.comments];
        const newData = {...data, comments: newComments};

        console.log(newData);

        await fetch(`http://localhost:5200/productRequests/${location}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData)
        });

        setData(newData);
        textareaRef.current.value = '';

    }

    return(
        <div className="add-comment">
            <div className="add-comment-header">Add Comment</div>
            <textarea className="add-comment-area" cols="30" rows="10" placeholder="Type your comment here" ref={textareaRef} onChange={(e) => { setCharacterLeft(250 - e.target.value.length); setResponse(e.target.value) }} />
            <div className="add-comment-footer">
                <div>{characterLeft} characters left</div>
                <button onClick={handleSubmitComment}>Post Comment</button>
            </div>
        </div>
    )
}

export default AddComment;