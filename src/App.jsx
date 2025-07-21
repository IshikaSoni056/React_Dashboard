import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";
import Admin from "./pages/Admin";
import Doctor from "./pages/Doctor";
import Patient from "./pages/Patient";
import { ROLES } from "./utils/roleUtils";
import Unauthorized from "./pages/Unauthorised";
import './App.css';



function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <PrivateRoute allowedRoles={[ROLES.DOCTOR]}>
              <Doctor />
            </PrivateRoute>
          }
        />
        <Route
          path="/patient"
          element={
            <PrivateRoute allowedRoles={[ROLES.PATIENT]}>
              <Patient />
            </PrivateRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
