import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import "./home.css";
import pizza from "./PizzaImage.jpg";
import Gategory from "../Gategory/Gategory.jsx";
import RandomProducts from "../RandomProduct/RandomProduct.jsx";
import { CartContext } from "../../context/cartContext.js";

const Loader = ({ progress }) => (
  <div className="loaderContainer">
    <motion.div
      className="loader"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1 }}
    />
    <span className="loaderText">{progress}%</span>
  </div>
);

export default function Home() {


  const {addToCart,addToWishlist}=useContext(CartContext)

 async function addToCartNow(e,id){
    e.preventDefault()
    try {
      const response = await addToCart(id);
      console.log('Item added to cart:', response);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
 }

 async function addToWishListNow(e,id){
  e.preventDefault()
  try {
    const response = await addToWishlist(id);
    console.log('Item added to cart:', response);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
}

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 200);
            return 100;
          }
          return oldProgress + 1;
        });
      }, 10);
    }
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <>
      <div className="Home">
        {loading ? (
          <Loader progress={progress} />
        ) : (
          <div className="containerHome">
            <img src={pizza} alt="Pizza" className="pizzaImage" />
            <div className="layoutHome">
              <div className="textLayoutHome">
                {[...Array(3)].map((_, index) => (
                  <motion.p
                    className="ParagraphHome"
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                  >
                    Lorem ipsum dolor sit amet consectetur
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Gategory />
      <h1 className="topRated">Top Rated</h1>

      <RandomProducts url="http://localhost:5801/getallproduct" limit={6}>
      
        {(products) => (
          <div className="menu-grid">
            {products.map((item) => (
              <div key={item._id} className="menu-item">
                <img
                  src={`http://localhost:5801/images/${item.image?.[0] || ""}`}
                  alt={item.name}
                />
                <h3 className="menu-item-title">{item.name}</h3>
                <p className="menu-item-description">{item.desc}</p>
                <span className="menu-item-price">${item.price}</span>
                <div className="btn-Actions">
                  <button onClick={(e) => addToCartNow(e,item._id)}>Add to Cart</button>
                  <button onClick={(e) => addToWishListNow(e,item._id)}>Add to Wishlist</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </RandomProducts>
    </>
  );
}
