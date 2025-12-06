import { client } from './client';
import { Recipe } from '@/types/recipe';

interface SpoonacularRecipe {
  id: number;
  title: string;
  summary?: string;
  image: string;
  readyInMinutes?: number;
  veryHealthy?: boolean;
  extendedIngredients?: Array<{
    original: string;
  }>;
  analyzedInstructions?: Array<{
    steps: Array<{
      number: number;
      step: string;
    }>;
  }>;
}

/**
 * Mapea una receta de Spoonacular a nuestro modelo
 */
function mapSpoonacularToRecipe(data: SpoonacularRecipe): Omit<Recipe, 'isFavorite' | 'isOwn' | 'createdAt'> {
  // Limpiar HTML del summary
  const cleanDescription = data.summary?.replace(/<[^>]*>/g, '').substring(0, 200) || 'Receta deliciosa importada desde Spoonacular';

  return {
    id: `api-${data.id}`,
    title: data.title,
    description: cleanDescription,
    image: data.image,
    cookingTime: data.readyInMinutes || 30,
    difficulty: data.veryHealthy ? 'Media' : 'Fácil',
    ingredients: data.extendedIngredients?.map(ing => ing.original) || ['No disponible'],
    steps: data.analyzedInstructions?.[0]?.steps?.map(s => s.step) || ['Consulta la receta original para más detalles'],
  };
}

/**
 * API de recetas de Spoonacular
 */
export const recipesApi = {
  /**
   * Obtiene una receta aleatoria
   */
  async getRandomRecipe(): Promise<Recipe> {
    try {
      const response = await client.get<{ recipes: SpoonacularRecipe[] }>('/recipes/random', {
        params: {
          number: 1,
        },
      });

      const spoonacularRecipe = response.data.recipes[0];
      const mappedRecipe = mapSpoonacularToRecipe(spoonacularRecipe);

      return {
        ...mappedRecipe,
        isFavorite: false,
        isOwn: false,
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching random recipe:', error);
      throw new Error('No se pudo obtener la receta desde la API');
    }
  },

  /**
   * Busca recetas por query
   */
  async searchRecipes(query: string, limit: number = 10): Promise<Recipe[]> {
    try {
      const response = await client.get<{ results: SpoonacularRecipe[] }>('/recipes/complexSearch', {
        params: {
          query,
          number: limit,
          addRecipeInformation: true,
        },
      });

      return response.data.results.map(recipe => ({
        ...mapSpoonacularToRecipe(recipe),
        isFavorite: false,
        isOwn: false,
        createdAt: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw new Error('No se pudieron buscar recetas');
    }
  },
};
