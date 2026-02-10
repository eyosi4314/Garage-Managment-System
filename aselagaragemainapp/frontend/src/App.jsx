import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./markup/pages/Home";
import Login from "./markup/pages/Login";
import AddEmployee from "./markup/pages/admin/addemployee";
import Header from "./markup/components/header/Header";
import Footer from "./markup/components/Footer/Footer";
// Import the css files
import "../src/assets/template_assets/css/bootstrap.css";
import "../src/assets/template_assets/css/style.css";
import "../src/assets/template_assets/css/responsive.css";
import "../src/assets/template_assets/css/color.css";
import "../src/assets/styles/custom.css";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/add-employee" element={<AddEmployee />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
