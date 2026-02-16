import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

function Unauthorized() {
  const { isLogged, isAdmin } = useAuth();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/"); // Go back to the previous page
  };

  const handleLogin = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <Container className="unauthorized-container my-5">
      <Row className="justify-content-center text-center">
        <Col md={6}>
          <h2 className="mb-4">Unauthorized Access</h2>
          <p>You do not have permission to view this page.</p>
          <div className="mt-4">
            <Button variant="primary" onClick={handleGoBack} className="me-3">
              Go Back
            </Button>
            {!isLogged && (
              <Button variant="secondary" onClick={handleLogin}>
                Login
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Unauthorized;
