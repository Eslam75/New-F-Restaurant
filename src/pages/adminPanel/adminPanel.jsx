import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './adminPanel.css';
import { FaUsers, FaBoxOpen, FaClipboardList, FaPlus, FaUserCircle } from 'react-icons/fa';

export default function AdminPanel() {
  return (
    <div className='admin-container'>
      <aside className='sidebar'>
        <div className='user-info'>
          <FaUserCircle size={50} className='user-avatar' />
          <h2>Eslam Hekal</h2>
          <p className='user-role'>General</p>
        </div>
        <nav>
          <ul>
            <li><Link to='addItem'><FaPlus /> Add Item</Link></li>
            <li><Link to='alluser'><FaUsers /> All Users</Link></li>
            <li><Link to='allproducts'><FaBoxOpen /> All Products</Link></li>
            <li><Link to='allOrders'><FaClipboardList /> All Orders</Link></li>
          </ul>
        </nav>
      </aside>
      <main className='admin-main'>
        <Outlet />
      </main>
    </div>
  );
}
