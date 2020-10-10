import { RECENTLYRECOMMEND, UNRECENTLYRECOMMEND } from "../constants";

export default function recommend(state = [], action) {
  switch (action.type) {
    case RECENTLYRECOMMEND:
      return [...state, { [action.name]: action.movie }];
    case UNRECENTLYRECOMMEND:
      return state.filter(
        (item) => item.name === action.name && item.movie === action.movie
      );
    default:
      return state;
  }
}
