import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCartArrowDown, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { CartContext } from "../../context/cartContext";
import "./NavPage.css";

export default function NavPage() {
  const { countCart, countWishlist } = useContext(CartContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  function handleAuth() {
    if (isLoggedIn) {
      localStorage.clear();
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="NavPage">
      <div className="containerNavPage">
        <div className="leftNavPage">
          <Link to="/" className="logo">
            <h1>LogoCorner</h1>
          </Link>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className={`rightNavPage ${menuOpen ? "active" : ""}`}>
          <ul>
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              <li>Home</li>
            </Link>
            <Link to="/ProductMenu" className="nav-link" onClick={() => setMenuOpen(false)}>
              <li>Menu</li>
            </Link>
            <Link to="/ContactUs" className="nav-link" onClick={() => setMenuOpen(false)}>
              <li>Contact Us</li>
            </Link>
            <Link to="/Gallery" className="nav-link" onClick={() => setMenuOpen(false)}>
              <li>Gallery</li>
            </Link>
            <Link to="/GetBooking" className="nav-link" onClick={() => setMenuOpen(false)}>
              <li>Booking</li>
            </Link>
            <Link to="/cart" className="nav-link" onClick={() => setMenuOpen(false)}>
              <button className="cart">
                <FaCartArrowDown />
                {countCart > 0 && <span className="count">{countCart}</span>}
              </button>
            </Link>
            <Link to="/WishList" className="nav-link" onClick={() => setMenuOpen(false)}>
              <button className="cart">
                <FaHeart />
                {countWishlist > 0 && <span className="count">{countWishlist}</span>}
              </button>
            </Link>
            {isLoggedIn && localStorage.getItem("role") === "admin" && (
              <Link to="/admin-panel" className="nav-link" onClick={() => setMenuOpen(false)}>
                <button className="admin-btn">Admin Panel</button>
              </Link>
            )}
            <button className={`auth-btn ${isLoggedIn ? "logout" : "login"}`} onClick={handleAuth}>
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}
