import Comment from "./Comment";
import "../style/Comments.scss"

const Comments = ({ data, setData, location, totalComments }) => {
    return(
        <div className="comments-container">
            <div className="comments-container-header">{`${totalComments} ${totalComments === 1 ? "Comment" : "Comments"}`}</div>
            {data.comments.map((comment, index) => <Comment key={index} data={data} setData={setData} location={location} comment={comment} index={index} />)}
        </div>
    )
}

export default Comments;