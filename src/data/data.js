const STORAGE_KEY = "portal_data";

// Default initial data
const defaultData = {
  users: [
    {
      id: Date.now(),
      name: "Admin",
      email: "admin@portal.com",
      password: "admin123", // ⚠️ plaintext for demo only
      role: "admin",
    },
  ],
  appointments: [],
};

// Load data from localStorage or initialize with defaults
export const getData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    saveData(defaultData); // Seed initial data
    return defaultData;
  }
};

// Save updated data back to localStorage
export const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// User operations
export const addUser = (user) => {
  const data = getData();
  const newUser = { id: Date.now(), ...user };
  data.users.push(newUser);
  saveData(data);
};

export const getUsersByRole = (role) => {
  return getData().users.filter((u) => u.role === role);
};

export const updateUser = (id, updates) => {
  const data = getData();
  data.users = data.users.map((u) => (u.id === id ? { ...u, ...updates } : u));
  saveData(data);
};

export const deleteUser = (id) => {
  const data = getData();
  data.users = data.users.filter((u) => u.id !== id);
  saveData(data);
};

// Appointment operations
export const getAppointments = () => {
  return getData().appointments;
};

export const addAppointment = (appointment) => {
  const data = getData();
  data.appointments.push({ id: Date.now(), ...appointment });
  saveData(data);
};

export const updateAppointment = (id, updates) => {
  const data = getData();
  data.appointments = data.appointments.map((a) =>
    a.id === id ? { ...a, ...updates } : a
  );
  saveData(data);
};

export const deleteAppointment = (id) => {
  const data = getData();
  data.appointments = data.appointments.filter((a) => a.id !== id);
  saveData(data);
};
