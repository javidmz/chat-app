import { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { IoMdInformationCircleOutline } from "react-icons/io";
import DropDownMenu from "./DropDownMenu";
import DeleteVerification from "./DeleteVerification";
import "../style/EditChat.scss";
import toast from "react-hot-toast";

const EditChat = ({ setEditChat, productData, setProductData }) => {
    const [isDelete, setIsDelete] = useState(false);
    const [updateProductData, setUpdatedProductData] = useState(productData);
    const [title, setTitle] = useState(productData.title);
    const [description, setDescription] = useState(productData.description);
    const [category, setCategory] = useState(productData.category.slice(0, 1).toUpperCase() + productData.category.slice(1))
    const {data, isLoading, error} = useFetch("http://localhost:5200/categories");
    const editChatRef = useRef();
    const deleteVerCont = useRef();

    const handleChatUpdate = async() => {
        if(updateProductData.title !== title || updateProductData.description !== description || updateProductData.category.toLowerCase() !== category.toLowerCase()) {
            console.log(updateProductData.title + " " + updateProductData.description + " " + updateProductData.category)
            console.log(title + " " + description + " " + category)
            const newProductData = {...updateProductData};
            newProductData.title = title;
            newProductData.description = description;
            newProductData.category = category.slice(0, 1).toLowerCase() + category.slice(1);
            await fetch(`http://localhost:5200/productRequests/${productData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProductData)
            });
            
            setUpdatedProductData(newProductData)
            setProductData(newProductData);
            toast.success('Updates are saved'); 
        } else {
            toast.error('No Updates');
        }
    }

    useEffect(() => {


        const handleClickOutside = (e) => {
            console.log(editChatRef.current.contains(e.target));

            if(editChatRef.current && !editChatRef.current.contains(e.target) && !deleteVerCont.current)
                setEditChat(false);

        }

        window.addEventListener("mousedown", handleClickOutside);

        return () => window.removeEventListener("mousedown", handleClickOutside);
    }, [])


    // useEffect(() => {
    //     document.body.style.overflowY = isDelete ? 'hidden' : 'scroll'
    // }, [isDelete]);

    return(
        <>
            {
                data &&
                    <div className={!isDelete ? "edit-chat-container" : "edit-chat-container passive"} ref={editChatRef}>
                        {/* <img src=" alt="" /> */}
                        <div className="edit-chat-header">Editing '{productData.title}'</div>
                        <div className="edit-content">
                            <div className="edit-content-title">
                                <div>Chat Title</div>
                                <div>Add a short, descriptive headline</div>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={title.length < 5 || title.length > 100 ? 'error' : ''} />
                                {title.length < 5 && <div className="error-message"><IoMdInformationCircleOutline /> Title should contain at least 5 characters </div>}
                                {title.length > 100 && <div className="error-message"><IoMdInformationCircleOutline /> Title should contain less than 100 characters </div>}
                            </div>
                            <div className="edit-content-category">
                                <div>Category</div>
                                <div>Choose a category for your chat</div>
                                <DropDownMenu typesArr={data} selectedType={category} setSelectedType={setCategory} />                                
                            </div>
                            <div className="edit-content-detail">
                                <div>Chat Detail</div>
                                <div>Include any specific comments on your chat</div>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={description.length < 10 || description.length > 250 ? 'error' : ''} />
                                {description.length < 10 && <div className="error-message"><IoMdInformationCircleOutline /> Description should contain at least 10 characters </div>}
                                {description.length > 250 && <div className="error-message"><IoMdInformationCircleOutline /> Description should contain less than 250 characters </div>}
                            </div>
                        </div>
                        <div className="edit-chat-footer">
                            <button onClick={() => setIsDelete(true)}>Delete</button>
                            <div>
                                <button onClick={() => setEditChat(false)}>Cancel</button>
                                <button disabled={title.length < 5 || title.length > 100 || description.length < 10 || description.length > 250} onClick={handleChatUpdate}>Update Chat</button>
                            </div>
                        </div>
                    </div>
            } 
            {isDelete && <DeleteVerification id={productData.id} deleteVerCont={deleteVerCont} setIsDelete={setIsDelete} />}
        </>
    )
}

export default EditChat;