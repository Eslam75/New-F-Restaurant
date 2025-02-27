import React from 'react';
import './footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaTripadvisor } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import scrollTop from '../../common/scrollTop.js';

export default function Footer() {
  return (
    <footer className='footer'>
    <div className='footer-container'>
   <Link onClick={scrollTop} id='Link' to={"/"}> <h2 className='footer-logo'>LogoCorner</h2></Link>  
      <div className='footer-social'>
       <a id='socialLink' href="https://www.facebook.com/"><FaFacebookF className='social-icon' /></a> 
      <a id='socialLink' href="https://x.com/home"> <FaTwitter className='social-icon' /></a> 
     <a id='socialLink' href="https://www.instagram.com/"><FaInstagram className='social-icon' /></a>   
      </div>
      <p className='footer-contact'>+123-456-7890</p>
      <p className='footer-email'>info@jalao.com</p>
      <p className='footer-address'>8273 NW 59th ST Miami, Florida</p>
      <p className='footer-copy'>&copy; 2020 Jalao Restaurant & Pizza HTML Template</p>
    </div>
  </footer>
  );
}