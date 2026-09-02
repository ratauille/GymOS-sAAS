# 👑 GymOS — Luxury Edition (SaaS Multi-tenant PWA)

> **Plataforma Web de Rendimiento Físico, Nutrición Científica con Gramajes Exactos y Gestión Multi-Gimnasio.**

![GymOS Banner](https://img.shields.io/badge/GymOS-Luxury%20Performance-0F2C59?style=for-the-badge&logo=appveyor)
![Stack](https://img.shields.io/badge/Stack-VanillaJS%20%7C%20Supabase%20%7C%20PWA-D4AF37?style=for-the-badge)
![License](https://img.shields.io/badge/License-Commercial-059669?style=for-the-badge)

---

## 🌟 Características Principales

1. **Diseño de Ultra Lujo & UI/UX**:
   - Fondo blanco profundo (`#FAFAFA` – `#FFFFFF`) con acentos en **Azul Cobalto Oscuro** (`#0F2C59`).
   - Encabezados elegantes en tipografía **Belleza** y cuerpo en **Plus Jakarta Sans**.
   - Hero cinematográfico con carrusel motivacional en *fade-in/fade-out*.

2. **Motor Nutricional (TDEE & Gramajes Exactos)**:
   - Calculadora metabólica basada en Mifflin-St Jeor.
   - Genera 5 comidas diarias indicando **gramajes exactos por alimento** según calorías y macros objetivo.
   - Opciones: Omnívora, Pescetariana, Vegetariana, Low Carb.

3. **Generador de Rutinas & Biomecánica**:
   - Divisiones de 3, 4 y 5 días estructuradas por grupos musculares.
   - Incluye series, repeticiones, RIR, descansos y **tips técnicos de postura biomecánica**.
   - Registro interactivo de cargas levantadas (kg).

4. **Terminal Coach Shell CLI & Logros Verificables**:
   - Consola interactiva para entrenadores (`node gymos_coach_shell.js` o terminal web).
   - Evaluación automática de **logros por tiempo** (*Adherencia Élite, Sobrecarga Progresiva, Recomposición Corporal, Consistencia*).

5. **Backend Cloud Supabase Multi-tenant**:
   - Aislamiento seguro por gimnasio (`gym_id`) mediante Row Level Security (RLS) en PostgreSQL.

6. **PWA Instalable en iOS & Android**:
   - `manifest.json` y `sw.js` (Service Worker) para instalación nativa sin pasar por las tiendas de aplicaciones.

7. **Pasarela de Pagos PayPal Checkout**:
   - Integración nativa con SDK de PayPal para planes semanales, mensuales o licencias comerciales.

---

## 🚀 Instalación & Inicio Rápido

### 1. Clonar el Repositorio
```bash
git clone https://github.com/TU_USUARIO/GymOS-SaaS.git
cd GymOS-SaaS
```

### 2. Ejecutar la Aplicación Web
Simplemente abre `index.html` en tu navegador o sírvelo mediante cualquier servidor estático:
```bash
npx serve .
```

### 3. Ejecutar la Terminal CLI del Entrenador
```bash
node gymos_coach_shell.js
```

---

## 🗄️ Configuración de Supabase (PostgreSQL Multi-Tenant)

1. Abre tu proyecto en [Supabase](https://supabase.com).
2. Ve al **SQL Editor** y ejecuta el script [supabase_schema.sql](file:///c:/Users/frank/Downloads/pagina%20chef4you%20nueva/GymOS/supabase_schema.sql).
3. Configura tus llaves en `js/supabase-client.js`.

---

## 💰 Modelo de Precios Comercial SaaS

- **Plan Coach**: **$999 MXN / mes** ($55 USD)
- **Plan Gimnasio Pro**: **$2,499 MXN / mes** ($135 USD)
- **Plan Cadena Élite**: **$4,999 MXN / mes** ($270 USD)

---

© 2026 GymOS Luxury Edition. Todos los derechos reservados.
