

  
  const host = 'http://127.0.0.1:8000/';

// Deployed server for temporary testing authentication
//  const host = 'https://panicky-undershirt-mite.cyclic.app/';
 

export async function request(method, url, data, headers) {

    const options = {
        method,
        headers: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'X-CSRFToken': csrftoken,
            // 'Cookie': `sessionid=${sessionid}`
        },
        credentials: 'include',
        mode: 'cors'
        
    };



   

    if (data) {
        if(headers){
            options.headers['Content-Type'] = headers['Content-Type'];
        }
        options.body = JSON.stringify(data);
    }

    const user = JSON.parse(localStorage.getItem('user'));
    let token = user?.token;
    if(token) {
        options.headers = {...options.headers,
            'Authorization': `Token ${token}`}
    }
   
   

    
    try{
        
        const response = await fetch(host + url, options);

        if (response.status === 204) {
            return {}
        }
 
        const result = await response.json();
      
        if (!response.ok) {
            const { email, password, detail, message } = result;
            console.log(response);
            console.log(result);
            throw new Error(message || email?.at(0) || password?.at(0) || detail || `Грешка: "${response.statusText}". Виж детайли в конзолата на браузъра.`);
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
export const patch = request.bind(null, "PATCH");
export const del = request.bind(null, "DELETE");