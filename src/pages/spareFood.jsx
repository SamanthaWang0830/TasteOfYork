const DUMMY_FOOD=[]
const SpareFood=()=> {
   if(DUMMY_FOOD.length==0){
    return (
        <h1>There is no spare food, please wait....</h1>
    )
   }
}
  
export default SpareFood;