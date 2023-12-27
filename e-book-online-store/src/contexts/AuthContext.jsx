import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as userService from '../services/userService';
// import { saveCookies } from '../services/cookieService';

export const AuthContext = createContext();

export const AuthProvider = ({
  children
}) => {

  const navigate = useNavigate();

  const [auth, setAuth] = useLocalStorage('user', {});
  const [authError, setAuthError] = useState(null);

  const onLoginSubmit = async (data) => {
    try {

      const result = await userService.login(data);
      if (result) {
    
        setAuth(result);
        navigate('/');
        setAuthError(null);
      }
    } catch (error) {
      setAuthError(error.message);
    }
  }

  const onRegisterSubmit = async (formValues) => {
    try {

      if (formValues.password !== formValues.repassword) {
        setAuthError("Password don't match!");
        return formValues
      }

      const {repassword, ...data} = formValues;

      const result = await userService.register(data);
      if (result) {
  
        setAuth(result);
        navigate('/');
      
      }
    } catch (error) {
      setAuthError(error.message);
    }
  }

  const onLogout = async () => {
    await userService.logout();
    setAuth({});
    navigate('/');
  }

  const clearAuthError = () => {
    setAuthError(null);
  }

  const context = {
    onLoginSubmit,
    onRegisterSubmit,
    onLogout,
    clearAuthError,
    authError,
    userId: auth?._id,
    userName: auth?.username,
    phone: auth?.phone,
    email: auth?.email,
    imageUrl: auth?.imageUrl,
    isAuth: !!auth?.email,
  }

  return <>

    < AuthContext.Provider value={context} >
      {children}
    </AuthContext.Provider>
  </>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context
}



