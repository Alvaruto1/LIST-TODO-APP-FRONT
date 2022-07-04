import { LOG_IN, SIGN_UP, IS_LOG_IN, LOG_OUT } from "../actions_old/user_actions";

const userReducer = function (state = null, action) {
    switch (action.type) {
      case SIGN_UP:
        const sign_up = action.payload;
        return { ...state, ...sign_up };
      case LOG_IN:
        const log_in = action.payload;
        return { ...state, ...log_in };
      case IS_LOG_IN:
        const is_log_in = action.payload;
        return { ...state, ...is_log_in };
      case LOG_OUT:
        const log_out = action.payload;
        return { ...state, ...log_out };
      default:
        return state;
    }
  }

  export default userReducer;