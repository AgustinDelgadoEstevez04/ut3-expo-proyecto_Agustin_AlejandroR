import { db, STORAGE_KEYS } from './db';
import { Recipe } from '@/types/recipe';

/**
 * Data Access Object para Recetas
 */
export const recipesDao = {
  /**
   * Obtiene todas las recetas
   */
  async getAll(): Promise<Recipe[]> {
    try {
      const recipes = await db.get<Recipe[]>(STORAGE_KEYS.RECIPES);
      return recipes || [];
    } catch (error) {
      console.error('Error getting all recipes:', error);
      return [];
    }
  },

  /**
   * Obtiene una receta por ID
   */
  async getById(id: string): Promise<Recipe | null> {
    try {
      const recipes = await this.getAll();
      return recipes.find(r => r.id === id) || null;
    } catch (error) {
      console.error('Error getting recipe by ID:', error);
      return null;
    }
  },

  /**
   * Guarda una receta (crear o actualizar)
   */
  async save(recipe: Recipe): Promise<void> {
    try {
      const recipes = await this.getAll();
      const index = recipes.findIndex(r => r.id === recipe.id);

      if (index !== -1) {
        // Actualizar existente
        recipes[index] = recipe;
      } else {
        // Agregar nueva
        recipes.unshift(recipe);
      }

      await db.save(STORAGE_KEYS.RECIPES, recipes);
    } catch (error) {
      console.error('Error saving recipe:', error);
      throw error;
    }
  },

  /**
   * Guarda múltiples recetas
   */
  async saveAll(recipes: Recipe[]): Promise<void> {
    try {
      await db.save(STORAGE_KEYS.RECIPES, recipes);
    } catch (error) {
      console.error('Error saving all recipes:', error);
      throw error;
    }
  },

  /**
   * Elimina una receta por ID
   */
  async delete(id: string): Promise<void> {
    try {
      const recipes = await this.getAll();
      const filtered = recipes.filter(r => r.id !== id);
      await db.save(STORAGE_KEYS.RECIPES, filtered);
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  },

  /**
   * Limpia todas las recetas
   */
  async deleteAll(): Promise<void> {
    try {
      await db.save(STORAGE_KEYS.RECIPES, []);
    } catch (error) {
      console.error('Error deleting all recipes:', error);
      throw error;
    }
  },
};