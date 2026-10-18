import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import Loader from '../Loader/Loader';

interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <Loader message="Checking your session..." />;
  }

  if (!user) {
    return <Navigate to="/teachers" replace />;
  }

  return children;
}

export default PrivateRoute;
