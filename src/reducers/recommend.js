import { ADDFRIEND, REMOVEFRIEND, RECOMMEND } from "../constants/";
import _ from "lodash";

export default function recommend(state = {}, action) {
  switch (action.type) {
    case ADDFRIEND:
      return _.assign({}, state, {
        [action.friend]: { name: action.friend, id: action.id, movies: [] },
      });
    case RECOMMEND:
      const newFriendList = {};
      let newList = state[action.name];
      if (newList.movies.indexOf(action.movie) > -1) {
        newList.movies.splice(newList.movies.indexOf(action.movie), 1);
      } else {
        newList.movies.push(action.movie);
      }
      for (let key in state) {
        if (key !== action.name) {
          newFriendList[key] = state[key];
        }
      }
      newFriendList[action.name] = newList;
      return _.assign({}, state, newFriendList);
    case REMOVEFRIEND:
      delete state[action.friend];
      return { ...state };
    default:
      return state;
  }
}
