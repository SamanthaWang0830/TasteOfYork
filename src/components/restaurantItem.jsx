import { useState } from "react";
import './restaurantItem.css'
import Map from "./map";

const RestaurantItem=({restaurant})=>{
    const {name,location, image}=restaurant
    const [showMap, setShowMap]=useState(false)
    const clickHandler=()=>{
        setShowMap(true)
    }
    return (
        <div>
            <div>
                <img src={image} alt={name} />
            </div>
            <div>
                <span className="name">{name}</span>
            </div>
            {showMap && 
            <Map setShowMap={setShowMap} location={location}/>}
            <button onClick={clickHandler}>View on Google Map</button>
        </div>
    )
}
export default RestaurantItem