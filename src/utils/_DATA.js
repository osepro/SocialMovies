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
};

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _saveUsers(user, id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        user: {
          name: [user],
          id,
          friends: {},
        },
      };
      res();
    }, 500);
  });
}
