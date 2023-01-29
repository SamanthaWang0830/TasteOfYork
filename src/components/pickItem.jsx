import { useState } from "react";
import "./pickItem.css";
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
import { maxHeight } from "@mui/system";

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
  // return (
  //     <div id="item">
  //         <div className="image">
  //             <img src={image} alt={name} />
  //         </div>
  //         <div>
  //             <span>{name}</span>
  //         </div>
  //         <div>
  //             <span>{description}</span>
  //         </div>
  //         <div>
  //             <button onClick={likeHandler}>{numberOfLike}</button>
  //             <button onClick={dislikeHandler}>{numberOfDislike}</button>
  //         </div>
  //     </div>
  // )
  return (
    <Card className="card" sx={{ maxWidth: 400 }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardMedia component="img" height="250" image={image} alt={name} />
      </div>
      <CardContent>
        <Typography align="left" gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography align="left" variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions className="action-btns">
        <Button id="happy-btn" size="small">
          <InsertEmoticonIcon />
        </Button>
        <Button id="sad-btn" size="small">
          <SentimentVeryDissatisfiedIcon />
        </Button>
      </CardActions>
    </Card>
  );
};
export default PickItem;
