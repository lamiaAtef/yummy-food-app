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
import MasterLayout from "./SharedComponents/components/MasterLayout/MasterLayout"
import Dashboard from "./DashboradModule/Dashboard/Dashboard"
import RecipeData from "./RecipeModule/components/RecipeData/RecipeData"
import RecipesList from './RecipeModule/components/RecipesList/RecipesList'
import CategoryData from "./CategoryModule/components/CategoryData/CategoryData"
import CategoryList from "./CategoryModule/components/CategoriesList/CategoriesList"
import UsersList from "./UserModule/components/UsersList/UsersList"
import { ToastContainer } from 'react-toastify'
import { SidebarProvider } from './context/SidebarContext'
import AuthContextProvider, { AuthContext } from './context/AuthContext'
import ProtectedRoute from './SharedComponents/components/ProtectedRoute/ProtectedRoute'
import CategoryContextProvider from './context/CategoryContext'
import UsersContext from './context/UsersContext'
import UsersContextProvider from './context/UsersContext'
import RecipesContextProvider from './context/RecipesContext'
import Favourites from './Favourites/Favourites'
import NotFound from './SharedComponents/components/NotFound/NotFound'




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
      element:(<ProtectedRoute allowedRoles={['SuperAdmin','SystemUser']}> <MasterLayout/> </ProtectedRoute>),
      errorElement:<NotFound/>,
      children:[
        {index:true, element:<ProtectedRoute allowedRoles={['SuperAdmin','SystemUser']}><Dashboard/></ProtectedRoute> },
        //  admin page
        {path:"recipes",element:<ProtectedRoute allowedRoles={['SuperAdmin','SystemUser']}><RecipesList/></ProtectedRoute>},
        {path:"recipe-date/:id?",element:<ProtectedRoute allowedRoles={['SuperAdmin']}><RecipeData/> </ProtectedRoute>},
        {path:"categories",element:<ProtectedRoute allowedRoles={['SuperAdmin']}><CategoryList/> </ProtectedRoute>},
        {path:"category-data",element:<ProtectedRoute allowedRoles={['SuperAdmin']}><CategoryData/> </ProtectedRoute>},
        {path:"users",element:<ProtectedRoute allowedRoles={['SuperAdmin']}>  <UsersList/> </ProtectedRoute>},
        // user page
        {path:"favourite",element:<ProtectedRoute allowedRoles={['SystemUser']}><Favourites/>  </ProtectedRoute>},
      ]
    }
  ])
  return (
    <>
      <ToastContainer/>
      {/* <AuthContextProvider> */}
        <RecipesContextProvider>
        <CategoryContextProvider>
     <UsersContextProvider>
      <SidebarProvider>
      <RouterProvider router={routes}></RouterProvider>

    </SidebarProvider>
    </UsersContextProvider>
    </CategoryContextProvider>
    </RecipesContextProvider>
    {/* </AuthContextProvider> */}
    </>
  )
}

export default App
