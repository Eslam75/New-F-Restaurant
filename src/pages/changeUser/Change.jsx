import React, { useState } from 'react'
import './change.css'
import { role } from '../../Role/role.js'
import { toast } from 'react-toastify'
import axios from "axios"
export default function Change({close, getUser,setclose ,nameUser,roleUser,emailUser,idUser}) {


    async function updateUser() {
        const respo= await   axios({
             method: 'post',
             url:`${process.env.REACT_APP_FRONTEND_URL}/updateUser` ,
             headers: {}, 
             data: {
                role:userRole,
                userId:idUser
             }
           });
       
           if(respo.data.success){
            getUser()
             toast.success("anta gd3")
             close()
           }
       
       }



    const [userRole, setuserRole] = useState("admin")
    function handleChangeRole(e){
        setuserRole(e.target.value)
    }
  return (
   <>

   {close? <div className='Change'>
    <div className="containerChange">
            
    <div className="headercontainerChange">

    <h1 className='changeUserRole'>change user role</h1>

    <p id='xxx' onClick={close}><i className="pointer fa-solid fa-x"></i></p>

  </div>
    <p>Name:{nameUser}</p>
    <p>Email :{emailUser}</p>
    <div className="roleUser">
        <div className="leftSideRole">
        <p>Role:{roleUser}</p>
        </div>
        <div className="rightSideRole">
            <select value={userRole} id='opselrole' onChange={handleChangeRole} >
                {Object.values(role).map((x)=>(
                    <option  value={x}>{x}</option>
                ))}
            </select>
        </div>
        
    </div>
    <div className="btnChange">
        <button onClick={updateUser}>change role</button>
    </div>
</div>

    </div>:""}
   </>
  )
}
