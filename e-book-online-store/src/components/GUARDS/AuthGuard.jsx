/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext";

export default function AuthGuard({children}) {


    const{ isAuth } = useAuthContext();

    if(!isAuth) {
        return <Navigate to= '/login' />
    }

    return children ? children : <Outlet />;
        
    
}


