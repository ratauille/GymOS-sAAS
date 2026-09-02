import React from "react";
import { LeadCta } from "@/components/marketing/lead-cta";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans antialiased">
      {/* LUXURY NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0F2C59] text-white font-serif font-bold text-lg flex items-center justify-center rounded-lg shadow-md">
              GO
            </div>
            <div>
              <h1 className="font-serif text-xl font-normal leading-none text-slate-900 tracking-wide">GymOS</h1>
              <span className="text-[10px] font-bold tracking-[0.18em] text-slate-500 uppercase">LUXURY PERFORMANCE</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <a href="#dashboard" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#0F2C59] hover:bg-slate-100 rounded-full transition">Dashboard CRM</a>
            <a href="#nutrition" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#0F2C59] hover:bg-slate-100 rounded-full transition">Motor Nutricional</a>
            <a href="#workout" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#0F2C59] hover:bg-slate-100 rounded-full transition">Rutinas & Biomecánica</a>
            <a href="#checkout" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#0F2C59] hover:bg-slate-100 rounded-full transition">Membresías Élite</a>
          </nav>
        </div>
      </header>

      {/* MARKETING LEAD CTA COMPONENT */}
      <div className="max-w-7xl mx-auto px-6">
        <LeadCta />
      </div>
    </main>
  );
}
