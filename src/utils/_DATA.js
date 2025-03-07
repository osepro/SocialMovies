let users = {
  oseagbadu: {
    username: "oseagbadu",
    email: "osepro@gmail.com",
    password: "1234",
    name: "Ose Agbadu",
    id: 1234,
    friends: { James: ["Ratched"] },
  },
  eliseagbadu: {
    username: "eliseagbadu",
    email: "elise@email.com",
    password: "1234",
    name: "Elise Agbadu",
    id: 2341,
    friends: { Camille: ["Ratched"] },
  },
  ade: {
    username: "ade",
    email: "ade@email.com",
    password: "ade",
    name: "Ade Rilwan",
    id: 2341,
    friends: { Femi: ["Richie Rich"] },
  },
};

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _saveUsers(name, username, id, email, password) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [username]: {
          username: username,
          email: email,
          password: password,
          name: name,
          id: id,
          friends: {},
        },
      };
      res({ ...users });
    }, 500);
  });
}
