import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  currentScreen: 'Login',
  setCurrentScreen: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('Login');

  useEffect(() => {
    let isMounted = true;
    const initializeAuth = async () => {
      try {
        const authInstance = await auth(); // Async call to getAuthInstance
        console.log('Setting up auth state listener');
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
          if (isMounted) {
            console.log('Auth state changed:', user ? 'User logged in' : 'No user');
            setCurrentUser(user);
            setLoading(false);
            if (user && currentScreen !== 'Home') {
              setCurrentScreen('Home');
            }
          }
        });
        return () => {
          isMounted = false;
          unsubscribe();
        };
      } catch (error) {
        console.error('Error setting up auth listener:', error);
        if (isMounted) {
          setLoading(false);
          setCurrentScreen('Login'); // Fallback to Login on error
        }
      }
    };

    initializeAuth();
  }, [currentScreen]);

  return (
    <AuthContext.Provider value={{ currentUser, loading, currentScreen, setCurrentScreen }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};