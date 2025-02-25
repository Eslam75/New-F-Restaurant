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

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const [showpassword, setshowpassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_FRONTEND_URL}/login`, formdata);
      if (data.success) {
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("address", data.data.address);
        localStorage.setItem("phone", data.data.phone);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.data.role);
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
          </div>

          {/* Redirect to Register */}
          <span>
            If you don’t have an account, please{" "}
            <Link id="goRegister" to={"/register"}>
              click here
            </Link>
          </span>

          {/* Submit Button */}
          <button id="loginSubmit" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
