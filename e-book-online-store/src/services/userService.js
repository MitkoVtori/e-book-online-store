
import { get, del, post, patch } from "./requester.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const endpoints = {
    "login": "api-accounts/login/",
    "register": "api-accounts/register/",
    "logout": "api-accounts/logout/",
    "reset-password": "api-accounts/password_reset/",
    "profile": "api-accounts/profile/",
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


export async function update(data) {
  
}


export async function logout() {
    try {
       await post(endpoints.logout, {});

    }catch (error) {
        throw error
    }
}

// export async function logout() {
//     try {
//         // Clear user-related information from local storage (example assuming you have a useLocalStorage hook)
//         const [, setLocalStorageState] = useLocalStorage("user", null);
//         setLocalStorageState(null);

//         localStorage.removeItem("user");
//         // Perform the logout request (if necessary)
//         await post(endpoints.logout, {});

//         // Redirect or perform additional logout actions if needed
//     } catch (error) {
//         console.error("Logout error:", error);
//     }
// }

export async function getMyProfile(id) {
    try {
      const result = await get( `${endpoints.profile}${id}/`);
      console.log(result)
      return result
    }catch (error) {
        throw error
    }
}

export async function editMyProfile(id, data) {
    try {
      const {email,
        first_last_name,
        delivery_address,
        phone_number,
        profile_picture} = data;
      let formData = new FormData();
      formData.append("email", email);
      formData.append("first_last_name", first_last_name);
      formData.append("delivery_address", delivery_address);
      formData.append("phone_number", phone_number);
      formData.append("profile_picture", profile_picture);
      const result = await patch( `${endpoints.profile}${id}/edit/`, formData, {
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        });
      console.log(result)
      return result
    }catch (error) {
        throw error
    }
}

export async function deleteMyProfile(id) {
    try {
      const result = await del(`${endpoints.profile}${id}/delete/`);
      console.log(result)
      return result
    }catch (error) {
        throw error
    }
}

export async function resetPasswordRequest(data) {
    try{
        const result = await post(endpoints["reset-password"], data);
        console.log(result)
        return result
    }catch (error) {
        throw error
    }
}

export async function resetPassword(data) {
    try{
        const result = await post(`${endpoints["reset-password"]}confirm/?token=${data.token}`, data);
        console.log(result)
        return result
    }catch (error) {
        throw error
    }
}

