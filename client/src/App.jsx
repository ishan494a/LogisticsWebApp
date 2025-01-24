import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import GetQuotePage from "./pages/GetQuotePage";
import GetSetupPage from "./pages/GetSetupPage";
import Footer from "./components/Footer"; 
import logo from './assets/logos/original_processed.png';
import './App.css';
import About from "./pages/About";
import 'font-awesome/css/font-awesome.min.css';


function App() {
  return (
    <Router>
      <Navbar logoSrc={logo} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/quote" element={<GetQuotePage />} />
        <Route path="/setup" element={<GetSetupPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
