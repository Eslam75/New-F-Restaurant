import React, { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterGO() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: ""

  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Function to validate inputs
  const validateForm = () => {
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Form submission handler
  async function handleSubmit(e) {
    setLoading(true)
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_FRONTEND_URL}/register`, formData);
      if (data.success) {
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.data.role);
        localStorage.setItem("justLoggedIn", "true");
        setLoading(false)
           console.log(data.data.role)
        console.log("token is =<>", data.token);
        // Dispatch user details to Redux
        // Navigate to homepage
        navigate("/");
      } else {
        toast``.error(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    }
  }

  return (
    <div className="signup">
      <div className="containerSignUp">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} id="signUpform">
          {/* Username Input */}
          <div className="containerInput">
            <input
              onChange={(e) =>
                setFormData({ ...formData, [e.target.id]: e.target.value })
              }
              value={formData.username}
              type="text"
              id="username"
              placeholder="Name"
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>

          {/* Email Input */}
          <div className="containerInput">
            <input
              onChange={(e) =>
                setFormData({ ...formData, [e.target.id]: e.target.value })
              }
              value={formData.email}
              type="email"
              id="email"
              placeholder="Email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="containerInput">
            <input
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.id]: e.target.value })
              }
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          {/* Navigation to Login */}
          <span>
            Already have an account?{" "}
            <Link id="goRegister" to="/login">
              Click here
            </Link>
          </span>

          {/* Submit Button */}
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>

          {/* Server Error Message */}
          {errors.server && <p className="error">{errors.server}</p>}
        </form>
      </div>
    </div>
  );
}
