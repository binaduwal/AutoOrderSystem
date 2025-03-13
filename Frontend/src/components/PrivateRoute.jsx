import { Navigate, Outlet, useLocation } from "react-router-dom"

const PrivateRoute = ({ requiredRole }) => {
  const isAuthenticated = sessionStorage.getItem("token")
  const userRole = sessionStorage.getItem("userRole")
  const location = useLocation()

  const isCompanyRoute = location.pathname.startsWith('/company')

  if (!isAuthenticated) {
    return (
      <Navigate
        to={isCompanyRoute ? "/login" : "/"}
        replace
        state={{ 
          message: "You need to log in first",
          from: location 
        }}
      />
    )
  }

  if (requiredRole && userRole !== requiredRole) {
    return (
      <Navigate
        to="/"
        replace
        state={{ 
          message: "You do not have permission to access this page",
          from: location 
        }}
      />
    )
  }

  return <Outlet />
}

export default PrivateRoute