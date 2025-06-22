import React, { useEffect } from 'react';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface AnimatedTabIconProps {
  name: string;
  focused: boolean;
  color: string;
  size: number;
}

const AnimatedTabIcon: React.FC<AnimatedTabIconProps> = ({ name, focused, color, size }) => {
  const scale = new Animated.Value(focused ? 1.2 : 1);

  useEffect(() => {
    Animated.timing(scale, {
      toValue: focused ? 1.2 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Icon name={name} size={size} color={color} />
    </Animated.View>
  );
};

export default AnimatedTabIcon;