import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography
} from "@mui/material";
import useHttpClient from "../hooks/http-hook";

const MyItem=({pick,updateHandler, deleteHandler})=>{
    const { name, description, image ,id} = pick;
    const {isLoading, error,sendRequest}=useHttpClient()

    
    return (
        <Card 
            sx={{ 
                maxWidth: 400,
                width:'85%'
            }}
        >
            <CardMedia
                sx={{width: '100%', height: {xs:'50vw',sm:'20vw'}, mt:3}} 
                image={`http://localhost:7000/${image}`} 
                alt={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={updateHandler} variant="outlined" id={id}>Update</Button>
                <Button onClick={deleteHandler} variant="contained" color="error" id={id}>Delete</Button>
            </CardActions>
        </Card>
    )
}
export default MyItem