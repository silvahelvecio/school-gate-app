import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Ajuste o caminho conforme necessário

export const listarTurmas = async () => {
  try {
    const turmasCollection = collection(db, 'turmas');
    const turmasSnapshot = await getDocs(turmasCollection);
    
    const turmasList = turmasSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log('Lista de Turmas:', turmasList);
    return turmasList;
  } catch (error) {
    console.error('Erro ao listar turmas:', error);
  }
};

// Chame a função para listar as turmas
// listarTurmas();