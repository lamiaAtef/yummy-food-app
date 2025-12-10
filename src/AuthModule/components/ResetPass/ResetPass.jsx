import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import logo from "../../../assets/images/logo.png"
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { EMAIL_VALIDATION, PASSWORD_VALIDATION, REQUIRED_VALIDATION } from '../../../Constants/VALIDATION'
import useToggle from '../../../CustomHook/UseToggle'
import { toast } from 'react-toastify'


export default function ResetPass() {
  let {defaultCol} = useOutletContext()
  const[showPassword,setshowPassword]=useToggle()
  const[showConfirmPassword,setshowConfirmPassword]=useToggle()
   let navigate = useNavigate()
   const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  let onSubmit = async(data) =>{
    try{
         let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset",data)
         navigate("/login")
         toast.success(response.data.message,{autoClose: 2000,pauseOnHover: false})
    }
    catch(error){
      toast.error(error.response.data.message,{autoClose: 2000,pauseOnHover: false})
    }
   
  
  }
  return (
     <div className={`${defaultCol} bg-white p-4`} >
         <div className={`${defaultCol} bg-white p-4 `} >
              <div className=' text-center  '>
                <img src={logo} alt="food-app logo "  className='w-50'/>
              </div>
              <div className="title my-2">
                <h2> Reset  Password</h2>
                <p>Please Enter Your Otp  or Check Your Inbox</p>
              </div>
          </div>
            <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
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
            {/* OTP input */}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
                <input type="text"
                 className="form-control"
                  placeholder="Enter Your OTP" 
                  aria-label="seed" 
                  aria-describedby="basic-addon1"
                  {...register("seed",REQUIRED_VALIDATION)}
                />  
            </div>
            {errors.seed&&<div className='alert alert-danger'>{errors.seed.message}</div>}
            {/* password */}
            <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                      <input
                        type={showPassword?"text":"password"}
                        className="form-control"
                          placeholder="Password" 
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          {...register("password",PASSWORD_VALIDATION)}
                          
                          />
                      <button className='border-0 ' type='button' onClick={setshowPassword}>{showPassword?<i className="fa-solid fa-eye-slash"></i>:<i className="fa-solid fa-eye"></i>}</button>
                      
            </div>
            {errors.password&&<div className='alert alert-danger'>{errors.password.message}</div>}
              
            <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                      <input
                        type={showConfirmPassword?"text":"password"}
                        className="form-control"
                          placeholder="confirmPassword" 
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          {...register("confirmPassword",{...PASSWORD_VALIDATION,validate:value=>value===password || "Passwords do not match"})}
                          
                          />
                      <button className='border-0 ' type='button' onClick={setshowConfirmPassword}>{showConfirmPassword?<i className="fa-solid fa-eye-slash"></i>:<i className="fa-solid fa-eye"></i>}</button>
                      
            </div>
            {errors.confirmPassword&&<div className='alert alert-danger'>{errors.confirmPassword.message}</div>}
            <button className='btn bg-main-color w-100 auth_btn'>Reset Password</button>



    </form>
    </div>
  

  )
}
