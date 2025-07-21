import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const users = [
  { email: "admin@mail.com", password: "admin", role: "admin" },
  { email: "doc@mail.com", password: "doctor", role: "doctor" },
  { email: "pat@mail.com", password: "patient", role: "patient" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = ({ email, password }) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) setUser(foundUser);
    return foundUser;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
