import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './gallery.css';

export default function Gallery() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("الكل");

    async function getAllProduct() {
        try {
            const { data } = await axios.get("http://localhost:5801/getallproduct");
            setData(data.data);
            setFilteredData(data.data);
        } catch (error) {
            console.error("حدث خطأ أثناء جلب البيانات:", error);
        }
    }

    useEffect(() => {
        getAllProduct();
    }, []);

    // استخراج الفئات بدون تكرار
    const categories = useMemo(() => {
        return ["الكل", ...new Set(data.map(item => item.category))];
    }, [data]);

    // فلترة الصور بناءً على الفئة
    const filterByCategory = (category) => {
        setSelectedCategory(category);
        if (category === "الكل") {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter(item => item.category === category));
        }
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

            {/* عرض الصور مع أنيميشن سريع */}
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
                                src={item.image?.[0] ? `http://localhost:5801/images/${item.image[0]}` : "/placeholder.png"} 
                                alt="gallery-item" 
                                className="product-image"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
