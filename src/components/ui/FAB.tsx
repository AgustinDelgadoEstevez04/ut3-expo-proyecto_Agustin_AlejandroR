import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface FABProps {
  onPress: () => void;
  icon?: string;
  style?: ViewStyle;
}

export const FAB: React.FC<FABProps> = ({ onPress, icon = '+', style }) => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        styles.fab,
        { backgroundColor: colors.primary },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={styles.icon}>{icon}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
});