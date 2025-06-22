// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCYslnDTFw_MGqR3Qfn8eoNnrfxiJsxc_A",
  authDomain: "distanceschool-4966f.firebaseapp.com",
  projectId: "distanceschool-4966f",
  storageBucket: "distanceschool-4966f.firebasestorage.app",
  messagingSenderId: "882026952446",
  appId: "1:882026952446:web:ad4e4ac5afb29b91add7af"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Auth
const auth = getAuth(app);

export { auth };