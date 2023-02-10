import { useState } from "react";
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

const PickItem = ({ pick }) => {
  const { name, description, image, like, dislike } = pick;
  const [numberOfLike, setNumberOfLike] = useState(like);
  const [numberOfDislike, setNumberOfDislike] = useState(dislike);
  const likeHandler = () => {
    setNumberOfLike((pre) => pre + 1);
  };
  const dislikeHandler = () => {
    setNumberOfDislike((pre) => pre + 1);
  };

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
        <Button size="small" onClick={likeHandler}><InsertEmoticonIcon/>{numberOfLike}</Button>
        <Button size="small"onClick={dislikeHandler}><SentimentVeryDissatisfiedIcon />{numberOfDislike}</Button>
      </CardActions>
    </Card>
  );
};
export default PickItem;
