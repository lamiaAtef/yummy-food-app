import React from 'react'
import { Outlet ,useOutletContext} from 'react-router-dom'

export default function AuthLayout() {
   let defaultCol = "col-md-7 col-lg-5";
  return (
    <>
    <div className='auth-container '>
        <div className="container-fluid bg-overlay  ">
          <div className="row  vh-100  justify-content-center align-items-center ">
               <Outlet context={{defaultCol}}/>
          </div> 
        </div>
      </div>     
    </>
  )
}
