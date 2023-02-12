import RestaurantItem from "../components/restaurantItem";
import { Box, Grid, Typography  } from "@mui/material";
const DUMMY_RESTAURANTS=[
    {
        id:'r1',
        image:"https://lh5.googleusercontent.com/p/AF1QipOYz7v5IXjOQ0KjI2oPqLOt2M211HKCjnC_LG6V=w408-h271-k-no",
        name:"Z-teca Mexican Eatery ",
        address:"80 York Blvd, York Lanes Mall",
        hours:"12 - 7 p.m.",
        location:"https://maps.google.com/maps?q=z-teca%20Mexican%20Eatery%20york%20univeristy&t=&z=17&ie=UTF8&iwloc=&output=embed"
    },
    {
        id:'r2',
        image:"https://lh5.googleusercontent.com/p/AF1QipNP4RbkFHqN8amfeuqbCZznSzW7UXa10nuUN04T=w427-h240-k-no",
        name:"Wendy's",
        address:"4700 Keele St, North York",
        hours:"7:30 a.m. - 11:30 p.m.",
        location:"https://maps.google.com/maps?q=Wendy%20%20york%20univeristy&t=&z=17&ie=UTF8&iwloc=&output=embed"
    },
    {
        id:'r3',
        image:"https://lh5.googleusercontent.com/p/AF1QipNFPcZDUdAdxR1oay2Zg8wQCgFC6aMCWnx3USUf=w408-h306-k-no",
        name:"Pagoda Tree",
        address:"4700 Keele St, North York",
        hours:"11 a.m. - 8 p.m.",
        location:"https://maps.google.com/maps?q=Pagoda%20Tree%20%20york%20univeristy&t=&z=17&ie=UTF8&iwloc=&output=embed"
    },
]

const FindRestaurants=()=> {
   
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
              fontFamily:"Gill Sans"
            }}
          >Restaurants On Campus</Typography>
        </Grid>
        
        {/* <Grid item xs={12} sm={2}><AiFillFolderAdd size={40} onClick={openFormHandler}/></Grid> */}
      </Grid>
      
      <Grid 
        container 
        sx={{
          display: 'flex',
          justifyContent: "space-around"
        }}
      >
        {DUMMY_RESTAURANTS.map((restaurant) => (
          <Grid 
            xs={12} sm={6} 
            key={restaurant.id}
            sx={{
              display:'flex',
              justifyContent:'center'
            }}
          >
            <RestaurantItem restaurant={restaurant} />
          </Grid>
        ))}
      </Grid>
    </Box>
   )
} 
export default FindRestaurants;
