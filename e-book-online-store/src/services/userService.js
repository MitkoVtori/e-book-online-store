import { get, post } from "./requester.js";



const endpoints = {
    "login": "api-accounts/login/",
    "register": "api-accounts/register/",
    "logout": "api-accounts/logout/",
 

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
        console.log(result)
        return result
    }catch (error) {
        throw error
    }
}

export async function logout() {
    try {
        post(endpoints.logout, {});
    }catch (error) {
        console.log(error.message)
    }
}