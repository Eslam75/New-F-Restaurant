import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RandomProducts({ url, limit = 5, children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      const randomData = response.data.data
        .sort(() => Math.random() - 0.5) // ترتيب عشوائي
        .slice(0, limit); // أخذ عدد معين من العناصر
      setData(randomData);
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, limit]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return children(data);
}
