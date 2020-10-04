import { SET_LOGGED_IN_USER } from "../constants";

function loggedin(state = "", action) {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      state = action.loggediduser;
      return state;
    default:
      return state;
  }
}

export default loggedin;
