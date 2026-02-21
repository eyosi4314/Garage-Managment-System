import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTasks,
  FaClipboardList,
  FaCalendarAlt,
  FaUser,
  FaCog,
  FaEnvelope,
} from "react-icons/fa";
import styles from "./CustumerMenu.module.css";
function CustumerMenu() {
  return (
    // State to manage the visibility of the sub-menus
    <div className="employee-menu">
      <h2>Customer Menu</h2>
      <div className="list-group">
        <Link to="/customers" className="list-group-item">
          <FaTachometerAlt className="icon" /> Dashboard
        </Link>

        {/* Tasks Menu */}
        <Link to="/customers/orders" className="list-group-item ">
          <FaTasks className="icon" /> My Orders
        </Link>

        {/* oder history */}
        <Link to="/customers/history" className="list-group-item">
          <FaClipboardList className="icon" />
          My Order History
        </Link>

        {/* Profile Menu */}
        <Link to="/customers/profile" className="list-group-item">
          <FaUser className="icon" /> Profile
        </Link>

        {/* Messages Menu */}
        <Link to="/customers/messages" className="list-group-item">
          <FaEnvelope className="icon" /> Messages
        </Link>
      </div>
    </div>
  );
}

export default CustumerMenu;
