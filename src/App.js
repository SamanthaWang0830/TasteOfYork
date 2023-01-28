import { Route, Routes } from 'react-router-dom';
import Navigation from './pages/navigation';
import Home from './pages/home';
import FindRestaurants from './pages/findRestaurants';
import SpareFood from './pages/spareFood';
import StudentsPicks from './pages/studentsPicks';
import './App.css';

const App=()=> {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='findRestaurants' element={<FindRestaurants/>}/> 
        <Route path='sparefood' element={<SpareFood/>}/> 
        <Route path='sparefood' element={<SpareFood/>}/> 
        <Route path='studentspicks' element={<StudentsPicks/>}/> 
      </Route>
    </Routes>
  )
}

export default App;
