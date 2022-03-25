import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../api/Hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const Auth = useAuth();
  const location = useLocation();

  return Auth?.roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
