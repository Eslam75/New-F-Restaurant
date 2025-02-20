import React from 'react'
import Menu from '../Menu/Menu.jsx'

export default function ProductMenu() {
  return (
    <div>

        <Menu heading={"Pizza"} category={"Pizza"}/>
        <Menu heading={"burger"} category={"burger"}/>
        <Menu heading={"pastry"} category={"pastry"}/>
        
    </div>
  )
}
