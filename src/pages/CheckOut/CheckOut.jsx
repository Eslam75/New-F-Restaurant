import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../../context/cartContext";
import toast from "react-hot-toast";
import "./checkOut.css";

const Checkout = () => {
  const {deleteAllCartItems,getCart}=useContext(CartContext);

  const { cart,setCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const validateForm = () => {
    const { name, address, phone } = formData;
  
    // Trim values to remove unnecessary spaces
    const trimmedName = name.trim();
    const trimmedAddress = address.trim();
    const trimmedPhone = phone.trim();
  
    if (!trimmedName || !trimmedAddress || !trimmedPhone) {
      toast.error("يرجى ملء جميع الحقول المطلوبة!");
      return false;
    }
  
    // Validate Arabic & English names (Allow letters and spaces only)
    if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(trimmedName)) {
      toast.error("يجب أن يحتوي الاسم على أحرف فقط بدون أرقام أو رموز.");
      return false;
    }
  
    // Validate Egyptian phone number format
    if (!/^01[0-25]\d{8}$/.test(trimmedPhone)) {
      toast.error("It must be an 11-digit Egyptian number.");
      return false;
    }
  
    // Ensure cart is not empty
    if (!cart || cart.length === 0) {
      toast.error("السلة فارغة، لا يمكنك إتمام الطلب!");
      return false;
    }
  
    return true;
  };


  const [isSubmitting, setIsSubmitting] = useState(false); // حالة لتتبع إرسال الطلب

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return; // لو الفورم مش صحيح، وقف التنفيذ
    }
  
    console.log("بيانات النموذج قبل الإرسال:", formData);
    console.log("عناصر السلة:", cart);
  
    const orderData = {
      ...formData,
      cartItems: cart,
    };
  
    try {
      setIsSubmitting(true);
      const { data } = await axios.post(`${process.env.REACT_APP_FRONTEND_URL}/addOrder`, orderData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
  
      console.log("استجابة السيرفر:", data);
  
      if (data.success) {
        toast.success("تم الطلب بنجاح!");
        await deleteAllCartItems();
        await getCart();
        setCart([]);
        window.location.reload();
      }
    } catch (error) {
      console.error("خطأ أثناء الطلب:", error.response?.data || error.message);
      toast.error("حدث خطأ أثناء معالجة الطلب.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <h2>إتمام الشراء</h2>
      <form onSubmit={handleSubmit}>
        <input value={formData.name} type="text" name="name" placeholder="الاسم" onChange={handleChange} />
        <input value={formData.address} type="text" name="address" placeholder="العنوان" onChange={handleChange} />
        <input value={formData.phone} type="text" name="phone" placeholder="رقم الهاتف" onChange={handleChange} />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري الإرسال..." : "إتمام الطلب"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
