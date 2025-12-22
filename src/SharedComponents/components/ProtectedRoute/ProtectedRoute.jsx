import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
    let {loginData} = useContext(AuthContext)
   if (!localStorage.getItem("token") && !loginData) {
         return <Navigate to="/" replace />;
     }

  return children;
}
