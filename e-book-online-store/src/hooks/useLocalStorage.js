import { useState } from "react";



export const useLocalStorage = (key, initialValue) => {
    const [state, setState] = useState(() => {
        const localStorageState = localStorage.getItem(key);
        if(localStorageState){
            const persistedState = JSON.parse(localStorageState);
            persistedState.accessToken = getCsrfTokenFromCookie();
            return persistedState
        }
        return initialValue
    });

    const setLocalStorageState =  (value) => {
        setState(value);

        value.accessToken = getCsrfTokenFromCookie();


        localStorage.setItem(key, JSON.stringify(value))
    }


    return [
        state,
        setLocalStorageState
    ]
} 

const getCsrfTokenFromCookie = () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('csrftoken=')) {
        return cookie.substring('csrftoken='.length, cookie.length);
      }
    }
    return null;
  };