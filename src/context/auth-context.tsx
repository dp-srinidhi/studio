'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type UserRole = 'operator' | 'public' | null;

interface AuthContextType {
  role: UserRole;
  login: (role: 'operator' | 'public') => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedRole = localStorage.getItem('userRole') as UserRole;
      if (storedRole) {
        setRole(storedRole);
      }
    } catch (error) {
      console.error("Could not access localStorage", error);
    } finally {
        setIsLoading(false);
    }
  }, []);

  const login = (newRole: 'operator' | 'public') => {
    try {
        localStorage.setItem('userRole', newRole);
    } catch (error) {
        console.error("Could not access localStorage", error);
    }
    setRole(newRole);
  };

  const logout = () => {
    try {
        localStorage.removeItem('userRole');
    } catch (error) {
        console.error("Could not access localStorage", error);
    }
    setRole(null);
  };

  const value = { role, login, logout, isLoading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
