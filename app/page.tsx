'use client';

import React, { useState } from 'react';
import { LeadCta } from "@/components/marketing/lead-cta";
import { 
  Sparkles, 
  Dumbbell, 
  Utensils, 
  Users, 
  GraduationCap, 
  Link as LinkIcon, 
  DollarSign, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Maximize2
} from "lucide-react";

export default function Home() {
  const [showEmbed, setShowEmbed] = useState(false);

  const modules = [
    {
      title: "Calculadora Metabólica & Dietas",
      desc: "Cálculo TDEE con gramajes exactos por alimento y macros personalizados.",
      icon: Utensils,
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
      link: "/app.html#calculator"
    },
    {
      title: "Generador Biomecánico de Rutinas",
      desc: "Divisiones de 3, 4 y 5 días con tips posturales de alta biomecánica.",
      icon: Dumbbell,
      color: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30",
      link: "/app.html#routines"
    },
    {
      title: "CRM de Prospectos & Retención",
      desc: "Captura de leads sincronizados en la nube con alertas de WhatsApp.",
      icon: Users,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
      link: "/app.html#crm"
    },
    {
      title: "Academia Fitness & Educación",
      desc: "Masterclasses en video HD con avance progresivo y certificación.",
      icon: GraduationCap,
      color: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
      link: "/app.html#academy"
    },
    {
      title: "Generador BioLink Élite",
      desc: "Landing page personalizada para la bio de Instagram y TikTok.",
      icon: LinkIcon,
      color: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30",
      link: "/app.html#biolink"
    },
    {
      title: "Programa de Afiliados (30%)",
      desc: "Monetización recurrente, calculadora de comisiones y enlaces cortos.",
      icon: DollarSign,
      color: "from-rose-500/20 to-red-500/20 text-rose-400 border-rose-500/30",
      link: "/app.html#affiliates"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans antialiased">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border-b border-red-900/40 px-4 py-2 text-center text-xs font-medium text-gray-300 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
        <span>Ecosistema Unificado GymOS Luxury SaaS — Versión 1.0 en Producción</span>
        <a href="/app.html" className="text-red-400 underline font-semibold hover:text-red-300 ml-1">
          Abrir App Directa &rarr;
        </a>
      </div>

      {/* Banner Cinematográfico */}
      <div className="relative min-h-[520px] w-full flex items-center justify-center overflow-hidden bg-black py-16">
        {/* Fondo con degradado cinemático */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/70 via-black/85 to-slate-900/70 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/75 to-black z-0" />
        
        {/* Contenido del Banner */}
        <div className="relative z-10 text-center px-4 max-w-5xl space-y-6">
          <span className="text-red-400 uppercase tracking-widest text-xs font-bold bg-red-950/60 px-4 py-1.5 rounded-full border border-red-700/40 inline-flex items-center gap-1.5 shadow-lg">
            <Zap className="w-3.5 h-3.5 text-red-400" /> Plataforma Integral de Gestión & Biomecánica
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-gray-400 leading-tight">
            EL PODER DE LLEVAR <br /> TU GYM AL SIGUIENTE NIVEL
          </h1>
          <p className="text-gray-300 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
            Gestiona clases, dietas con gramajes exactos, rutinas biomecánicas, CRM y membresías en un solo lugar.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a 
              href="/app.html" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-xl shadow-red-900/40 text-base flex items-center gap-2"
            >
              🚀 Entrar a la App Completa (GymOS Suite)
              <ChevronRight className="w-5 h-5" />
            </a>
            
            <button 
              onClick={() => setShowEmbed(!showEmbed)}
              className="bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 font-semibold px-6 py-4 rounded-xl transition-all text-base flex items-center gap-2"
            >
              <Maximize2 className="w-4 h-4 text-red-400" />
              {showEmbed ? "Ocultar Vista Integrada" : "Abrir Vista Integrada Aquí"}
            </button>
          </div>
        </div>
      </div>

      {/* Si el usuario elige Vista Integrada, se muestra la app completa directamente en el iframe responsivo */}
      {showEmbed && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-gray-900 border-2 border-red-600/50 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gray-950 px-6 py-3 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-xs text-gray-400 font-mono ml-2">GymOS Luxury Suite en Vivo</span>
              </div>
              <a 
                href="/app.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
              >
                Abrir en pantalla completa <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <iframe 
              src="/app.html" 
              className="w-full h-[850px] border-0"
              title="GymOS Luxury Application Suite"
            />
          </div>
        </div>
      )}

      {/* Grid de Métricas en Tiempo Real */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-200 uppercase">Panel de Control & KPIs</h2>
            <p className="text-xs text-gray-400 mt-1">Métricas operativas sincronizadas en tiempo real</p>
          </div>
          <span className="text-xs bg-red-950/50 text-red-400 px-3 py-1.5 rounded-full border border-red-800/40 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            EN TIEMPO REAL
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/90 border border-gray-800 p-6 rounded-2xl hover:border-red-600/40 transition-all shadow-lg">
            <span className="text-xs text-gray-400 uppercase font-semibold">Miembros Activos</span>
            <p className="text-4xl font-black text-red-500 mt-2">1,240</p>
            <p className="text-xs text-green-400 mt-2 font-medium flex items-center gap-1">
              ↑ +12% de retención este mes
            </p>
          </div>

          <div className="bg-gray-900/90 border border-gray-800 p-6 rounded-2xl hover:border-red-600/40 transition-all shadow-lg">
            <span className="text-xs text-gray-400 uppercase font-semibold">Clases de Hoy</span>
            <p className="text-4xl font-black text-white mt-2">8 Sesiones</p>
            <p className="text-xs text-gray-400 mt-2 font-medium">Próxima: Biomecánica & Hipertrofia 18:00</p>
          </div>

          <div className="bg-gray-900/90 border border-gray-800 p-6 rounded-2xl hover:border-red-600/40 transition-all shadow-lg">
            <span className="text-xs text-gray-400 uppercase font-semibold">Ingresos del Día</span>
            <p className="text-4xl font-black text-emerald-400 mt-2">$3,420 <span className="text-xs text-gray-400 font-normal">USD</span></p>
            <p className="text-xs text-gray-400 mt-2 font-medium">Pagos automáticos vía PayPal & Stripe</p>
          </div>
        </div>

        {/* Acceso Directo a los 6 Módulos Principales */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold text-white">Módulos del Ecosistema GymOS</h3>
            <p className="text-sm text-gray-400">
              Haz clic en cualquier módulo para acceder directamente dentro de la aplicación:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {modules.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <a
                  key={idx}
                  href={mod.link}
                  className="group bg-gray-900/70 border border-gray-800 hover:border-red-600/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-950/20 block"
                >
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${mod.color} border mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                    {mod.title}
                  </h4>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                    {mod.desc}
                  </p>
                  <div className="mt-4 flex items-center text-xs font-semibold text-red-400 group-hover:underline">
                    Abrir Módulo &rarr;
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Componente de Captación Marketing */}
        <div className="pt-8">
          <LeadCta />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-900 bg-black/60 py-8 text-center text-xs text-gray-500 space-y-2">
        <p>© 2026 GymOS Luxury Edition — Plataforma Integral de Gimnasios y Nutrición de Élite.</p>
        <p className="text-gray-600">Desarrollado para entrenadores, atletas y centros de alto rendimiento.</p>
      </footer>
    </div>
  );
}
