import React from "react";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Home from "./components/Home";
import Features from "./components/Features";
import HowItWorks from "./components/HowItsWork";
import AddPets from "./components/AddPets";
import Login from "./components/Login";
import Register from "./components/Register";
import MyPets from "./components/Mypets";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import {Toaster} from "react-hot-toast"
import PetPublicProfile from "./components/petPublicProfile";
import UpdatePetForm from "./components/UpdatePetForm";
import UserProfile from "./components/UserProfile";
const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Toaster position="top-center"/>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Home />} />
            <Route Path="/features" element={<Features />} />
            <Route Path="/howItsWork" element={<HowItWorks />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pet/qrcode/:qrCodeId" element={<PetPublicProfile />} />
          <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/mypets" element={<MyPets/>}/>
          <Route path="/dashboard/pets/:petId" element={<UpdatePetForm />} />
          <Route path="/dashboard/userProfile" element={<UserProfile/>} />
          <Route path="/dashboard/addpet" element={<AddPets/>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
