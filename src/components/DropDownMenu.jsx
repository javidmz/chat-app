import { useEffect, useRef, useState } from "react"
import CheckIcon from "../assets/shared/icon-check.svg"
import { MdKeyboardArrowDown } from "react-icons/md";
import "../style/DropDownMenu.scss"

const DropDownMenu = ({ typesArr, selectedType, setSelectedType }) => {
    const [isVisible, setIsVisible] = useState(false);
    const dropMenuRef = useRef();

    useEffect(() => {

        const handleClickOutside = (e) => {
            console.log(dropMenuRef.current.contains(e.target) + " " + !isVisible);

            if(dropMenuRef.current && !dropMenuRef.current.contains(e.target) && !isVisible)
                setIsVisible(false);

        }

        window.addEventListener("mousedown", handleClickOutside);

        return () => window.removeEventListener("mousedown", handleClickOutside);
    }, [])

    return(
        <div className="dropmenu-container" ref={dropMenuRef}>
            <div className="dropmenu-btn" onClick={() => setIsVisible(!isVisible)}>
                <div>{selectedType}</div>
                <MdKeyboardArrowDown className="dropmenu-btn-arrow" style={isVisible && {transform: "rotate(180deg)"}} />
            </div>

            {
                    <ul className={isVisible ? "dropmenu-opt active" : "dropmenu-opt"}>
                        {
                            typesArr.map((arg, index) => (
                                <li key={arg} style={{transitionDelay: `${(typesArr.length - index + 1) * 0.1}s`}} className={selectedType === arg ? 'selected' : ''} onClick={() => { setSelectedType(arg); setIsVisible(false); }}>
                                    <span>{arg}</span>
                                    {selectedType === arg ? <img src={CheckIcon} alt="check" className="dropmenu-img" /> : ''}
                                </li>
                            ))
                        }
                    </ul>

            }
        </div>
    )
}

export default DropDownMenu;