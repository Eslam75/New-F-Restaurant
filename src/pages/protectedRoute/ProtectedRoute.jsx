import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // استيراد jwt-decode لفك التوكن

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // تحويل الوقت الحالي إلى ثوانٍ

console.log("decodedToken",decodedToken)
console.log(decodedToken.exp,"<=>",currentTime)

if(decodedToken.exp > currentTime){
  console.log(true)
}else{
  console.log(false)
}
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token"); // إزالة التوكن المنتهي
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token"); // إزالة التوكن غير الصالح
    return <Navigate to="/login" />;
  }

  return children;
}
