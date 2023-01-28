import { useMemo } from "react"
import './map.css'
import { GoogleMap , useLoadScript, MarkerF} from "@react-google-maps/api"

const Map=({setShowMap, location})=>{
    const {isLoaded}= useLoadScript({
        googleMapsApiKey:process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    })
    const center= useMemo(()=>(location),[])
    const clickHandler=()=>{
        setShowMap(false)
    }
    if(!isLoaded){
        return (
            <div>Loading ...</div>
        )
    }
    return (
        <div>
            <button onClick={clickHandler}>X</button>
            <GoogleMap zoom={18} center={center} mapContainerClassName='map'>
                <MarkerF position={center}/>
            </GoogleMap>
        </div>
        
    )
}
export default Map