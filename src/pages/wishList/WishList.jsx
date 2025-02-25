import React, { useContext, useEffect } from 'react';

import './wishlist.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../../context/cartContext.js';

export default function WshListiComponent() {

const { getwishlist,wishlist,addtowishlist,addToCart } = useContext(CartContext);


const addToCartNow = async (e, id) => {
  e.preventDefault(); 
  try {
    const response = await addToCart(id);
    console.log('Item added to cart:', response); 
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};
console.log("wishlist",wishlist)
const removeFromwishlist = async (product) => {
  try {
      const response = await axios.post(`${process.env.REACT_APP_FRONTEND_URL}/deleteProductWishlist`, {
          productId: product._id
      }, {
          headers: {
              token: localStorage.getItem("token"),
          }
      });

      if (response.data.success) {
          getwishlist();
          toast.success(response.data.message);
      }
      else {
          console.warn("Response indicates failure:", response.data);
      }

  }

  catch (error) {
      toast.error("Error increasing quantity:", error.message || error);
  }
  
};






  return (
    <div className="Wishlist-container">
      <div className="headerCart">
        <h2>Shopping Cart</h2>
        <h1>Items count is {wishlist.length}</h1>
      </div>

      {wishlist.length > 0 ? (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th className="imageNone">Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => (
                <tr key={item._id}>

                  <td className="imageNone">


                    <img
                      src={`${process.env.REACT_APP_FRONTEND_URL}/images/${item.productId.image[0]}`}
                      alt={item.productId.name}
                    />
                  </td>
                  <td>{item.productId.name}</td>
                  <td>${item.productId.price.toFixed(2)}</td>
  <td className='Actions'>
    <button onClick={(e) => addToCartNow(e,item.productId)}>add to cart</button>
  <button className='removeWish' onClick={()=>removeFromwishlist(item)}>x</button>
  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

