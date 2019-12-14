/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { parseJwt } from '../components/Auth/axiosAuth/axios';

export const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('stuff HERE');
    const initAuth = async () => {
      setIsAuthenticated(false);
      if (localStorage.token) {
        const userFromToken = parseJwt(localStorage.token);
        const userExpDate = new Date().setSeconds(userFromToken.exp);
        if (userExpDate > Date.now()) {
          setUser(userFromToken);
          setIsAuthenticated(true);
        } else {
          localStorage.clear();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
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
