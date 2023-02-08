import useHttpClient from "../hooks/http-hook"
import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import {Grid, CircularProgress} from "@mui/material";
import MyItem from "../components/myItem";
import CreateOrUpdateMeal from "../components/createOrUpdateMeal";


const MyMealsPage=()=>{
    //load the whole page part 
    const [loadedMeal, setLoadedMeal]=useState()
    const {isLoading, error,sendRequest}=useHttpClient()
    const [forceRender, setForceRender] = useState(0);
    const [updatedMealId, setUpdatedMealId]=useState()
    const userId= useParams().userId
    useEffect(()=>{
        const fetchMeals=async()=>{
            try {
                const responseData=await sendRequest(`http://localhost:7000/api/meals/user/${userId}`)
                setLoadedMeal(responseData.meals)
            } catch (err) {}
        }
        fetchMeals()
    },[sendRequest,userId, forceRender])

    // update or delete the meal part
    const [showForm, setShowForm] = useState(false);
    const [form, setForm]=useState({})
    const mealId= useParams().mealId
    //when click the update button
    const updateHandler=async(e)=>{
        setShowForm(true);
        setUpdatedMealId(e.currentTarget.id)
        try {
            const responseData=await sendRequest(`http://localhost:7000/api/meals/${e.currentTarget.id}`)
            setForm(responseData.meal)
        } catch (err) {}
    }

    const submitHanlder =async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = data.get('name');
        const description = data.get('description');
        try {
          const responseData= await sendRequest(`http://localhost:7000/api/meals/${updatedMealId}`,"PATCH",JSON.stringify({
            name,
            description
          }), {"Content-Type":"application/json"})
          setForceRender(prev => prev + 1)
        } catch (err) {
        }
        setShowForm(false);
    };

    //when delete one item then rerender the page
    const deleteHandler=async(e)=>{
        try {
            await sendRequest(`http://localhost:7000/api/meals/${e.currentTarget.id}`,'DELETE')
            setForceRender(prev => prev + 1)
        } catch (err) {}
    }

    return (
        <Grid 
            container 
            sx={{
            display: 'flex',
            justifyContent: "space-around"
            }}
        >
            {isLoading && (
                <CircularProgress 
                    size={200}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            )}

            <CreateOrUpdateMeal submitHanlder={submitHanlder} showForm={showForm} form={form} isLoading={isLoading}/>

            {
                !isLoading && loadedMeal && (loadedMeal.map((pick) => (
                    <Grid 
                        xs={12} sm={6} 
                        key={pick.id}
                        sx={{
                        display:'flex',
                        justifyContent:'center'
                        }}
                    >
                        <MyItem pick={pick} updateHandler={updateHandler} deleteHandler={deleteHandler} />
                    </Grid>
                )))
            }
            
        </Grid>
    )
}
export default MyMealsPage