import { useEffect } from "react"
import Feedback from "./Chat"
import useFetch from "../hooks/useFetch";
import "../style/Feedbacks.scss"

const Chats = ({ data, sortComparator, selectedCategory }) => {

    const calculateTotalComments = (comments) => {
      let len = 0;

      comments.forEach(comment => {
          len += 1;
          if(comment.replies)
              len += comment.replies.length;
      });

      return len;
  }

  console.log(data);
  console.log(selectedCategory);

    const handleComparator = (obj1, obj2) => {
      let res;
      
      if(sortComparator == "Most Upvotes") {
        res = obj2.upvotes - obj1.upvotes;
      }
      if(sortComparator == "Least Upvotes") {
        res = obj1.upvotes - obj2.upvotes;
      }
      if(sortComparator == "Most Comments") {
        console.log(obj1);
        console.log(obj2);
        res = calculateTotalComments(obj2.comments) - calculateTotalComments(obj1.comments);
      }
      if(sortComparator == "Least Comments") {
        res = calculateTotalComments(obj1.comments) - calculateTotalComments(obj2.comments);
      }

      return res;
    }

    return(
        <div className="feedback-container">
          {
            data &&
                data.filter(obj => !selectedCategory || selectedCategory.toLowerCase() === obj.category.toLowerCase()).sort(handleComparator).slice(0, 10).map(request => <Feedback key={request.id} feedbackData={request} totalComments={calculateTotalComments(request.comments)} />)
          }
        </div>
    )
}

export default Chats;