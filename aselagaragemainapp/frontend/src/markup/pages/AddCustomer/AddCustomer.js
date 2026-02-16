// import React, { useState } from "react";
// import axios from "axios";

// const AddCustomer = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     firstName: "",
//     lastName: "",
//     phone: "",
//     password: "",
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5173/api/customers/add", formData);
//       setMessage("Customer added successfully!");
//     } catch (error) {
//       console.error("Error adding customer:", error);
//       setMessage("Failed to add customer.");
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         {/* Admin Menu */}
//         <div className="col-md-3">
//           <div
//             style={{ backgroundColor: "#071c1f" }}
//             className="text-white p-4"
//           >
//             <h3 style={{ backgroundColor: "darkgrey" }}>ADMIN MENU</h3>
//             <ul className="nav flex-column">
//               <li className="nav-item">
//                 <a href="#dashboard" className="nav-link text-white">
//                   Dashboard
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="#orders" className="nav-link text-white">
//                   Orders
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="#new-order" className="nav-link text-white">
//                   New order
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="#add-employee" className="nav-link text-white">
//                   Add employee
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="#employees" className="nav-link text-white">
//                   Employees
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="#add-customer" className="nav-link text-white">
//                   Add customer
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="#customers" className="nav-link text-white">
//                   Customers
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="#services" className="nav-link text-white">
//                   Services
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Add Customer Form */}
//         <div className="col-md-9">
//           <div className="container mt-4">
//             <h2 className="mb-4">Add a new customer</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">
//                   Customer email
//                 </label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Customer email"
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="firstName" className="form-label">
//                   Customer first name
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="firstName"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   placeholder="Customer first name"
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="lastName" className="form-label">
//                   Customer last name
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="lastName"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   placeholder="Customer last name"
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="phone" className="form-label">
//                   Customer phone
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="555-555-5555"
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="phone" className="form-label">
//                   Customer phone
//                 </label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="phone"
//                   name="phone"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="password"
//                   required
//                 />
//               </div>
//               <button type="submit" className="btn btn-danger">
//                 Add Customer
//               </button>
//             </form>
//             {message && <p className="mt-3">{message}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCustomer;
