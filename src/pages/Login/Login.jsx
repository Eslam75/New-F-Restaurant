import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userDetails } from "../../store/user";
import toast from "react-hot-toast";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Errors, setErrors] = useState({})
const [Loading, setLoading] = useState(false)
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const [showpassword, setshowpassword] = useState(false);

  const validateForm = () => {
    let newErrors = {};

  

    if (!formdata.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formdata.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formdata.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };
  async function handleSubmit(e) {
    setLoading(true)
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_FRONTEND_URL}/login`, formdata);
      if (data.success) {
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("address", data.data.address);
        localStorage.setItem("phone", data.data.phone);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.data.role);
        localStorage.setItem("justLoggedIn", "true");
        setLoading(false)
           console.log(data.data.role)
        console.log("token is =<>", data.token);
        // Dispatch user details to Redux
        dispatch(userDetails(data.data));
        // Navigate to homepage
        navigate("/");
      } else {
        toast.error(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    }
  }

  return (
    <div className="signup">
      <div className="containerSignUp">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} id="signUpform">
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
              required // Ensure mandatory input
            />
                        {Errors.email && <p className="error">{Errors.email}</p>}

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
                  required // Ensure mandatory input
                />
                <i
                  onClick={() => setshowpassword(false)}
                  className="fa-solid fa-lock-open pointer"
                ></i>
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
                  required // Ensure mandatory input
                />
                <i
                  onClick={() => setshowpassword(true)}
                  className="fa-solid fa-lock pointer"
                ></i>
              </>
            )}

{Errors.password && <p className="error">{Errors.password}</p>}

          </div>

          {/* Redirect to Register */}
          <span>
            If you don’t have an account, please{" "}
            <Link id="goRegister" to={"/register"}>
              click here
            </Link>
          </span>

          {/* Submit Button */}
          <button id="loginSubmit" type="submit">{Loading ? "Loading..." : "Login"}</button>
        </form>
      </div>
    </div>
  );
}
