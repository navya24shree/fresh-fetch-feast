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
  register: (name: string, phone: string, password: string, address: string) => { success: boolean; message: string };
  resetPassword: (phone: string, newPassword: string) => { success: boolean; message: string };
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

  const register = (name: string, phone: string, password: string, address: string): { success: boolean; message: string } => {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if user already exists
    if (users.some((u: User) => u.phone === phone)) {
      return { success: false, message: 'Phone number already registered' };
    }
    
    const newUser = { name, phone, password, address, role: 'user' as const };
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    return { success: true, message: 'Registration successful! Please login.' };
  };

  const resetPassword = (phone: string, newPassword: string): { success: boolean; message: string } => {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userIndex = users.findIndex((u: User) => u.phone === phone);
    
    if (userIndex === -1) {
      return { success: false, message: 'Phone number not found' };
    }
    
    users[userIndex].password = newPassword;
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    // Update current user if logged in
    if (user && user.phone === phone) {
      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return { success: true, message: 'Password reset successful!' };
  };

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
    
    // Check registered users
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = users.find((u: User) => u.name === name && u.phone === phone && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      setIsAdmin(foundUser.role === 'admin');
      localStorage.setItem('user', JSON.stringify(foundUser));
      return { success: true, role: foundUser.role };
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
    <AuthContext.Provider value={{ user, login, register, resetPassword, logout, updateProfile, isAuthenticated, isAdmin }}>
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
