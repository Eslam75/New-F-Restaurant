import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
// import Navbar from '../Navbar/Navbar'
// import Footer from '../Footer/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '../footer/footer.jsx';
import Navbar from '../NavBar/NavBar.jsx';



export default function Layout() {

  return (
    <>
    <ToastContainer/>
     <Navbar /> 
    <Outlet></Outlet>
     <Footer/> 
    </>
  )
}
