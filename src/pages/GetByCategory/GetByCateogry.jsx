import React, { useContext, useEffect, useState } from 'react';
import getByCategoryFun from '../../common/getByCategory.js';
import { toast } from 'react-toastify';
import './getByCategory.css'; // Import CSS file
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CartContext } from '../../context/cartContext.js';

export default function GetByCategory({ heading, category }) {
    const {addToCart}=useContext(CartContext)
    const [dataCat, setDataCat] = useState([]);

    const getCategory = async () => {
        const data = await getByCategoryFun(category);
        if (data.success) {
            setDataCat(data.data);
        }
    };

  async function addToCartNow (e, id)  {
        e.preventDefault();
        try {
          const response = await addToCart(id);
          toast.success('Item added to cart successfully!');
        } catch (error) {
          toast.error('Error adding to cart');
          console.error('Error adding to cart:', error);
        }
    }

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <div className='getByCategory'>
            <h1>{heading}</h1>

        <div className='productByCat'>
        {dataCat.map((x, i) => (
                <div key={i} className='dataCat'> 
                    <img  src={`http://localhost:5801/images/${x.image[0]}`} alt={x.name} />
                    <h1>{x.name}</h1>

                  <div className="btnProductCat">
                    <button onClick={(e) => addToCartNow(e, x._id)}><FaCartArrowDown/></button>
                    <button><FaHeart/></button>
                  </div>
                </div>
            ))}
            </div>    
        </div>
    );
}
