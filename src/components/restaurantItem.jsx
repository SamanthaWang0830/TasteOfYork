import { useState } from "react";
import './restaurantItem.css'
import { Modal } from "@mui/material";

const RestaurantItem=({restaurant})=>{
    const {name,location, image, address, hours }=restaurant
    const [open, setOpen]=useState(false)
    const clickHandler=()=>{
        setOpen(true)
    }
    const clickToCloseHandler=()=>{
        setOpen(false)
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
                <span className="address">{address}</span>
            </div>
            <div>
                <span className="hours">{hours}</span>
            </div>
            {/* {showMap && 
            <div className="map-container">
                <button onClick={clickToCloseHandler} className='button'>X</button>
                <iframe width="689" height="500" id="gmap_canvas" src={location} frameborder="0" marginheight="0" marginwidth="0"></iframe>
            </div>}
            {!showMap && <button onClick={clickHandler}>View on Google Map</button>} */}
            <Modal
                open={open}
                onClose={clickToCloseHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="map-container">
                <button onClick={clickToCloseHandler} className='button'>X</button>
                <iframe width="689" height="500" id="gmap_canvas" src={location} frameborder="0" marginheight="0" marginwidth="0"></iframe>
                </div>
            </Modal>
            <button className="map" onClick={clickHandler}>View on Google Map</button>

            
        </div>
    )
}
export default RestaurantItem
