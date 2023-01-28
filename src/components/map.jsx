import { useRef,useEffect } from "react"
import ReactDom from 'react-dom'
import './map.css'
const Map=({setShowMap, location})=>{
    const mapRef=useRef()

    useEffect(()=>{
        const map= new window.google.maps.Map(mapRef.current,{
            center:location,
            zoom:18,
        })
        new window.google.maps.Marker({position:location,map:map})
    })

    const closeMapHandler=()=>{
        setShowMap(false)
    }
    const content=(
        <div className="map">
            <button onClick={closeMapHandler}>X</button>
            <div ref={mapRef}></div>
        </div>
    )
    return ReactDom.createPortal(content,document.getElementById('modal-hook'))
}
export default Map