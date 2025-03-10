import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './gallery.css';

export default function Gallery() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("الكل");
    const [loading, setLoading] = useState(false); // تم تعديل التسمية

    async function getAllProduct() {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_FRONTEND_URL}/getallproduct`);
            if (data.success) {
                setData(data.data);
                setFilteredData(data.data);
            }
        } catch (error) {
            console.error("حدث خطأ أثناء جلب البيانات:", error);
        } finally {
            setLoading(false); // التأكد من إخفاء التحميل دائمًا
        }
    }

    useEffect(() => {
        getAllProduct();
    }, []);

    const categories = useMemo(() => ["الكل", ...new Set(data.map(item => item.category))], [data]);

    const filterByCategory = (category) => {
        setSelectedCategory(category);
        setFilteredData(category === "الكل" ? data : data.filter(item => item.category === category));
    };

    return (
        <div className="Gallery p-4">
            {/* أزرار الفلترة */}
            <motion.div 
                className="buttons-container"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {categories.map((category, index) => (
                    <motion.button
                        key={index}
                        onClick={() => filterByCategory(category)}
                        className={`filter-button ${selectedCategory === category ? 'bg-blue-700' : ''}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {category}
                    </motion.button>
                ))}
            </motion.div>

            {/* عرض التحميل أثناء جلب البيانات */}
            <AnimatePresence>
                {loading && (
                    <motion.div 
                        className="loading-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div 
                            className="spinner"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        />
                        <p>جاري التحميل...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* عرض الصور مع أنيميشن */}
            {!loading && (
                <motion.div 
                    className="gallery-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <AnimatePresence mode="wait">
                        {filteredData.map((item, index) => (
                            <motion.div 
                                key={item._id} 
                                className="gallery-item"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <motion.img 
                                    src={item.image?.[0] ? `${process.env.REACT_APP_FRONTEND_URL}/images/${item.image[0]}` : "/placeholder.png"} 
                                    alt="gallery-item" 
                                    className="product-image"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
}
