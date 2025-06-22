import React, { useEffect, useState } from 'react';
import { View, Text,  StyleSheet,FlatList, SafeAreaView } from 'react-native';
import { listarTurmas } from './src/services/turmasService'; // Ajuste o caminho conforme necessário
import { AuthProvider } from '~/context/AuthContext copy';

interface Turma {
  turma_id: string; // Identificador único da turma (chave primária)
  nome: string;     // Nome da turma (ex: "1º Ano A")
  ano: string;      // Ano escolar da turma (ex: "2025")
}

const TurmaApp: React.FC = () => {
const [turmas, setTurmas] = useState<Turma[]>([]);

  useEffect(() => {
    const fetchTurmas = async () => {
      const turmasData = await listarTurmas() as unknown as  Turma[];;
      setTurmas(turmasData);
    };

    fetchTurmas();
  }, []);

  
  return (
    <SafeAreaView>
      <AuthProvider>
    <View>
      <FlatList
        data={turmas}
        keyExtractor={item => item.turma_id}
        renderItem={({ item }) => (
          <Text>{item.turma_id} - {item.nome}</Text> // Ajuste conforme os campos do seu documento
        )}
      />
    </View>
      </AuthProvider>
    </SafeAreaView>
  );
};


export default TurmaApp;