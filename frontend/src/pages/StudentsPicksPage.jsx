import { Box, Grid, Typography, Button} from "@mui/material";
import { useState ,useContext,useEffect} from "react";
import { UserContext } from "../contexts/user-context";
import PickItem from "../components/pickItem";
import {AiFillFolderAdd} from 'react-icons/ai';
import CreateOrUpdateMeal from "../components/createOrUpdateMeal";
import useHttpClient from '../hooks/http-hook'
import AlertMessage from "../components/AlertMessage";

const StudentsPicks = () => {
  const [loadedPicks, setLoadedPicks]=useState()
  //when user doesn't login/signup
  const [alert, setAlert]=useState(false)
  const [force,setForce]=useState(0)
  const {isLoading,sendRequest}= useHttpClient()
  const {userId,token}=useContext(UserContext)

  //fetch all the meals from mongoDB
  useEffect(() => {
    const fetchPicks= async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+'/meals'
        );
        setLoadedPicks(responseData.meals);
      } catch (err) {}
    };
    fetchPicks();
  }, [sendRequest,force]);

  // create a new Meal
  const [file,setFile]=useState()
  let form= {name:'', description:''}
  const [showForm, setShowForm] = useState(false);
  const openFormHandler = () => {
    if(userId){
      setShowForm(true);
    }else{
      setAlert(true)
    }
  };
  const submitHanlder =async (e) => {
    e.preventDefault();
    const data= new FormData(e.currentTarget);
    if(data.get('name') && data.get('description') && file){
      try {
        data.append('image',file)
        await sendRequest(process.env.REACT_APP_BACKEND_URL+'/meals',"POST",data,{
          Authorization:"Bearer "+token
        })
        setForce(pre=>pre+1)
      } catch (err) {}
      setShowForm(false);
    }
  };

  //like and dislike function
  const likeHandler =async (id) => {
    try {
      await sendRequest(process.env.REACT_APP_BACKEND_URL+`/meals/${id}/likePost`,"PATCH")
      setForce(pre=>pre+1)
    } catch (err) {}
  }
  const dislikeHandler =async (id) => {
    try {
      await sendRequest(process.env.REACT_APP_BACKEND_URL+`/meals/${id}/dislikePost`,"PATCH")
      setForce(pre=>pre+1)
    } catch (err) {}
  }

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
      
      <AlertMessage open={alert} setClose={setAlert}>Please go to Auth to Login/Signup</AlertMessage>
     
      <CreateOrUpdateMeal submitHanlder={submitHanlder} showForm={showForm} setShowForm={setShowForm} isLoading={isLoading} form={form} file={file} setFile={setFile} update={false}/>
      

      <Grid 
        container 
        sx={{
          display: 'flex',
          justifyContent: "space-around"
        }}
      >
        {loadedPicks && (loadedPicks.map((pick) => (
          <Grid 
            xs={12} sm={6} 
            key={pick.id}
            sx={{
              display:'flex',
              justifyContent:'center'
            }}
          >
            <PickItem pick={pick} likeHandler={likeHandler} dislikeHandler={dislikeHandler}/>
          </Grid>
        )))}
      </Grid>
    </Box>
  )
};

export default StudentsPicks;
