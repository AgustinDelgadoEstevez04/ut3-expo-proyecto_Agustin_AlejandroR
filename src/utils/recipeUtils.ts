import { Recipe, RecipeSortOrder, RecipeFilters } from '@/types/recipe';

export const recipeUtils = {
  /**
   * Ordenar por fecha (más recientes primero)
   */
  sortByRecent(recipes: Recipe[]): Recipe[] {
    return [...recipes].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  /**
   * Ordenar alfabéticamente
   */
  sortByAlphabetic(recipes: Recipe[]): Recipe[] {
    return [...recipes].sort((a, b) =>
      a.title.localeCompare(b.title, 'es', { sensitivity: 'base' })
    );
  },

  /**
   * Ordenar por tiempo de cocción
   */
  sortByTime(recipes: Recipe[]): Recipe[] {
    return [...recipes].sort((a, b) => a.cookingTime - b.cookingTime);
  },

  /**
   * Ordenar según criterio
   */
  sort(recipes: Recipe[], order: RecipeSortOrder): Recipe[] {
    switch (order) {
      case 'alphabetic':
        return this.sortByAlphabetic(recipes);
      case 'time':
        return this.sortByTime(recipes);
      case 'recent':
      default:
        return this.sortByRecent(recipes);
    }
  },

  /**
   * Filtrar favoritas
   */
  filterFavorites(recipes: Recipe[]): Recipe[] {
    return recipes.filter(r => r.isFavorite);
  },

  /**
   * Filtrar propias
   */
  filterOwn(recipes: Recipe[]): Recipe[] {
    return recipes.filter(r => r.isOwn);
  },

  /**
   * Filtrar por dificultad
   */
  filterByDifficulty(recipes: Recipe[], difficulty: Recipe['difficulty']): Recipe[] {
    return recipes.filter(r => r.difficulty === difficulty);
  },

  /**
   * Buscar en recetas
   */
  search(recipes: Recipe[], query: string): Recipe[] {
    if (!query.trim()) return recipes;

    const lowerQuery = query.toLowerCase();

    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(lowerQuery) ||
      recipe.description.toLowerCase().includes(lowerQuery) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(lowerQuery))
    );
  },

  /**
   * Aplicar filtros múltiples
   */
  applyFilters(recipes: Recipe[], filters: RecipeFilters): Recipe[] {
    let filtered = [...recipes];

    if (filters.favorites) {
      filtered = this.filterFavorites(filtered);
    }

    if (filters.own) {
      filtered = this.filterOwn(filtered);
    }

    if (filters.difficulty) {
      filtered = this.filterByDifficulty(filtered, filters.difficulty);
    }

    if (filters.query) {
      filtered = this.search(filtered, filters.query);
    }

    return filtered;
  },

  /**
   * Obtener estadísticas
   */
  getStats(recipes: Recipe[]) {
    return {
      total: recipes.length,
      favorites: recipes.filter(r => r.isFavorite).length,
      own: recipes.filter(r => r.isOwn).length,
      imported: recipes.filter(r => !r.isOwn).length,
      easy: recipes.filter(r => r.difficulty === 'Fácil').length,
      medium: recipes.filter(r => r.difficulty === 'Media').length,
      hard: recipes.filter(r => r.difficulty === 'Difícil').length,
    };
  },

  /**
   * Validar receta
   */
  validateRecipe(recipe: Partial<Recipe>): string[] {
    const errors: string[] = [];

    if (!recipe.title?.trim()) {
      errors.push('El título es obligatorio');
    }

    if (recipe.title && recipe.title.length < 3) {
      errors.push('El título debe tener al menos 3 caracteres');
    }

    if (!recipe.image) {
      errors.push('La imagen es obligatoria');
    }

    if (!recipe.cookingTime || recipe.cookingTime <= 0) {
      errors.push('El tiempo de cocción debe ser mayor a 0');
    }

    if (!recipe.ingredients || recipe.ingredients.length === 0) {
      errors.push('Debes añadir al menos un ingrediente');
    }

    if (!recipe.steps || recipe.steps.length === 0) {
      errors.push('Debes añadir al menos un paso');
    }

    return errors;
  },

  /**
   * Verifica si la receta es válida
   */
  isValid(recipe: Partial<Recipe>): boolean {
    return this.validateRecipe(recipe).length === 0;
  },

  /**
   * Formatear tiempo de cocción
   */
  formatCookingTime(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (mins === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${mins}min`;
  },

  /**
   * Obtener emoji de dificultad
   */
  getDifficultyEmoji(difficulty: Recipe['difficulty']): string {
    const emojiMap = {
      'Fácil': '😊',
      'Media': '🤔',
      'Difícil': '😰',
    };

    return emojiMap[difficulty];
  },
};