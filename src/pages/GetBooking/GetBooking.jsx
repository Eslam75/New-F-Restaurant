import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import "./getAllBooking.css";

export default function GetBooking() {
  const [bookings, setBookings] = useState([]);

  async function GetAllBooking() {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_FRONTEND_URL}/getAllBooking`);

      if (data.success) {
        const validBookings = data.data.filter(booking => {
          const bookingDate = moment(booking.date, "YYYY-MM-DD");
          return bookingDate.isSameOrAfter(moment(), "day"); // احتفظ فقط بالحجوزات المستقبلية أو اليوم الحالي
        });

        setBookings(validBookings);

        // حذف الحجوزات ذات التواريخ غير الصالحة من قاعدة البيانات
        const invalidBookings = data.data.filter(booking => !validBookings.includes(booking));
        for (const invalid of invalidBookings) {
          await deleteBooking(invalid._id);
        }
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings.");
    }
  }

  async function deleteBooking(bookingId) {
    try {
     const {data}= await axios.delete(`${process.env.REACT_APP_FRONTEND_URL}/deleteBooking/${bookingId}`);
   if(data.success){
    toast.success("Booking deleted successfully.");
    GetAllBooking();
   }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  }

  useEffect(() => {
    GetAllBooking();
  }, []);

  return (
    <div className="get-booking">
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <div key={index} className="booking-card">
            <button className="delete-button" onClick={() => deleteBooking(booking._id)}>x</button>
            <h2>{booking.name}</h2>
            <p>Email: {booking.email}</p>
            <p>Phone: {booking.phone}</p>
            <p>Guests: {booking.guests}</p>
            <p>Date: {moment(booking.date).format("DD-MM-YYYY")}</p>
            <p>Time: {moment(booking.time, "HH:mm").format("hh:mm A")}</p>
          </div>
        ))
      ) : (
        <p className="no-bookings">No bookings available.</p>
      )}
    </div>
  );
}
