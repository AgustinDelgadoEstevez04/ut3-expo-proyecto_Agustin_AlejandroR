import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecipesStore } from '../../src/stores/useRecipesStore';
import { useTheme } from '../../src/hooks/useTheme';
import { recipeUtils } from '../../src/utils/recipeUtils';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();

  const { recipes, updateRecipe, deleteRecipe, toggleFavorite } = useRecipesStore();
  const recipe = recipes.find(r => r.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(recipe?.title || '');
  const [editedDescription, setEditedDescription] = useState(recipe?.description || '');

  if (!recipe) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>
            Receta no encontrada
          </Text>
          <Button title="Volver" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Receta',
      '¿Estás seguro? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteRecipe(recipe.id);
            router.back();
          },
        },
      ]
    );
  };

  const handleSaveEdit = () => {
    if (!editedTitle.trim()) {
      Alert.alert('Error', 'El título no puede estar vacío');
      return;
    }

    updateRecipe(recipe.id, {
      title: editedTitle.trim(),
      description: editedDescription.trim(),
    });

    setIsEditing(false);
    Alert.alert('Guardado', 'Los cambios se han guardado correctamente');
  };

  const handleCancelEdit = () => {
    setEditedTitle(recipe.title);
    setEditedDescription(recipe.description);
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView>
        {/* Imagen */}
        <Image
          source={{ uri: recipe.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          {/* Botones de acción */}
          <View style={styles.actions}>
            <Pressable
              style={[styles.actionButton, { backgroundColor: colors.card }]}
              onPress={() => toggleFavorite(recipe.id)}
            >
              <Text style={styles.actionIcon}>
                {recipe.isFavorite ? '❤️' : '🤍'}
              </Text>
            </Pressable>

            {recipe.isOwn && (
              <Pressable
                style={[styles.actionButton, { backgroundColor: colors.card }]}
                onPress={() => setIsEditing(!isEditing)}
              >
                <Text style={styles.actionIcon}>✏️</Text>
              </Pressable>
            )}

            <Pressable
              style={[styles.actionButton, { backgroundColor: colors.card }]}
              onPress={handleDelete}
            >
              <Text style={styles.actionIcon}>🗑️</Text>
            </Pressable>
          </View>

          {/* Título */}
          {isEditing ? (
            <TextInput
              style={[
                styles.titleInput,
                {
                  color: colors.text,
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
              value={editedTitle}
              onChangeText={setEditedTitle}
              placeholder="Título de la receta"
              placeholderTextColor={colors.textSecondary}
            />
          ) : (
            <Text style={[styles.title, { color: colors.text }]}>
              {recipe.title}
            </Text>
          )}

          {/* Info rápida */}
          <View style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>⏱️</Text>
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                {recipeUtils.formatCookingTime(recipe.cookingTime)}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>
                {recipeUtils.getDifficultyEmoji(recipe.difficulty)}
              </Text>
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                {recipe.difficulty}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>
                {recipe.isOwn ? '👤' : '🌐'}
              </Text>
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                {recipe.isOwn ? 'Propia' : 'Importada'}
              </Text>
            </View>
          </View>

          {/* Descripción */}
          <Card style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Descripción
            </Text>
            {isEditing ? (
              <TextInput
                style={[
                  styles.descriptionInput,
                  {
                    color: colors.text,
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                  },
                ]}
                value={editedDescription}
                onChangeText={setEditedDescription}
                placeholder="Descripción de la receta"
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={4}
              />
            ) : (
              <Text style={[styles.description, { color: colors.textSecondary }]}>
                {recipe.description}
              </Text>
            )}
          </Card>

          {/* Ingredientes */}
          {recipe.ingredients.length > 0 && (
            <Card style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Ingredientes 🥕
              </Text>
              {recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.primary }]}>
                    •
                  </Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    {ingredient}
                  </Text>
                </View>
              ))}
            </Card>
          )}

          {/* Pasos */}
          {recipe.steps.length > 0 && (
            <Card style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Preparación 👨‍🍳
              </Text>
              {recipe.steps.map((step, index) => (
                <View key={index} style={styles.step}>
                  <View
                    style={[
                      styles.stepNumber,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={[styles.stepText, { color: colors.textSecondary }]}>
                    {step}
                  </Text>
                </View>
              ))}
            </Card>
          )}

          {/* Botones de edición */}
          {isEditing && (
            <View style={styles.editActions}>
              <Button
                title="Cancelar"
                onPress={handleCancelEdit}
                variant="secondary"
                style={styles.editButton}
              />
              <Button
                title="Guardar"
                onPress={handleSaveEdit}
                style={styles.editButton}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  quickInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  descriptionInput: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 20,
    marginRight: 8,
    lineHeight: 24,
  },
  listText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  editButton: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 24,
  },
});
