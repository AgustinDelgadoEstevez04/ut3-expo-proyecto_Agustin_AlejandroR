import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { RecipeCard } from './RecipeCard';
import { Recipe } from '../../types/recipe';

interface AnimatedRecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
  onToggleFavorite: () => void;
  index: number;
}

export const AnimatedRecipeCard: React.FC<AnimatedRecipeCardProps> = ({
  recipe,
  onPress,
  onToggleFavorite,
  index,
}) => {

  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.parallel([

      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        delay: index * 100,
        useNativeDriver: true,
      }),
      // Fade In
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateX: slideAnim }],
      }}
    >
      <RecipeCard
        recipe={recipe}
        onPress={onPress}
        onToggleFavorite={onToggleFavorite}
      />
    </Animated.View>
  );
};