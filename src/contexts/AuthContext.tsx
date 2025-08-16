import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Google OAuth configuration
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id';

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('pearl_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('pearl_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Initialize Google OAuth
      if (!window.google) {
        throw new Error('Google OAuth library not loaded');
      }

      const response = await new Promise<any>((resolve, reject) => {
        window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'email profile',
          callback: (response: any) => {
            if (response.error) {
              reject(response.error);
            } else {
              resolve(response);
            }
          },
        }).requestAccessToken();
      });

      // Get user info from Google
      const userInfoResponse = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`
      );
      const userInfo = await userInfoResponse.json();

      const newUser: User = {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        avatar: userInfo.picture,
        memberSince: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        })
      };

      setUser(newUser);
      localStorage.setItem('pearl_user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Login failed:', error);
      // For demo purposes, create a mock user if Google auth fails
      const mockUser: User = {
        id: 'demo-user',
        name: 'Demo User',
        email: 'demo@pearl.ai',
        avatar: undefined,
        memberSince: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        })
      };
      setUser(mockUser);
      localStorage.setItem('pearl_user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pearl_user');
    
    // Sign out from Google if available
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
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