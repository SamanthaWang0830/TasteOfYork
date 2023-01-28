import './spareFood.jsx'
const SpareFood=()=> {
   return (
    <div className="restaurant-container">
        <div id='title'> 
            <h1>Spare Meals </h1> 
            <h5> Combat Food Waste</h5>
            <p id="slogan"> One Bite at a Time</p>
        </div>
 
        <div id='content'>
            {/* {
           DUMMY_RESTAURANTS.map((restaurant)=>(
            <RestaurantItem key={restaurant.id} restaurant={restaurant}/>
           )) 
            } */}
            <p> Looks like there's currently no one offering SpareMeals :(</p>
        </div>  
    </div>
   )
}

export default SpareFood
