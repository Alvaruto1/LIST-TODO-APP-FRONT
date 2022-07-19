import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./components/users/userSlice";
import groupReducer from "./components/groups/groupSlice";
import listReducer from "./components/lists/listSlice";
import itemSlice from "./components/lists/items/itemSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    group: groupReducer,
    list: listReducer,
    item: itemSlice,
  },
});

//export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
