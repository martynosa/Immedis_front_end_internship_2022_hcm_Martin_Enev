import React from 'react';
import { useEffect } from 'react';
import { useLocalStorage } from './services/useLocalStorage';

const authContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage({});

  const isAuth = Boolean(user.email);

  const value = {
    user,
    setUser,
    isAuth,
  };

  useEffect(() => {
    if (user.username) localStorage.setItem('user', JSON.stringify(user));
    console.log(user);
  }, [user]);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(authContext);
};
