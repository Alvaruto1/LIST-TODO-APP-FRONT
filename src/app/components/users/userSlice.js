import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {}
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    sign_up: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    log_in: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    is_log_in: (state, action) => {
      state.user = { ...state.user, ...action.payload };      
    },
    log_out: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { sign_up, log_in, log_out, is_log_in } = userSlice.actions;

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
            dispatch(sign_up(data));
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
            dispatch(log_in(data));
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
    credentials: "include",
  });
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch(is_log_in(data));
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
          dispatch(log_out(data));
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export default userSlice.reducer;