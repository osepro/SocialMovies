import { combineReducers } from "redux";
import loggedin from "./loggedin";
import recommend from "./recommend";
import register from "./register";

export default combineReducers({
  loggedin,
  recommend,
  register,
});
