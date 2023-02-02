import { Box, Grid, Typography  } from "@mui/material";
import { useState } from "react";
import PickItem from "../components/pickItem";
import {AiFillFolderAdd} from 'react-icons/ai';

const DUMMY_PICKS = [
  {
    id: "p1",
    name: "Wendy's Cheeseburger",
    description: "the best burger in the world",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn3OWGFMaMFqNrGVS9uWuMcArGBApGOESM6g&usqp=CAU",
    like: 100,
    dislike: 99,
  },
  {
    id: "p2",
    name: "Tortilla Soup in z-teca Mexican Eatery",
    description: "the best soup in the world",
    image:
      "https://images.sirved.com/ChIJAb34zTouK4gR_ulVKGVTgOU/5aaa847a36820.jpg",
    like: 10,
    dislike: 1,
  },
  {
    id: "p3",
    name: "Sandwich in Aroma Espresso Bar",
    description: "the best Sandwich in the world",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5TzOBxCllODUX5xk_WVuXasbXkTEvCvOdeg&usqp=CAU",
    like: 21,
    dislike: 0,
  },
  {
    id: "p4",
    name: "Donut from Tim Hortons",
    description: "the best donut in the world",
    image:
      "https://canadify.com/wp-content/uploads/2021/06/Tim-Hortons-Offers-Free-Donut-With-Any-Beverage-Purchase-In-The-App-On-June-4-2021-678x381.jpg",
    like: 10,
    dislike: 0,
  },
];
const StudentsPicks = () => {
  const [form, setForm] = useState(false);
  const openFormHandler = () => {
    setForm(true);
  };
  const sumbitHanlder = (e) => {
    e.preventDefault();
    setForm(false);
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
        
        <Grid item xs={12} sm={2}><AiFillFolderAdd size={40} onClick={openFormHandler}/></Grid>
      </Grid>
      
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
