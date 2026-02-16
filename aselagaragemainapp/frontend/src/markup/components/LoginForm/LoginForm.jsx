
import React, { useState } from "react";
import { useNavigate , useLocation } from "react-router-dom";
import loginService from "../../../services/login.service";
import { useAuth } from "../../../Context/AuthContext";
import {
  Form,
  Button,
  InputGroup,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLogged, setEmployee, setIsAdmin } = useAuth();
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;

    if (!employee_email) {
      setEmailError("Please enter your email address");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    const formData = { employee_email, employee_password };

    try {
      const response = await loginService.logIn(formData);
      const data = await response.json();
      if (data.status === "success") {
        if (data.data.employee_token) {
          console.log(data.data);
          localStorage.setItem("employee", JSON.stringify(data.data));
          setIsLogged(true);
          setEmployee(data.data);
          setIsAdmin(data.data.employee_role === 3); // Set admin status
          navigate("/"); // Default navigation for other roles
        }
      } else {
        setServerError(data.message);
      }
    } catch (err) {
      setServerError("An error has occurred. Please try again later.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <div className="p-4 bg-light rounded shadow">
            <h2 className="text-center mb-4">Login to your account</h2>
            {serverError && <Alert variant="danger">{serverError}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={employee_email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!emailError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {emailError}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <InputGroup>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={employee_password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!passwordError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {passwordError}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <div className="d-grid">
                <Button variant="danger" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;

