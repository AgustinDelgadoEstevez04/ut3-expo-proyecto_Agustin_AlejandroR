import React from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecipesStore } from '../../src/stores/useRecipesStore';
import { useSettingsStore } from '../../src/stores/useSettingsStore';
import { useTheme } from '../../src/hooks/useTheme';
import { useShakeDetector } from '../../src/hooks/useShakeDetector';
import { recipeUtils } from '../../src/utils/recipeUtils';
import { RecipeCard } from '../../src/components/recipes/RecipeCard';
import { FAB } from '../../src/components/ui/FAB';
import { EmptyState } from '../../src/components/ui/EmptyState';
import { LoadingSpinner } from '../../src/components/ui/LoadingSpinner';

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

  let sortedRecipes = recipeUtils.sort(recipes, sortOrder);

  if (showFavoritesFirst) {
    sortedRecipes = [
      ...sortedRecipes.filter(r => r.isFavorite),
      ...sortedRecipes.filter(r => !r.isFavorite),
    ];
  }

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
          text: '✍️ Crear Manualmente',
          onPress: () => router.push('/recipe/create'),
        },
        {
          text: '🌐 Importar desde API',
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