import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../api/Hooks/useAuth";

const RequireAuth = ({ allowedRoles }: any) => {
  const Auth = useAuth();
  const location = useLocation();

  return Auth?.auth?.roles.find((role: string) =>
    allowedRoles?.includes(role)
  ) ? (
    <Outlet />
  ) : Auth?.auth ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
