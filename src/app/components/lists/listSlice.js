import { createSlice } from "@reduxjs/toolkit";

const initialState = { list: {} };

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    add_list: (state, action) => {
      state.list.lists.push(action.payload.list);
    },
    get_lists: (state, action) => {
      state.list = { ...state.list, ...action.payload };
    },
    delete_list: (state, action) => {
      state.list.lists = state.list.lists.filter(
        (list) => list._id["$oid"] !== action.payload
      );
    },
    current_list: (state, action) => {
      state.current_list = action.payload;
    },
    delete_current_list: (state, action) => {
      state.current_list = null;
    },
    edit_list: (state, action) => {
      state.list.lists.map((list, index) => {
        if (list._id["$oid"] === action.payload.list._id["$oid"]) {
          state.list.lists[index] = action.payload.list;
        }
      });
    },
  },
});

export const {
  add_list,
  get_lists,
  delete_list,
  edit_list,
  current_list,
  delete_current_list,
} = listSlice.actions;

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

export function deleteList(group_lists_id, list_id, okFunction, errorFunction) {
  const url = `http://localhost:3001/group_lists/${group_lists_id}/lists/${list_id}`;
  const request = fetch(url, {
    method: "DELETE",
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
          dispatch(delete_list(list_id));
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

export function editList(
  list,
  group_lists_id,
  list_id,
  okFunction,
  errorFunction
) {
  const url = `http://localhost:3001/group_lists/${group_lists_id}/lists/${list_id}`;
  const request = fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(list),
  });
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch(edit_list(data));
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

export function getLists(group_lists_id) {
  const url = `http://localhost:3001/group_lists/${group_lists_id}/lists`;
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
