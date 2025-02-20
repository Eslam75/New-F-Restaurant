import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./contactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      
      <div className="contact-card">
        <div className="contact-item">
          <FaMapMarkerAlt className="icon red" />
          <p className="contact-text">123 Food Street, Culinary City, FL 45678</p>
        </div>

        <div className="contact-item">
          <FaPhoneAlt className="icon green" />
          <p className="contact-text">+1 (234) 567-890</p>
        </div>

        <div className="contact-item">
          <FaEnvelope className="icon blue" />
          <p className="contact-text">info@restaurant.com</p>
        </div>

        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="map-container">
        <iframe
          title="Google Maps"
          className="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13806.7144555485!2d31.276462354847563!3d30.103389398299733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581560192b32cd%3A0x5e8a42b754cac3f0!2sAl%20Wayli%2C%20AZ%20Zaytoun%20Al%20Qebleyah%2C%20Amreya%2C%20Cairo%20Governorate%204510243!5e0!3m2!1sen!2seg!4v1739681833371!5m2!1sen!2seg"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;