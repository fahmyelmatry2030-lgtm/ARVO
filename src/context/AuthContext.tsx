import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth, isFirebaseInitialized } from '../lib/firebase';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginWithGoogle: async () => { },
  logout: async () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseInitialized && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const mappedUser: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || 'مستخدم',
            image: firebaseUser.photoURL || undefined
          };
          setUser(mappedUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Fallback: Check localStorage for mock user
      const stored = localStorage.getItem('mockUser');
      if (stored) {
        setUser(JSON.parse(stored));
      }
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = async () => {
    if (isFirebaseInitialized && auth) {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error('Error signing in with Google:', error);
        throw error;
      }
    } else {
      // Mock Login
      const mockUser: User = {
        id: 'mock-123',
        email: 'user@example.com',
        name: 'مستخدم تجريبي',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
      };
      setUser(mockUser);
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      console.warn('Firebase not initialized. Using Mock Login.');
    }
  };

  const logout = async () => {
    if (isFirebaseInitialized && auth) {
      try {
        await firebaseSignOut(auth);
      } catch (error) {
        console.error('Error signing out:', error);
        throw error;
      }
    } else {
      // Mock Logout
      setUser(null);
      localStorage.removeItem('mockUser');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
