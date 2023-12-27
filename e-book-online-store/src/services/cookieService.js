

export const saveCookies = (cookies) => {
  document.cookie = `csrftoken=${cookies.csrftoken}; path=/; samesite=strict`;
  document.cookie = `sessionid=${cookies.sessionid}; path=/; samesite=strict`;
  };

  export const getCookies = () => {
    const cookiesString = document.cookie;
    const cookiesArray = cookiesString ? cookiesString.split(';') : [];

    const cookies = {};
    cookiesArray.forEach(cookie => {
        const parts = cookie.split('=');
        cookies[parts[0].trim()] = parts[1] ? parts[1].trim() : '';
    });

    return cookies;
};
  
  // export const getCookiesFromResponse = async (response) => {
  //   const cookiesString = await response.headers.get('Set-Cookie');
  //   const cookiesArray = cookiesString ? cookiesString.split(';') : [];
  
  //   const cookies = {};
  //   cookiesArray.forEach(cookie => {
  //     const parts = cookie.split('=');
  //     cookies[parts[0].trim()] = parts[1] ? parts[1].trim() : '';
  //   });
  
  //   return cookies;
  // };

export const getCSRFToken = () => {
  const cookies = getCookies();
  return cookies.csrftoken || '';
};

export const getSessionId = () => {
  const cookies = getCookies();
  return cookies.sessionid || '';
};