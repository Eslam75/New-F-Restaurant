import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import './order.css'
import { CartContext } from "../../context/cartContext.js";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:5801/orders");
      if (data.success) {
        setOrders(data.data);
      } else {
        toast.error("فشل تحميل الطلبات");
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء تحميل الطلبات");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
   

    fetchOrders();
  }, []);

 async function deleteOrder(id){
const {data}= await axios.delete(`http://localhost:5801/deleteOrder/${id}`)
if(data.success){

  toast.success("order-Deleted")
  fetchOrders()
}
  }

  const updateStatus = async (orderId, newStatus) => {
    try {
      const { data } = await axios.put(`http://localhost:5801/updatedOrder/${orderId}`, { status: newStatus });
      if (data.success) {
        toast.success("تم تحديث الحالة بنجاح");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        toast.error("فشل تحديث الحالة");
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء تحديث الحالة");
    }
  };

  return (
    <div className="container">
      <h2 className="title">طلبات المستخدمين</h2>
      {loading ? (
        <p>جارٍ التحميل...</p>
      ) : orders.length === 0 ? (
        <p>لا توجد طلبات بعد</p>
      ) : (
        <div className="orders">
          {orders.map((order, key) => (
            <div key={order._id} className="order-card">
              <button onClick={() => deleteOrder(order._id)} className="RemoveBtn">
x
              </button>
              <h3>رقم الطلب: {key + 1}</h3>
              <p><strong>الاسم:</strong> {order.name}</p>
              <p><strong>العنوان:</strong> {order.address}</p>
              <p><strong>رقم الهاتف:</strong> {order.phone}</p>
              <p><strong>الحالة:</strong> {order.status}</p>

              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
              >
                <option value="Pending"> Pending </option>
                <option value="Processing"> Processing</option>
                <option value="Shipped">     Shipped  </option>
                <option value="Delivered">  Delivered  </option>
              </select>

              <h4>🛒 المنتجات:</h4>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.productId?.name || "منتج غير معروف"} - الكمية: {item.quantity}
                  </li>
                ))}
              </ul>
              <p><strong>🕒 تاريخ الطلب:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
