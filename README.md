# 👑 GymOS — Luxury Performance SaaS Edition

> **Plataforma Integral de Gestión de Gimnasios, Nutrición Científica de Alta Precisión y Entrenamiento Biomecánico Élite.**

![GymOS Banner](https://img.shields.io/badge/GymOS-Luxury%20Performance-0F2C59?style=for-the-badge&logo=appveyor)
![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.10-06B6D4?style=for-the-badge&logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-App%20Hosting%20%7C%20DataConnect-FFCA28?style=for-the-badge&logo=firebase)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)

---

## 🌟 Arquitectura & Módulos Élite

### 1. 🏋️ Módulo 1: Rutinas Biomecánicas & Tracker de Cargas (`WorkoutSection`)
- Divisiones de entrenamiento estructuradas: **Push** (Pecho/Hombro), **Pull** (Espalda/Bíceps) y **Legs** (Pierna/Glúteo).
- Fichas técnicas con **Tips Biomecánicos de Alta Precisión** (vectores de fuerza, contracción y postura).
- Registro interactivo de cargas levantadas en kilogramos.

### 2. 🥗 Módulo 2: Gastronomía Fitness & Fichas PDF (`NutritionSection`)
- Catálogo de recetas de autor con **gramajes exactos** y desglose macrobiótico (Kcal, Proteína, Carbos, Grasas).
- Modal interactivo con generador y vista previa de **Fichas Técnicas descargables en PDF**.

### 3. 📊 Módulo 3: CRM Dashboard & Pasarela PayPal (`CrmDashboard`)
- Grid de métricas en tiempo real (Miembros Activos 1,240, Clases de Hoy 8, Ingresos $3,420 USD).
- Tabla de **Prospectos CRM** (Estado: *Nuevo*, *Contactado*, *Suscrito VIP*).
- Checkout instantáneo de membresías mediante el **SDK de PayPal**.

### 4. 🌐 Módulo 4: Vincular Dominio Personalizado & Cloud Infra (`DomainGuide`)
- Guía técnica paso a paso para asignación de registros DNS A/CNAME en `gymos.app`.
- Certificados SSL automáticos en **Firebase App Hosting** y **Cloud Run**.

---

## 🚀 Despliegue & Ejecución Local

### 1. Clonar e Instalar Dependencias
```bash
git clone https://github.com/ratauille/GymOS-sAAS.git
cd GymOS-sAAS
npm install
```

### 2. Compilación de Producción
```bash
npm run build
```

### 3. Servir Localmente (SSR / Dev)
```bash
npm run dev
```

---

## ☁️ Infraestructura Multi-Cloud

- **Firebase App Hosting**: Backend SSR con Next.js 14 ejecutándose en Google Cloud Run (`godotiti1983`, `us-central1`).
- **Firebase Data Connect**: Servicio GraphQL conectado a Cloud SQL PostgreSQL 15/16 (`gymos-saas-service`).
- **Firestore Real-time DB**: Gestión de leads y sincronización en vivo (`firestore.rules`).
- **Supabase**: Conector PostgreSQL SSR con RLS habilitado.
- **GitHub Actions CI/CD**: Pipeline automatizado en `.github/workflows/deploy.yml` para despliegue directo.

---

© 2026 GymOS Luxury Edition | IFA Irahi Reynosa. Todos los derechos reservados.
