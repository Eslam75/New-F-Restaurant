import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [countCart, setCountCart] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [countWishlist, setCountWishlist] = useState(0);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const token = localStorage.getItem("token");

  // Fetch Cart
  const getCart = useCallback(async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_FRONTEND_URL}/cart`, {
        headers: { token }
      });
      if (data.success) {
        setCart(data.data);
        setCountCart(data.count);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [token]);

  // Fetch Wishlist
  const getWishlist = useCallback(async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_FRONTEND_URL}/getwishlist`, {
        headers: { token }
      });
      if (data.success) {
        setWishlist(data.data);
        setCountWishlist(data.count);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }, [token]);

  // Add to Cart
  const addToCart = async (productId) => {
    try {
      const { data } = await axios.post(
       `${process.env.REACT_APP_FRONTEND_URL}/addToCart`,
        { productId },
        { headers: { token } }
      );

      toast.success(data.message);
      if (data.success) getCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  // Add to Wishlist
  const addToWishlist = async (productId) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_FRONTEND_URL}/addToWishlist`,
        { productId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getWishlist();
      } else if (data.found) {
        toast.success("Product already exists", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
          icon: "🔥",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  // Remove from Cart
  const removeFromCart = async (productId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_FRONTEND_URL}/removeproduct/${productId}`,
        { headers: { token } }
      );

      if (data.success) {
        getCart();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  // Delete All Cart Items
  const deleteAllCartItems = async () => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_FRONTEND_URL}/deleteAllCartItems`, {
        headers: { token }
      });

      if (data.success) {
        toast.success("All products deleted");
        setCart([]);
        setCountCart(0);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  useEffect(() => {
    if (cart.length === 0) {
      getCart();
    }
    getCart();
    getWishlist();
  }, [cart,getCart, getWishlist]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        countCart,
        addToCart,
        getCart,
        removeFromCart,
        deleteAllCartItems,
        wishlist,
        setWishlist,
        countWishlist,
        getWishlist,
        addToWishlist,
        currentTime,
        setCurrentTime
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
