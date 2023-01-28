import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet , Link} from "react-router-dom";

export default function Header() {
  // Dropdown menu functionalities
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <header class="headerContainer">
      <Link to='/'><h1>Taste of York</h1></Link>
      

      {/* Add the burger menu */}
      <Button
        id="menu-button"
        aria-controls={open ? "menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon style={{ color: 'white' }}/>
      </Button>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "menu-button",
        }}
      >
        
        
        <Link to='/studentsPicks'><MenuItem onClick={handleClose}>Restaurants</MenuItem></Link>
        <Link to='/studentsPicks'><MenuItem onClick={handleClose}>Student Picks</MenuItem></Link>
        <Link to='/spareFood'><MenuItem onClick={handleClose}>SpareMeals</MenuItem></Link>
        
      </Menu>
    </header>
    <Outlet/>
    </>
  );
}
