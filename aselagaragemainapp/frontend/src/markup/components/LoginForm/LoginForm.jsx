
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../../../services/login.service";
import { useAuth } from "../../../Context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const { setIsLogged, setEmployee, setIsAdmin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let valid = true;
    if (!employee_email) {
      setEmailError("Please enter your email address");
      valid = false;
    } else setEmailError("");

    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else setPasswordError("");

    if (!valid) return;

    try {
      const response = await loginService
        .logIn({ employee_email, employee_password })
        .then((res) => res.json());

      if (response.status === "success" && response.data.employee_token) {
        // Store in localStorage
        localStorage.setItem("employee", JSON.stringify(response.data));

        // Update context first
        setIsLogged(true);
        setEmployee(response.data);
        if (response.data.employee_role === 3) setIsAdmin(true);

        // Use a short delay to let context update before navigation
        setTimeout(() => {
          navigate("/"); // Header now sees updated employee instantly
        }, 0);
      } else {
        setServerError(response.message || "Login failed");
      }
    } catch (err) {
      setServerError("An error occurred: " + err);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Login to your account</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error">{serverError}</div>
                      )}
                      <input
                        type="email"
                        value={employee_email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      />
                      {emailError && (
                        <div className="validation-error">{emailError}</div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="password"
                        value={employee_password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                      {passwordError && (
                        <div className="validation-error">{passwordError}</div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <button className="theme-btn btn-style-one" type="submit">
                        <span>Login</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;

