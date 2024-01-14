import { useState } from "react";
import bcrypt from "bcryptjs"; 



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
         if (value && value.password) {
             
                const hashedPassword = await bcrypt.hash(value.password, 10);
                const hashedValue = { ...value, password: hashedPassword };

                setState(hashedValue);
                localStorage.setItem(key, JSON.stringify(hashedValue));
            } else {
                
                console.error("No password property found in the value.");
            }
        } catch (error) {
            
            console.error("Error hashing password:", error);
        }
    };



    return [state, setLocalStorageState];
};
