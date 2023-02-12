import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage.jsx'
import FindRestaurantsPage from "./pages/FindRestaurantsPage";
import StudentsPicksPage from "./pages/StudentsPicksPage";
import Header from "./components/Header/Header";
import LoginPage from "./pages/Login/LoginPage";
import MyMealsPage from "./pages/MyMealsPage.jsx";
import { useEffect ,useContext} from "react";
import { UserContext } from "./contexts/user-context.jsx";

let logoutTimer;

const App = () => {
  const {login,logout, token,tokenExpirationDate}= useContext(UserContext)
  
  useEffect(()=>{
    if(token && tokenExpirationDate){
      const remainingTime= tokenExpirationDate.getTime()- new Date().getTime()
      logoutTimer= setTimeout(logout, remainingTime)
    }else{
      clearTimeout(logoutTimer)
    }
  },[token,logout,tokenExpirationDate])

  useEffect(()=>{
    const storgeData= JSON.parse(localStorage.getItem('userData'))
    if(storgeData && storgeData.token && new Date(storgeData.expiration)> new Date()){
      login(storgeData.userId,storgeData.token,storgeData.avatar, new Date(storgeData.expiration))
    }
  },[login])

  /* let routes;
  if(token){
    routes=(

    )
  }
 */
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
