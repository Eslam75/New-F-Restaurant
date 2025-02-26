import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './allProducts.css';
import { toast } from 'react-toastify';

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false); // تعديل الاسم إلى حرف صغير لمطابقة المعايير

    const getAllProduct = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_FRONTEND_URL}/getallproduct`);
            if (data.success) {
                setProducts(data.data);
            }
        } catch (error) {
            console.error("Error fetching products", error);
            toast.error("Failed to fetch products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllProduct();
    }, []);

    async function deleteProduct(id) {
        setLoading(true); // منع المستخدم من حذف أكثر من منتج أثناء التحميل
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_FRONTEND_URL}/removeproduct/${id}`);
            if (data.success) {
                toast.success("Product deleted successfully");
                getAllProduct();
            }
        } catch (error) {
            console.error("Error deleting product", error);
            toast.error("Failed to delete product.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='all-products-container'>
            {loading ? (
                <p className='loading-message'>Loading products...</p> // رسالة تحميل
            ) : (
                products.length > 0 ? (
                    products.map((product, i) => (
                        <div className='product-card' key={i}>
                            <img src={`${process.env.REACT_APP_FRONTEND_URL}/images/${product.image[0]}`} alt={product.name} />
                            <h2>{product.name}</h2>
                            <p>Price: ${product.price}</p>
                            <p>{product.desc || "No description available."}</p>
                            <p className={`removeBtn ${loading ? 'disabled' : ''}`} onClick={() => !loading && deleteProduct(product._id)}>x</p>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )
            )}
        </div>
    );
}
