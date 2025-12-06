import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe, RecipeFormData } from '@/types/recipe';
import { recipesApi } from '@/services/api/recipesApi';

interface RecipesState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

interface RecipesActions {
  // CRUD
  addRecipe: (data: RecipeFormData) => void;
  updateRecipe: (id: string, data: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;

  // Favoritas
  toggleFavorite: (id: string) => void;

  // API
  importRandomRecipe: () => Promise<void>;

  // Utilidades
  getRecipeById: (id: string) => Recipe | undefined;
  clearError: () => void;
}

type RecipesStore = RecipesState & RecipesActions;

export const useRecipesStore = create<RecipesStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      recipes: [],
      loading: false,
      error: null,

      // Agregar receta nueva
      addRecipe: (data: RecipeFormData) => {
        const newRecipe: Recipe = {
          ...data,
          id: `recipe-${Date.now()}`,
          isFavorite: false,
          isOwn: true,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          recipes: [newRecipe, ...state.recipes],
        }));
      },

      // Actualizar receta existente
      updateRecipe: (id: string, data: Partial<Recipe>) => {
        set((state) => ({
          recipes: state.recipes.map((recipe) =>
            recipe.id === id ? { ...recipe, ...data } : recipe
          ),
        }));
      },

      // Eliminar receta
      deleteRecipe: (id: string) => {
        set((state) => ({
          recipes: state.recipes.filter((recipe) => recipe.id !== id),
        }));
      },

      // Toggle favorita
      toggleFavorite: (id: string) => {
        set((state) => ({
          recipes: state.recipes.map((recipe) =>
            recipe.id === id
              ? { ...recipe, isFavorite: !recipe.isFavorite }
              : recipe
          ),
        }));
      },

      // Importar receta aleatoria desde API
      importRandomRecipe: async () => {
        set({ loading: true, error: null });

        try {
          const recipe = await recipesApi.getRandomRecipe();

          set((state) => ({
            recipes: [recipe, ...state.recipes],
            loading: false,
          }));
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Error desconocido',
          });
          throw error;
        }
      },

      // Obtener receta por ID
      getRecipeById: (id: string) => {
        return get().recipes.find((recipe) => recipe.id === id);
      },

      // Limpiar error
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'recipes-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);