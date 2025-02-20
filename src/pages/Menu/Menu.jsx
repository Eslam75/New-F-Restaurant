import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './menu.css'
export default function Menu({heading,category}) {
    const [Products, setProducts] = useState([])
    const getAllProduct = async () => {
        const { data } = await axios.get("http://localhost:5801/getallproduct");
        setProducts(data.data)
    }
    useEffect(() => {
        getAllProduct()
    },[])
  return (
    <div className="menu-container">
   

  <div>

  <h1 className='menu-title'>{heading}</h1>

<div className="menu-grid">

  {Products.filter((item) => item.category === category).map((item, index) => (
    <div key={index} className="menu-item">
      <div>
        <img 
                  src={`http://localhost:5801/images/${item.image?.[0] || ""}`}
                  className="menu-item-image" alt="" />
        <h3 className="menu-item-title">{item.name}</h3>
        <p className="menu-item-description">{item.desc}</p>
      </div>
      <span className="menu-item-price">{item.price}$</span>
    </div>
  ))}
</div>
  </div>


     <div>

 
  </div>
  </div>
    )
}
