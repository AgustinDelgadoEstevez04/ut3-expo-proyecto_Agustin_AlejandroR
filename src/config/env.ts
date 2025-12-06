export const ENV = {
SPOONACULAR_API_KEY: process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY || '',
SPOONACULAR_BASE_URL: 'https://api.spoonacular.com',
};

// Validación en desarrollo
if (__DEV__ && !ENV.SPOONACULAR_API_KEY) {
  console.warn('⚠️ SPOONACULAR_API_KEY no está configurada en .env');
}