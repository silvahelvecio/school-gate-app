import React, { ReactNode } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientWrapperProps {
  children: ReactNode; // Define o tipo de children como ReactNode
}

const GradientWrapper: React.FC<GradientWrapperProps> = ({ children }) => {
  return (
    <LinearGradient
      colors={['#8B5CF6', '#06B6D4']} // Cores do gradiente
      style={{ flex: 1 }} // Preencher toda a tela
    >
      <View style={{ flex: 1 }}>
        {children} {/* Renderiza qualquer conteúdo passado para o GradientWrapper */}
      </View>
    </LinearGradient>
  );
};

export default GradientWrapper;