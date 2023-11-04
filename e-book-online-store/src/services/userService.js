import { get, post } from "./requester.js";



const endpoints = {
    "login": "/users/login",
    "register": "/users/register",
    "logout": "/users/logout",
 

}

export async function login(data) {
    try {
        const result = await post(endpoints.login, data);
        return result
    } catch (error){
        throw error
    }
}

export async function register(data) {
    try{
        const result = await post(endpoints.register, data);
        return result
    }catch (error) {
        throw error
    }
}

export async function logout() {
    try {
        get(endpoints.logout);
    }catch (error) {
        console.log(error.message)
    }
}