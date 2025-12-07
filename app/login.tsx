import { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../src/stores/useUserStore';
import { useTheme } from '../src/hooks/useTheme';
import { Input } from '../src/components/ui/Input';
import { Button } from '../src/components/ui/Button';
import { MathCaptcha } from '../src/components/login/MathCaptcha';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useUserStore();
  const { colors } = useTheme();

  const [username, setUsername] = useState('');
  const [captchaValid, setCaptchaValid] = useState(false);

  const handleLogin = () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
      return;
    }

    if (!captchaValid) {
      Alert.alert('Error', 'Completa la operación matemática correctamente');
      return;
    }

    login(username);
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Bienvenido
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Ingresa tu nombre para continuar
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Nombre"
            value={username}
            onChangeText={setUsername}
            placeholder="Ej: Juan Pérez"
            autoCapitalize="words"
          />

          <MathCaptcha onValidate={setCaptchaValid} />

          <Button
            title="Entrar"
            onPress={handleLogin}
            disabled={!username.trim() || !captchaValid}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
});