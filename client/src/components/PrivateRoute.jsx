import { Navigate } from "react-router";
import { isAuthenticated, getUserRole } from "../lib/auth";

const PrivateRoute = ({ children, allowedRoles }) => {
  if (!isAuthenticated()) return <Navigate to="/login" />;

  const role = getUserRole();
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;

  return children;
};

export default PrivateRoute;
