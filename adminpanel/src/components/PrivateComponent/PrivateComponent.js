import React from "react";
import { Navigate, Outlet } from 'react-router-dom';

//to create protected routes
const PrivateComponent = () => {
    const auth = localStorage.getItem('admin');  //(key jo hmne define ki thi in login)  //checking authentication
    return auth?<Outlet />:<Navigate to="/login" />   //outlet handles our components which we pass as a props
}

export default PrivateComponent;