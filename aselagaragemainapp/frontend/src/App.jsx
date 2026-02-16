import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Import the pages
import Home from "./markup/pages/Home";
import Login from "./markup/pages/Login";
import About from "../src/markup/pages/About";
import Service from "./Markup/pages/Services";
import Contact from "../src/markup/pages/Contact";
import Header from "./markup/components/header/Header";
import Footer from "./markup/components/Footer/Footer";



// import the admin pages
import AddEmployee from "./markup/pages/admin/addemployee";
import Addcustomer from "./Markup/pages/admin/Addcustomer";
// import AddCustomerForm from "./Markup/Components/Admin/AddCustomer/AddCustomerForm";

import Unauthorized from "../src/markup/pages/Unauthorized";
import PrivateAuthRoute from "../src/markup/components/Auth/PrivateAuthRoute";
// // import orders customers employees pages
import Orders from "../src/markup/pages/admin/Orders";
import Customers from "../src/markup/pages/admin/Customers";
import Employees from "../src/markup/pages/admin/Employees";
// // Import the css files
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/font-icons.css";
// import "./assets/css/style.css";
import "./Assets/sass/style.scss";
import "./Assets/sass/elements/_button.scss";
import "./index.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/admin/employees" element={<Employees />} />

        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              {" "}
              <Orders />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              {" "}
              <Customers />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Addcustomer />
            </PrivateAuthRoute>
          }
        />
        {/* pages */}
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/services" element={<Service />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
