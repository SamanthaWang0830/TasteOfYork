import { Link } from "react-router-dom";
import './home.css'
import logo from '../pages/73E53A21-8304-4F67-9CDF-DD49529E11A7.JPG'

const Home=()=> {
   return (
    <div>
      <div className="logo-container">
         <img src={logo}  alt="logo" />
      </div>
      <Link to="/findRestaurants" style={{ textDecoration: "none", color: "black" }}>
         <div>Find Restaurant</div>
      </Link>
      <Link to="/studentsPicks" style={{ textDecoration: "none", color: "black" }}>
         <div>Student Picks</div>
      </Link>
      <Link to="/spareFood" style={{ textDecoration: "none", color: "black" }}>
         <div>SpareMeals</div>
      </Link>
    </div>
   )
}
export default Home;