import React from 'react';
import { LeadCta } from "@/components/marketing/lead-cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans antialiased">
      {/* Banner Cinematográfico */}
      <div className="relative h-[480px] w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Fondo con degradado cinemático */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/60 via-black/80 to-slate-900/60 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/70 to-black z-0" />
        
        {/* Contenido del Banner */}
        <div className="relative z-10 text-center px-4 max-w-4xl space-y-5">
          <span className="text-red-500 uppercase tracking-widest text-xs font-bold bg-red-950/50 px-3.5 py-1.5 rounded-full border border-red-800/30 inline-block shadow-lg">
            Bienvenido a GymOS Luxury SaaS
          </span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-gray-400">
            EL PODER DE LLEVAR <br /> TU GYM AL SIGUIENTE NIVEL
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Gestiona clases, membresías y entrenamientos de alta precisión biomecánica en un solo lugar con una interfaz de alto rendimiento.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <a href="#leads" className="bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-red-900/30 text-sm">
              Comenzar Ahora
            </a>
            <a href="#academy" className="border border-gray-700 hover:bg-gray-900 text-gray-300 font-bold px-7 py-3.5 rounded-xl transition-all text-sm">
              Ver Recetas & Clases
            </a>
          </div>
        </div>
      </div>

      {/* Orden Visual: Grid de Métricas */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-gray-400 uppercase">Estadísticas Rápidas & Control CRM</h2>
          <span className="text-xs bg-red-950/40 text-red-400 px-3 py-1 rounded-full border border-red-900/30 font-semibold">EN TIEMPO REAL</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta 1 */}
          <div className="bg-gray-900 border border-gray-800/80 p-6 rounded-2xl hover:border-red-600/40 transition-all shadow-md">
            <span className="text-xs text-gray-500 uppercase font-semibold">Miembros Activos</span>
            <p className="text-4xl font-extrabold text-red-500 mt-2">1,240</p>
            <p className="text-xs text-green-400 mt-2 font-medium">↑ +12% esta semana</p>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-gray-900 border border-gray-800/80 p-6 rounded-2xl hover:border-red-600/40 transition-all shadow-md">
            <span className="text-xs text-gray-500 uppercase font-semibold">Clases de Hoy</span>
            <p className="text-4xl font-extrabold text-white mt-2">8 Sesiones</p>
            <p className="text-xs text-gray-400 mt-2 font-medium">Próxima clase: Biomecánica & Hipertrofia 18:00</p>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-gray-900 border border-gray-800/80 p-6 rounded-2xl hover:border-red-600/40 transition-all shadow-md">
            <span className="text-xs text-gray-500 uppercase font-semibold">Ingresos de Hoy</span>
            <p className="text-4xl font-extrabold text-green-500 mt-2">$3,420 <span className="text-xs text-gray-400 font-normal">USD</span></p>
            <p className="text-xs text-gray-400 mt-2 font-medium">Facturación del día vía PayPal</p>
          </div>
        </div>

        {/* Componente de Captación Marketing */}
        <div className="pt-6">
          <LeadCta />
        </div>
      </div>
    </div>
  );
}
