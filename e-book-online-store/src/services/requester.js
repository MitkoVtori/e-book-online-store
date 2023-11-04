 const host = 'http://localhost:3000';
 

export async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    if (data) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    // const user = JSON.parse(localStorage.getItem('user'));

    // if( user && user.accessToken !== undefined){
    //     options.headers['X-Authorization'] = user.accessToken;
    // }
    try{
        const response = await fetch(host + url, options);
        if (response.status === 204) {
            return {}
        }
 
        const result = await response.json();
      
        if (!response.ok) {
            throw new Error(result.message);
        }

        if (response.status === 403) {
            return {}
        }
        return result;

    }catch(error){
       throw error
    }
}

export const get = request.bind(null, "GET");
export const post = request.bind(null, "POST");
export const put = request.bind(null, "PUT");
export const del = request.bind(null, "DELETE");