import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import Header from '../Header/Header'

export default function MasterLayout() {
  return (
    <>
    <div className="d-flex vh-100">
      <div >
        <SideBar/>
      </div>
      <div className="w-100">
        <NavBar/>
        <Outlet/>
      </div>

    </div>
      
    </>
  )
}
