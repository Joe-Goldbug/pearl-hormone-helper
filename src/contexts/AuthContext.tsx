import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  memberSince: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Demo mode - always have a user logged in
  const [user] = useState<User>({
    id: 'demo-user',
    name: 'Demo User',
    email: 'demo@pearl.com',
    avatar: undefined,
    memberSince: 'January 2024'
  });
  const [isLoading] = useState(false);

  // No useEffect needed for demo mode

  const login = async (): Promise<void> => {
    // Demo mode - no actual login needed
    console.log('Demo mode: User already logged in');
  };

  const logout = () => {
    // Demo mode - no actual logout needed
    console.log('Demo mode: Logout not implemented');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Extend Window interface for Google OAuth
declare global {
  interface Window {
    google: any;
  }
}