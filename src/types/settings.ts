export interface Settings {
  theme: ThemeMode;
  sortOrder: RecipeSortOrder;
  showFavoritesFirst: boolean;
  enableShake: boolean;
  language: 'es' | 'en';
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}