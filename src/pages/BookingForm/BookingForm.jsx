import { useState } from "react";
import "./bookingForm.css";
import axios from "axios";
import { toast } from "react-toastify";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "guests" ? parseInt(value, 10) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_FRONTEND_URL}/addBooking`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (data.success) {
        toast.success("Table Booked Successfully");
        setFormData({ name: "", email: "", phone: "", date: "", time: "", guests: 1 });
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={formData.name} required onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={formData.email} required onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone" value={formData.phone} required onChange={handleChange} />
      <input type="date" name="date" value={formData.date} required onChange={handleChange} />
      <input type="time" name="time" value={formData.time} required onChange={handleChange} />
      <input type="number" name="guests" min="1" max="10" value={formData.guests} required onChange={handleChange} />
      <button id="BookTable" type="submit">Book Table</button>
    </form>
  );
};

export default BookingForm;
