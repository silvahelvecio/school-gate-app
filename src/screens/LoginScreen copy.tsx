import React, { useState } from 'react';
import { Animated, View, Text, Alert, Platform } from 'react-native';
import { PaperProvider, Button, TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { signIn } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

type FormData = {
  email: string;
  password: string;
};

const LoginScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(20);
  const { setCurrentScreen } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(offsetAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  }, [fadeAnim, offsetAnim]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      setCurrentScreen('Home');
    } catch (error: any) {
      let errorMessage = 'Erro ao fazer login. Tente novamente.';
      if (error.message.includes('Failed to initialize Firebase Auth')) {
        errorMessage = 'Serviço de autenticação indisponível. Tente novamente mais tarde.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuário não encontrado.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Senha incorreta.';
      }
      Alert.alert('Erro', errorMessage);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <View className="flex-1 px-5 justify-center">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: offsetAnim }],
          }}
          className="w-full"
        >
          <Text className="text-2xl font-bold mb-4 text-center">Login</Text>
          <Controller
            control={control}
            name="email"
            rules={{ required: 'Email é obrigatório', pattern: { value: /^\S+@\S+$/, message: 'Email inválido' } }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Email"
                value={value}
                onChangeText={onChange}
                error={!!errors.email}
                className="mb-2"
              />
            )}
          />
          {errors.email && <Text className="text-red-500 mb-2">{errors.email.message}</Text>}
          <Controller
            control={control}
            name="password"
            rules={{ required: 'Senha é obrigatória', minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' } }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Senha"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={!!errors.password}
                className="mb-2"
              />
            )}
          />
          {errors.password && <Text className="text-red-500 mb-2">{errors.password.message}</Text>}
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            className="bg-purple-600 mb-4 rounded-md"
            style={Platform.OS === 'web' ? { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 } : { elevation: 2 }}
            labelStyle={{ color: 'white' }}
          >
            Entrar
          </Button>
          <Button
            mode="text"
            onPress={() => setCurrentScreen('SignIn')}
            className="mb-2"
          >
            Criar conta
          </Button>
          <Button
            mode="text"
            onPress={() => Alert.alert('Recuperar senha', 'Funcionalidade em desenvolvimento')}
          >
            Esqueci minha senha
          </Button>
        </Animated.View>
      </View>
    </PaperProvider>
  );
};

export default LoginScreen;