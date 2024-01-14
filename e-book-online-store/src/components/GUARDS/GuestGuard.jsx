import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";



export default function GuestGuard(){

    const{ isAuth } = useContext(useAuthContext);
    if(isAuth) {

        return <Navigate to='/' />
    }

    return  <Outlet />
        
    
}

