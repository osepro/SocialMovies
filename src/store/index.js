import { createStore } from "redux";
import recommend from "../reducers/recommend";
const store = createStore(recommend);

export default store;
