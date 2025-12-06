import { Accelerometer } from 'expo-sensors';

/**
 * Detector de movimiento "shake"
 */
export class ShakeDetector {
  private subscription: any = null;
  private lastShake = 0;
  private shakeThreshold = 2.5; // Umbral de aceleración
  private shakeCooldown = 1000; // Cooldown entre shakes (ms)

  /**
   * Inicia la detección de shake
   */
  start(onShake: () => void): void {
    // Configurar frecuencia de actualización
    Accelerometer.setUpdateInterval(100);

    this.subscription = Accelerometer.addListener((data) => {
      const { x, y, z } = data;
      const acceleration = Math.sqrt(x * x + y * y + z * z);

      // Detectar shake si supera el umbral
      if (acceleration > this.shakeThreshold) {
        const now = Date.now();

        // Verificar cooldown
        if (now - this.lastShake > this.shakeCooldown) {
          this.lastShake = now;
          onShake();
        }
      }
    });
  }

  /**
   * Detiene la detección
   */
  stop(): void {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
  }

  /**
   * Verifica si el detector está activo
   */
  isActive(): boolean {
    return this.subscription !== null;
  }

  /**
   * Configura el umbral de detección
   */
  setThreshold(threshold: number): void {
    this.shakeThreshold = threshold;
  }

  /**
   * Configura el cooldown entre shakes
   */
  setCooldown(cooldown: number): void {
    this.shakeCooldown = cooldown;
  }
}

// Instancia singleton
export const shakeDetector = new ShakeDetector();
