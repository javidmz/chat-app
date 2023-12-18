import { MdKeyboardArrowLeft } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Comments from "../components/Comments";
import Chat from "../components/Chat";
import AddComment from "../components/AddComment";
import useFetch from "../hooks/useFetch";
import EditChat from "../components/EditChat";
import "../style/ChatDetailed.scss"
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

const ChatDetailed = () => {
    const { isLoggedIn, userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const [editChat, setEditChat] = useState(false);
    const location = useLocation().pathname.split("/")[2];
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const calculateTotalComments = (comments) => {
        let len = 0;
  
        comments.forEach(comment => {
            len += 1;
            if(comment.replies)
                len += comment.replies.length;
        });
  
        return len;
    }
    
    useEffect(() => {  
        const fetchData = async (url) => {
          setIsLoading(true);
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error("Please try again!");
            }
            const result = await response.json();
            setData(result);
          } catch (err) {
            setError(err);
          } finally {
            setIsLoading(false);
          }
        };

        fetchData(`http://localhost:5200/productRequests/${location}`);
    }, []);

    useEffect(() => {
      document.body.style.overflowY = editChat ? 'hidden' : 'scroll'
    }, [editChat])
    console.log(isLoggedIn);
    return(
        <div className="chat-detailed-container">
            {
                data &&
                    <>
                        <div className="chat-detailed-header">
                            <div onClick={() => navigate(-1)}><MdKeyboardArrowLeft /> Go Back</div>
                            {isLoggedIn && userInfo === data.admin && <button className="edit-chat" onClick={() => setEditChat(true)}>Edit Chat</button>}
                        </div>
                        <Chat feedbackData={data} totalComments={calculateTotalComments(data.comments)} />
                        <Comments data={data} setData={setData} location={location} totalComments={calculateTotalComments(data.comments)} />
                        {isLoggedIn && <AddComment data={data} setData={setData} location={location} />}
                        {isLoggedIn && editChat && <EditChat setEditChat={setEditChat} productData={data} setProductData={setData} />}
                    </>
            }
        </div>
    )
}

export default ChatDetailed;