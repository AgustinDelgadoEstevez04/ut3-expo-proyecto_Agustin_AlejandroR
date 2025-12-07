import React from 'react';
import { View, Text, ScrollView, StyleSheet, Switch, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettingsStore } from '../../src/stores/useSettingsStore';
import { useRecipesStore } from '../../src/stores/useRecipesStore';
import { useUserStore } from '../../src/stores/useUserStore';
import { useTheme } from '../../src/hooks/useTheme';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { recipeUtils } from '../../src/utils/recipeUtils';

export default function SettingsScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const {
    theme,
    sortOrder,
    showFavoritesFirst,
    enableShake,
    setTheme,
    setSortOrder,
    toggleFavoritesFirst,
    toggleShake,
  } = useSettingsStore();

  const { recipes } = useRecipesStore();
  const { user, logout } = useUserStore();

  const stats = recipeUtils.getStats(recipes);

  const handleChangeTheme = () => {
    Alert.alert(
      'Cambiar Tema',
      'Selecciona un tema',
      [
        { text: 'Claro', onPress: () => setTheme('light') },
        { text: 'Oscuro', onPress: () => setTheme('dark') },
        { text: 'Sistema', onPress: () => setTheme('system') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const handleChangeSortOrder = () => {
    Alert.alert(
      'Ordenar Por',
      'Elige el orden de la lista',
      [
        { text: 'Más Recientes', onPress: () => setSortOrder('recent') },
        { text: 'Alfabético', onPress: () => setSortOrder('alphabetic') },
        { text: 'Tiempo de Cocción', onPress: () => setSortOrder('time') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro? Tus recetas se mantendrán guardadas.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light': return '☀️ Claro';
      case 'dark': return '🌙 Oscuro';
      case 'system': return '🔄 Sistema';
    }
  };

  const getSortOrderLabel = () => {
    switch (sortOrder) {
      case 'recent': return '🕐 Más Recientes';
      case 'alphabetic': return '🔤 Alfabético';
      case 'time': return '⏱️ Tiempo de Cocción';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Usuario */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Usuario
          </Text>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.text }]}>
              👤 {user?.username}
            </Text>
          </View>
          <Button
            title="Cerrar Sesión"
            onPress={handleLogout}
            variant="secondary"
          />
        </Card>

        {/* Apariencia */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Apariencia
          </Text>
          <Pressable style={styles.option} onPress={handleChangeTheme}>
            <Text style={[styles.optionLabel, { color: colors.text }]}>
              Tema
            </Text>
            <Text style={[styles.optionValue, { color: colors.textSecondary }]}>
              {getThemeLabel()}
            </Text>
          </Pressable>
        </Card>

        {/* Ordenación */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Ordenación
          </Text>

          <Pressable style={styles.option} onPress={handleChangeSortOrder}>
            <Text style={[styles.optionLabel, { color: colors.text }]}>
              Ordenar por
            </Text>
            <Text style={[styles.optionValue, { color: colors.textSecondary }]}>
              {getSortOrderLabel()}
            </Text>
          </Pressable>

          <View style={styles.option}>
            <Text style={[styles.optionLabel, { color: colors.text }]}>
              Favoritas primero
            </Text>
            <Switch
              value={showFavoritesFirst}
              onValueChange={toggleFavoritesFirst}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </Card>

        {/* Sensores */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Sensores
          </Text>
          <View style={styles.option}>
            <View style={styles.optionWithDescription}>
              <Text style={[styles.optionLabel, { color: colors.text }]}>
                Agitar para añadir
              </Text>
              <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                Agita el móvil para importar receta aleatoria
              </Text>
            </View>
            <Switch
              value={enableShake}
              onValueChange={toggleShake}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </Card>

        {/* Estadísticas */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Estadísticas
          </Text>

          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              {stats.total}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Recetas Totales
            </Text>
          </View>

          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              {stats.favorites}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Favoritas
            </Text>
          </View>

          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              {stats.own}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Recetas Propias
            </Text>
          </View>
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Versión 1.0.0
          </Text>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Recetas App con Expo
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userInfo: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionLabel: {
    fontSize: 16,
  },
  optionValue: {
    fontSize: 14,
  },
  optionWithDescription: {
    flex: 1,
    marginRight: 16,
  },
  optionDescription: {
    fontSize: 12,
    marginTop: 4,
  },
  stat: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 12,
  },
});
