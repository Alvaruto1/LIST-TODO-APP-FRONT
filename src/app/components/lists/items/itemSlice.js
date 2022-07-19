import { createSlice } from "@reduxjs/toolkit";

const initialState = { item: { items: [] } };

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    add_item: (state, action) => {
      state.item.items.push(action.payload.item);
    },
    get_items: (state, action) => {
      state.item = { ...state.item, ...action.payload };
    },
    delete_item: (state, action) => {
      state.item.items = state.item.items.filter(
        (item) => item._id["$oid"] !== action.payload
      );
    },
    current_item: (state, action) => {
      state.current_item = action.payload;
    },
    edit_item: (state, action) => {
      state.item.items.map((item, index) => {
        if (item._id["$oid"] === action.payload.item._id["$oid"]) {
          state.item.items[index] = action.payload.item;
        }
      });
    },
  },
});

export const { add_item, get_items, delete_item, edit_item, current_item } =
  itemSlice.actions;

export function addItem(
  group_list_id,
  list_id,
  item,
  okFunction,
  errorFunction
) {
  const url = `http://localhost:3001/group_lists/${group_list_id}/lists/${list_id}/items`;
  const request = fetch(url, {
    method: "POST",
    body: JSON.stringify(item),
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
          dispatch(add_item(data));
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

export function deleteItem(
  group_list_id,
  list_id,
  item_id,
  okFunction,
  errorFunction
) {
  const url = `http://localhost:3001/group_lists/${group_list_id}/lists/${list_id}/items/${item_id}`;
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
          dispatch(delete_item(item_id));
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

export function editItem(
  item,
  group_list_id,
  list_id,
  item_id,
  okFunction,
  errorFunction
) {
  const url = `http://localhost:3001/group_lists/${group_list_id}/lists/${list_id}/items/${item_id}`;
  const request = fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(item),
  });
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch(edit_item(data));
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

export function getItems(group_list_id, list_id) {
  const url = `http://localhost:3001/group_lists/${group_list_id}/lists/${list_id}/items`;
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
          dispatch(get_items(data));
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export default itemSlice.reducer;
