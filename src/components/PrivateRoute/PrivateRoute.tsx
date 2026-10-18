
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/teachers" replace />;
  }

  return children;
}

export default PrivateRoute;
