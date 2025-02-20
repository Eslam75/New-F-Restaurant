import axios from "axios"
import { toast } from "react-toastify";

export async function addToCart(e,id){
    e.preventDefault()
    e.stopPropagation()
    const { data } = await axios.post("http://localhost:5801/addToCart", {
        productId: id
      });


      if(data.success){
        toast("kos omk gamel")
      }
      else{
        toast("kos omk ya 5by")
      }
      }