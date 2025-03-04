import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./menu.css";
import { CartContext } from "../../context/cartContext";

export default function Menu({ heading, category }) {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // حالة التحميل
  const { addToCart, addToWishlist } = useContext(CartContext);

  async function addToCartNow(e, id) {
    e.preventDefault();
    try {
      const response = await addToCart(id);
      console.log("Item added to cart:", response);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  async function addToWishListNow(e, id) {
    e.preventDefault();
    try {
      const response = await addToWishlist(id);
      console.log("Item added to wishlist:", response);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  }

  const getAllProduct = async () => {
    try {
      setLoading(true); // بدأ التحميل
      const { data } = await axios.get(
        `${process.env.REACT_APP_FRONTEND_URL}/getallproduct`
      );
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // انتهاء التحميل
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="menu-container">
      <h1 className="menu-title">{heading}</h1>

      {loading ? ( // عرض التحميل إذا كان loading = true
        <div className="loading-container">
          <p> 
          <i className="fas fa-spinner"></i>
          جارِ التحميل...
          </p>
        </div>
      ) : (
        <div className="menu-grid">
          {Products.filter((item) => item.category === category).map(
            (item, index) => (
              <div key={index} className="menu-item">
                <div>
                  <img
                    src={`${process.env.REACT_APP_FRONTEND_URL}/images/${item.image?.[0] || ""}`}
                    className="menu-item-image"
                    alt=""
                  />
                  <h3 className="menu-item-title">{item.name}</h3>
                  <p className="menu-item-description">{item.desc}</p>
                </div>
                <span className="menu-item-price">{item.price}$</span>
                <div className="btn-Actions">
                  <button onClick={(e) => addToCartNow(e, item._id)}>Add to My Meal</button>
                  <button onClick={(e) => addToWishListNow(e, item._id)}>Favourite Meal</button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

