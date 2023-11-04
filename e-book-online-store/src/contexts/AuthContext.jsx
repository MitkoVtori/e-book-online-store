import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as userService from '../services/userService';

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
        console.log(result)
        setAuth(result);
        navigate('/');
        setAuthError(null)
      }
    } catch (error) {
      setAuthError(error.message);
    }
  }

  const onRegisterSubmit = async (data) => {
    try {

      if (data.password !== data.repassword) {
        setAuthError("Password don't match!");
        return data
      }

      const result = await userService.register(data);
      if (result) {
        const userData = {
          accessToken: result.accessToken,
          email: result.email,
          imageUrl: result.imageUrl,
          phone: result.phone,
          username: result.username,
          _createdOn: result._createdOn,
          _id: result._id
        }
        setAuth(userData);
        navigate('/');
        setAuthError(null)
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
    isAuth: !!auth?.accessToken,
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