/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { isAfter } from 'date-fns';
import { parseJwt } from '../components/Auth/axiosAuth/axios';

export const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      setIsAuthenticated(false);
      if (localStorage.token) {
        const userFromToken = parseJwt(localStorage.token);
        if (isAfter(userFromToken.exp * 1000, Date.now())) {
          setUser(userFromToken);
          setIsAuthenticated(true);
        } else {
          localStorage.clear();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };
    initAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        setIsAuthenticated,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
