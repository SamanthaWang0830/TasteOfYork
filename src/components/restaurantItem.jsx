import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Typography,
} from "@mui/material";

const RestaurantItem = ({ restaurant }) => {
  const { name, location, image, address, hours } = restaurant;
  const [open, setOpen] = useState(false);
  const clickHandler = () => {
    setOpen(true);
  };
  const clickToCloseHandler = () => {
    setOpen(false);
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 400,
        width:'85%',
        mb:2
      }}
    >
      <CardMedia
        sx={{width: '100%', height: {xs:'50vw',sm:'20vw'}, mt:3}} 
        image={image} 
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography
            align="left"
            variant="body1"
            color="text.secondary"
          >
          {address}
        </Typography>
        <Typography
            align="left"
            variant="body1"
            color="text.secondary"
          >
          Hours of Operation: {hours}
        </Typography>

        <Modal
            open={open}
            onClose={clickToCloseHandler}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="map-container">
              <button onClick={clickToCloseHandler} className="button">
                X
              </button>
              <iframe
                title="myframe"
                width="700"
                height="500"
                id="gmap_canvas"
                src={location}
              ></iframe>
            </div>
        </Modal>
        <Button onClick={clickHandler} variant="contained" sx={{mt:2}}>View On Google Map</Button>
      </CardContent>
    </Card>
  )
};
export default RestaurantItem;
