import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './allProducts.css';
import { toast } from 'react-toastify';

export default function AllProducts() {
    const [products, setProducts] = useState([]);

    const getAllProduct = async () => {
        try {
            // const { data } = await axios.get("http://localhost:5801/");
            const { data } = await axios.get(`${process.env.REACT_APP_FRONTEND_URL}/getallproduct`);

            console.log("AllProducts", data.data);
            setProducts(data.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    useEffect(() => {
        getAllProduct();
    }, []);



  async  function deleteProduct(id){
const {data}=await axios.delete(`${process.env.REACT_APP_FRONTEND_URL}/removeproduct/${id}`)
if(data.success){
    toast.success("Product deleted successfully");
    getAllProduct()
}
    }
    return (
        <div className='all-products-container'>
            {products?.map((product, i) => (
                <div className='product-card' key={i}>
                    <img src={`${process.env.REACT_APP_FRONTEND_URL}/images/${product.image[0]}`} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>Price: ${product.price}</p>
                    <p>{product.desc || "No description available."}</p>
                    <p className='removeBtn' onClick={()=>deleteProduct(product._id)}>x</p>
                </div>
            ))}
        </div>
    );
}
