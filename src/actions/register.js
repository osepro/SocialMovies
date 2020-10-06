import { REGISTER } from "../constants";

function register(name, username, id, email, password) {
  return (dispatch) => {
    dispatch({
      type: REGISTER,
      name,
      username,
      id,
      email,
      password,
    });
  };
}

export default register;
