import { useState } from "react";
import './restaurantItem.css'
import Map from "./map";

const RestaurantItem=({restaurant})=>{
    const {name,location, image, description }=restaurant
    const [showMap, setShowMap]=useState(false)
    const clickHandler=()=>{
        setShowMap(true)
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
            <Map setShowMap={setShowMap} location={location}/>}
            <button id="map" onClick={clickHandler}>View on Maps</button>
        </div>
    )
}
export default RestaurantItem