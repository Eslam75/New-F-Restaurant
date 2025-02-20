import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import './ContactNavNavbar.css'
import { FaFacebook } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { Link } from 'react-router-dom';

export default function ContactNavNavbar() {
  const email=localStorage.getItem("email")
  return (
    <div className='ContactNavNavbar'>
      <div className="containerNav">
        <div className="leftNav">
<ul>
  <li> <span><FaPhoneAlt/></span> <span>01065624727</span></li>
  <li><span><IoIosMail/></span><span>{email}</span></li>
</ul>
        </div>
        <div className="rightNav">
<ul className='sociaMedia'>
<li><FaFacebook/></li>
<li><CiTwitter/></li>
<li><CiInstagram/></li>
</ul>
<Link id='Link' to={"/BookingForm"} ><button className='BookNow'>Book Now</button></Link>
        </div>
      </div>
    </div>
  )
}
