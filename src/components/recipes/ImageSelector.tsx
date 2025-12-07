import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useImagePicker } from '../../hooks/useImagePicker';

interface ImageSelectorProps {
  value: string | null;
  onChange: (uri: string) => void;
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({
  value,
  onChange,
}) => {
  const { colors } = useTheme();
  const { pickFromCamera, pickFromGallery, loading } = useImagePicker();

  const handleSelectImage = () => {
    Alert.alert(
      'Seleccionar Imagen',
      'Elige una opción',
      [
        {
          text: 'Tomar Foto',
          onPress: async () => {
            const uri = await pickFromCamera();
            if (uri) onChange(uri);
          },
        },
        {
          text: 'Desde Galería',
          onPress: async () => {
            const uri = await pickFromGallery();
            if (uri) onChange(uri);
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>
        Imagen de la Receta
      </Text>

      <Pressable
        style={[styles.imageContainer, { backgroundColor: colors.card }]}
        onPress={handleSelectImage}
        disabled={loading}
      >
        {value ? (
          <Image source={{ uri: value }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
              Toca para {value ? 'cambiar' : 'añadir'} imagen
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  imageContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
  },
});
