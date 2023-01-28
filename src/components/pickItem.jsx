import { useState } from "react"
import './pickItem.css'
const PickItem=({pick})=>{
    console.log(pick)
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
        <div>
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
                <button onClick={likeHandler}>{numberOfLike}</button>
                <button onClick={dislikeHandler}>{numberOfDislike}</button>
            </div>
        </div>
    )
}
export default PickItem