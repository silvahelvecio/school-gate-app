import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MonitorScreen from '../screens/Monitor';
import EscolaScreen from '../screens/Escola';
import AlunoScreen from '../screens/Aluno';
import UsuarioScreen from '../screens/Usuario';

// Crie o Tab Navigator
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName = 'help';
            if (route.name === 'Monitor') iconName = 'home';
            else if (route.name === 'Escola') iconName = 'school';
            else if (route.name === 'Aluno') iconName = 'person';
            else if (route.name === 'Usuário') iconName = 'settings';

            return (
              <Ionicons 
                name={iconName} 
                color={color} 
                size={size} 
                style={{ transform: focused ? [{ scale: 1.1 }] : [{ scale: 1 }] }} // Leve efeito de escala
              />
            );
          },
          headerRight: () => (
            <Button
              mode="text"
              onPress={handleLogout}
              labelStyle={{ color: 'red' }} // Cor do texto do botão
            >
              Sair
            </Button>
          ),
          tabBarActiveTintColor: '#4B5563', // Cor suave para ícone ativo
          tabBarInactiveTintColor: '#9CA3AF', // Cor suave para ícone inativo
          tabBarStyle: { 
            height: 60, 
            paddingBottom: 5, 
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo semi-transparente
            elevation: 5, // Sombra no Android
            shadowColor: '#000', // Cor da sombra no iOS
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
        })}
      >
        <Tab.Screen name="Monitor" component={MonitorScreen} options={{ headerTitle: 'Monitoramento' }}  />
        <Tab.Screen name="Escola" component={EscolaScreen}  />
        <Tab.Screen name="Aluno" component={AlunoScreen}  />
        <Tab.Screen name="Usuário" component={UsuarioScreen} options={{ tabBarLabel: 'Usuário' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}