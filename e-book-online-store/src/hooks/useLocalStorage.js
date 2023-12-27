import { useState } from "react";



export const useLocalStorage = (key, initialValue) => {
    const [state, setState] = useState(() => {
        const localStorageState = localStorage.getItem(key);
        if(localStorageState){
            const persistedState = JSON.parse(localStorageState);
            return persistedState
        }
        return initialValue
    });

    const setLocalStorageState =  (value) => {
        setState(value);


        localStorage.setItem(key, JSON.stringify(value))
    }


    return [
        state,
        setLocalStorageState
    ]
} 




