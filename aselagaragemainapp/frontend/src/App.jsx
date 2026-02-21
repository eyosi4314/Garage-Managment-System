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
import AdminDashbord from "./markup/pages/admin/AdminDashboard";
import AddEmployee from "./markup/pages/admin/addemployee";
import Addcustomer from "./Markup/pages/admin/Addcustomer";
import AddServices from "./markup/components/admin/AddService/AddService";
import ServiceList from "./markup/components/admin/ServiceList/ServiceList";
import Customers from "../src/markup/pages/admin/Customers";
import Employees from "../src/markup/pages/admin/Employees";
// import AddCustomerForm from "./Markup/Components/Admin/AddCustomer/AddCustomerForm";
// import the manager pages
import ManagerDashboard from "./markup/pages/Manager/ManagerDashboard";
import EmployeesManager from "./markup/pages/Manager/EmployeeManager";
import AddServiceManager from "./markup/pages/Manager/AddServiceManager";
import AddcustomerManager from "./markup/pages/Manager/AddCustomerManager";
import CustomersManager from "./markup/pages/Manager/CustomerManager";
// import the employee pages
import EmployeeDash from "./markup/pages/Employee/EmployeeDashboard";
import EmployeeTasks from "./markup/pages/Employee/EmployeeTask/EmployeeTask";
import EmployeePofile from "./markup/pages/Employee/EmployeeProfile/EmployeeProfile";
import EmployeeSetting from "./markup/pages/Employee/EmployeeSetting/EmployeeSetting";
import TaskHistory from "./markup/pages/Employee/EmployeeTaskHistory/EmployeeTaskHistory";
// import the customer pages
import CustomerDashboard from "./markup/pages/Customer/CustomerDash";
import CustomerHistory from "./markup/pages/Customer/MyHistory/MyHistory";
import CustomerProfile from "./markup/pages/Customer/MyProfileList/MyProfileList";

import Unauthorized from "../src/markup/pages/Unauthorized";
import PrivateAuthRoute from "../src/markup/components/Auth/PrivateAuthRoute";
// // import orders customers employees pages
import Orders from "../src/markup/pages/admin/Orders";
// import the chatbot
// import Chatbot from "./markup/Chatbot_AI/Chatbot/Chatbot";

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
        {/* <Route path="/chatbot" element={<Chatbot />} />   */}
        {/* admin pages */}

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
          path="/admin/add-service"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              {" "}
              <AddServices />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              {" "}
              <ServiceList />
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
          path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Addcustomer />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Employees />
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
          path="/admin"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AdminDashbord />
            </PrivateAuthRoute>
          }
        />

        {/* manager */}
        <Route
          path="/"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Navigate to="/manager" />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="/manager/*"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <ManagerDashboard />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/manager/employees"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <EmployeesManager />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/manager/services"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <AddServiceManager />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/manager/add-customer"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <AddcustomerManager />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="/manager/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <CustomersManager />
            </PrivateAuthRoute>
          }
        />

        {/* Employee page */}
        <Route path="/" element={
          <PrivateAuthRoute roles={[1]}>
            <Navigate to="/employees" />
          </PrivateAuthRoute>
        } />
        <Route path="/employees/tasks" element={
          <PrivateAuthRoute roles={[1]}>
            <EmployeeTasks />
          </PrivateAuthRoute>
        } />
        <Route path="/employees/profile" element={
          <PrivateAuthRoute roles={[1]}>
            <EmployeePofile />
          </PrivateAuthRoute>
        } />
        <Route path="/employees/settings" element={
          <PrivateAuthRoute roles={[1]}>
            <EmployeeSetting />
          </PrivateAuthRoute>
        } />
        <Route path="/employees/task-history" element={
          <PrivateAuthRoute roles={[1]}>
            <TaskHistory />
          </PrivateAuthRoute>
        } />
        <Route path="/employees" element={
          <PrivateAuthRoute roles={[1]}>
            <EmployeeDash />
          </PrivateAuthRoute>
        } />

        {/* Customer Pages */}
        <Route
          path="/customers"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <CustomerDashboard />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/customers/history"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <CustomerHistory />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/customers/profile"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <CustomerProfile />
            </PrivateAuthRoute>
          }
        />
        {/* pages */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
