import './findRestaurants.css'
import RestaurantItem from "../components/restaurantItem";
const DUMMY_RESTAURANTS=[
    {
        id:'r1',
        image:"https://lh5.googleusercontent.com/p/AF1QipOYz7v5IXjOQ0KjI2oPqLOt2M211HKCjnC_LG6V=w408-h271-k-no",
        name:"z-teca Mexican Eatery ",
        description: "describe ......",
        location:"https://maps.google.com/maps?q=z-teca%20Mexican%20Eatery%20york%20univeristy&t=&z=17&ie=UTF8&iwloc=&output=embed"
    },
    {
        id:'r2',
        image:"https://lh5.googleusercontent.com/p/AF1QipNP4RbkFHqN8amfeuqbCZznSzW7UXa10nuUN04T=w427-h240-k-no",
        name:"Wendy's",
        description: "describe ......",
        location:"https://maps.google.com/maps?q=Wendy%20%20york%20univeristy&t=&z=17&ie=UTF8&iwloc=&output=embed"
    },
    {
        id:'r3',
        image:"https://lh5.googleusercontent.com/p/AF1QipNFPcZDUdAdxR1oay2Zg8wQCgFC6aMCWnx3USUf=w408-h306-k-no",
        name:"Pagoda Tree",
        description: "describe ......",
        location:"https://maps.google.com/maps?q=Pagoda%20Tree%20%20york%20univeristy&t=&z=17&ie=UTF8&iwloc=&output=embed"
    },
]

const FindRestaurants=()=> {
   return (
    <div className="restaurant-container">
        <div id='title'> 
            <h1>Find </h1> 
            <h1>A </h1> 
            <h1>Restaurant </h1> 
        </div>
 
        <div id='content'>
            {
           DUMMY_RESTAURANTS.map((restaurant)=>(
            <RestaurantItem key={restaurant.id} restaurant={restaurant}/>
           )) 
            }
        </div>
        
    </div>
   )
} 
export default FindRestaurants;