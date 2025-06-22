import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Badge } from 'react-native-paper';
import AnimatedTabIcon from '../../components/AnimatedTabIcon';
import Ionicons from '../../components/AnimatedTabIcon';
import HomeScreen from '../screens/HomeScreen';

// Crie algumas telas de exemplo
// function HomeScreen() {
//   return (
//     <View>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

function ProfileScreen() {
  return (
    <View>
      <Text>Settings Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View>
      <Text>Settings Screen</Text>
    </View>
  );
}

// Crie o Tab Navigator
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} focused={true} />
            ),
            }} 
        />
        <Tab.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" color={color} size={size} focused={false} />
            ),
            }} 
        />
      </Tab.Navigator>
    {/* <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarBackground: () => (
          <LinearGradient
            colors={['#8B5CF6', '#06B6D4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#D1D5DB',
        tabBarStyle: { height: 60, paddingBottom: 5 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'help';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'Login') iconName = 'login';
          else if (route.name === 'SignIn') iconName = 'account-circle';
          else if (route.name === 'SignUp') iconName = 'person-add';

          return (
            <View className="relative">
              <AnimatedTabIcon
                name={iconName}
                focused={focused}
                color={color}
                size={size}
              />
              {route.name === 'Profile' && (
                <Badge
                  className="absolute -top-1 -right-2 bg-red-500 text-white"
                  size={18}
                >
                  3
                </Badge>
              )}
            </View>
          );
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="SignIn" component={SignInScreen} />
      <Tab.Screen name="SignUp" component={SignUpScreen} /> 
    </Tab.Navigator>*/}     
    </NavigationContainer>
  );
}