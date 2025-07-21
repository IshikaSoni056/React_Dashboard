import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const users = [
  { email: "admin@mail.com", password: "admin", role: "admin" },
  { email: "doc@mail.com", password: "doctor", role: "doctor" },
  { email: "pat@mail.com", password: "patient", role: "patient" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = ({ email, password }) => {
  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  );
  if (foundUser) {
    setUser(foundUser);
    localStorage.setItem("user", JSON.stringify(foundUser)); //  store in localStorage
  }
  return foundUser;
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
     setLoading(false);
  }, []);

  const [doctors, setDoctors] = useState(() => {
  const stored = localStorage.getItem("doctors");
  return stored ? JSON.parse(stored) : [];
});
const addDoctor = (newDoctor) => {
  const updated = [...doctors, newDoctor];
  setDoctors(updated);
  localStorage.setItem("doctors", JSON.stringify(updated));
};

const removeDoctor = (id) => {
  const updated = doctors.filter(doc => doc.id !== id);
  setDoctors(updated);
  localStorage.setItem("doctors", JSON.stringify(updated));
};
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
