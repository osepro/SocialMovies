import { RECOMMEND } from "../constants";

function recommend(name, movie) {
  return {
    type: RECOMMEND,
    name,
    movie,
  };
}

export default recommend;
