import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import AddNewPet from "./pages/AddNewPet.jsx";
import IdentifySuitablePet from "./pages/IdentifySuitablePet.jsx";
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            {/*Define Routes for the application ...*/}
            <Route path="/" element={<Home/>}/>
            <Route path="/profile/:id" element={<Profile/>}/>
            <Route path="/add" element={<AddNewPet/>}/>
            <Route path="/view-suitable-pet" element={<IdentifySuitablePet/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
