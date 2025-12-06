import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecipesStore } from '@/stores/useRecipesStore';
import { useTheme } from '@/hooks/useTheme';
import { RecipeCard } from '@/components/recipes/RecipeCard';
import { EmptyState } from '@/components/ui/EmptyState';

export default function FavoritesScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { recipes, toggleFavorite } = useRecipesStore();

  const favoriteRecipes = recipes.filter(r => r.isFavorite);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <FlatList
        data={favoriteRecipes}
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
            title="Sin favoritas aún"
            subtitle="Marca recetas con ❤️ para verlas aquí"
            emoji="❤️"
          />
        }
      />
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
