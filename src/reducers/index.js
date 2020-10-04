import { combineReducers } from "redux";
import loggedin from "./loggedin";
import recommend from "./recommend";

export default combineReducers({
  loggedin,
  recommend,
});
