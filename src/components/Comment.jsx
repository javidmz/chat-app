import { useState, useEffect, useRef, useContext } from "react";
import AddReply from "./AddReply";
import EditResponse from "./EditResponse";
import "../style/Comment.scss"
import UserContext from "../contexts/UserContext";

const Comment = ({ data, setData, comment, location, index, repliedComment=null, reply = false }) => {
    const { userInfo, isLoggedIn } = useContext(UserContext);
    const [isVisible, setIsVisible] = useState(false);
    const [editIsVisible, setEditIsVisible] = useState(false);
    const replyRef = useRef();

    useEffect(() => {

        if(isVisible || editIsVisible) {
            window.addEventListener('click', (event) => {
                console.log(event.target.tagName.toLowerCase());
                console.log(isVisible);
                if(event.target.tagName.toLowerCase() != 'textarea' && (isVisible || editIsVisible) && replyRef.current && !replyRef.current.contains(event.target)) {
                    console.log('he;;p');
                    setIsVisible(false);
                    setEditIsVisible(false)
                }
            });
    
            return () => window.removeEventListener('click', (event) => {
                console.log(event.target.tagName);
                if(event.target.tagName.toLowerCase() != 'textarea' && (isVisible || editIsVisible) && replyRef.current && !replyRef.current.contains(event.target)) {
                    console.log('he;;p');
                    setIsVisible(false);
                    setEditIsVisible(false);
                }
            })
        }

    }, [isVisible, editIsVisible]);

    return(
        <>
            {!reply && index !== 0 ? <div className="comment-border"></div> : ''}  
                    <div className={`comment-container ${reply ? "reply" : ''} ${comment.replies ? 'replied' : ''}`}>
                        <img src={comment.user.image} alt="user_image" />
                        <div className="comment">
                            <div className="comment-header">
                                <div className="commenter">
                                    <div>{comment.user.name}</div>
                                    <div>@{comment.user.username}</div>
                                </div>
                                {isLoggedIn && <div className={`${comment.user.username === userInfo.username ? 'comment-edit' : 'comment-reply'}`} ref={replyRef} onClick={() => replyRef.current.className === 'comment-reply' ? setIsVisible(true) : setEditIsVisible(true)}>{comment.user.username === userInfo.username ? 'Edit' : 'Reply'}</div>}
                            </div>
                            {
                                !editIsVisible ?
                                        <>
                                            <div className="comment-content">{reply ? <><span className="comment-replying-to">{"@" + comment.replyingTo}</span> {comment.content}</> : comment.content}</div>
                                            {isVisible && <AddReply setIsVisible={setIsVisible} replyingTo={comment.user.username} comment={comment} repliedComment={repliedComment ? repliedComment : comment} location={location} data={data} setData={setData} />}
                                        </>                                
                                :
                                    <EditResponse setEditIsVisible={setEditIsVisible} replyingTo={comment.replyingTo} comment={comment} repliedComment={repliedComment} location={location} data={data} setData={setData} />
                            }
                        </div>
                    </div>
                
            {comment.replies && (
                    <div className="comment-with-reply">
                        {comment.replies.map(reply => <Comment key={reply.content} comment={reply} location={location} repliedComment={comment} data={data} setData={setData} index={index} reply={true} />)}
                    </div>
                ) 
            }
      
        </>
    )
}

export default Comment;