import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput as RNTextInput,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { ImageSelector } from './ImageSelector';
import { RecipeFormData } from '../../types/recipe';

interface RecipeFormProps {
  initialData?: Partial<RecipeFormData>;
}

export interface RecipeFormRef {
  getFormData: () => RecipeFormData;
  validateForm: () => boolean;
}

export const RecipeForm = forwardRef<RecipeFormRef, RecipeFormProps>(({ initialData }, ref) => {
  const { colors } = useTheme();

  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [cookingTime, setCookingTime] = useState(initialData?.cookingTime?.toString() || '');
  const [difficulty, setDifficulty] = useState<'Fácil' | 'Media' | 'Difícil'>(
    initialData?.difficulty || 'Fácil'
  );
  const [ingredients, setIngredients] = useState<string[]>(
    initialData?.ingredients?.length ? initialData.ingredients : ['']
  );
  const [steps, setSteps] = useState<string[]>(
    initialData?.steps?.length ? initialData.steps : ['']
  );

  // Exponer métodos al componente padre
  useImperativeHandle(ref, () => ({
    getFormData: (): RecipeFormData => ({
      title: title.trim(),
      description: description.trim() || 'Sin descripción',
      image,
      cookingTime: parseInt(cookingTime) || 0,
      difficulty,
      ingredients: ingredients.filter(ing => ing.trim()),
      steps: steps.filter(step => step.trim()),
    }),
    validateForm: (): boolean => {
      return !!(
        title.trim() &&
        image &&
        parseInt(cookingTime) > 0 &&
        ingredients.filter(ing => ing.trim()).length > 0 &&
        steps.filter(step => step.trim()).length > 0
      );
    },
  }));

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* Información básica */}
      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Información Básica
        </Text>

        <Input
          label="Título *"
          value={title}
          onChangeText={setTitle}
          placeholder="Ej: Papas con Mojo"
          maxLength={100}
        />

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Descripción</Text>
          <RNTextInput
            style={[styles.textArea, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe tu receta..."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <Input
          label="Tiempo (minutos) *"
          value={cookingTime}
          onChangeText={setCookingTime}
          placeholder="30"
          keyboardType="number-pad"
          maxLength={4}
        />

        {/* Dificultad */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Dificultad *</Text>
          <View style={styles.difficultyContainer}>
            {(['Fácil', 'Media', 'Difícil'] as const).map((level) => (
              <Pressable
                key={level}
                style={[
                  styles.difficultyButton,
                  {
                    backgroundColor: difficulty === level ? colors.primary : colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setDifficulty(level)}
              >
                <Text style={[styles.difficultyText, { color: difficulty === level ? '#FFF' : colors.text }]}>
                  {level}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Card>

      {/* Imagen */}
      <Card style={styles.section}>
        <ImageSelector value={image} onChange={setImage} />
        <Text style={[styles.hint, { color: colors.textSecondary }]}>
          * Toma una foto o selecciona una imagen de tu galería
        </Text>
      </Card>

      {/* Ingredientes */}
      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Ingredientes ({ingredients.filter(i => i.trim()).length}) *
        </Text>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.listInputRow}>
            <RNTextInput
              style={[styles.listInput, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
              value={ingredient}
              onChangeText={(value) => {
                const newIngredients = [...ingredients];
                newIngredients[index] = value;
                setIngredients(newIngredients);
              }}
              placeholder={`Ingrediente ${index + 1}`}
              placeholderTextColor={colors.textSecondary}
            />
            {ingredients.length > 1 && (
              <Pressable
                style={[styles.removeButton, { backgroundColor: colors.error }]}
                onPress={() => setIngredients(ingredients.filter((_, i) => i !== index))}
              >
                <Text style={styles.removeButtonText}>✕</Text>
              </Pressable>
            )}
          </View>
        ))}
        <Pressable
          style={[styles.addButton, { backgroundColor: colors.card, borderColor: colors.primary }]}
          onPress={() => setIngredients([...ingredients, ''])}
        >
          <Text style={[styles.addButtonText, { color: colors.primary }]}>+ Añadir Ingrediente</Text>
        </Pressable>
      </Card>

      {/* Pasos */}
      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Pasos de Preparación ({steps.filter(s => s.trim()).length}) *
        </Text>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepInputContainer}>
            <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.stepInputWrapper}>
              <RNTextInput
                style={[styles.stepInput, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                value={step}
                onChangeText={(value) => {
                  const newSteps = [...steps];
                  newSteps[index] = value;
                  setSteps(newSteps);
                }}
                placeholder={`Paso ${index + 1}`}
                placeholderTextColor={colors.textSecondary}
                multiline
                textAlignVertical="top"
              />
              {steps.length > 1 && (
                <Pressable
                  style={[styles.removeButton, { backgroundColor: colors.error }]}
                  onPress={() => setSteps(steps.filter((_, i) => i !== index))}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </Pressable>
              )}
            </View>
          </View>
        ))}
        <Pressable
          style={[styles.addButton, { backgroundColor: colors.card, borderColor: colors.primary }]}
          onPress={() => setSteps([...steps, ''])}
        >
          <Text style={[styles.addButtonText, { color: colors.primary }]}>+ Añadir Paso</Text>
        </Pressable>
      </Card>

      <Text style={[styles.footer, { color: colors.textSecondary }]}>
        * Campos obligatorios
      </Text>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 100 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  inputContainer: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  textArea: { padding: 12, borderRadius: 8, borderWidth: 1, fontSize: 16, minHeight: 100 },
  hint: { fontSize: 12, marginTop: 8, fontStyle: 'italic' },
  difficultyContainer: { flexDirection: 'row', gap: 12 },
  difficultyButton: { flex: 1, paddingVertical: 12, borderRadius: 8, borderWidth: 1, alignItems: 'center' },
  difficultyText: { fontSize: 14, fontWeight: '600' },
  listInputRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  listInput: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, fontSize: 16 },
  removeButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  removeButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  addButton: { paddingVertical: 12, borderRadius: 8, borderWidth: 2, borderStyle: 'dashed', alignItems: 'center', marginTop: 8 },
  addButtonText: { fontSize: 14, fontWeight: '600' },
  stepInputContainer: { flexDirection: 'row', marginBottom: 16 },
  stepNumber: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 12, marginTop: 4 },
  stepNumberText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  stepInputWrapper: { flex: 1, flexDirection: 'row', gap: 8 },
  stepInput: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, fontSize: 16, minHeight: 80 },
  footer: { fontSize: 12, textAlign: 'center', marginTop: 16, marginBottom: 16 },
});