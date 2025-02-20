import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5801";

const RestaurantBooking = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/tables`)
      .then((res) => res.json())
      .then((data) => setTables(data))
      .catch((err) => console.error("Error fetching tables:", err));
  }, []);

  const toggleReservation = async (id) => {
    try {
      const res = await fetch(`${API_URL}/tables/${id}`, { method: "PUT" });
      const data = await res.json();
      setTables((prev) =>
        prev.map((table) =>
          table._id === id ? { ...table, isReserved: data.table.isReserved } : table
        )
      );
    } catch (err) {
      console.error("Error updating table:", err);
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {tables.map((table) => (
        <div
          key={table._id}
          onClick={() => toggleReservation(table._id)}
          style={{
            width: "100px",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: table.isReserved ? "red" : "green",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "8px",
          }}
        >
          Table {table.tableNumber}
        </div>
      ))}
    </div>
  );
};

export default RestaurantBooking;
