import { getCookies, getCSRFToken, getSessionId} from "./cookieService";

  
  const host = 'http://127.0.0.1:8000/';

// Deployed server for temporary testing authentication
//  const host = 'https://panicky-undershirt-mite.cyclic.app/';
 

export async function request(method, url, data) {
    
    const csrftoken = getCSRFToken();
    const sessionid = getSessionId();

    const options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            'Cookie': `sessionid=${sessionid}`
        },
        credentials: "same-origin",
        
    };




    // options.headers['X-CSRFToken'] = csrftoken;
    // options.headers['Cookie'] = `sessionid=${sessionid}`;
   


    // console.log(document.cookie)


    if (data) {
        // options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = JSON.parse(localStorage.getItem('user'));
   
   

    
    try{
        
        const response = await fetch(host + url, options);

        if (response.ok) {
        
            const cookies = response.headers.get('Set-Cookie');

            
            console.log(cookies)
            // saveCookies(cookies);
        
          }


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