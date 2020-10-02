import { REMOVEFRIEND } from "../constants";

function removefriend(friend) {
  return {
    type: REMOVEFRIEND,
    friend,
  };
}

export default removefriend;
