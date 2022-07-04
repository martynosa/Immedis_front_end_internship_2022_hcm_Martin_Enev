import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../AuthContext';

const GuestGuard = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default GuestGuard;
