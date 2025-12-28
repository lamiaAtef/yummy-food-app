import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

export default function ProtectedRoute({ children, allowedRoles }) {
  const { loginData, loading } = useContext(AuthContext)
console.log("TOKEN:", localStorage.getItem("token"))
console.log("LOGIN DATA:", loginData)
console.log("LOADING:", loading)

  // loader أثناء فك التوكن
  if (loading) {
    return (
      <div className='d-flex align-items-center justify-content-center vh-100'>
        <BeatLoader size={30} color='#288131' margin={10} />
      </div>
    )
  }

  // لو مش logged in
  if (!localStorage.getItem("token") || !loginData) {
    return <Navigate to="/" replace />
  }

  // لو role مش مسموح
  if (allowedRoles && !allowedRoles.includes(loginData.userGroup)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}
