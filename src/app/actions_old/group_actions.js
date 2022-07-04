export const GET_GROUPS = "GET_GROUPS";
export const DELETE_GROUP = "DELETE_GROUP";
export const ADD_GROUP = "ADD_GROUP";
export const UPDATE_GROUP = "UPDATE_GROUP";

export function addGroup(group, okFunction, errorFunction) {
  const url = "http://localhost:3001/group_list";
  const request = fetch(url, {
    method: "POST",
    body: JSON.stringify(group),
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
          dispatch({
            type: ADD_GROUP,
            payload: data,
          });
          okFunction();
          resolve(true);
        })
        .catch((error) => {
          errorFunction(error);
          reject(error);
        });
    });
  };
}

export function getGroups(okFunction, errorFunction) {
  const url = "http://localhost:3001/group_list";
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
          dispatch({
            type: GET_GROUPS,
            payload: data,
          });
          okFunction();
          resolve(true);
        })
        .catch((error) => {
          errorFunction(error);
          reject(error);
        });
    });
  };
}