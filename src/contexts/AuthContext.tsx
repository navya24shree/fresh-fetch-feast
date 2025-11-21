import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  name: string;
  phone: string;
  password: string;
  address: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (name: string, phone: string, password: string) => { success: boolean; role?: 'user' | 'admin' };
  logout: () => void;
  updateProfile: (user: User) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsAdmin(parsedUser.role === 'admin');
    }
  }, []);

  const login = (name: string, phone: string, password: string): { success: boolean; role?: 'user' | 'admin' } => {
    // Admin credentials
    if (name === 'admin' && phone === '213456789' && password === 'admin@123') {
      const adminUser = { name, phone, password, address: '', role: 'admin' as const };
      setUser(adminUser);
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return { success: true, role: 'admin' as const };
    }
    
    // User credentials
    if (name === 'user123' && phone === '123456789' && password === 'user@123') {
      const regularUser = { name, phone, password, address: '', role: 'user' as const };
      setUser(regularUser);
      setIsAuthenticated(true);
      setIsAdmin(false);
      localStorage.setItem('user', JSON.stringify(regularUser));
      return { success: true, role: 'user' as const };
    }
    
    return { success: false };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };

  const updateProfile = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, isAuthenticated, isAdmin }}>
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
