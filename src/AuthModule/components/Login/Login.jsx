import React, { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import logo from "../../../assets/images/logo.png"
import Password from '../../../minicomponents/Password/Password'
import { useForm } from 'react-hook-form'
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../../Constants/validation.js'
import axios from 'axios'
import { toast } from 'react-toastify'
import useToggle from '../../../hooks/UseToggle'

export default function Login() {
  const[showPassword,setshowPassword]=useToggle()
  let {defaultCol} = useOutletContext()
  let navigate = useNavigate()
   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let onSubmit = async(data) =>{
    try{
         let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login",data)
         navigate("/dashboard")
         localStorage.setItem("token",response.data.token)
         toast.success(response.data.message,{autoClose: 2000,pauseOnHover: false})
    }
    catch(error){
      toast.error(error.response.data.message,{autoClose: 2000,pauseOnHover: false})
    }
   
  
  }
  return (
     <div className={`${defaultCol} bg-white p-4 `} >
      <div className=' text-center  '>
        <img src={logo} alt="food-app logo "  className='w-50'/>
      </div>
      <div className="title my-2">
        <h2>Log In</h2>
        <p>Welcome Back! Please enter your details</p>
      </div>
      <form  onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3  ">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
            <input type="text"
             className="form-control"
              placeholder="Enter Your E-mail" 
              aria-label="Username" 
              aria-describedby="basic-addon1"
              {...register("email",EMAIL_VALIDATION)}
              />
             
        </div>
         {errors.email&&<div className='alert alert-danger'>{errors.email.message}</div>}
          <div className="input-group mb-3 ">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
            <input
             type={showPassword?"text":"password"}
              className="form-control"
               placeholder="Password" 
               aria-label="Username"
                aria-describedby="basic-addon1"
                
                {...register("password",PASSWORD_VALIDATION)}
                
                />
            <span className='d-flex me-2 align-items-center' onClick={setshowPassword}>{showPassword?<i className="fa-solid fa-eye-slash"></i>:<i className="fa-solid fa-eye"></i>}</span>
            
          </div>
          {errors.password&&<div className='alert alert-danger'>{errors.password.message}</div>}

         
        <div className='links d-flex justify-content-between my-2'>
          <Link to="/register" className="text-black text-decoration-none">Register Now?</Link>
          <Link to="/forget-pass"className=" text-decoration-none main_color">Forget Password</Link>
        </div>
        <button className='btn bg-main-color w-100 auth_btn'>Login</button>
      </form>

    </div>
  )
}
