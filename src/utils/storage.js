export const getLocalData = (key) => JSON.parse(localStorage.getItem(key)) || [];

export const setLocalData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const addUser = (user, role) => {
  const users = getLocalData(role);
  users.push(user);
  setLocalData(role, users);
};

export const updateUser = (id, updatedUser, role) => {
  const users = getLocalData(role).map(u => u.id === id ? updatedUser : u);
  setLocalData(role, users);
};

export const removeUser = (id, role) => {
  const users = getLocalData(role).filter(u => u.id !== id);
  setLocalData(role, users);
};