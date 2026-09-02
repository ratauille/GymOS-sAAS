"use me";
"use client";

import React, { useState } from "react";
import { Sparkles, Crown, Send, CheckCircle2, ShieldCheck } from "lucide-react";

export function LeadCta() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "Pérdida de Grasa & Definición",
    planInterest: "Plan Mensual Élite ($89 USD)",
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
    }, 2500);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#091527] via-[#0F2C59] to-[#1E3A8A] text-white py-20 px-6 rounded-2xl shadow-2xl border-b-4 border-[#D4AF37] my-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.15),transparent_50%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-[#D4AF37] bg-white/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/30">
          <Sparkles className="w-3.5 h-3.5" /> Acceso Élite a Rendimiento & Nutrición
        </span>

        <h2 className="text-4xl md:text-5xl font-serif text-white tracking-wide font-normal leading-tight">
          Transforma Biometría en <span className="text-[#D4AF37] font-semibold">Resultados Verificables</span>
        </h2>

        <p className="text-slate-300 max-w-2xl mx-auto text-base leading-relaxed">
          Diseña tu plan alimentario con gramajes exactos y rutinas por grupo muscular adaptadas con tips biomecánicos de nivel internacional.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 bg-[#0F2C59] hover:bg-[#1E40AF] text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 border border-[#93C5FD]/30"
          >
            <Crown className="w-5 h-5 text-[#D4AF37]" /> Captar Plan Élite VIP
          </button>
          
          <a
            href="https://wa.me/?text=Hola%20GymOS%20Luxury,%20quiero%20más%20información%20sobre%20las%20membresías."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-4 rounded-xl border border-white/20 backdrop-blur-md transition-all duration-300"
          >
            <Send className="w-4 h-4 text-emerald-400" /> Consulta por WhatsApp
          </a>
        </div>
      </div>

      {/* LEAD CAPTURE MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F2C59]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-300">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B45309] bg-[#FEF3C7] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40">
                  MEMBER ONBOARDING
                </span>
                <h3 className="text-xl font-serif text-slate-900 mt-1">Captación de Cliente Élite</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-2xl font-light"
              >
                &times;
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="text-2xl font-serif text-slate-900">¡Registro Exitoso!</h4>
                  <p className="text-slate-600 text-sm">Tus datos han sido procesados y enviados al CRM de GymOS.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0F2C59] focus:border-transparent outline-none text-sm text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="carlos@ejemplo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0F2C59] focus:border-transparent outline-none text-sm text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+52 55 1234 5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0F2C59] focus:border-transparent outline-none text-sm text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Plan de Interés
                    </label>
                    <select
                      value={formData.planInterest}
                      onChange={(e) => setFormData({ ...formData, planInterest: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0F2C59] focus:border-transparent outline-none text-sm text-slate-900 bg-white"
                    >
                      <option value="Plan Mensual Élite ($89 USD)">Plan Mensual Élite ($89 USD)</option>
                      <option value="Plan Semanal VIP ($29 USD)">Plan Semanal VIP ($29 USD)</option>
                      <option value="Licencia GymOS Pro ($199 USD)">Licencia GymOS Pro ($199 USD)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0F2C59] hover:bg-[#1E40AF] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2 mt-4"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Registrar & Enviar a CRM
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
