import { useEffect } from 'react';
import { shakeDetector } from '../services/sensors/shakeDetector';
import { useSettingsStore } from '../stores/useSettingsStore';

export const useShakeDetector = (onShake: () => void) => {
  const { enableShake } = useSettingsStore();

  useEffect(() => {
    if (!enableShake) return;

    shakeDetector.start(onShake);

    return () => {
      shakeDetector.stop();
    };
  }, [enableShake, onShake]);

  return {
    isActive: enableShake,
  };
};