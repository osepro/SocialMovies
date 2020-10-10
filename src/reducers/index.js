import { combineReducers } from "redux";
import loggedin from "./loggedin";
import recommend from "./recommend";
import register from "./register";
import recentlyrecommend from "./recentlyrecommend";

export default combineReducers({
  register,
  loggedin,
  recommend,
  recentlyrecommend,
});
