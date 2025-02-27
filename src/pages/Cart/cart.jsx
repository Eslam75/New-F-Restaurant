import React, { useContext, useEffect } from 'react';
import './cart.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CartContext } from '../../context/cartContext.js';
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CartComponent() {
  const { setCart,cart, getCart,deleteAllCartItems } = useContext(CartContext);
const Location=useLocation()
const navigate=useNavigate()
const removeFromCart = async (product) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_FRONTEND_URL}/removeFromCart`, {
      productId: product._id
    }, {
      headers: {
        token: localStorage.getItem("token"),
      }
    });

    if (response.data.success) {
      toast.success(response.data.message);
      getCart();
    } 
    
    if(cart.length===0){
      window.location.reload()
    }
    else {
      console.warn("Response indicates failure:", response.data);
    }
  } catch (error) {
    toast.error("Error removing item from cart:", error.message || error);
  }
};


  const Quantity = async (product, operation) => {
    const newQty = operation === 'increment' ? product.quantity + 1 : product.quantity - 1;

    if (operation === 'decrement' && product.quantity <= 1) {
      toast.error("Cannot decrement below 1.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_FRONTEND_URL}/updateCart`, {
        quantity: newQty,
        productId: product._id
      }, {
        headers: {
          token: localStorage.getItem("token"),
        }
      });

      if (response.data.success) {
        getCart();
        toast.success(response.data.message);
      } else {
        toast.error("Response indicates failure.");
      }
    } catch (error) {
      toast.error("Error updating quantity:", error.message || error);
    }
  };

  const increaseQty = (product) => Quantity(product, 'increment');
  
  const decreaseQty = (product) => Quantity(product, 'decrement');

  
  
  return (
    <div className="cart-container">
      <div className="headerCart">
        <h2>Shopping Cart</h2>
        <h1>Items count is {cart.length}</h1>
      </div>

      {cart.length > 0 ? (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th className="imageNone">Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td className="imageNone">
                    {item.productId && item.productId.image && item.productId.image[0] ? (
                      <img
                        src={`http://localhost:5801/images/${item.productId.image[0]}`}
                        alt={item.productId.name}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>{item.productId ? item.productId.name : "Product Name Unavailable"}</td>
                  <td>${item.productId ? item.productId.price.toFixed(2) : "0.00"}</td>
                  <td>
                    <div className="quantity-controls">
                      <p onClick={() => decreaseQty(item)}>-</p>
                      <span>{item.quantity}</span>
                      <p onClick={() => increaseQty(item)}>+</p>
                    </div>
                  </td>
                  <td>${(item.productId ? item.productId.price * item.quantity : 0).toFixed(2)}</td>
                  <td>
                    <button className="removeFromCart" onClick={() => removeFromCart(item)}><span>x</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
         <Link id='Link' to={"/Checkout"}> <button >Checkout</button></Link>   
            <h3>
              Total: 
              <span className="cartSalary">
                {cart
                  .reduce((acc, item) => acc + (item.productId ? item.productId.price * item.quantity : 0), 0)
                  .toFixed(2)}$
              </span>
            </h3>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};
