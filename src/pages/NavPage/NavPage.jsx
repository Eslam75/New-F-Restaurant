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
  const [showNavbar, setShowNavbar] = useState(true);

  const token = localStorage.getItem("token");
  useEffect(() => {
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowNavbar(true);
        document.querySelector(".NavPage").classList.add("fixed");
      } else {
        document.querySelector(".NavPage").classList.remove("fixed");
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`NavPage ${showNavbar ? "visible" : "hidden"}`}>
      <div className="containerNavPage">
        <div className="leftNavPage">
          <Link id="Link" to="/" className="logo">
            <h1>LogoCorner</h1>
          </Link>
        </div>

{token?<>    <div className="MiddleNav">
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
        </div>

        
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button></>:null}

        
    

       
        <div className={`rightNavPage ${menuOpen ? "active" : ""}`}>
          <ul>
         {token?<>   <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
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
            </Link></>:null}
            {isLoggedIn && localStorage.getItem("role") === "admin" && (
              <Link to="/admin-panel" className="nav-link" onClick={() => setMenuOpen(false)}>
                <button className="admin-btn">Admin Panel</button>
              </Link>
            )}
            {isLoggedIn?<Link to="/BookingForm" className="nav-link" onClick={() => setMenuOpen(false)}>
              <button className="book-table-btn">Book A Table</button>
            </Link>:null}
            <button className={`auth-btn ${isLoggedIn ? "logoutBtn" : "loginAuth"}`} onClick={handleAuth}>
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
