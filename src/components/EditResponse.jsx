import { useState, useRef, useEffect, useContext } from "react";
import "../style/EditResponse.scss";
import UserContext from "../contexts/UserContext";

const EditResponse = ({setEditIsVisible, replyingTo, comment, repliedComment, location, data, setData }) => {
    const { userInfo } = useContext(UserContext);
    const [characterLeft, setCharacterLeft] = useState(250 - comment.content.length);
    const [response, setResponse] = useState(comment.content);
    const textareaRef = useRef();


    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        if(response.length == 0)
        return;

        // const userResponse = {
        //     "content": response,
        //     "user": {
        //         "image": "/user-images/image-zena.jpg",
        //         "name": "Zena Kelley",
        //         "username": "velvetround"                        
        //     }
        // }
        // const newComments = [userResponse, ...data.comments];
        // const newData = {...data, comments: newComments};

        const userReply = repliedComment ? {
            "content": response, 
            replyingTo,
            "user": {
                "name": userInfo.name + " " + userInfo.surname,
                "username": userInfo.username
            }} : {
            "content": response, 
            "user": {
                "name": userInfo.name + " " + userInfo.surname,
                "username": userInfo.username
            }
        };
        // console.log(comment);
        console.log(data)
        console.log(repliedComment);
        // [...repliedComment.replies, userReply]
        let contentIndex, replies, newComment, comments;
        if(repliedComment) {
            contentIndex = repliedComment.replies.findIndex(reply => reply.content === comment.content);
            replies = [...repliedComment.replies.slice(0, contentIndex), userReply, ...repliedComment.replies.slice(contentIndex + 1)];
        // if(repliedComment)
        //     newReplies = [...repliedComment.replies, userReply];
        console.log(replies);
         newComment = {...repliedComment, replies};
        console.log(newComment);
        comments = data.comments.map(comment => comment.id === newComment.id ? newComment : comment);
        }
        else {
            comments = data.comments.map(com => com.id == comment.id ? userReply : com);
        }
        console.log(comment);
        const newData = {...data, comments};
        console.log(newData);

        await fetch(`http://localhost:5200/productRequests/${location}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData)
        });

        setEditIsVisible(false);
        setData(newData);
    }

console.log(response);

    // useEffect(() => {

    // }, []);

    return(
        <div className="add-edit-container">
            <textarea autoFocus cols="30" rows="10" maxLength={250} ref={textareaRef} value={response} onChange={(e) => { setCharacterLeft(250 - e.target.value.length); setResponse(e.target.value) }} />
            <div className="add-edit-footer">
                <div>{characterLeft} character left</div>
                <button onClick={handleSubmitEdit}>Post Edit</button>
            </div>

        </div>
    )
}

export default EditResponse;