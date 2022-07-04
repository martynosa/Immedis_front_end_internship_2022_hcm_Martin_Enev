import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../AuthContext';

const UserGuard = () => {
  const { isAuth } = useAuth();

  return !isAuth ? <Outlet /> : <Navigate to="/profile" />;
};

export default UserGuard;
