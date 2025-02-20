import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { CartContext } from '../../context/cartContext.js';


export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}
