import React, { use, useState } from 'react'
import logo from "../../../assets/images/logo.png"
import { useForm } from 'react-hook-form'
import { Link, useOutletContext } from 'react-router-dom'
import {  EMAIL_VALIDATION, NAME_VALIDATION, PASSWORD_VALIDATION, PHONE_VALIDATION, REQUIRED_VALIDATION } from '../../../Constants/VALIDATION'
import axios from 'axios'
import useToggle from '../../../CustomHook/UseToggle'
export default function Register() {
  const[showPassword,setshowPassword]=useToggle()
  const[showConfirmPassword,setshowConfirmPassword]=useToggle()
  let {defaultCol} = useOutletContext()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
   } = useForm()
 const password = watch("password");
   let onSubmit = async(data) =>{
    try{
          let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Register",data)
          console.log(response)

    }
    catch(error){
      console.log(error)
    }
   }
  return (
     <div className={`${defaultCol} bg-white p-4`} >
      <div className='text-center '>
        <img src={logo} alt="food-app logo "  className='w-50'/>
      </div>
      <div className='text my-2'>
        <h2>Register</h2>
        <p>Welcome Back! Please enter your details</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="row">
          {/* userName */}
          <div className='col-lg-6 col-md-12'>
                <div className="input-group mb-3  ">
                      <span className="input-group-text" id="basic-addon1"><i className="far fa-user"></i></span>
                      <input type="text"
                        className="form-control"
                        placeholder="Enter Your Name" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        {...register("userName",NAME_VALIDATION)}
                        />
                      
                </div>
                {errors.userName&&(
                <div className='alert alert-danger'>{errors.userName.message}</div>)}
          </div>
               {/* email */}
          <div className='col-lg-6 col-md-12'>
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
                {errors.email&&(
                  <div className='alert alert-danger'>{errors.email.message}</div>)}
          </div>
          </div>
        {/* another row in form   country , phone */}
        <div className="row">
            {/* country */}
           <div className='col-lg-6 col-md-12'>
                <div className="input-group mb-3  ">
                      <span className="input-group-text" id="basic-addon1"><i className="far fa-flag"></i></span>
                      <input type="text"
                        className="form-control"
                        placeholder="Enter Your Country" 
                        aria-label="country" 
                        aria-describedby="basic-addon1"
                        {...register("country",REQUIRED_VALIDATION)}
                        />
                      
                </div>
                {errors.country&&(
                <div className='alert alert-danger'>{errors.country.message}</div>)}
          </div>
          {/* phone */}
           <div className='col-lg-6 col-md-12'>
                <div className="input-group mb-3  ">
                      <span className="input-group-text" id="basic-addon1"><i className="fas fa-phone-alt"></i></span>
                      <input type="text"
                        className="form-control"
                        placeholder="Enter Your phone" 
                        aria-label="phoneNumber" 
                        aria-describedby="basic-addon1"
                        {...register("phoneNumber",PHONE_VALIDATION)}
                        />
                      
                </div>
                {errors.phoneNumber&&(
                <div className='alert alert-danger'>{errors.phoneNumber.message}</div>)}
          </div>
        </div>
        {/* another row in form   password , confirm password */}
        <div className="row">
          <div className="col-lg-6 col-md-12">
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
          </div>
          <div className="col-lg-6 col-md-12">
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
            
          </div>

        </div>
        {/* login Link then Register Button */}
        <div className='text-end' >
            <Link to="/login" className="text-decoration-none main_color">Login Now?</Link>
        </div>
        <div className="register">
          <button className='btn bg-main-color w-100 auth_btn my-3' >Register</button>
        </div>


     
      </form>
    </div>
  )
}
