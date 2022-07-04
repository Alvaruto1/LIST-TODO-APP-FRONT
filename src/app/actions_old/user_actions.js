export const SIGN_UP = "SIGN_UP";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const IS_LOG_IN = "IS_LOG_IN";

export function logIn(user, okFunction, errorFunction) {
  const url = "http://localhost:3001/login";
  const request = fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request
        .then((response) => {
          return response.json();
        })
        .then((data) => {      
          if (data.status === 401) {
            throw new Error(data.errors);
          } else {
            dispatch({
              type: LOG_IN,
              payload: data,
            });
            okFunction();
            resolve(true);
          }
        })
        .catch((error) => {
          errorFunction(error);
          reject(error);
        });
    });
  };
}

export function isLogIn() {
  const url = "http://localhost:3001/logged_in";
  const request = fetch(url, {
    method: "GET",
    credentials: 'include'
  });
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request
        .then((response) => {          
          return response.json();
        })
        .then((data) => {
          dispatch({
            type: IS_LOG_IN,
            payload: data,
          });
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export function logOut() {
  const url = "http://localhost:3001/logout";
  const request = fetch(url, {
    method: "POST",
    credentials: "include",
  });
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request
        .then((response) => {          
          return response.json();
        })
        .then((data) => {
          dispatch({
            type: LOG_OUT,
            payload: data,
          });
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export function signUp(user, okFunction, errorFunction) {
  const url = "http://localhost:3001/users";
  const request = fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status === 500) {
            throw new Error(data.errors);
          } else {
            dispatch({
              type: SIGN_UP,
              payload: data,
            });
            okFunction()
            resolve(true);
          }
        })
        .catch((error) => {
          errorFunction(error);
          reject(error);
        });
    });
  };
}