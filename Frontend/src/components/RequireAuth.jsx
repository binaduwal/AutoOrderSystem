import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const isAuthenticated = () => {
  return localStorage.getItem('userToken') !== null
}

const RequireAuth = () => {
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default RequireAuth
