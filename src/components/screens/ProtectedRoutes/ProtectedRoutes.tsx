// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import { UserRole } from '../../../types/UserRole';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isLogged, rol } = useAppSelector((state) => state.auth);

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  if (rol === 'VISOR') {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(rol!)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
