import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Recipe } from '../../types/recipe';
import { useTheme } from '../../hooks/useTheme';
import { recipeUtils } from '../../utils/recipeUtils';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
  onToggleFavorite: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onPress,
  onToggleFavorite,
}) => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <Image
        source={{ uri: recipe.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text
          style={[styles.title, { color: colors.text }]}
          numberOfLines={2}
        >
          {recipe.title}
        </Text>

        <View style={styles.info}>
          <Text style={[styles.time, { color: colors.textSecondary }]}>
            ⏱️ {recipeUtils.formatCookingTime(recipe.cookingTime)}
          </Text>
          <Text style={[styles.difficulty, { color: colors.textSecondary }]}>
            {recipeUtils.getDifficultyEmoji(recipe.difficulty)} {recipe.difficulty}
          </Text>
        </View>

        {recipe.isOwn && (
          <View style={[styles.badge, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>
              Propia
            </Text>
          </View>
        )}

        <Pressable
          style={styles.favoriteButton}
          onPress={onToggleFavorite}
        >
          <Text style={styles.favoriteIcon}>
            {recipe.isFavorite ? '❤️' : '🤍'}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
  },
  difficulty: {
    fontSize: 14,
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
  },
  favoriteIcon: {
    fontSize: 28,
  },
});