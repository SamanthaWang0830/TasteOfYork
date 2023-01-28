import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import FindRestaurants from "./pages/findRestaurants";
import SpareFood from "./pages/spareFood";
import StudentsPicks from "./pages/studentsPicks";
import Header from "./components/Header";
import LoginPage from "./pages/Login/LoginPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Header/>}>
        <Route index element={<Home/>}/>
        {/* <Route path='home' element={<Home/>}/> */}
        <Route path='findRestaurants' element={<FindRestaurants/>} />
        <Route path="studentsPicks"  element={<StudentsPicks/>} />
        <Route path="spareFood"  element={<SpareFood/>} />
        <Route path="login" element={<LoginPage/>} />
      </Route>
    </Routes>
    
  )
}

export default App;
