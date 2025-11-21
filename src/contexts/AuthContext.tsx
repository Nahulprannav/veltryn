import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { hashPassword, isHashedPassword } from '../utils/hash';

interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (identifier: string, password?: string) => Promise<void>;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  // Signup aliases used by UI
  signupWithGoogle?: () => Promise<void>;
  signupWithGithub?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'veltryn@1234567890';
// Strict admin email for demo/admin access
const ADMIN_EMAIL = 'admin&veltryn@gmail.com';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const getUsers = (): Array<any> => {
    try {
      return JSON.parse(localStorage.getItem('users') || '[]');
    } catch {
      return [];
    }
  };

  const saveUsers = (users: Array<any>) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const findUserByIdentifier = (identifier: string) => {
    const users = getUsers();
    return users.find((u: any) => u.email === identifier || u.id === identifier);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Migrate any plain-text passwords stored in localStorage to hashed values
  useEffect(() => {
    let mounted = true;
    (async () => {
      const users = getUsers();
      let changed = false;
      for (let u of users) {
        if (u.password && !isHashedPassword(u.password)) {
          u.password = await hashPassword(u.password);
          changed = true;
        }
      }
      if (changed && mounted) {
        localStorage.setItem('users', JSON.stringify(users));
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const login = async (identifier: string, password?: string) => {
    // Mock authentication with localStorage-backed users
    await new Promise((resolve) => setTimeout(resolve, 300));

    const id = identifier.trim();
    let existing = findUserByIdentifier(id);

    if (!existing) {
      // If no such user, create a guest account only if identifier looks like an email
      if (id.includes('@')) {
        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          email: id,
          displayName: id.split('@')[0],
          isAdmin: id === ADMIN_EMAIL && password === ADMIN_PASSWORD,
          // store password if provided
          password: password || undefined,
        };
        const users = getUsers();
        users.push(newUser);
        saveUsers(users);
        setUser(newUser);
        return;
      }

      throw new Error('User not found');
    }

    // If user exists and has a password, require it (compare hashes)
    if (existing.password) {
      if (!password) {
        throw new Error('Invalid credentials');
      }
      const hashed = await hashPassword(password);
      if (existing.password !== hashed) {
        throw new Error('Invalid credentials');
      }
      // mark admin based on raw provided password (demo-only)
      existing.isAdmin = existing.email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
    }

    setUser(existing as User);
  };

  const signup = async (email: string, password: string, displayName?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const users = getUsers();
    const existing = users.find((u: any) => u.email === email);
    if (existing) {
      // already exists -> sign in
      setUser(existing as User);
      return;
    }

    const isAdmin = email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
    const hashed = await hashPassword(password || '');
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      displayName: displayName || email.split('@')[0],
      isAdmin,
      password: hashed,
    };

    users.push(newUser);
    saveUsers(users);
    setUser(newUser);
  };

  const loginWithGoogle = async () => {
    // Mock Google OAuth and persist user
    await new Promise((resolve) => setTimeout(resolve, 300));
    const users = getUsers();
    const email = 'google_user@veltryn.local';
    let existing = users.find((u: any) => u.email === email);
    if (!existing) {
      existing = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        displayName: 'Google User',
        photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      };
      users.push(existing);
      saveUsers(users);
    }
    setUser(existing as User);
  };

  const loginWithGithub = async () => {
    // Mock GitHub OAuth and persist user
    await new Promise((resolve) => setTimeout(resolve, 300));
    const users = getUsers();
    const email = 'github_user@veltryn.local';
    let existing = users.find((u: any) => u.email === email);
    if (!existing) {
      existing = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        displayName: 'GitHub User',
        photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      };
      users.push(existing);
      saveUsers(users);
    }
    setUser(existing as User);
  };

  // Signup aliases for UI compatibility
  const signupWithGoogle = async () => loginWithGoogle();
  const signupWithGithub = async () => loginWithGithub();

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loginWithGoogle, loginWithGithub, signupWithGoogle, signupWithGithub }}>
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
