import axios from 'axios';

export default async function getByCategoryFun(category) {
  try {
    const {data} = await axios.post(
      `${process.env.REACT_APP_FRONTEND_URL}/getByCategory`,
      { category }, // Corrected object structure
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return data; 
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Handle errors gracefully
  }
}
