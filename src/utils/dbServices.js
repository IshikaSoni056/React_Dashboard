import { initialDB } from "../data/mockUsers";
const STORAGE_KEY = "portal_data";

const getData = () => {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDB)); // 💡 Seed mock data
    data = JSON.stringify(initialDB);
  }
  return JSON.parse(data);
};

const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Users
export const getUsers = () => getData().users;
export const getDoctors = () => getUsers().filter(u => u.role === "doctor");
export const getPatients = () => getUsers().filter(u => u.role === "patient");

// Appointments
// export const getAppointments = () => getData().appointments;
// export const addAppointment = (appointment) => {
//   const data = getData();
//   const newAppointment = { id: Date.now(), ...appointment };
//   data.appointments.push(newAppointment);
//   saveData(data);
//   return newAppointment;
// };


export const getAppointments = () =>
  JSON.parse(localStorage.getItem("appointments")) || [];

export const addAppointment = (appointment) => {
  const appointments = getAppointments();
  const newAppointment = { id: Date.now(), ...appointment };
  localStorage.setItem("appointments", JSON.stringify([...appointments, newAppointment]));
};

export const getFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const deleteFromStorageById = (key, id) => {
  const items = getFromStorage(key).filter(item => item.id !== id);
  saveToStorage(key, items);
};



export const deleteAppointment = (id) => {
  const data = getData();
  data.appointments = data.appointments.filter(a => a.id !== id);
  saveData(data);
};

export const countUsersByRole = (role) =>
  getUsers().filter(u => u.role.toLowerCase() === role.toLowerCase()).length;
