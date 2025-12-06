import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecipesStore } from '@/stores/useRecipesStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useTheme } from '@/hooks/useTheme';
import { useShakeDetector } from '@/hooks/useShakeDetector';
import { recipeUtils } from '@/utils/recipeUtils';
import { RecipeCard } from '@/components/recipes/RecipeCard';
import { FAB } from '@/components/ui/FAB';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const {
    recipes,
    loading,
    toggleFavorite,
    importRandomRecipe,
  } = useRecipesStore();

  const { sortOrder, showFavoritesFirst } = useSettingsStore();

  // Ordenar recetas
  let sortedRecipes = recipeUtils.sort(recipes, sortOrder);

  // Favoritas primero si está activado
  if (showFavoritesFirst) {
    sortedRecipes = [
      ...sortedRecipes.filter(r => r.isFavorite),
      ...sortedRecipes.filter(r => !r.isFavorite),
    ];
  }

  // Detector de shake
  useShakeDetector(() => {
    handleImportRandom();
  });

  const handleImportRandom = async () => {
    try {
      await importRandomRecipe();
      Alert.alert('¡Receta añadida!', 'Se ha importado una receta aleatoria');
    } catch (error) {
      Alert.alert('Error', 'No se pudo importar la receta');
    }
  };

  const handleAddRecipe = () => {
    Alert.alert(
      'Agregar Receta',
      'Elige una opción',
      [
        {
          text: 'Crear Nueva',
          onPress: () => router.push('/recipe/new'),
        },
        {
          text: 'Importar desde API',
          onPress: handleImportRandom,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      {loading && <LoadingSpinner text="Importando receta..." />}

      <FlatList
        data={sortedRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => router.push(`/recipe/${item.id}`)}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState
            title="No hay recetas aún"
            subtitle="Toca el botón + para agregar tu primera receta"
            emoji="🍳"
          />
        }
      />

      <FAB onPress={handleAddRecipe} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
});