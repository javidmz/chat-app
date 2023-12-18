import { FaTrashAlt } from "react-icons/fa";
import "../style/DeleteVerification.scss"
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const DeleteVerification = ({ id, deleteVerCont, setIsDelete }) => {
    const navigate = useNavigate();

    const handleChatDelete = async() => {
        await fetch(`http://localhost:5200/productRequests/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        toast.success('Chat is deleted!')
        setTimeout(() => {
            navigate('/');
        }, 1500);
    }

    useEffect(() => {

        const handleClickOutside = (e) => {
            if(deleteVerCont.current && !deleteVerCont.current.contains(e.target))
                setIsDelete(false);
        }

        window.addEventListener("mousedown", handleClickOutside);

        return () => window.removeEventListener("mousedown", handleClickOutside);
    }, [])


    return(
        <div ref={deleteVerCont} className="delete-ver-container">
            <div className="trash-can"><FaTrashAlt /></div>
            <div className="delete-ver-header">Are you sure?</div>
            <div>This chat will be deleted permanently and nobody will be able to view it again.</div>
            <div className="delete-ver-footer">
                <button onClick={() => setIsDelete(false)}>Cancel</button>
                <button onClick={handleChatDelete}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteVerification;