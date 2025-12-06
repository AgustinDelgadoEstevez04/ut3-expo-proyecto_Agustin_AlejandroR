/**
 * Modelo de dominio principal - Receta
 */
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookingTime: number; // minutos
  difficulty: RecipeDifficulty;
  ingredients: string[];
  steps: string[];
  isFavorite: boolean;
  isOwn: boolean; // true si la creó el usuario
  createdAt: string; // ISO 8601
}

/**
 * Datos para crear/editar receta (sin id ni createdAt)
 */
export interface RecipeFormData {
  title: string;
  description: string;
  image: string;
  cookingTime: number;
  difficulty: RecipeDifficulty;
  ingredients: string[];
  steps: string[];
}

/**
 * Entidad de base de datos (AsyncStorage)
 */
export interface RecipeEntity {
  id: string;
  data: string; // JSON serializado de Recipe
  created_at: number; // timestamp
  updated_at: number; // timestamp
}

/**
 * Tipos auxiliares
 */
export type RecipeDifficulty = 'Fácil' | 'Media' | 'Difícil';

export type RecipeSortOrder = 'recent' | 'alphabetic' | 'time';

export interface RecipeFilters {
  favorites?: boolean;
  own?: boolean;
  difficulty?: RecipeDifficulty;
  query?: string;
}
