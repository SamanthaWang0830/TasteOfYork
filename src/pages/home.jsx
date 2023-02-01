import { Link } from "react-router-dom";
import { Box, Typography } from '@mui/material'

const Home=()=> {
   return (
   <Box
      sx={{my: 8, mx: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}
   >
         <Box
            sx={{
               my: 4,
               width: '90%',
               backgroundColor: 'error.dark',
               '&:hover': {
                  backgroundColor: 'error.main',
                  opacity: [0.9, 0.8, 0.7],
               },
            }}
         >
            <Link to="/findRestaurants" style={{ textDecoration: "none", color: "black" }}>
            <Typography 
               component="h1" 
               variant="h1"
               sx={{
                  fontFamily:"Gill Sans",
                  fontWeight:550
               }}
            >Find Restaurants</Typography>
            <Typography 
               component="h1" 
               variant="h2"
               sx={{
                  fontFamily:"Gill Sans",
                  fontWeight:550
               }}
            >On Campus</Typography>
            </Link>
         </Box>
      
         <Box
            sx={{
               width: '90%',
               backgroundColor: 'error.dark',
               '&:hover': {
                  backgroundColor: 'error.main',
                  opacity: [0.9, 0.8, 0.7],
               },
            }}
         >
            <Link to="/studentsPicks" style={{ textDecoration: "none", color: "white" }}>
            <Typography 
               component="h1" 
               variant="h1"
               sx={{
                  fontFamily:"Trebuchet MS"
               }}
            >Get Suggestions From</Typography>
            <Typography 
               component="h1" 
               variant="h2"
               sx={{
                  fontFamily:"Trebuchet MS"
               }}
            >Student Picks</Typography>
            </Link>
         </Box>
   </Box>
   )
}
export default Home;