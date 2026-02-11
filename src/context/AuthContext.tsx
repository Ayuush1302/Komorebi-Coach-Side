import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  onboardingComplete?: boolean;
  role?: 'coach' | 'athlete';
  athleteProfile?: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string, role?: 'coach' | 'athlete') => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string, role: 'coach' | 'athlete' = 'coach') => {
    // Demo credentials check
    if ((username === 'Coach01' && password === '1234') || (role === 'athlete')) {
      setIsAuthenticated(true);
      setUser({ username, onboardingComplete: true, role });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = (): Promise<void> => {
    return new Promise((resolve) => {
      setIsAuthenticated(false);
      setUser(null);
      resolve();
    });
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
    // If email is provided and user wasn't authenticated, authenticate them (signup flow)
    if (userData.email && !isAuthenticated) {
      setIsAuthenticated(true);
    }
  };

  const completeOnboarding = () => {
    setUser(prev => prev ? { ...prev, onboardingComplete: true } : null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}