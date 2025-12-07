import React, { useRef } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecipesStore } from '../../src/stores/useRecipesStore';
import { useTheme } from '../../src/hooks/useTheme';
import { Button } from '../../src/components/ui/Button';
import { RecipeForm, RecipeFormRef } from '../../src/components/recipes/RecipeForm';

export default function CreateRecipeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { addRecipe } = useRecipesStore();

  // Referencia al formulario
  const formRef = useRef<RecipeFormRef>(null);

  const handleSave = () => {
    // Validar formulario
    if (!formRef.current?.validateForm()) {
      Alert.alert(
        'Campos incompletos',
        'Por favor, completa todos los campos obligatorios:\n\n• Título\n• Imagen\n• Tiempo de cocción\n• Al menos un ingrediente\n• Al menos un paso'
      );
      return;
    }

    // Obtener datos del formulario
    const formData = formRef.current.getFormData();

    // Guardar receta
    addRecipe(formData);

    // Mostrar confirmación y volver
    Alert.alert(
      '¡Receta creada! 🎉',
      'Tu receta se ha guardado correctamente',
      [
        {
          text: 'Ver recetas',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Crear Receta 🍳</Text>
      </View>

      <RecipeForm ref={formRef} />

      <View style={styles.actions}>
        <Button
          title="Cancelar"
          onPress={() => router.back()}
          variant="secondary"
          style={styles.button}
        />
        <Button
          title="Guardar Receta"
          onPress={handleSave}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    padding: 16,
    paddingBottom: 0
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1
  },
});