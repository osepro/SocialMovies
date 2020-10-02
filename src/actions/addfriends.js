import { ADDFRIEND } from "../constants";

function addfriend(friend, id) {
  return {
    type: ADDFRIEND,
    friend,
    id,
  };
}

export default addfriend;
