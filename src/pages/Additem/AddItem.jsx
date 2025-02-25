import React, { useRef, useState, useEffect } from "react";
import "./addItem.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddItem({ getAllproduct }) {
  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState([]);
  const [offer, setOffer] = useState(false);
  const [data, setData] = useState({
    name: "",
    desc: "",
    price: "",
    category: "Pizza",  // Set a default category
  });
  

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const clearForm = () => {
    setData({
      name: "",
      desc: "",
      price: "",
      category: "",
    });
    setImage([]);
    setPreview([]);
  };

  // Generate preview URLs
  useEffect(() => {
    if (image.length > 0) {
      const objectUrls = image.map((img) => URL.createObjectURL(img));
      setPreview(objectUrls);

      return () => objectUrls.forEach((url) => URL.revokeObjectURL(url)); // Cleanup
    }
  }, [image]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (image.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("desc", data.desc);
    formData.append("offer", offer);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    image.forEach((img) => formData.append("image", img));

    try {
      const response = await axios.post(`${process.env.REACT_APP_FRONTEND_URL}/addproduct`, formData);
      if (response.data.success) {
        toast.success("Product added successfully!");
      }
    } catch (error) {
      toast.error("Failed to add product.");
    }
  };

  const inputRef = useRef(null);

  return (
    <div className="add-item-container">
      <form onSubmit={onSubmit} className="add-item-form">
        <div className="upload-section">
          <label>Upload Image</label>
          <div className="upload-box" onClick={() => inputRef.current.click()}>
            <input
              multiple
              name="image"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(Array.from(e.target.files))}
              className="hidden-input"
              type="file"
              ref={inputRef}
            />
            {preview.length > 0 ? (
              preview.map((url, index) => <img key={index} src={url} alt={`Selected ${index + 1}`} />)
            ) : (
              <p>Click to Upload</p>
            )}
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input id="name" value={data.name} onChange={handleChangeInput} type="text" required />
        </div>

        <div className="input-group">
          <label htmlFor="desc">Description</label>
          <textarea id="desc" value={data.desc} onChange={handleChangeInput} rows="4" required />
        </div>

        <div className="input-group">
          <label htmlFor="price">Price ($)</label>
          <input id="price" value={data.price} onChange={handleChangeInput} type="number" required />
        </div>

        <div className="input-group">
          <label htmlFor="offer">Offer</label>
          <select id="offer" value={offer} onChange={(e) => setOffer(e.target.value === "true")}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="category">Category</label>
          <select id="category" value={data.category} onChange={handleChangeInput}>
            <option value="Pizza">Pizza</option>
            <option value="pastry">pastry</option>
            <option value="burger">burger</option>
            <option value="mobile">Mobile</option>
            <option value="tablet">Tablet</option>
          </select>
        </div>

        <button className="btn-submit" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}
