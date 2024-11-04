import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string, userType: 'user' | 'constructor') => Promise<void>;
  logout: () => void;
  userType: 'user' | 'constructor' | null; // Track user type
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<'user' | 'constructor' | null>(null);

  const login = async (email: string, password: string, type: 'user' | 'constructor') => {
    const endpoint = type === 'user'
      ? 'http://localhost:3001/api/users/login'
      : 'http://localhost:3002/api/constructors/login';

    try {
      const response = await axios.post(endpoint, { email, password });
      console.log(response.data);
      if (response.data.token) {
        // Store token and update authentication state
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        setUserType(type); // Set user type based on login response
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Propagate error to handle in the component
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    setIsAuthenticated(false);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userType }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
