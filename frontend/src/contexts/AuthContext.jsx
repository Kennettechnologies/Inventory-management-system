import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, api } from '../utils/api';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      if (auth.isAuthenticated()) {
        try {
          const data = await api.get('/users/profile');
          setUser(data);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          auth.logout();
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await auth.login(email, password);
      setUser(data.user);
      showToast('Successfully logged in', 'success');
      return data;
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const data = await auth.register(name, email, password);
      setUser(data.user);
      showToast('Successfully registered', 'success');
      return data;
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    }
  };

  const logout = () => {
    auth.logout();
    setUser(null);
    showToast('Successfully logged out', 'success');
  };

  const updateProfile = async (profileData) => {
    try {
      const data = await api.put('/users/profile', profileData);
      setUser(data);
      showToast('Profile updated successfully', 'success');
      return data;
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    }
  };

  const updatePassword = async (passwordData) => {
    try {
      await api.put('/users/password', passwordData);
      showToast('Password updated successfully', 'success');
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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