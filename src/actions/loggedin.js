import { SET_LOGGED_IN_USER } from "../constants";

function loggedin(loggediduser, banners) {
  return (dispatch) => {
    dispatch({
      type: SET_LOGGED_IN_USER,
      loggediduser,
      banners,
    });
  };
}

export default loggedin;
