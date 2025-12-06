import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Keys para AsyncStorage
 */
export const STORAGE_KEYS = {
  RECIPES: '@recipes',
  USER: '@user',
  SETTINGS: '@settings',
} as const;

/**
 * Wrapper de AsyncStorage con métodos helper
 */
export const db = {
  /**
   * Guarda datos en AsyncStorage
   */
  async save<T>(key: string, data: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw error;
    }
  },

  /**
   * Obtiene datos de AsyncStorage
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  },

  /**
   * Elimina datos de AsyncStorage
   */
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  },

  /**
   * Limpia todo AsyncStorage
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      throw error;
    }
  },
};
