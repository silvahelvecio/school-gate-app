import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'react-native-paper';
import GradientWrapper from '../../components/GradientWrapper'; // Importar o wrapper
import Ionicons from 'react-native-vector-icons/Ionicons';
import MonitorScreen from '../screens/Monitor';
import EscolaScreen from '../screens/Escola';
import AlunoScreen from '../screens/Aluno';
import UsuarioScreen from '../screens/Usuario';

// Crie o Tab Navigator
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const handleLogout = () => {
    // Lógica para logout
    console.log("Logout");
    // Redirecionar ou realizar logout
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = 'help';
            if (route.name === 'Monitor') iconName = 'home';
            else if (route.name === 'Escola') iconName = 'school';
            else if (route.name === 'Aluno') iconName = 'person';
            else if (route.name === 'Usuário') iconName = 'settings';

            return <Ionicons name={iconName} color={color} size={size} />;
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
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#D1D5DB',
          tabBarStyle: { height: 60, paddingBottom: 5 },
        })}
      >
        <Tab.Screen 
          name="Monitor" 
          component={() => (
            <GradientWrapper>
              <MonitorScreen />
            </GradientWrapper>
          )} 
        />
        <Tab.Screen 
          name="Escola" 
          component={() => (
            <GradientWrapper>
              <EscolaScreen />
            </GradientWrapper>
          )}
        />
        <Tab.Screen 
          name="Aluno" 
          component={() => (
            <GradientWrapper>
              <AlunoScreen />
            </GradientWrapper>
          )}
        />
        <Tab.Screen 
          name="Usuário" 
          component={() => (
            <GradientWrapper>
              <UsuarioScreen />
            </GradientWrapper>
          )}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}