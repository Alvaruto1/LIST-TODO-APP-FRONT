import { createSlice } from "@reduxjs/toolkit";

const initialState = { list: {}}

export const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        add_list: (state, action) => {
            state.list.lists.push(action.payload.list);
        },
        get_lists: (state, action) => {
            state.list = { ...state.list, ...action.payload };
        }
    },
});

export const { add_list, get_lists } = listSlice.actions;

export function addList(group_list_id, list, okFunction, errorFunction) {
    const url = `http://localhost:3001/group_lists/${group_list_id}/lists`;
    const request = fetch(url, {
        method: "POST",
        body: JSON.stringify(list),
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
                    dispatch(add_list(data));
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

export function getLists(group_list_id) {
  const url = `http://localhost:3001/group_lists/${group_list_id}/lists`;
  const request = fetch(url, {
    method: "GET",
    credentials: "include"
  });
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch(get_lists(data));
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export default listSlice.reducer;


