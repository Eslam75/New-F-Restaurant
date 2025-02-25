import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Category.css';

export default function Category() {
    const [categories, setCategories] = useState([]);

    async function getCategories() {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_FRONTEND_URL}/getCategoryproduct`);
            if (data.success) {
                setCategories(data.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="category">
            <div className="containerCategory">
                {categories.length > 0 ? (
                    categories.map((item, index) => (
                        <Link className="LinkCategory" key={index} to={`/ProductsCat/${item.category}`}>
                            <div className="categoryItem">
                                <img src={`${process.env.REACT_APP_FRONTEND_URL}/images/${item.image}`} alt={item.category} />
                                <h2 className="categoryNa">{item.category}</h2>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="loadingText">جارٍ تحميل الفئات...</p>
                )}
            </div>
        </div>
    );
}
