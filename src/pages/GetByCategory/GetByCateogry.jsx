import React, { useContext, useEffect, useState } from 'react';
import getByCategoryFun from '../../common/getByCategory.js';
import { toast } from 'react-toastify';
import './getByCategory.css'; // Import CSS file
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import { CartContext } from '../../context/cartContext.js';

export default function GetByCategory({ heading, category }) {
  const [loading, setLoading] = useState(false);
  const { addToCart,addToWishlist } = useContext(CartContext);
  const [dataCat, setDataCat] = useState([]);

  const getCategory = async () => {
    setLoading(true);
    try {
      const data = await getByCategoryFun(category);
      if (data.success) {
        setDataCat(data.data);
      }
    } catch (error) {
      toast.error('Error fetching category data');
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false); // تأكد من إيقاف الـ Loading سواء نجحت العملية أو فشلت
    }
  };

  async function addToCartNow(e, id) {
    e.preventDefault();
    try {
      await addToCart(id);
      toast.success('Item added to cart successfully!');
    } catch (error) {
      toast.error('Error adding to cart');
      console.error('Error adding to cart:', error);
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

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className='getByCategory'>
      <h1>{heading}</h1>
  
      {loading ? (
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className='productByCat'>
          {dataCat.map((x, i) => (
            <div key={i} className='dataCat'>
              <img src={`${process.env.REACT_APP_FRONTEND_URL}/images/${x.image[0]}`} alt={x.name} />
              <h1 className='productName'>{x.name}</h1>
              <h1>{x.price}$</h1>
  
              <div className="btnProductCat">
                <button onClick={(e) => addToCartNow(e, x._id)}><FaCartArrowDown /></button>
                <button onClick={(e) => addToWishListNow(e, x._id)} ><FaHeart /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}
