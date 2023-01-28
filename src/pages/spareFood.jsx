import './spareFood.css'
const DUMMY_FOOD=[]
const SpareFood=()=> {
   if(DUMMY_FOOD.length==0){
    return (
        <h1>There is no spare food, please wait....</h1>
       <div className="restaurant-container">
        <div id='title'> 
            <h1>Spare Meals </h1> 
            <h5> Combat Food Waste</h5>
            <p id="slogan"> One Bite at a Time</p>
        </div>
 
        <div id='content'>
            <p> Looks like there's currently no one offering SpareMeals :(</p>
        </div>  
    )
   }
}
  
export default SpareFood;
