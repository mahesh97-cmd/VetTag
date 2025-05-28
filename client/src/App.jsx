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

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Home />} />
          <Route Path="/features" element={<Features />} />
          <Route Path="/howItsWork" element={<HowItWorks />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addpets" element={<AddPets/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
