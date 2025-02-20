import Layout from './pages/layout/Layout.jsx';
import Notfound from './pages/Notfound/Notfound.jsx';

import Adminpanel from './pages/adminPanel/adminPanel.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './store/store.js';
import AddItem from './pages/Additem/AddItem.jsx';
import { Toaster } from 'react-hot-toast';
import { CartContext, CartProvider } from './context/cartContext.js';
import RegisterGO from './pages/RegisterR/Register.jsx';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';
import BookingForm from './pages/BookingForm/BookingForm.jsx';
import GetBooking from './pages/GetBooking/GetBooking.jsx';
import AllProducts from './pages/AllProducts/AllProducts.jsx';
import ProductsCat from './pages/ProductsCat/ProductsCat.jsx';
import Gallery from './pages/gallery/Gallery.jsx';
import ProductMenu from './pages/ProductMenu/ProductMenu.jsx';
import CartComponent from './pages/Cart/cart.jsx';
import ContactUs from './pages/contactUs/ContactUs.jsx';
import WshListiComponent from './pages/wishList/WishList.jsx';
import RestaurantBooking from './pages/RestaurantBooking/RestaurantBooking.jsx';
import Alluser from './pages/alluser/alluser.jsx';
import Checkout from './pages/CheckOut/CheckOut.jsx';
import OrdersPage from './pages/orders/Order.jsx';


export default function App() {


  let routers=createBrowserRouter([
      {path:"",element:<Layout />,children:[
        
      {path:"/",element:<Home /> },
      {path:"/BookingForm",element:<BookingForm /> },
      {path:"/GetBooking",element:<GetBooking /> },
     
      {path:"/ProductsCat/:category",element:<ProductsCat /> },
      
      
      {path:"/Checkout",element:<Checkout /> },
      {path:"/ContactUs",element:<ContactUs /> },
      {path:"/register",element:<RegisterGO /> },
      {path:"/login",element: <Login />},
      {path:"/Gallery",element: <Gallery />},
      {path:"/ProductMenu",element: <ProductMenu />},
      {path:"*",element: <Notfound/>},
      
 // cart
 {path:"/cart",element:<CartComponent /> },
 {path:"/WishList",element:<WshListiComponent /> },
 {path:"/RestaurantBooking",element:<RestaurantBooking /> },
 
 
      {path:"/admin-panel",element:<Adminpanel /> ,children:[
        {path:"addItem",element:<AddItem /> },
        {index:true,element:<AddItem /> },
        {path:"alluser" ,element:<Alluser /> },
        {path:"allproducts" ,element:<AllProducts /> },
        {path:"allOrders" ,element:<OrdersPage /> },
        
        {index:true,element:<Alluser /> },
        
      ]},
    ]}
  ])
  // GetAllProduct
  
    return <Provider store={store}>
    <CartProvider>  
    <Toaster/>
    <RouterProvider router={routers}></RouterProvider>
    </CartProvider>
  </Provider>

  }