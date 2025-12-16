import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar"; 
import NavBar from "../NavBar/NavBar"
import { useSidebar } from "../../../context/SidebarContext";

export default function MasterLayout() {
  const {collapsed, setCollapsed,sidebarWidth} = useSidebar();

  return (
    <div className="d-flex">
      <div
        style={{
          position: 'fixed',
          width: `${sidebarWidth}px`,
          height: '100vh',
          zIndex: 1,
          background: '#fff',
           transition: "width .4s " 
        }}
      >
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <div
        style={{
          marginLeft: `${sidebarWidth}px`,
          height: '100vh',
          overflowY: 'auto',
          width: `calc(100% - ${sidebarWidth}px)`
          
        }}
      >
        <NavBar />
        <Outlet />
      </div>
    </div>
  )
}
