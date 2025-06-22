import './global.css'; // Adjust the path as needed
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import AppNavigator from './src/navigation/AppNavigator';


type ScreenType = 'Login' | 'SignIn' | 'Home';

const AppContent: React.FC = () => {
  const { currentScreen } = useAuth();

  const renderScreen = (screen: ScreenType) => {
    switch (screen) {
      case 'Login':
        return <LoginScreen />;
      case 'SignIn':
        return <SignInScreen />;
      case 'Home':
        return <AppNavigator />;
      default:
        console.warn(`Unknown screen: ${screen}`);
        return <LoginScreen />; // Fallback to LoginScreen
    }
  };

  return <>{renderScreen(currentScreen as ScreenType)}</>;
};

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;