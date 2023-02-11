import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage.jsx'
import FindRestaurantsPage from "./pages/FindRestaurantsPage";
import StudentsPicksPage from "./pages/StudentsPicksPage";
import Header from "./components/Header/Header";
import LoginPage from "./pages/Login/LoginPage";
import MyMealsPage from "./pages/MyMealsPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Header/>}>
        <Route index element={<HomePage/>}/>
        <Route path="/:userId/places" exact element={<MyMealsPage/>} />
        <Route path='findRestaurants' element={<FindRestaurantsPage/>} />
        <Route path="studentsPicks"  element={<StudentsPicksPage/>} />
        <Route path="login" element={<LoginPage/>} />
      </Route>
    </Routes>
    
  )
}

export default App;
