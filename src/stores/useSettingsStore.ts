import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings } from '@/types/settings';
import { RecipeSortOrder } from '@/types/recipe';

interface SettingsState extends Settings {}

interface SettingsActions {
  updateSettings: (settings: Partial<Settings>) => void;
  setTheme: (theme: Settings['theme']) => void;
  setSortOrder: (order: RecipeSortOrder) => void;
  toggleFavoritesFirst: () => void;
  toggleShake: () => void;
  resetSettings: () => void;
}

type SettingsStore = SettingsState & SettingsActions;

const defaultSettings: Settings = {
  theme: 'system',
  sortOrder: 'recent',
  showFavoritesFirst: true,
  enableShake: true,
  language: 'es',
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      // Estado inicial
      ...defaultSettings,

      // Actualizar múltiples ajustes
      updateSettings: (newSettings: Partial<Settings>) => {
        set((state) => ({
          ...state,
          ...newSettings,
        }));
      },

      // Cambiar tema
      setTheme: (theme) => {
        set({ theme });
      },

      // Cambiar orden
      setSortOrder: (sortOrder) => {
        set({ sortOrder });
      },

      // Toggle favoritas primero
      toggleFavoritesFirst: () => {
        set((state) => ({
          showFavoritesFirst: !state.showFavoritesFirst,
        }));
      },

      // Toggle sensor shake
      toggleShake: () => {
        set((state) => ({
          enableShake: !state.enableShake,
        }));
      },

      // Reset a valores por defecto
      resetSettings: () => {
        set(defaultSettings);
      },
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);