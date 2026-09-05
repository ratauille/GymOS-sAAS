import React from "react";
import { WorkoutSection } from "@/components/workout/workout-section";
import { NutritionSection } from "@/components/nutrition/nutrition-section";
import { CrmDashboard } from "@/components/dashboard/crm-dashboard";
import { DomainGuide } from "@/components/domain/domain-guide";
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
            <a href="#crm" className="bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-red-900/30 text-sm">
              Comenzar Ahora
            </a>
            <a href="#nutrition" className="border border-gray-700 hover:bg-gray-900 text-gray-300 font-bold px-7 py-3.5 rounded-xl transition-all text-sm">
              Ver Recetas & Clases
            </a>
          </div>
        </div>
      </div>

      {/* Contenedor Principal: Integración de los 4 Módulos Élite */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Módulo 3: CRM Dashboard & Pasarela PayPal */}
        <div id="crm">
          <CrmDashboard />
        </div>

        {/* Módulo 1: Rutinas Biomecánicas & Tracker de Cargas */}
        <div id="workout">
          <WorkoutSection />
        </div>

        {/* Módulo 2: Gastronomía Fitness & Fichas PDF */}
        <div id="nutrition">
          <NutritionSection />
        </div>

        {/* Módulo 4: Vinculación de Dominio & Infraestructura Cloud */}
        <div id="domain">
          <DomainGuide />
        </div>

        {/* Componente de Captación Marketing */}
        <LeadCta />
      </div>
    </div>
  );
}
