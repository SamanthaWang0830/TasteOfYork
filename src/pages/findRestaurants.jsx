import './findRestaurants.css'
import RestaurantItem from "../components/restaurantItem";
const DUMMY_RESTAURANTS=[
    {
        id:'r1',
        image:"https://lh5.googleusercontent.com/p/AF1QipOYz7v5IXjOQ0KjI2oPqLOt2M211HKCjnC_LG6V=w408-h271-k-no",
        name:"z-teca Mexican Eatery ",
        location:{
            lat:43.7743205,
            lng:-79.5035559
        }
    },
    {
        id:'r2',
        image:"https://lh5.googleusercontent.com/p/AF1QipNP4RbkFHqN8amfeuqbCZznSzW7UXa10nuUN04T=w427-h240-k-no",
        name:"Wendy's",
        location:{
            lat:43.7739099,
            lng:-79.5035916
        }
    },
    {
        id:'r3',
        image:"https://lh5.googleusercontent.com/p/AF1QipNFPcZDUdAdxR1oay2Zg8wQCgFC6aMCWnx3USUf=w408-h306-k-no",
        name:"Pagoda Tree",
        location:{
            lat:43.7739294,
            lng:-79.5025476
        }
    },
]

const FindRestaurants=()=> {
   return (
    <div className="restaurant-container">
        <h1>Find Restaurants On Campus</h1>
        {
           DUMMY_RESTAURANTS.map((restaurant)=>(
            <RestaurantItem key={restaurant.id} restaurant={restaurant}/>
           )) 
        }
    </div>
   )
} 
export default FindRestaurants;