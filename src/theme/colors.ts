import { ThemeColors } from '../types/settings';

export const Colors: Record<'light' | 'dark', ThemeColors> = {
  light: {
    primary: '#FF6B6B',
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#000000',
    textSecondary: '#666666',
    border: '#E0E0E0',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
  },
  dark: {
    primary: '#FF6B6B',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    border: '#333333',
    success: '#66BB6A',
    warning: '#FFCA28',
    error: '#EF5350',
  },
};
