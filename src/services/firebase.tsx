import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, initializeAuth, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Declare getReactNativePersistence to bypass TypeScript error
declare module 'firebase/auth' {
  export function getReactNativePersistence(storage: typeof AsyncStorage): any;
}

// Fallback for runtime check
let getReactNativePersistence: Function | null = null;
try {
  getReactNativePersistence = require('firebase/auth').getReactNativePersistence;
  console.log('getReactNativePersistence loaded successfully');
} catch (error) {
  console.warn('Failed to load getReactNativePersistence:', error);
}

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYslnDTFw_MGqR3Qfn8eoNnrfxiJsxc_A",
  authDomain: "distanceschool-4966f.firebaseapp.com",
  projectId: "distanceschool-4966f",
  storageBucket: "distanceschool-4966f.appspot.com",
  messagingSenderId: "882026952446",
  appId: "1:882026952446:web:ad4e4ac5afb29b91add7af"
};

// Initialize FirebaseApp
let app: FirebaseApp;
if (!getApps().length) {
  console.log('Initializing Firebase app');
  try {
    app = initializeApp(firebaseConfig);
    console.log('Firebase app initialized.');
  } catch (error) {
    console.error('Error initializing Firebase app:', error);
    throw error;
  }
} else {
  app = getApps()[0];
  console.log('Using existing Firebase app');
}

// Lazy initialize auth with platform-specific logic
let authInstance: Auth | null = null;
const getAuthInstance = async (): Promise<Auth> => {
  if (authInstance) {
    return authInstance;
  }

  console.log(`Initializing auth for platform: ${Platform.OS}`);
  try {
    // Use AsyncStorage persistence for iOS and Android
    if (getReactNativePersistence && AsyncStorage) {
      authInstance = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });
      console.log('Auth initialized with AsyncStorage persistence (iOS/Android)');
    } else {
      // Fallback for Android if AsyncStorage is not available
      authInstance = getAuth(app);
      console.log('Auth initialized with default persistence (Android - fallback)');
    }

    return authInstance;
  } catch (error) {
    console.error('Error initializing auth:', error);
    throw new Error(`Failed to initialize Firebase Auth: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Funções de autenticação
export const signIn = async (email: string, password: string) => {
  try {
    const auth = await getAuthInstance();
    return await signInWithEmailAndPassword(auth, email.trim(), password);
  } catch (error: any) {
    console.error('Erro em signIn:', error.code || 'unknown', error.message || error);
    throw new Error(`Failed to sign in: ${error.message || 'Unknown error'}`);
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const auth = await getAuthInstance();
    return await createUserWithEmailAndPassword(auth, email.trim(), password);
  } catch (error: any) {
    console.error('Erro em signUp:', error.code || 'unknown', error.message || error);
    throw new Error(`Failed to sign up: ${error.message || 'Unknown error'}`);
  }
};

export const logOut = async () => {
  try {
    const auth = await getAuthInstance();
    return await signOut(auth);
  } catch (error: any) {
    console.error('Erro em logOut:', error.code || 'unknown', error.message || error);
    throw new Error(`Failed to log out: ${error.message || 'Unknown error'}`);
  }
};

export const sendPasswordReset = async (email: string) => {
  try {
    const auth = await getAuthInstance();
    return await sendPasswordResetEmail(auth, email.trim());
  } catch (error: any) {
    console.error('Erro em sendPasswordReset:', error.code || 'unknown', error.message || error);
    throw new Error(`Failed to send password reset: ${error.message || 'Unknown error'}`);
  }
};

// Export auth as a function for use in AuthContext
export const auth = getAuthInstance;

// Export updateProfile for use in SignInScreen
export { updateProfile };