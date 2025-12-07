import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const useImagePicker = () => {
  const [loading, setLoading] = useState(false);

  const requestPermissions = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!cameraPermission.granted || !galleryPermission.granted) {
      Alert.alert(
        'Permisos necesarios',
        'Esta app necesita acceso a tu cámara y galería para funcionar correctamente.',
        [{ text: 'OK' }]
      );
      return false;
    }

    return true;
  };

  const pickFromCamera = async (): Promise<string | null> => {
    try {
      setLoading(true);

      const hasPermission = await requestPermissions();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled) {
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      console.error('Error al abrir cámara:', error);
      Alert.alert('Error', 'No se pudo abrir la cámara');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const pickFromGallery = async (): Promise<string | null> => {
    try {
      setLoading(true);

      const hasPermission = await requestPermissions();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled) {
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      console.error('Error al abrir galería:', error);
      Alert.alert('Error', 'No se pudo abrir la galería');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    pickFromCamera,
    pickFromGallery,
    loading,
  };
};