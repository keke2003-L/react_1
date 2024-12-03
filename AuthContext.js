import React, { createContext, useState } from 'react';

// Create AuthContext to hold authentication state
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    return storedUser ? true : false;
  });

  const login = (username) => {
    localStorage.setItem('loggedInUser', username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
