import React,{useState,useEffect, useContext} from "react";
import {Button, Breadcrumbs, Menu, MenuItem}from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, Link } from "react-router-dom";
import './Header.css'
import { UserContext } from "../../contexts/user-context";


export default function Header() {
  const {authSucceed, setAuthSucceed} = useContext(UserContext)
  //if window width change to below 600, then navigation should change to menu version
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const clickLogoutHandler=()=>{
    setAuthSucceed(false)
  }
  // Dropdown menu functionalities
  const [anchorEl, setAnchorEl] = useState(null);
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
        <Link style={{ textDecoration: "none" }} to="/">
          <h1>Taste of York</h1>
        </Link>

        <div className="header-right">
          {
            authSucceed? (
              <>
                <Button onClick={clickLogoutHandler}>Log Out</Button>
                <h4>
                  <Link style={{textDecoration: 'none', color:'gray'}} to="/myMeals" >MyMeals</Link>
                </h4>
              </>
            ):(
              <h3>
                <Link style={{textDecoration: 'none', color:'gray'}} to="/login" >Auth</Link>
              </h3>
            )
          }
          
          {
            windowWidth<600 ? (
              <>
                <Button
                  id="menu-button"
                  aria-controls={open ? "menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MenuIcon style={{ color: "white" }} />
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
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/findRestaurants"
                  >
                    <MenuItem onClick={handleClose}>Restaurants</MenuItem>
                  </Link>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/studentsPicks"
                  >
                    <MenuItem onClick={handleClose}>Student Picks</MenuItem>
                  </Link>
                </Menu>
              </>
            ):(
              <Breadcrumbs aria-label="breadcrumb" sx={{color:'gray', ml:2}}>
                <Link
                  style={{ textDecoration: "none", color:'gray'}}
                  to="/findRestaurants"
                >
                    Restaurants
                </Link>
                <Link
                  style={{ textDecoration: "none",color:'gray'}}
                  to="/studentsPicks"
                >
                  studentsPicks
                </Link>
              </Breadcrumbs>
            )
          }
          
        </div>
      </header>
      <Outlet />

    </>
  );
}
