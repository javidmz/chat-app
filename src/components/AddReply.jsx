import UserContext from "../contexts/UserContext";
import "../style/AddReply.scss"
import { useState, useRef, useContext } from "react";

const AddReply = ({ setIsVisible, replyingTo, comment, repliedComment, location, data, setData }) => {
    const { userInfo } = useContext(UserContext);
    const [characterLeft, setCharacterLeft] = useState(250);
    const [response, setResponse] = useState();
    const textareaRef = useRef();


    const handleSubmitReply = async (e) => {
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

        const userReply = {
            "content": response, 
            replyingTo,
            "user": {
                "name": userInfo.name + " " + userInfo.surname,
                "username": userInfo.username
            }
        }
        // console.log(comment);
        console.log(data)
        console.log(comment);
        console.log(repliedComment);
        // [...repliedComment.replies, userReply]

        // let contentIndex = repliedComment ? repliedComment.replies.findIndex(reply => reply.content === comment.content) : 0;
        // let replies = repliedComment ? [...repliedComment.replies.slice(0, contentIndex + 1), userReply, ...repliedComment.replies.slice(contentIndex + 1)] : [userReply];
        // console.log(replies);
        // const newComment = {...repliedComment, replies};
        // console.log(newComment);
        // const comments = data.comments.map(comment => comment.id === newComment.id ? newComment : comment);
        // const newData = {...data, comments};
        // console.log(newData);

        let contentIndex, replies, newComment, comments;
        if(repliedComment && repliedComment.replies) {
            contentIndex = repliedComment.replies.findIndex(reply => reply.content === comment.content);
            replies = contentIndex !== -1 ? [...repliedComment.replies.slice(0, contentIndex + 1), userReply, ...repliedComment.replies.slice(contentIndex + 1)] : [userReply, ...repliedComment.replies];
        // if(repliedComment)
        //     newReplies = [...repliedComment.replies, userReply];
        console.log(replies);
         newComment = {...repliedComment, replies};
        console.log(newComment);
        comments = data.comments.map(comment => comment.id === newComment.id ? newComment : comment);
        }
        else {
            replies = [userReply];
            newComment = {...comment, replies};
            comments = data.comments.map(com => com.id == comment.id ? newComment : com);
        }

        const newData = {...data, comments};
        console.log(newData);

        await fetch(`http://localhost:5200/productRequests/${location}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData)
        });

        setIsVisible(false);
        setData(newData);
    }

    // useEffect(() => {
    //     textareaRef.current.setSelectionRange(replyingTo.length + 2, replyingTo.length + 2);
    // }, [])
console.log(response);

    return(
        <div className="add-reply-container">
            <textarea autoFocus cols="30" rows="10" maxLength={250} ref={textareaRef} value={response} onChange={(e) => { setCharacterLeft(250 - e.target.value.length); setResponse(e.target.value) }} />
            <div className="add-reply-footer">
                <div>{characterLeft} character left</div>
                <button onClick={handleSubmitReply}>Post Reply</button>
            </div>

        </div>
    )
}

export default AddReply;