import React from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import logo from "../../../assets/img/logo/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FaUserCircle, FaEdit, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";

function Header() {
  const { isLogged, employee, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar bg-primary text-white py-2">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="left-column d-flex align-items-center">
            <div className="text me-4">
              Schedule Appointment: <strong>1800 456 7890</strong>
            </div>
            <div className="office-hour me-4">
              Monday - Saturday 7:00AM - 6:00PM
            </div>
          </div>
          <div className="right-column d-flex align-items-center">
            <div className="phone-number me-4">
              <strong>
                {isLogged
                  ? `Welcome, ${employee?.employee_first_name || employee?.customer_email || "User"}`
                  : "Welcome"}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="site-header sticky-header">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="light"
          variant="light"
          sticky="top"
        >
          <Container>
            <Navbar.Brand className="me-auto">
              <img
                onClick={() => navigate("/")}
                src={logo}
                alt="Logo"
                className="logo"
              />
            </Navbar.Brand>

            {/* Navbar Toggle and Links (always visible) */}
            <Navbar.Toggle
              aria-controls="navbarNavDropdown"
              className="border-0"
            >
              <span className="navbar-toggler-icon"></span>
            </Navbar.Toggle>

            <Navbar.Collapse
              id="navbarNavDropdown"
              className="justify-content-center"
            >
              <Nav className="text-center">
                <Link to="/" className="nav-link text-primary fw-bold">
                  Home
                </Link>
                <Link to="/about" className="nav-link text-primary fw-bold">
                  About Us
                </Link>
                <Link to="/services" className="nav-link text-primary fw-bold">
                  Service
                </Link>
                <Link to="/contact" className="nav-link text-primary fw-bold">
                  Contact Us
                </Link>
              </Nav>
            </Navbar.Collapse>

            <div className="ms-auto">
              {isLogged ? (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-avatar"
                    className="text-primary"
                  >
                    <FaUserCircle size={30} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="custom-dropdown bg-light">
                    <Dropdown.Item
                      onClick={() => navigate("/edit-profile")}
                      className="d-flex align-items-center text-primary"
                    >
                      <FaEdit className="me-2" /> Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={handleLogout}
                      className="d-flex align-items-center text-primary"
                    >
                      <FaSignOutAlt className="me-2" /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  onClick={() => navigate("/login")}
                  className="btn btn-danger text-white fw-bold border-0"
                >
                  Login
                </Button>
              )}
            </div>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
