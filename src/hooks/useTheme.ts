import { useColorScheme } from 'react-native';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { Colors } from '@/theme/colors';

export const useTheme = () => {
  const { theme } = useSettingsStore();
  const systemColorScheme = useColorScheme();

  // Determinar el tema actual
  const activeTheme = theme === 'system' ? systemColorScheme || 'light' : theme;

  // Obtener colores del tema
  const colors = Colors[activeTheme];

  // Verificar si está en modo oscuro
  const isDark = activeTheme === 'dark';

  return {
    theme: activeTheme,
    colors,
    isDark,
  };
};