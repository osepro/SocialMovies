import { REGISTER } from "../constants";

function register(state = {}, action) {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        [action.username]: {
          username: action.username,
          email: action.email,
          password: action.password,
          name: action.name,
          id: action.id,
          friends: {},
        },
      };
    default:
      return state;
  }
}
export default register;
