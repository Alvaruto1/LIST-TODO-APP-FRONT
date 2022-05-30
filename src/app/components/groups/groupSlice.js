import { createSlice } from "@reduxjs/toolkit";

const initialState = { group: {} };

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    add_group: (state, action) => {
      state.group.groups.push(action.payload.group_list);
    },
    edit_group: (state, action) => {
      state.group.groups.map((group, index)=>{
        if (group._id["$oid"] === action.payload.group_list._id["$oid"]) {
          state.group.groups[index] = action.payload.group_list;
        }
      }
      );
    },
    get_groups: (state, action) => {
      state.group = { ...state.group, ...action.payload };
    },
    current_group: (state, action) => {
      state.current_group = action.payload;      
    },
    delete_group: (state, action) => {
      state.group.groups = state.group.groups.filter(
        (group) => group._id["$oid"] !== action.payload
      );
    }
  },
});

export const { add_group, get_groups, current_group, delete_group, edit_group } = groupSlice.actions;

export function addGroup(group, okFunction, errorFunction) {
  const url = "http://localhost:3001/group_lists";
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
          dispatch(add_group(data));
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

export function deleteGroup(group_id, okFunction, errorFunction) {
  const url = `http://localhost:3001/group_lists/${group_id}`;
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
          dispatch(delete_group(group_id));
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

export function editGroup(group, group_id, okFunction, errorFunction) {
  const url = `http://localhost:3001/group_lists/${group_id}`;
  const request = fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(group),
  });
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch(edit_group(data));
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

export function getGroups() {
  const url = "http://localhost:3001/group_lists";
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
          dispatch(get_groups(data));
          dispatch(current_group(data.groups ? data.groups[0] : {}));
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export default groupSlice.reducer;