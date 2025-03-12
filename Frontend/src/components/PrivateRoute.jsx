import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = sessionStorage.getItem("token");
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/"
      replace
      state={{ message: "You need to log in first",
        from: location 
       }}
    />
  );
};

export default PrivateRoute;
