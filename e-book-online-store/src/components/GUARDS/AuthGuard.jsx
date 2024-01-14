import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext";

export default function AuthGuard() {

    const{ isAuth } = useContext(useAuthContext);

    if(!isAuth) {
        return <Navigate to= '/login' />
    }

    return  < Outlet />
        
    
}


