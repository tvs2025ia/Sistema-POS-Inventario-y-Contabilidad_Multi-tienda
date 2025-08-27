import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, storeId?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  canAccessStore: (storeId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@tienda.com',
    role: 'admin',
    storeId: '1', // Default store for admin
    createdAt: new Date(),
    isActive: true
  },
  {
    id: '2',
    username: 'empleado1',
    email: 'empleado1@tienda.com',
    role: 'employee',
    storeId: '1',
    createdAt: new Date(),
    isActive: true
  },
  {
    id: '3',
    username: 'empleado2',
    email: 'empleado2@tienda.com',
    role: 'employee',
    storeId: '2',
    createdAt: new Date(),
    isActive: true
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = localStorage.getItem('pos_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string, storeId?: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.username === username);
    if (foundUser && password === '123456') { // Simple demo password
      // For employees, validate store access
      if (foundUser.role === 'employee' && foundUser.storeId !== storeId) {
        return false;
      }
      
      // For admin, allow any store or use their default
      const userWithStore = {
        ...foundUser,
        storeId: storeId || foundUser.storeId
      };
      
      setUser(userWithStore);
      localStorage.setItem('pos_user', JSON.stringify(userWithStore));
      return true;
    }
    return false;
  };

  const canAccessStore = (storeId: string): boolean => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.storeId === storeId;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pos_user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    canAccessStore
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}