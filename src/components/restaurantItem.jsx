import { useState } from "react";
import './restaurantItem.css'
import Map from "./map";

const RestaurantItem=({restaurant})=>{
    const {name,location, image, description }=restaurant
    const [showMap, setShowMap]=useState(false)
    const clickHandler=()=>{
        setShowMap(true)
    }
    const clickToCloseHandler=()=>{
        setShowMap(false)
    }
    return (
        <div id="item">
            <div>
                <img className="image" src={image} alt={name} />
            </div>
            <div>
                <span className="name">{name}</span>
            </div>
            <div>
                <span className="description">{description}</span>
            </div>
            {showMap && 
            <div className="map-container">
                <button onClick={clickToCloseHandler} className='button'>X</button>
                <iframe width="689" height="500" id="gmap_canvas" src={location} frameborder="0" marginheight="0" marginwidth="0"></iframe>
            </div>}
            {!showMap && <button onClick={clickHandler}>View on Google Map</button>}
        </div>
    )
}
export default RestaurantItem