import { SET_LOGGED_IN_USER } from "../constants";

function loggedin(state = {}, action) {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return Object.assign({}, state, {
        loggediduser: action.loggediduser,
        banners: action.banners,
      });
    default:
      return state;
  }
}

export default loggedin;
