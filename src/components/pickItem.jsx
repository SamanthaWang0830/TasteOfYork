import { useState } from "react"
import { AiTwotoneLike } from 'react-icons/ai';
import { AiTwotoneDislike } from 'react-icons/ai';
import './pickItem.css'
const PickItem=({pick})=>{
    const {name,description, image,like,dislike}= pick
    const [numberOfLike,setNumberOfLike]=useState(like)
    const [numberOfDislike,setNumberOfDislike]=useState(dislike)
    const likeHandler=()=>{
        setNumberOfLike(pre=>pre+1)
    }
    const dislikeHandler=()=>{
        setNumberOfDislike(pre=>pre+1)
    }
    return (
        <div id="item">
            <div className="image">
                <img src={image} alt={name} />
            </div>
            <div>
                <span>{name}</span>
            </div>
            <div>
                <span>{description}</span>
            </div>
            <div>
                <button onClick={likeHandler}><AiTwotoneLike/>{numberOfLike}</button>
                <button onClick={dislikeHandler}><AiTwotoneDislike/>{numberOfDislike}</button>
            </div>
        </div>
    )
}
export default PickItem