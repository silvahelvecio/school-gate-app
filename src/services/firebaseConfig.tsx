import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

// Inicializa o Firestore
const db = getFirestore(app);

export { db };