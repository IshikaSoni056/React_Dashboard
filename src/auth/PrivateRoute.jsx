import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { hasAccess } from "../utils/roleUtils";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (!hasAccess(user.role, allowedRoles)) return <Navigate to="/unauthorized" />;

  return children;
};

export default PrivateRoute;
