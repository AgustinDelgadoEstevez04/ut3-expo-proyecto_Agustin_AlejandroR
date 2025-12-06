import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from '../ui/Input';
import { useTheme } from '@/hooks/useTheme';

interface MathCaptchaProps {
  onValidate: (isValid: boolean) => void;
}

export const MathCaptcha: React.FC<MathCaptchaProps> = ({ onValidate }) => {
  const { colors } = useTheme();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState('');

  // Generar números aleatorios
  useEffect(() => {
    generateNumbers();
  }, []);

  const generateNumbers = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setAnswer('');
  };

  // Validar respuesta
  useEffect(() => {
    const correctAnswer = num1 + num2;
    const userAnswer = parseInt(answer);

    if (!isNaN(userAnswer)) {
      onValidate(userAnswer === correctAnswer);
    } else {
      onValidate(false);
    }
  }, [answer, num1, num2]);

  return (
    <View style={styles.container}>
      <Text style={[styles.question, { color: colors.text }]}>
        ¿Cuánto es {num1} + {num2}?
      </Text>
      <Input
        value={answer}
        onChangeText={setAnswer}
        placeholder="Escribe el resultado"
        keyboardType="number-pad"
        maxLength={2}
      />
      <Text style={[styles.hint, { color: colors.textSecondary }]}>
        Completa esta operación para continuar
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  hint: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});