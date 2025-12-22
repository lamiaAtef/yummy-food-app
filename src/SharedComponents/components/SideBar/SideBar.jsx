import React, { useContext } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logoSidebar from "../../../assets/images/logo-sidebar.png"
import { useSidebar } from "../../../context/SidebarContext";
import { AuthContext } from '../../../context/AuthContext';

export default function SideBar() {
const {collapsed, setCollapsed,sidebarWidth}=useSidebar()
const{logOut} = useContext(AuthContext)

  return (
    <>

      <div className='bg-sideBar text-light'>
        <Sidebar collapsed={collapsed} >
         <Menu  >
             <div className=' py-5'>
                <img src={logoSidebar} alt="" onClick={()=>setCollapsed(collapsed =>!collapsed)} className='w-100'/>
             </div>
            <MenuItem component={<Link to="/dashboard" />} icon={<i className="fa-regular fa-house"></i>}> Home</MenuItem>
            <MenuItem component={<Link to="/dashboard/users" />} icon={<i className="fa-solid fa-user-group"></i>}> Users</MenuItem>
            <MenuItem component={<Link to="/dashboard/recipes" />} icon={<i className="fa-solid fa-receipt"></i>}> Recipes</MenuItem>
            <MenuItem component={<Link to="/dashboard/categories" />}icon={<i className="fa-solid fa-table"></i>}> Categories</MenuItem>
            <MenuItem  onClick={logOut }component={<Link to="/login" />} icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}> Log out</MenuItem>
          </Menu>
        </Sidebar>
      </div>

    </>
  )
}
