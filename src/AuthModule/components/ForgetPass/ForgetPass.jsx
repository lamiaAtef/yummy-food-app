import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import logo from "../../../assets/images/logo.png"
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'
import { EMAIL_VALIDATION } from '../../../Constants/VALIDATION'

export default function ForgetPass() {
  let {defaultCol} = useOutletContext()
   let navigate = useNavigate()
     const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    let onSubmit = async(data) =>{
    try{
        let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",data)
        toast.success(response.data.message)
        navigate("/reset-pass")
       
    }
    catch(error){
       toast.error(error.response.data.message)
    }
  }
  return (
     <div className={`${defaultCol} bg-white p-4`} >
        <div className="text-center">
          <img src={logo} alt="food-app logo"  className='w-50'/>
        </div>
        <div className="title my-2">
          <h2>Forgot Your Password?</h2>
          <p>No worries! Please enter your email and we will send a password reset link </p>
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
                 <button className='btn bg-main-color w-100 auth_btn'>Submit</button>
          </form>
    </div>
  )
}
