# 🏆 DOSSIER OFICIAL DE ENTREGA DE PROYECTO — GYMOS LUXURY EDITION v1.0.0

---

## 📌 DATOS GENERALES DEL ENTREGABLE

- **Nombre del Software**: GymOS — Luxury Edition (SaaS Multi-tenant PWA)
- **Repositorio Oficial GitHub**: [https://github.com/ratauille/GymOS-sAAS](https://github.com/ratauille/GymOS-sAAS)
- **Aplicación Web en Vivo (Demostración)**: [https://ratauille.github.io/GymOS-sAAS/](https://ratauille.github.io/GymOS-sAAS/)
- **Base de Datos Cloud (Supabase PostgreSQL)**: `https://xgtaukrydufhojokyhyd.supabase.co`
- **Estado del Código**: 🟢 **100% Producción (Rama `main` desplegada)**

---

## 💎 RESUMEN EJECUTIVO & PROPUESTA DE VALOR

**GymOS Luxury Edition** es una plataforma web de alto rendimiento diseñada para la conversión comercial y la retención de clientes en gimnasios de élite.

### Principales Pilares Funcionales:
1. **Estética de Lujo**: Paleta minimalista deep white (`#FAFAFA` – `#FFFFFF`), encabezados en tipografía **Belleza** y acentos en **Azul Cobalto Oscuro** (`#0F2C59`).
2. **Motor Nutricional Metabólico**: Calculadora TDEE (Mifflin-St Jeor) que entrega dietas estructuradas en 5 comidas con **gramajes exactos por alimento en gramos**.
3. **Generador de Rutinas & Biomecánica**: Divisiones por grupo muscular (3, 4 y 5 días) con **tips posturales biomecánicos** por máquina y registro de cargas (kg).
4. **CRM de Prospectos & Retención**: Captación de leads, alertas de WhatsApp y matriz comparativa de logros.
5. **Terminal Coach Shell CLI**: Consola interactiva en Node.js y web para auditoría de **logros verificables por tiempo** (*Adherencia, Sobrecarga Progresiva, Recomposición Corporal*).
6. **Backend Cloud Multi-tenant (Supabase)**: Esquema PostgreSQL con aislamiento RLS por gimnasio (`gym_id`).
7. **PWA Instalable**: Funciona como app nativa en iOS (Safari) y Android (Chrome) sin pagar comisiones de App Stores.
8. **Cobros con PayPal Checkout**: SDK de PayPal para planes semanales, mensuales o licencias.
9. **Programa de Afiliados (Estilo Harbiz)**: Motor de referencias con comisión recurrente del 30%, generador de enlaces cortos, calculadora de ingresos pasivos y FAQ acordeón.
10. **Generador BioLink Élite (Estilo Linktree)**: Creador de landing de enlaces para la bio de Instagram/TikTok de cada entrenador con simulador de smartphone en vivo.
11. **Academia Fitness (Estilo Hermarfit Education)**: Módulo de capacitación y masterclasses en Biomecánica, Nutrición Avanzada y Negocio Fitness con reproductor de video HD y avance de certificado.
12. **Alternador de Tema Visual (Luxury Cobalt vs. Hermarfit Crimson Dark)**: Selector en 1 clic para cambiar entre la estética de lujo azul cobalto y el modo oscuro crimson `#D90100` / `#000000`.

---

## 📂 INVENTARIO DE ARCHIVOS ENTREGADOS

- 📄 `index.html` — Aplicación web principal responsiva (Mobile-First).
- 🎨 `css/styles.css` — Hoja de estilos visuales con variables CSS, glassmorphism e impresión.
- ⚡ `js/app.js` — Motor lógico en JS (TDEE, dietas, rutinas, CRM y PayPal).
- 🗄️ `supabase_schema.sql` — Script SQL multi-tenant con tablas `gyms`, `profiles`, `routines`, `diets`, `checkins` y RLS.
- ⚙️ `js/supabase-client.js` — Módulo JS conectado a Supabase Cloud.
- 📱 `manifest.json` & `sw.js` — Progressive Web App (PWA) instalable con soporte offline.
- 🖥️ `gymos_coach_shell.js` — Terminal interactiva CLI para entrenadores.
- 🤖 `components/marketing/lead-cta.tsx` & `app/page.tsx` — Componentes React / Next.js 14.
- ⚙️ `.github/workflows/deploy.yml` — Flujo de despliegue automático CI/CD en GitHub Pages.
- 📖 `README.md` & `manual_de_uso_gymos.md` — Documentación técnica y manual comercial.

---

## 💰 MODELO DE PRECIOS & VALUACIÓN COMERCIAL

- **Valor Estimado de Desarrollo a Medida**: $120,000 MXN a $220,000 MXN ($7,000 - $13,000 USD).
- **Esquema de Comercialización SaaS**:
  - **Plan Coach Independiente**: $999 MXN / mes ($55 USD)
  - **Plan Gimnasio Pro**: $2,499 MXN / mes ($135 USD)
  - **Plan Cadena Élite**: $4,999 MXN / mes ($270 USD)

---

## 🚀 INSTRUCCIONES RÁPIDAS DE OPERACIÓN PARA EL CLIENTE

1. **Abrir en Vivo**: Ingresar desde cualquier navegador a [https://ratauille.github.io/GymOS-sAAS/](https://ratauille.github.io/GymOS-sAAS/)
2. **Instalar en Celular**:
   - iPhone: Presionar *Compartir* en Safari ➔ *"Agregar a inicio"*.
   - Android: Presionar los 3 puntos en Chrome ➔ *"Instalar aplicación"*.
3. **Correr Consola de Entrenador**: Ejecutar `node gymos_coach_shell.js` en la consola.

---

© 2026 GymOS Luxury Edition. Proyecto Final Entregado.
