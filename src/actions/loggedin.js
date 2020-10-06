import { SET_LOGGED_IN_USER } from "../constants";

function loggedin(loggediduser) {
  return (dispatch) => {
    dispatch({
      type: SET_LOGGED_IN_USER,
      loggediduser,
    });
  };
}

export default loggedin;
