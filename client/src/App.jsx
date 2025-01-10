import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Styles
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // JavaScript
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Services from "./pages/Services";
import VisionPage from "./pages/VisionPage";
import ContactUs from "./pages/ContactUs";
import GetQuotePage from "./pages/GetQuotePage";
import GetSetupPage from "./pages/GetSetupPage";
import logo from './assets/logos/trans_bg.png';
function App() {
  return (
    <Router>
      <Navbar logoSrc= {logo} />
      <Routes>
        <Route path="/" element = {<Homepage/>}/>
        <Route path="/services" element = {<Services/>}/>
        <Route path="/vision" element = {<VisionPage/>}/>
        <Route path="/contact" element = {<ContactUs/>}/>
        <Route path="/quote" element = {<GetQuotePage/>}/>
        <Route path="/setup" element = {<GetSetupPage/>}/>
      </Routes>
    </Router>
  );
}

export default App
