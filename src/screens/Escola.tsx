import React from 'react';
import { View, Text, Alert } from 'react-native';
import { PaperProvider, Button } from 'react-native-paper';
import { logOut } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

const EscolaScreen: React.FC = () => {
  const { currentUser, setCurrentScreen } = useAuth();
  

  const handleLogout = async () => {
    try {
      await logOut();
      setCurrentScreen('Login');
      Alert.alert('Sucesso', 'Desconectado com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro', 'Erro ao sair. Tente novamente.');
    }
  };
  return (
    <PaperProvider>
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
          Bem-vindo, {currentUser?.email}!
        </Text>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={{ backgroundColor: '#EF4444' }}
          labelStyle={{ color: 'white' }}
        >
          Sair
        </Button>
      </View>
    </PaperProvider>
  );
};

export default EscolaScreen;