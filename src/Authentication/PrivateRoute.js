import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const PrivateRoute = ({ children }) => {


  const token = localStorage.getItem('token');


  // Your authentication logic goes here...
  console.log(token);
  if (token) {
    return children ? children : <Outlet />;

  }
  return <Navigate to='/' />

};
export default PrivateRoute;