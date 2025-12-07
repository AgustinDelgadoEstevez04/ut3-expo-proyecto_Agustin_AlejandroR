# 🍳 App de Recetas - Proyecto Final UT3

Aplicación móvil multiplataforma (Android/iOS/Web) para gestionar recetas de cocina, desarrollada con **Expo**, **React Native** y **TypeScript**.

---

## 📱 Descripción del Proyecto

**App de Recetas** es una aplicación móvil que permite a los usuarios:

- 📝 **Crear recetas personalizadas** con fotos propias
- 🌐 **Importar recetas aleatorias** desde una API externa (Spoonacular)
- ❤️ **Marcar favoritas** y organizarlas
- 🎨 **Personalizar la experiencia** con tema claro/oscuro
- 📳 **Interactuar con sensores** (agitar el móvil para agregar recetas)
- 📂 **Gestionar recetas** con CRUD completo (Crear, Leer, Actualizar, Eliminar)

---

## ✨ Características Principales

### 🚀 Funcionalidades Core

- ✅ **CRUD Completo**: Crear, editar y eliminar recetas
- ✅ **Importación desde API**: Obtener recetas aleatorias de Spoonacular
- ✅ **Sistema de Favoritas**: Marca y filtra tus recetas preferidas
- ✅ **Tema Dinámico**: Modo claro, oscuro o automático según el sistema
- ✅ **Persistencia Local**: Todos los datos se guardan automáticamente
- ✅ **Multimedia**: Captura fotos con la cámara o selecciona de la galería
- ✅ **Ordenación Múltiple**: Por fecha, alfabético o tiempo de cocción
- ✅ **Sensor de Movimiento**: Agita el móvil para importar recetas

### 🎨 Experiencia de Usuario

- ✨ **Animaciones Suaves**: Slide-in effect en las tarjetas de recetas
- 🔐 **Pseudo-Login**: Sistema de autenticación simple con captcha matemático
- 📊 **Estadísticas**: Visualiza el total de recetas, favoritas y propias
- ⚙️ **Configuración Personalizada**: Ajusta la app a tu gusto

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v18 o superior ([Descargar](https://nodejs.org/))
- **npm** v9 o superior
- **Expo Go** en tu dispositivo móvil:
    - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
    - [iOS](https://apps.apple.com/app/expo-go/id982107779)

---

## 🚀 Instalación y Configuración

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar API Key propia

1. Regístrate en [Spoonacular API](https://spoonacular.com/food-api/console#Dashboard)
2. Copia tu API Key (plan gratuito: 150 llamadas/día)
3. Crea un archivo `.env` en la raíz del proyecto:

### 3. Iniciar el Proyecto

```bash
npx expo start
```

### 4. Abrir en tu Dispositivo

**Opción A - Expo Go (Recomendado):**
1. Abre **Expo Go** en tu móvil
2. Escanea el código QR que aparece en la terminal

**Opción B - Emulador:**
```bash
# Android
npx expo start --android

# iOS (solo Mac)
npx expo start --ios
```

---

## 📁 Estructura del Proyecto

```
expo-recetas-app/
├── app/                              # Rutas (Expo Router)
│   ├── (tabs)/                       # Navegación por pestañas
│   │   ├── home.tsx                  # Lista de recetas
│   │   ├── favorites.tsx             # Recetas favoritas
│   │   └── settings.tsx              # Ajustes de la app
│   ├── recipe/
│   │   ├── [id].tsx                  # Detalle de receta (dinámico)
│   │   └── create.tsx                # Crear receta manual
│   ├── _layout.tsx                   # Layout raíz
│   ├── index.tsx                     # Splash screen
│   └── login.tsx                     # Pseudo-login
│
├── src/                              # Código fuente
│   ├── components/                   # Componentes reutilizables
│   │   ├── ui/                       # Componentes base (Button, Input, etc.)
│   │   ├── recipes/                  # Componentes de recetas
│   │   └── login/                    # Componentes de login
│   ├── stores/                       # Estado global (Zustand)
│   │   ├── useUserStore.ts           # Usuario y autenticación
│   │   ├── useRecipesStore.ts        # Gestión de recetas
│   │   └── useSettingsStore.ts       # Ajustes de la app
│   ├── services/                     # Servicios externos
│   │   ├── api/                      # Cliente HTTP y API
│   │   ├── database/                 # Persistencia con AsyncStorage
│   │   └── sensors/                  # Detector de shake
│   ├── hooks/                        # Custom Hooks
│   ├── types/                        # Interfaces TypeScript
│   ├── theme/                        # Sistema de diseño (colores, tipografía)
│   ├── utils/                        # Funciones auxiliares
│   └── config/                       # Configuración (variables de entorno)
│
├── assets/                           # Recursos estáticos
├── .env                              # Variables de entorno
├── app.json                          # Configuración de Expo
├── package.json                      # Dependencias
└── tsconfig.json                     # Configuración TypeScript
```

---

## 🎯 Funcionalidades Detalladas

### 🏠 Pantalla de Inicio

**Funcionalidades:**
- Ver lista completa de recetas con scroll infinito
- Ordenar por: más recientes, alfabético o tiempo de cocción
- Priorizar recetas favoritas (opcional)
- Buscar recetas visualmente
- Agregar nuevas recetas (botón flotante +)

**Opciones al agregar:**
- ✍️ **Crear Manualmente**: Formulario completo con foto
- 🌐 **Importar desde API**: Receta aleatoria de Spoonacular
- 📳 **Agitar el móvil**: Importar receta (si está activado en ajustes)

### ❤️ Pantalla de Favoritos

**Funcionalidades:**
- Ver solo recetas marcadas como favoritas
- Misma funcionalidad que la pantalla de inicio
- Acceso rápido a tus recetas preferidas

### ⚙️ Pantalla de Ajustes

**Configuraciones disponibles:**

**Apariencia:**
- ☀️ Tema claro
- 🌙 Tema oscuro
- 🔄 Automático (según el sistema)

**Ordenación:**
- 🕐 Más recientes
- 🔤 Alfabético (A-Z)
- ⏱️ Por tiempo de cocción

**Preferencias:**
- ⭐ Mostrar favoritas primero
- 📳 Activar/desactivar sensor de shake

**Estadísticas:**
- Total de recetas guardadas
- Recetas favoritas
- Recetas propias vs importadas

**Sesión:**
- Cerrar sesión (volver al login)

### 📖 Pantalla de Detalle

**Información mostrada:**
- Imagen de la receta (pantalla completa)
- Título y descripción
- Tiempo de cocción
- Nivel de dificultad (Fácil/Media/Difícil)
- Origen (Propia/Importada)
- Lista completa de ingredientes
- Pasos de preparación numerados

**Acciones disponibles:**
- ❤️ Marcar/desmarcar como favorita
- ✏️ Editar (solo recetas propias)
- 🗑️ Eliminar

### ✍️ Pantalla de Crear Receta

**Campos del formulario:**
- **Título** (obligatorio)
- **Descripción** (opcional)
- **Imagen** (obligatorio - cámara o galería)
- **Tiempo de cocción** en minutos (obligatorio)
- **Dificultad** (Fácil/Media/Difícil)
- **Ingredientes** (lista dinámica - mínimo 1)
- **Pasos** (lista dinámica - mínimo 1)

**Características:**
- Validación en tiempo real
- Añadir/eliminar ingredientes dinámicamente
- Añadir/eliminar pasos dinámicamente
- Vista previa de la imagen
- Mensajes de error claros

---

## 🔐 Permisos del Sistema

La aplicación solicita los siguientes permisos en tiempo de ejecución:

### 📷 Cámara

**¿Para qué?** Tomar fotos de tus platos al crear recetas personalizadas.

**¿Dónde se usa?**
- Pantalla de crear receta → Selector de imagen → "Tomar Foto"


### 🖼️ Galería

**¿Para qué?** Seleccionar imágenes existentes de tu dispositivo.

**¿Dónde se usa?**
- Pantalla de crear receta → Selector de imagen → "Desde Galería"

### 📳 Sensor de Acelerómetro

**¿Para qué?** Detectar el movimiento de "shake" para importar recetas aleatorias.

**¿Dónde se usa?**
- Pantalla de inicio (cuando está activado en ajustes)

**¿Cómo funciona?**
1. Activa el sensor en Ajustes → "Agitar para añadir"
2. En la pantalla de inicio, agita el móvil
3. Se importa automáticamente una receta aleatoria desde la API


### ⚙️ Configuración de Permisos

Los permisos están configurados en `app.json`:

---

## 🎬 Animaciones

La app incluye varias animaciones para mejorar la experiencia de usuario:

### 🌊 Slide In Effect

**¿Qué es?** Las tarjetas de recetas se deslizan desde la derecha al aparecer.

**¿Dónde?** Lista de recetas en Inicio y Favoritos.


**Características:**
- ✨ Efecto escalonado (100ms de delay entre tarjetas)
- ✨ Fade in simultáneo
- ✨ Animación spring (efecto de rebote)

### 🔄 Otras Animaciones

- **Transiciones de pantalla**: Automáticas con Expo Router
- **Feedback en botones**: Efecto de opacidad al presionar
- **Loading spinner**: Indicador animado al importar recetas

---

## 🔌 Integración con API Externa

### Spoonacular Food API

**URL Base:** `https://spoonacular.com/food-api/console#Profile`

**Endpoint Utilizado:**
```
GET /recipes/random?apiKey={key}&number=1
```

**¿Para qué se usa?**
- Importar recetas aleatorias con información completa
- Obtener imágenes profesionales de platos
- Acceder a información nutricional


**Límites del Plan Gratuito:**
- 150 llamadas a la a API por día
- Ideal para desarrollo y pruebas

---

## 💾 Persistencia de Datos

### AsyncStorage + Zustand

Todos los datos se guardan automáticamente en el dispositivo:

**Stores Persistidos:**
1. **useUserStore**: Usuario y estado de autenticación
2. **useRecipesStore**: Lista completa de recetas
3. **useSettingsStore**: Ajustes y preferencias


**¿Qué se guarda?**
- ✅ Todas las recetas creadas e importadas
- ✅ Estados de favoritas
- ✅ Tema seleccionado
- ✅ Preferencias de ordenación
- ✅ Estado de sensores
- ✅ Sesión de usuario

---

## 🧪 Testing

### Probar en Dispositivo Real

**Android:**
```bash
# Con Expo Go
npx expo start
# Escanear QR con Expo Go
```

**iOS:**
```bash
# Con Expo Go
npx expo start
# Escanear QR con la cámara nativa
```

### Casos de Prueba Recomendados

**Funcionalidad:**
- [ ] Crear receta manualmente con foto
- [ ] Importar receta desde API
- [ ] Marcar/desmarcar favorita
- [ ] Editar receta propia
- [ ] Eliminar receta
- [ ] Cambiar tema (claro/oscuro)
- [ ] Ordenar lista (reciente/alfabético/tiempo)
- [ ] Agitar móvil para importar (sensor)
- [ ] Cerrar y reabrir app (persistencia)

**Permisos:**
- [ ] Solicitar permiso de cámara
- [ ] Solicitar permiso de galería
- [ ] Activar/desactivar sensor de shake
- [ ] Denegar permisos (mostrar mensaje)

---

## 🐛 Solución de Problemas

### Error: "API Key inválida"

**Causa:** La API Key no está configurada o es incorrecta.

**Solución:**
```bash
# Verifica que el archivo .env existe
cat .env

# Debe contener:
EXPO_PUBLIC_SPOONACULAR_API_KEY=tu_clave_real
```

### Error: "No se puede conectar a la API"

**Causa:** Sin conexión a internet o límite de llamadas alcanzado.

**Solución:**
- Registrate y añadir manualmente la API: https://spoonacular.com/food-api/console#Profile
- Verifica tu conexión WiFi/datos
- Comprueba el límite diario (150 llamadas)
- Espera 24h para que se reinicie el contador

### La app no carga en Expo Go

**Causa:** PC y móvil no están en la misma red WiFi.

**Solución:**
```bash
# 1. Verifica que estén en la misma red
# 2. Limpia la caché
npx expo start --clear
# 3. Escanea el QR nuevamente
```

### Permisos de cámara no funcionan

**Causa:** Permisos denegados en el sistema.

**Solución:**
1. Ajustes del móvil → Apps → Expo Go
2. Permisos → Activar Cámara y Almacenamiento
3. Reinicia Expo Go

### El sensor no detecta el shake

**Causa:** Sensor desactivado o móvil no compatible.

**Solución:**
1. Ajustes en la app → Activar "Agitar para añadir"
2. Agita el móvil con más fuerza
3. Si no funciona, usa el botón + en su lugar

---

### Funcionalidades

- **CRUD:** Completo (Create, Read, Update, Delete)
- **API:** 1 API externa integrada
- **Permisos:** 3 permisos implementados
- **Sensores:** 1 sensor (acelerómetro)
- **Animaciones:** 3 tipos de animaciones

---

## 👨‍💻 Autores

- Agustín Delgado Estévez
- Alejandro Rodríguez Sánchez

---


**⭐ Si te gustó el proyecto, dale una estrella en GitHub ⭐**

**🎉 ¡Gracias por usar App de Recetas! 🍳**
