import { MdKeyboardArrowUp } from "react-icons/md";
import CommentIcon from "../assets/shared/icon-comments.svg";
import "../style/Feedback.scss";
import { Link } from "react-router-dom";

const Feedback = ({ feedbackData, totalComments }) => {
  return (
    <>
      {feedbackData && (
        <Link
          to={`/chat/${feedbackData.id}/${feedbackData.title
            .toLowerCase()
            .split(" ")
            .join("-")}`}
          className="feedback"
        >
          <div className="feedback-general">
            <div className="feedback-rank">
              <MdKeyboardArrowUp />
              <div>{feedbackData.upvotes}</div>
            </div>
            <div className="feedback-info">
              <div className="feedback-info-title">{feedbackData.title}</div>
              <div className="feedback-info-desc">
                {feedbackData.description}
              </div>
              <div className="feedback-category">{feedbackData.category.charAt(0).toUpperCase() + feedbackData.category.slice(1)}</div>
            </div>
          </div>
          <div className="feedback-comment">
            <img src={CommentIcon} alt="comment" />
            {feedbackData.comments ? (
              <div>{totalComments}</div>
            ) : (
              ""
            )}
          </div>
        </Link>
      )}
    </>
  );
};

export default Feedback;
