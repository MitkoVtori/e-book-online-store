import { useState } from "react";
// import bcrypt from "bcryptjs"; 



export const useLocalStorage = (key, initialValue) => {
    const [state, setState] = useState(() => {
        try {
            const localStorageState = localStorage.getItem(key);
            if (localStorageState) {
                const persistedState = JSON.parse(localStorageState);
                return persistedState;
            }
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
        }
        return initialValue;
    });

    const setLocalStorageState = async (value) => {
        try {
         if (value) {
             
                // const hashedPassword = await bcrypt.hash(value.password, 10);
                // const hashedValue = { ...value, password: hashedPassword };
                const {password, ...newValue } = value
                setState(newValue);
                localStorage.setItem(key, JSON.stringify(newValue));
            } 
        } catch (error) {
            
            console.error("Error hashing password:", error);
        }
    };



    return [state, setLocalStorageState];
};
