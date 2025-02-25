import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import  './Search.css'
import scrollTop from '../../common/scrollTop.js'
import GetProductCat from '../GetProductByCategory/GetCateogryByCateogy.jsx'


export default function Search() {

  const [loading, setloading] = useState(false)
  const query = useLocation()
  const [data, setdata] = useState([])
  const url=process.env.REACT_APP_FRONTEND_URL
  async function SearchProduct(){
  setloading(true)
  const respo=await fetch(url+"/search"+query.search,{method:"get"})
  setloading(false)
  const respoData=await respo.json()
  setdata(respoData?.data)
console.log(respoData?.data)
}

useEffect(()=>{
  SearchProduct()
},[query])
  return (
    <div className='Search'>
{
  loading&&(
    <i className='fa fa-spin fa-spinner'></i>
  )
}

{data.length!==0&&!loading&&(
<div className='productsSearch'>
<div className="contaienrPorductsSearch">
<GetProductCat heading={data[0].category} category={data[0].category} />
</div>
</div>
)}
    </div>
  )
}  