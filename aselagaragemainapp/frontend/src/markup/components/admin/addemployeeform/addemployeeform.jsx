// import React, { useState } from "react";
// // import employee.service.js
// import employeeService from "../../../../services/employee.service";
// import { useAuth } from "../../../../context/AuthContext";


// function AddEmployeeForm(props) {
//   const [employee_email, setEmail] = useState("");
//   const [employee_first_name, setFirstName] = useState("");
//   const [employee_last_name, setLastName] = useState("");
//   const [employee_phone, setPhoneNumber] = useState("");
//   const [employee_password, setPassword] = useState("");
//   const [active_employee, setActive_employee] = useState(1);
//   const [company_role_id, setCompany_role_id] = useState(1);
//   // Errors
//   const [emailError, setEmailError] = useState("");
//   const [firstNameRequired, setFirstNameRequired] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [serverError, setServerError] = useState("");

//   // Create a variable to hold the user's token
//   let loggedInEmployeeToken = "";
//   // Destructure the auth hook and get the token
//   const { employee } = useAuth();
//   if (employee && employee.employee_token) {
//     loggedInEmployeeToken = employee.employee_token;
//   }

//   const handleSubmit = (e) => {
//     // Prevent the default behavior of the form
//     e.preventDefault();
//     // Handle client side validations
//     let valid = true; // Flag
//     // First name is required
//     if (!employee_first_name) {
//       setFirstNameRequired("First name is required");
//       valid = false;
//     } else {
//       setFirstNameRequired("");
//     }
//     // Email is required
//     if (!employee_email) {
//       setEmailError("Email is required");
//       valid = false;
//     } else if (!employee_email.includes("@")) {
//       setEmailError("Invalid email format");
//     } else {
//       const regex = /^\S+@\S+\.\S+$/;
//       if (!regex.test(employee_email)) {
//         setEmailError("Invalid email format");
//         valid = false;
//       } else {
//         setEmailError("");
//       }
//     }
//     // Password has to be at least 6 characters long
//     if (!employee_password || employee_password.length < 6) {
//       setPasswordError("Password must be at least 6 characters long");
//       valid = false;
//     } else {
//       setPasswordError("");
//     }
//     // If the form is not valid, do not submit
//     if (!valid) {
//       return;
//     }
//     const formData = {
//       employee_email,
//       employee_first_name,
//       employee_last_name,
//       employee_phone,
//       employee_password,
//       active_employee,
//       company_role_id,
//     };

//     // Pass the form data to the service
//     const newEmployee = employeeService.createEmployee(
//       formData,
//       loggedInEmployeeToken,
//     );
//     newEmployee
//       .then((response) => response.json())
//       .then((data) => {
//         // console.log(data);
//         // If Error is returned from the API server, set the error message
//         if (data.error) {
//           setServerError(data.error);
//         } else {
//           // Handle successful response
//           setSuccess(true);
//           setServerError("");
//           // Redirect to the employees page after 2 seconds
//           // For now, just redirect to the home page
//           setTimeout(() => {
//             // window.location.href = '/admin/employees';
//             window.location.href = "/";
//           }, 2000);
//         }
//       })
//       // Handle Catch
//       .catch((error) => {
//         const resMessage =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
//         setServerError(resMessage);
//       });
//   };

//   return (
//     <section className="contact-section">
//       <div className="auto-container">
//         <div className="contact-title">
//           <h2>Add a new employee</h2>
//         </div>
//         <div className="row clearfix">
//           <div className="form-column col-lg-7">
//             <div className="inner-column">
//               <div className="contact-form">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row clearfix">
//                     <div className="form-group col-md-12">
//                       {serverError && (
//                         <div className="validation-error" role="alert">
//                           {serverError}
//                         </div>
//                       )}
//                       <input
//                         type="email"
//                         name="employee_email"
//                         value={employee_email}
//                         onChange={(event) => setEmail(event.target.value)}
//                         placeholder="Employee email"
//                       />
//                       {emailError && (
//                         <div className="validation-error" role="alert">
//                           {emailError}
//                         </div>
//                       )}
//                     </div>
//                     <div className="form-group col-md-12">
//                       <input
//                         type="text"
//                         name="employee_first_name"
//                         value={employee_first_name}
//                         onChange={(event) => setFirstName(event.target.value)}
//                         placeholder="Employee first name"
//                       />
//                       {firstNameRequired && (
//                         <div className="validation-error" role="alert">
//                           {firstNameRequired}
//                         </div>
//                       )}
//                     </div>

//                     <div className="form-group col-md-12">
//                       <input
//                         type="text"
//                         name="employee_last_name"
//                         value={employee_last_name}
//                         onChange={(event) => setLastName(event.target.value)}
//                         placeholder="Employee last name"
//                         required
//                       />
//                     </div>

//                     <div className="form-group col-md-12">
//                       <input
//                         type="text"
//                         name="employee_phone"
//                         value={employee_phone}
//                         onChange={(event) => setPhoneNumber(event.target.value)}
//                         placeholder="Employee phone (555-555-5555)"
//                         required
//                       />
//                     </div>

//                     <div className="form-group col-md-12">
//                       <select
//                         name="employee_role"
//                         value={company_role_id}
//                         onChange={(event) =>
//                           setCompany_role_id(event.target.value)
//                         }
//                         className="custom-select-box"
//                       >
//                         <option value="1">Employee</option>
//                         <option value="2">Manager</option>
//                         <option value="3">Admin</option>
//                       </select>
//                     </div>

//                     <div className="form-group col-md-12">
//                       <input
//                         type="password"
//                         name="employee_password"
//                         value={employee_password}
//                         onChange={(event) => setPassword(event.target.value)}
//                         placeholder="Employee password"
//                       />
//                       {passwordError && (
//                         <div className="validation-error" role="alert">
//                           {passwordError}
//                         </div>
//                       )}
//                     </div>

//                     <div className="form-group col-md-12">
//                       <button
//                         className="theme-btn btn-style-one"
//                         type="submit"
//                         data-loading-text="Please wait..."
//                       >
//                         <span>Add employee</span>
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default AddEmployeeForm;


import React, { useState } from "react";
import { Modal, Button, Alert, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import employeeService from "../../../../services/employee.service";
import { useAuth } from "../../../../context/AuthContext";
import "./AddEmployeeForm.css";

function AddEmployeeForm() {
  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [active_employee, setActive_employee] = useState(1);
  const [company_role_id, setCompany_role_id] = useState(1);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { employee } = useAuth();
  const loggedInEmployeeToken = employee?.employee_token || "";

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let valid = true;

    // Validation
    if (!employee_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else setFirstNameRequired("");

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!employee_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!emailRegex.test(employee_email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else setEmailError("");

    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else setPasswordError("");

    if (!valid) {
      setLoading(false);
      return;
    }

    const formData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id,
    };

    employeeService
      .createEmployee(formData, loggedInEmployeeToken)
      .then((data) => {
        if (data.error) {
          setServerError(data.error);
          setShowErrorModal(true);
        } else {
          setSuccess(true);
          setServerError("");
          setShowSuccessModal(true);
          // Reset form
          setEmail("");
          setFirstName("");
          setLastName("");
          setPhoneNumber("");
          setPassword("");
        }
      })
      .catch((error) => {
        setServerError(error.message || "Server error");
        setShowErrorModal(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a New Employee</h2>
        </div>
        <div className="contact-form">
          <Form onSubmit={handleSubmit}>
            {serverError && (
              <Alert
                variant="danger"
                onClose={() => setServerError("")}
                dismissible
              >
                {serverError}
              </Alert>
            )}
            {success && (
              <Alert
                variant="success"
                onClose={() => setSuccess(false)}
                dismissible
              >
                Employee added successfully!
              </Alert>
            )}

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={employee_email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Employee email"
                    isInvalid={!!emailError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {emailError}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={employee_first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Employee first name"
                    isInvalid={!!firstNameRequired}
                  />
                  <Form.Control.Feedback type="invalid">
                    {firstNameRequired}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={employee_last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Employee last name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={employee_phone}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Employee phone (555-555-5555)"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={company_role_id}
                    onChange={(e) => setCompany_role_id(e.target.value)}
                  >
                    <option value="1">Employee</option>
                    <option value="2">Manager</option>
                    <option value="3">Admin</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={employee_password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Employee password"
                    isInvalid={!!passwordError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {passwordError}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button
              className="theme-btn btn-style-one"
              type="submit"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Employee"}
            </Button>
          </Form>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={() => {
          setShowSuccessModal(false);
          navigate("/employees"); // redirect after adding
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Employee added successfully!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowSuccessModal(false);
              navigate("/admin/employees"); // redirect on close
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{serverError}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default AddEmployeeForm;

