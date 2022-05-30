import { combineReducers } from "redux";
import groupReducer from "./group_reducer";
import userReducer from "./user_reducer";


const rootReducer = combineReducers({
    user: userReducer,
    group: groupReducer,
})

export default rootReducer;