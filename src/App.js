import { Route, Routes } from "react-router-dom";
import Navigation from "./pages/navigation";
import Home from "./pages/home";
import FindRestaurants from "./pages/findRestaurants";
import SpareFood from "./pages/spareFood";
import StudentsPicks from "./pages/studentsPicks";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header/>
      <StudentsPicks/>
      <Footer/>
    </>
    
  )
}

export default App;
