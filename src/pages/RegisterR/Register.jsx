import React, { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterGO() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showpassword, setshowpassword] = useState(false);

  // Form submission handler
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_FRONTEND_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();

      if (data.success) {
        navigate("/login"); // Navigate to login if registration succeeds
      } else {
        alert(data.message || "Registration failed!"); // Display message on error
      }
      console.log(data.data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  return (
    <div className="signup">
      <div className="containerSignUp">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} id="signUpform">
          {/* Name Input */}

          <div className="contaienrname" id="containerforminPUT">
            <input
              onChange={(e) =>
                setformdata({ ...formdata, [e.target.id]: e.target.value })
              }
              value={formdata.username}
              type="text"
              id="username"
              placeholder="Name"
              required 
            />
          </div>

          {/* Email Input */}

          <div className="contaienrEmail" id="containerforminPUT">
            <input
              onChange={(e) =>
                setformdata({ ...formdata, [e.target.id]: e.target.value })
              }
              value={formdata.email}
              type="email"
              id="email"
              placeholder="Email"
              required // Ensure input is mandatory
            />
          </div>

          {/* Password Input */}
          <div className="containerPassword" id="containerforminPUT">
            {showpassword ? (
              <>
                <input
                  value={formdata.password}
                  onChange={(e) =>
                    setformdata({ ...formdata, [e.target.id]: e.target.value })
                  }
                  type="text"
                  id="password"
                  placeholder="Password"
                  required // Ensure input is mandatory
                />
              
              </>
            ) : (
              <>
                <input
                  value={formdata.password}
                  onChange={(e) =>
                    setformdata({ ...formdata, [e.target.id]: e.target.value })
                  }
                  type="password"
                  id="password"
                  placeholder="Password"
                  required // Ensure input is mandatory
                />
              
              </>
            )}
          </div>

          {/* Navigation to Login */}
          <span>
            Already have an account?{" "}
            <Link id="goRegister" to="/login">
              Click here
            </Link>
          </span>

          {/* Submit Button */}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
