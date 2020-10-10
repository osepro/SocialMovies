import { RECENTLYRECOMMEND, UNRECENTLYRECOMMEND } from "../constants";

export function recentlyrecommend(name, movie) {
  return {
    type: RECENTLYRECOMMEND,
    name,
    movie,
  };
}

export function unrecommend(name, movie) {
  return {
    type: UNRECENTLYRECOMMEND,
    name,
    movie,
  };
}
