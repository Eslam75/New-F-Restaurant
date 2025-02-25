import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './productDet.css'
import CountdownTimer from '../CountDownTimer/CountDown.jsx'
import GetProductCat from '../GetProductByCategory/GetCateogryByCateogy.jsx'
import { CartContext } from '../../context/cartContext.js'
import toast from 'react-hot-toast'

export default function ProductDet() {
    const [Loading, setLoading] = useState(false)
    const [Data, setData] = useState({})
    const [selected, setselected] = useState(0)
    const {id}=useParams()
    console.log(id,"id")
    const {addToCart,addtowishlist,getCart}=useContext (CartContext)
    const addToCartNow = async (e, id) => {
      e.preventDefault(); 
      try {
        const response = await addToCart(id);
        console.log('Item added to cart:', response); 
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    };
    const addToWishList = async (e, id) => {
      e.preventDefault(); 
      try {
        const response = await addtowishlist(id);
        console.log('Item added to cart:', response); 
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    };
        console.error('Error adding to cart:'); // Log any error that occurs


 async function getProductDet(){
    setLoading(true)
    const {data}=await axios.get(`${process.env.REACT_APP_FRONTEND_URL}/getproductDet/${id}`)
    if(data.success){
        setData(data.data)
        console.log("DATA IS ",Data)
        setLoading(false)
        console.log("DATA",Data)
    }
 }
 useEffect(()=>{
  getProductDet()
 },[id])

  return (
    <div className='product-det'>
    <div className="container-product-det">
      <div className="left-side-product-det">
        <div className="images-product-det">
        
        </div>

        <div className="main-img">
          <img src={`${process.env.REACT_APP_FRONTEND_URL}/images/`+(Data.image && Data.image[0])} alt="Main Product" />
        </div>
      </div>

      <div className="right-side-product-det">
        <div className="info">
          <h1 className='capitalize'>{Data.name}</h1>
          <p className='capitalize'>{Data.price}$</p>
          <p className='capitalize'>{Data.desc}</p>
        </div>

        <div className="timer-discount">
          <p><span><i className="fa-solid fa-clock"></i></span> Hurry up! Sale Ends in</p>
          <CountdownTimer targetDate="2025-09-01T16:51:00" />
        </div>

        <div className="cart">
          <div onClick={(e) => addToCartNow(e, Data._id)} className="add-cart">
            <button className='pointer'><span>add to cart</span></button>
          </div>
          <div onClick={(e) => addToWishList(e, Data._id)} className="wish-list">
            <p className='pointer'> <i className='fa-solid fa-heart'></i></p>
          </div>
        </div>
      </div>
    </div>

    {Data?.category && <GetProductCat heading={"This is recommended for you"} category={Data?.category} />}
  </div>
);
  
}
