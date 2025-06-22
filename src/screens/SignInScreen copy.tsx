import React, { useState } from 'react';
import { Animated, View, Text, Alert, Platform } from 'react-native';
import { PaperProvider, TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { signUp, updateProfile } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignInScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(20);
  const { setCurrentScreen } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: { name: '', email: '', password: '' },
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

  const handleSignUp = async (data: FormData) => {
    setLoading(true);
    try {
      const userCredential = await signUp(data.email, data.password);
      await updateProfile(userCredential.user, { displayName: data.name });
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      setCurrentScreen('Login');
    } catch (error: any) {
      let message = 'Erro ao criar conta';
      switch (error.code) {
        case 'auth/invalid-email':
          message = 'Email inválido';
          break;
        case 'auth/email-already-in-use':
          message = 'Email já está em uso';
          break;
        case 'auth/weak-password':
          message = 'Senha muito fraca';
          break;
        default:
          message = `Erro: ${error.message}`;
      }
      Alert.alert('Erro', message);
      console.error('Erro de cadastro:', error.code, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: offsetAnim }],
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
            Cadastro
          </Text>
        </Animated.View>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Nome é obrigatório' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Nome"
              value={value}
              onChangeText={onChange}
              mode="outlined"
              style={{
                marginBottom: 16,
                backgroundColor: 'white',
                ...(Platform.OS === 'web' ? { boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' } : { elevation: 2 }),
              }}
              error={!!errors.name}
              theme={{ colors: { error: '#EF4444' } }}
              outlineStyle={Platform.OS === 'web' ? { borderColor: '#D1D5DB', borderWidth: 1 } : undefined}
            />
          )}
        />
        {errors.name && <Text style={{ color: '#EF4444', marginBottom: 16 }}>{errors.name.message}</Text>}
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email é obrigatório',
            pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Email"
              value={value}
              onChangeText={onChange}
              mode="outlined"
              style={{
                marginBottom: 16,
                backgroundColor: 'white',
                ...(Platform.OS === 'web' ? { boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' } : { elevation: 2 }),
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email}
              theme={{ colors: { error: '#EF4444' } }}
              outlineStyle={Platform.OS === 'web' ? { borderColor: '#D1D5DB', borderWidth: 1 } : undefined}
            />
          )}
        />
        {errors.email && <Text style={{ color: '#EF4444', marginBottom: 16 }}>{errors.email.message}</Text>}
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Senha é obrigatória',
            minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Senha"
              value={value}
              onChangeText={onChange}
              mode="outlined"
              style={{
                marginBottom: 16,
                backgroundColor: 'white',
                ...(Platform.OS === 'web' ? { boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' } : { elevation: 2 }),
              }}
              secureTextEntry
              error={!!errors.password}
              theme={{ colors: { error: '#EF4444' } }}
              outlineStyle={Platform.OS === 'web' ? { borderColor: '#D1D5DB', borderWidth: 1 } : undefined}
            />
          )}
        />
        {errors.password && <Text style={{ color: '#EF4444', marginBottom: 16 }}>{errors.password.message}</Text>}
        <Button
          mode="contained"
          onPress={handleSubmit(handleSignUp)}
          loading={loading}
          style={{
            backgroundColor: '#6B46C1',
            marginBottom: 16,
            ...(Platform.OS === 'web' ? { boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' } : { elevation: 2 }),
          }}
          labelStyle={{ color: 'white' }}
        >
          Cadastrar
        </Button>
        <Text style={{ textAlign: 'center' }}>
          Já tem uma conta?{' '}
          <Text
            onPress={() => setCurrentScreen('Login')}
            style={{ color: '#6B46C1', textDecorationLine: 'underline' }}
          >
            Faça login
          </Text>
        </Text>
      </View>
    </PaperProvider>
  );
};

export default SignInScreen;