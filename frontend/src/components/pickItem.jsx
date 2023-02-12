import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";


const PickItem = ({ pick, dislikeHandler,likeHandler }) => {
  const { name, description, image, likeCount, dislikeCount,_id} = pick;

  return (
    <Card 
      sx={{ 
        maxWidth: 400,
        width:'85%'
      }}
    >
      <CardMedia
        sx={{width: '100%', height: {xs:'50vw',sm:'20vw'}, mt:3}} 
        image={process.env.REACT_APP_ASSET_URL+`/${image}`} 
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
        <Button size="small" onClick={()=>likeHandler(_id)}><InsertEmoticonIcon/>{likeCount}</Button>
        <Button size="small"onClick={()=>dislikeHandler(_id)}><SentimentVeryDissatisfiedIcon />{dislikeCount}</Button>
      </CardActions>
    </Card>
  );
};
export default PickItem;
