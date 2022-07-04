import { ADD_GROUP, GET_GROUPS, UPDATE_GROUP, DELETE_GROUP } from "../actions_old/group_actions";

const groupReducer = function (state = null, action) {
    switch (action.type) {
      case ADD_GROUP:
        const sign_up = action.payload;
        return { ...state, ...sign_up };
      case GET_GROUPS:
        const log_in = action.payload;
        return { ...state, ...log_in };
      default:
        return state;
    }
  }

  export default groupReducer;