import { useColorScheme } from 'react-native';
import { useSettingsStore } from '../stores/useSettingsStore';
import { Colors } from '../theme/colors';

export const useTheme = () => {
  const { theme } = useSettingsStore();
  const systemColorScheme = useColorScheme();

  const activeTheme = theme === 'system' ? systemColorScheme || 'light' : theme;
  const colors = Colors[activeTheme];
  const isDark = activeTheme === 'dark';

  return {
    theme: activeTheme,
    colors,
    isDark,
  };
};