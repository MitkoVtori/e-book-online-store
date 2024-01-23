import { createContext, useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as userService from '../services/userService';
import { saveCookies } from '../services/cookieService';


import { logout as userServiceLogout } from "../services/userService";


export const AuthContext = createContext();

export const AuthProvider = ({
  children
}) => {

  const navigate = useNavigate();

  const [auth, setAuth] = useLocalStorage('user', {});
  const [authError, setAuthError] = useState(null);
  const [, setLocalStorageState] = useLocalStorage("user", null);
  const [openPopupResetRequest, setOpenPopupResetRequest] = useState(false);
  const [openPopupResetPassword, setOpenPopupResetPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const [resetMessage, setResetMessage] = useState("");


  const onLogout = async () => {
    try {
    
      setLocalStorageState(null);
      localStorage.removeItem("user");

    
      await userServiceLogout();

      
      setAuth({});

      await new Promise(resolve => setTimeout(resolve, 0));
        navigate('/news');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };



  const onLoginSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const result = await userService.login(data);
      setIsSubmitting(false);
      if (result) {
        setAuth(result?.user);
        navigate('/');
        setAuthError(null);
      }
    } catch (error) {
      setAuthError(error.message);
      setIsSubmitting(false);
    }
  }

  const onRegisterSubmit = async (formValues) => {
    try {

      if (formValues.password !== formValues.confirmPassword) {
        setAuthError("Password don't match!");
        return formValues
      }

      const {repassword, ...data} = formValues;
      setIsSubmitting(true);
      const result = await userService.register(data);
      setIsSubmitting(false);
      if (result) {
        setAuth(result?.user);
        navigate('/');
      }
    } catch (error) {
      setAuthError(error.message);
      setIsSubmitting(false);
    }
  }

  const onResetPasswordRequestSubmit = async (email) => {
    try {
      setIsSubmitting(true);
      await userService.resetPasswordRequest({email});
      setIsSubmitting(false);
      clearAuthError();
      setOpenPopupResetRequest(false);
      setResetMessage("Паролата Ви е успешно нулирана. Моля, задайте нова парола чрез линка, изпратен на електронната Ви поща.")
    } catch (error) {
      console.log(error)
      setAuthError(error.message);
      setIsSubmitting(false);
    }
  };

  const onResetPasswordSubmit = async (token, password) => {
    try {
      setIsSubmitting(true);
      await userService.resetPassword({token, password});
      setIsSubmitting(false);
      clearAuthError();
      setOpenPopupResetPassword(false);
      searchParams.delete("popupResetPassword");
      setResetMessage("Паролата е успешно променена. Може да влезете в своя акаунт.")
    } catch (error) {
      setIsSubmitting(false);
      setAuthError(error.message);
    }
  };

  // const onLogout = async () => {
  //   await userService.logout();
  //   setAuth({});
  //   navigate('/');
  // }

  // const onLogout = async () => {
  //   try {
  //     setLocalStorageState(null);
  //     localStorage.removeItem("user");
  //     await userServiceLogout();
  //     setAuth({});
  //     navigate('/news');
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   }
  // };


  // const onLogout = () => {
  //   try {
  //     localStorage.removeItem("user");
  //     setAuth({}); 
  //     navigate('/'); 
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   }
  // };

  const clearAuthError = () => {
    setAuthError(null);
  }

  const context = {
    onLoginSubmit,
    onRegisterSubmit,
    onLogout,
    clearAuthError,
    authError,
    onResetPasswordRequestSubmit,
    onResetPasswordSubmit,
    openPopupResetRequest, 
    setOpenPopupResetRequest,
    openPopupResetPassword, 
    setOpenPopupResetPassword,
    resetMessage,
    setResetMessage,
    searchParams,
    isSubmitting,
    userId: auth?._id,
    userName: auth?.username,
    phone: auth?.phone,
    email: auth?.email,
    imageUrl: auth?.imageUrl,
    isAuth: !!auth?.email,
  };

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



