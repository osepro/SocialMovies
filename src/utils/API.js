import { _getUsers, _saveUsers } from "./_DATA";

export async function apicall(id) {
  const movies = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=acd45b564463fb4a98952313a103fed2&with_networks=${id}`
  );
  const moviesData = await movies.json();
  return moviesData;
}

export async function getAllUsers() {
  const allUsers = await _getUsers();
  return allUsers;
}

export async function saveNewUser(name, username, id, email, password) {
  const newUser = await _saveUsers(name, username, id, email, password);
  return newUser;
}
