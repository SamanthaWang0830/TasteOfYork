import { Box, Grid, Typography, Button ,CircularProgress} from "@mui/material";
import { useState ,useContext} from "react";
import { UserContext } from "../contexts/user-context";
import PickItem from "../components/pickItem";
import {AiFillFolderAdd} from 'react-icons/ai';
import CreateOrUpdateMeal from "../components/createOrUpdateMeal";
import useHttpClient from '../hooks/http-hook'

const DUMMY_PICKS = [
  {
    id: "p1",
    name: "Wendy's Cheeseburger",
    description: "the best burger in the world",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn3OWGFMaMFqNrGVS9uWuMcArGBApGOESM6g&usqp=CAU",
    like: 100,
    dislike: 99,
    creator:'u1'
  },
  {
    id: "p2",
    name: "Tortilla Soup in z-teca Mexican Eatery",
    description: "the best soup in the world",
    image:
      "https://images.sirved.com/ChIJAb34zTouK4gR_ulVKGVTgOU/5aaa847a36820.jpg",
    like: 10,
    dislike: 1,
    creator:'u1'
  },
  {
    id: "p3",
    name: "Sandwich in Aroma Espresso Bar",
    description: "the best Sandwich in the world",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5TzOBxCllODUX5xk_WVuXasbXkTEvCvOdeg&usqp=CAU",
    like: 21,
    dislike: 0,
    creator:'u1'
  },
  {
    id: "p4",
    name: "Donut from Tim Hortons",
    description: "the best donut in the world",
    image:
      "https://canadify.com/wp-content/uploads/2021/06/Tim-Hortons-Offers-Free-Donut-With-Any-Beverage-Purchase-In-The-App-On-June-4-2021-678x381.jpg",
    like: 10,
    dislike: 0,
    creator:'u2'
  },
];
const StudentsPicks = () => {
  const {isLoading, loadingError,sendRequest}= useHttpClient()
  const {userId}=useContext(UserContext)
  console.log(userId)
  const [showForm, setShowForm] = useState(false);
  const openFormHandler = () => {
    setShowForm(true);
  };
  const submitHanlder =async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name');
    const description = data.get('description');
    try {
      const responseData= await sendRequest('http://localhost:7000/api/meals',"POST",JSON.stringify({
        name,
        description,
        creator:userId
      }), {"Content-Type":"application/json"})
    } catch (err) {
    }
    setShowForm(false);
  };

  return (
    <Box 
      sx={{ 
        flexGrow: 1,
        marginX:{xs:2,sm:4,md:6},
      }}
    >
      <Grid  
        sx={{
          display: 'flex',
          justifyContent: "space-between",
          backgroundColor:'error.dark',
          paddingX:6,
          paddingTop:1,
        }}
      >
        <Grid item xs={12} sm={10}>
          <Typography
            component="h1" 
            variant="h3"
            sx={{
              fontFamily:"Trebuchet MS"
            }}
          >Favorite Meals</Typography>
        </Grid>
        
        <Grid item xs={12} sm={2}>
          <Button onClick={openFormHandler}>
            <AiFillFolderAdd size={40}/>
          </Button>
        </Grid>
      </Grid>
     
      <CreateOrUpdateMeal submitHanlder={submitHanlder} showForm={showForm} isLoading={isLoading} form={{name:'', description:''}}/>
      

      <Grid 
        container 
        sx={{
          display: 'flex',
          justifyContent: "space-around"
        }}
      >
        {DUMMY_PICKS.map((pick) => (
          <Grid 
            xs={12} sm={6} 
            key={pick.id}
            sx={{
              display:'flex',
              justifyContent:'center'
            }}
          >
            <PickItem pick={pick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
};

export default StudentsPicks;
