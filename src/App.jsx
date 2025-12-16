import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './SharedComponents/components/AuthLayout/AuthLayout'
import Login from './AuthModule/components/Login/Login'
import Register from './AuthModule/components/Register/Register'
import ChangePass from './AuthModule/components/ChangePass/ChangePass'
import ForgetPass from './AuthModule/components/ForgetPass/ForgetPass'
import ResetPass from './AuthModule/components/ResetPass/ResetPass'
import VerifyAccount from './AuthModule/components/VerifyAccount/VerifyAccount'
import NotFound from "./SharedComponents/components/NotFound/NotFound"
import MasterLayout from "./SharedComponents/components/MasterLayout/MasterLayout"
import Dashboard from "./DashboradModule/Dashboard/Dashboard"
import RecipeData from "./RecipeModule/components/RecipeData/RecipeData"
import RecipesList from './RecipeModule/components/RecipesList/RecipesList'
import CategoryData from "./CategoryModule/components/CategoryData/CategoryData"
import CategoryList from "./CategoryModule/components/CategoriesList/CategoriesList"
import UsersList from "./UserModule/components/UsersList/UsersList"
import { ToastContainer } from 'react-toastify'
import { SidebarProvider } from './context/SidebarContext'




function App() {
  const routes = createBrowserRouter([
    {
      path:"",
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Login/>},
        {path:"login",element:<Login/>},
        {path:"register",element:<Register/>},
        {path:"change-pass",element:<ChangePass/>},
        {path:"forget-pass",element:<ForgetPass/>},
        {path:"reset-pass",element:<ResetPass/>},
        {path:"verify-account",element:<VerifyAccount/>},
      ]
    },
    {
      path:"dashboard",
      element:<MasterLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Dashboard/>},
        {path:"recipes",element:<RecipesList/>},
        {path:"recipe-date",element:<RecipeData/>},
        {path:"categories",element:<CategoryList/>},
        {path:"category-data",element:<CategoryData/>},
        {path:"users",element:<UsersList/>}

      ]
    }
  ])
  return (
    <>
      <ToastContainer/>
      <SidebarProvider>
      <RouterProvider router={routes}></RouterProvider>
    </SidebarProvider>
    </>
  )
}

export default App
