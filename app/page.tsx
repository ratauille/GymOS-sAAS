"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { syncUserToFirestore, syncCheckinToFirestore, syncLeadToFirestore } from "@/lib/firebase";
import { CrmDashboard } from "@/components/dashboard/crm-dashboard";
import { NutritionSection } from "@/components/nutrition/nutrition-section";
import { WorkoutSection } from "@/components/workout/workout-section";
import { DomainGuide } from "@/components/domain/domain-guide";
import { LeadCta } from "@/components/marketing/lead-cta";
import { 
  Users, DollarSign, Calendar, Dumbbell, Utensils, Flame, Sparkles, 
  ShieldCheck, CheckCircle2, Crown, CreditCard, Activity, FileText, 
  Download, Send, Terminal, ChevronDown, Lock, Award, HeartPulse, Globe
} from "lucide-react";

export interface UserState {
  name: string;
  email: string;
  role: "admin" | "gerente" | "client";
  age: number;
  gender: "male" | "female";
  weight: number;
  targetWeight: number;
  height: number;
  activity: number;
  goal: "fatloss" | "muscle" | "strength";
  dietType: "omnivore" | "pescatarian" | "vegetarian" | "lowcarb";
  tdee: number;
  targetCalories: number;
  membership: string;
  paymentStatus: "Activo Élite VIP" | "Pendiente de Pago";
}

export interface CheckinItem {
  id: string;
  userId: string;
  week: number;
  date: string;
  weight: number;
  waistCm: number;
  adherencePct: number;
  pressLoadKg: number;
  squatLoadKg: number;
  status: string;
}

function PaywallNotice({ onGoToCheckout }: { onGoToCheckout: () => void }) {
  return (
    <div className="bg-gray-900/90 border border-amber-500/40 p-8 rounded-3xl text-center max-w-2xl mx-auto space-y-5 animate-in fade-in">
      <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-[#D4AF37]">
        <Lock className="w-8 h-8" />
      </div>
      <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-amber-950/60 px-3.5 py-1 rounded-full border border-amber-900/40">
        CONTENIDO EXCLUSIVO ÉLITE VIP
      </span>
      <h3 className="text-2xl font-serif text-white font-bold">
        Acceso Restringido a Clientes Públicos
      </h3>
      <p className="text-gray-300 text-xs leading-relaxed max-w-lg mx-auto">
        Esta sección (dietas por gramos con PDF, rutinas biomecánicas completas Push/Pull/Legs y consola Coach Shell) requiere una suscripción activa. El Propietario y el Gerente cuentan con <strong>Acceso Total Gratuito</strong> permanente.
      </p>
      <button
        onClick={onGoToCheckout}
        className="bg-[#D4AF37] hover:bg-amber-500 text-gray-950 font-black px-6 py-3 rounded-xl text-xs uppercase shadow-xl transition-all inline-flex items-center gap-2"
      >
        <Crown className="w-4 h-4" /> Desbloquear Acceso Pleno Élite ($89 USD)
      </button>
    </div>
  );
}

export default function GymOSMainApp() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "coach-shell" | "nutrition" | "workout" | "domain" | "checkout"
  >("dashboard");

  const [currentUser, setCurrentUser] = useState<UserState>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gymos_user");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (!parsed.role) parsed.role = "admin";
          return parsed;
        } catch (e) { }
      }
    }
    return {
      name: "Irahi Reynosa (Propietario)",
      email: "irahi.reynosa@gymos.com",
      role: "admin",
      age: 30,
      gender: "male",
      weight: 78.0,
      targetWeight: 75.0,
      height: 180,
      activity: 1.725,
      goal: "muscle",
      dietType: "omnivore",
      tdee: 2900,
      targetCalories: 2450,
      membership: "Acceso Maestro Propietario",
      paymentStatus: "Activo Élite VIP"
    };
  });

  // Evaluación de Acceso Maestro (Propietario y Gerente no pagan jamás)
  const isMasterUser = currentUser.role === "admin" || currentUser.role === "gerente";
  const hasFullAccess = isMasterUser || currentUser.paymentStatus === "Activo Élite VIP";

  const [checkins, setCheckins] = useState<CheckinItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gymos_checkins");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
      }
    }
    return [
      { id: "ck-1", userId: "carlos.mendoza@luxury.com", week: 1, date: "2026-08-01", weight: 78.5, waistCm: 88, adherencePct: 92, pressLoadKg: 70, squatLoadKg: 100, status: "Verificado" },
      { id: "ck-2", userId: "carlos.mendoza@luxury.com", week: 2, date: "2026-08-08", weight: 77.8, waistCm: 87, adherencePct: 95, pressLoadKg: 72.5, squatLoadKg: 105, status: "Verificado" },
      { id: "ck-3", userId: "carlos.mendoza@luxury.com", week: 3, date: "2026-08-15", weight: 77.1, waistCm: 86, adherencePct: 90, pressLoadKg: 75, squatLoadKg: 110, status: "Verificado" },
      { id: "ck-4", userId: "carlos.mendoza@luxury.com", week: 4, date: "2026-08-22", weight: 76.4, waistCm: 85, adherencePct: 96, pressLoadKg: 77.5, squatLoadKg: 112.5, status: "Élite Verificado" }
    ];
  });

  // Terminal State
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "GymOS Coach Shell — Consola de Rendimiento Iniciada.",
    "Escriba 'help' para listar los comandos disponibles."
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quote Carousel State
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = [
    "“La excelencia no es un acto aislado, sino la armonía perfecta entre nutrición exacta y movimiento biomecánico impecable.”",
    "“Transforma datos biométricos en resultados esculpidos con precisión científica y disciplina inquebrantable.”",
    "“El lujo supremo es el control total sobre tu metabolismo, fuerza y longevidad física.”",
    "“Diseña tu cuerpo con la misma elegancia y rigor con que los grandes maestros construyen el arte.”"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Sync to localStorage & Firebase Firestore
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gymos_user", JSON.stringify(currentUser));
      syncUserToFirestore(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gymos_checkins", JSON.stringify(checkins));
    }
  }, [checkins]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePaymentSuccess = (planName: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      membership: planName,
      paymentStatus: "Activo Élite VIP"
    }));
    triggerToast(`¡Pago confirmado! Acceso Pleno Élite activado para ${currentUser.name}`);
  };

  const handleActivateMaster = () => {
    setCurrentUser((prev) => ({
      ...prev,
      name: "Irahi Reynosa (Propietario)",
      email: "irahi.reynosa@gymos.com",
      role: "admin",
      membership: "Acceso Maestro Propietario",
      paymentStatus: "Activo Élite VIP"
    }));
    triggerToast("Modo Propietario Activado: Acceso Gratis Restaurado");
  };

  const handleRoleChange = (newRole: "admin" | "gerente" | "client") => {
    if (newRole === "admin") {
      handleActivateMaster();
    } else if (newRole === "gerente") {
      setCurrentUser((prev) => ({
        ...prev,
        name: "Gerente General (GymOS)",
        email: "gerencia@gymos.com",
        role: "gerente",
        membership: "Acceso Maestro Gerencia",
        paymentStatus: "Activo Élite VIP"
      }));
      triggerToast("Modo Gerente Activo: Acceso Total Gratuito Desbloqueado");
    } else {
      setCurrentUser((prev) => ({
        ...prev,
        name: "Cliente Demostración",
        email: "cliente.nuevo@ejemplo.com",
        role: "client",
        membership: "Sin Membresía",
        paymentStatus: "Pendiente de Pago"
      }));
      triggerToast("Modo Cliente Publico Activo: Requiere Pago para Acceder");
    }
  };

  const handleAddCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    const nextWeek = checkins.length + 1;
    const newWeight = Number((currentUser.weight - 0.5).toFixed(1));
    const newWaist = Number((85 - 0.4 * nextWeek).toFixed(1));

    const newEntry: CheckinItem = {
      id: `ck-${Date.now()}`,
      userId: currentUser.email,
      week: nextWeek,
      date: new Date().toISOString().slice(0, 10),
      weight: newWeight,
      waistCm: newWaist,
      adherencePct: 95,
      pressLoadKg: 77.5 + nextWeek * 1.5,
      squatLoadKg: 110 + nextWeek * 2.5,
      status: "Élite Verificado"
    };

    setCheckins([...checkins, newEntry]);
    syncCheckinToFirestore(newEntry);
    setCurrentUser((prev) => ({ ...prev, weight: newWeight }));
    triggerToast(`Check-in Semana ${nextWeek} guardado y sincronizado en la nube`);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const newLogs = [...terminalLogs, `GymOS-Coach> ${terminalInput}`];

    if (cmd === "help") {
      newLogs.push("--- COMANDOS DISPONIBLES EN GYMOS COACH SHELL ---");
      newLogs.push("  checkin list   : Muestra el historial de check-ins del usuario activo.");
      newLogs.push("  checkin add    : Registra un nuevo seguimiento semanal.");
      newLogs.push("  diet generate  : Muestra la dieta con gramajes exactos por comida.");
      newLogs.push("  routine list   : Muestra las guías biomecánicas y cargas.");
      newLogs.push("  clear          : Limpia la pantalla de la consola.");
    } else if (cmd === "clear") {
      setTerminalLogs(["GymOS Coach Shell — Consola Limpiada"]);
      setTerminalInput("");
      return;
    } else if (cmd === "checkin list") {
      newLogs.push(`--- HISTORIAL DE CHECK-INS DE ${currentUser.name.toUpperCase()} ---`);
      checkins.forEach((c) => {
        newLogs.push(`Semana ${c.week} (${c.date}): ${c.weight}kg | Cintura: ${c.waistCm}cm | Adherencia: ${c.adherencePct}%`);
      });
    } else if (cmd === "diet generate") {
      newLogs.push(`--- PLAN NUTRICIONAL PARA ${currentUser.name.toUpperCase()} (${currentUser.targetCalories} kcal) ---`);
      newLogs.push("Desayuno : 120g Huevos Enteros + 60g Avena + 80g Berries");
      newLogs.push("Comida   : 180g Pechuga de Pollo + 180g Arroz Jasmine + 10g AOV");
      newLogs.push("Cena     : 170g Salmón Noruego + 180g Camote + Ensalada Verde");
    } else {
      newLogs.push(`Comando '${cmd}' procesado. Escriba 'help' para ver la lista.`);
    }

    setTerminalLogs(newLogs);
    setTerminalInput("");
  };

  return (
    <div className="min-h-screen bg-[#08090B] text-gray-100 font-sans antialiased">
      {/* TOAST FLOATING NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-950 border border-emerald-500 text-emerald-300 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* NAVBAR SUPERIOR CON DROPDOWNS & LOGO OFICIAL */}
      <header className="sticky top-0 z-40 bg-[#0F2C59]/90 backdrop-blur-md border-b border-gray-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Logo & Marca */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
            <Image 
              src="/img/irahi-reynosa-logo.png" 
              alt="IFA Irahi Reynosa" 
              width={160} 
              height={40} 
              className="h-10 w-auto object-contain" 
            />
            <div>
              <span className="text-base font-serif text-white tracking-wide block leading-none font-bold">
                IRAHI REYNOSA
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                IFA • GYMOS LUXURY EDITION
              </span>
            </div>
          </div>

          {/* Menú de Navegación Pestañas */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "dashboard" ? "bg-white/15 text-[#D4AF37] border border-[#D4AF37]/40" : "text-gray-300 hover:text-white"
              }`}
            >
              <Activity className="w-3.5 h-3.5" /> Dashboard CRM
            </button>

            <button
              onClick={() => setActiveTab("workout")}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "workout" ? "bg-white/15 text-[#D4AF37] border border-[#D4AF37]/40" : "text-gray-300 hover:text-white"
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5" /> Rutinas & Biomecánica
            </button>

            <button
              onClick={() => setActiveTab("nutrition")}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "nutrition" ? "bg-white/15 text-[#D4AF37] border border-[#D4AF37]/40" : "text-gray-300 hover:text-white"
              }`}
            >
              <Utensils className="w-3.5 h-3.5" /> Dietas & Recetas PDF
            </button>

            <button
              onClick={() => setActiveTab("domain")}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "domain" ? "bg-white/15 text-[#D4AF37] border border-[#D4AF37]/40" : "text-gray-300 hover:text-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" /> Dominio & SSL
            </button>

            <button
              onClick={() => setActiveTab("coach-shell")}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "coach-shell" ? "bg-white/15 text-[#D4AF37] border border-[#D4AF37]/40" : "text-gray-300 hover:text-white"
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Coach Shell
            </button>

            <button
              onClick={() => setActiveTab("checkout")}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "checkout" ? "bg-emerald-600 text-white shadow-lg" : "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" /> Membresías Élite
            </button>
          </nav>

          {/* Selector de Rol & Captación Lead */}
          <div className="flex items-center gap-3">
            <select
              value={currentUser.role}
              onChange={(e) => handleRoleChange(e.target.value as "admin" | "gerente" | "client")}
              className="bg-gray-950 border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-xs rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-[#D4AF37]"
            >
              <option value="admin">👑 Propietario (Irahi)</option>
              <option value="gerente">💼 Gerente General</option>
              <option value="client">👤 Cliente Público</option>
            </select>

            <button
              onClick={() => setLeadModalOpen(true)}
              className="bg-[#D4AF37] hover:bg-amber-500 text-gray-950 font-extrabold px-4 py-2 rounded-xl text-xs shadow-lg transition-all flex items-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5" /> Captar Lead VIP
            </button>
          </div>
        </div>
      </header>

      {/* BANNER PRINCIPAL (FOTO REAL CON MOVIMIENTO DE ZOOM KEN BURNS) */}
      <section className="relative h-[440px] w-full flex items-center justify-center overflow-hidden border-b-2 border-[#00f2fe]/40 shadow-2xl bg-black">
        <Image
          src="/img/hero-banner.jpg"
          alt="GymOS Fuerza & Entrenamiento Real"
          fill
          priority
          className="object-cover object-center opacity-55 filter contrast-125 brightness-95 hero-motion-img"
        />
        <Image
          src="/img/irahi-reynosa-logo.png"
          alt="Watermark Logo"
          width={400}
          height={400}
          className="absolute inset-0 w-full h-full object-contain opacity-15 pointer-events-none p-12"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#08090B] z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,9,11,0.8)_70%)] z-10 pointer-events-none" />

        <div className="relative z-20 max-w-4xl mx-auto text-center px-4 space-y-4">
          <div className="inline-flex items-center gap-2 bg-cyan-950/80 text-[#00f2fe] border border-[#00f2fe]/40 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,242,254,0.2)]">
            <Sparkles className="w-4 h-4 text-[#00f2fe]" /> INGENIERÍA DE RENDIMIENTO HUMANO • IRAHI REYNOSA
          </div>

          <div className="min-h-[90px] flex items-center justify-center">
            <blockquote className="text-2xl md:text-4xl font-serif text-white font-normal leading-tight max-w-3xl transition-all duration-700">
              {quotes[quoteIndex]}
            </blockquote>
          </div>

          <div className="flex justify-center gap-2 pt-2">
            {quotes.map((_, i) => (
              <span
                key={i}
                onClick={() => setQuoteIndex(i)}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  quoteIndex === i ? "w-8 bg-[#00f2fe] shadow-[0_0_10px_#00f2fe]" : "w-2 bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL SEGÚN LA PESTAÑA ACTIVA */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* PESTAÑA 1: DASHBOARD CRM COMPLETO & REGISTRO DE CHECK-INS */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <CrmDashboard />

            {/* TABLA DE CHECK-INS PERSONALIZADOS POR USUARIO */}
            <div className="bg-gray-900/90 border border-gray-800 p-6 rounded-3xl shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-amber-950/60 px-3 py-1 rounded-full border border-amber-900/40">
                    USUARIO EN SESIÓN: {currentUser.name.toUpperCase()}
                  </span>
                  <h3 className="text-2xl font-serif text-white mt-2">Historial de Seguimiento Personalizado</h3>
                  <p className="text-xs text-gray-400 mt-1">Registros vinculados a la cuenta {currentUser.email}</p>
                </div>

                <button
                  onClick={handleAddCheckin}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <Activity className="w-4 h-4" /> Agregar Check-in Semanal
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-gray-950 text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
                    <tr>
                      <th className="px-4 py-3">Semana</th>
                      <th className="px-4 py-3">Fecha</th>
                      <th className="px-4 py-3">Peso (kg)</th>
                      <th className="px-4 py-3">Cintura (cm)</th>
                      <th className="px-4 py-3">Adherencia</th>
                      <th className="px-4 py-3">Press (kg)</th>
                      <th className="px-4 py-3">Sentadilla (kg)</th>
                      <th className="px-4 py-3">Estatus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {checkins.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-800/40 transition-all">
                        <td className="px-4 py-3.5 font-bold text-white">Semana {item.week}</td>
                        <td className="px-4 py-3.5 text-gray-400">{item.date}</td>
                        <td className="px-4 py-3.5 font-bold text-amber-400">{item.weight} kg</td>
                        <td className="px-4 py-3.5 text-gray-300">{item.waistCm} cm</td>
                        <td className="px-4 py-3.5 font-bold text-emerald-400">{item.adherencePct}%</td>
                        <td className="px-4 py-3.5 font-bold text-red-400">{item.pressLoadKg} kg</td>
                        <td className="px-4 py-3.5 font-bold text-red-400">{item.squatLoadKg} kg</td>
                        <td className="px-4 py-3.5">
                          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded-full text-[10px] font-bold">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <LeadCta />
          </div>
        )}

        {/* PESTAÑA 2: SECCIÓN COMPLETA DE RUTINAS & BIOMECÁNICA */}
        {activeTab === "workout" && (
          hasFullAccess ? (
            <div className="animate-in fade-in duration-300">
              <WorkoutSection />
            </div>
          ) : (
            <PaywallNotice onGoToCheckout={() => setActiveTab("checkout")} />
          )
        )}

        {/* PESTAÑA 3: SECCIÓN COMPLETA DE DIETAS & RECETAS PDF */}
        {activeTab === "nutrition" && (
          hasFullAccess ? (
            <div className="animate-in fade-in duration-300">
              <NutritionSection />
            </div>
          ) : (
            <PaywallNotice onGoToCheckout={() => setActiveTab("checkout")} />
          )
        )}

        {/* PESTAÑA 4: DOMINIO SSL & INFRAESTRUCTURA CLOUD */}
        {activeTab === "domain" && (
          <div className="animate-in fade-in duration-300">
            <DomainGuide />
          </div>
        )}

        {/* PESTAÑA 5: TERMINAL COACH SHELL CLI */}
        {activeTab === "coach-shell" && (
          hasFullAccess ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-[#090D16] border border-cyan-900/60 rounded-3xl p-6 shadow-2xl font-mono">
                <div className="flex items-center justify-between border-b border-cyan-950 pb-4 mb-4">
                  <span className="text-xs text-cyan-400 font-bold flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> TERMINAL COACH SHELL CLI v3.0
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase">USUARIO: {currentUser.name}</span>
                </div>

                <div className="h-80 overflow-y-auto space-y-2 text-xs bg-black/60 p-4 rounded-xl border border-gray-900 mb-4 font-mono">
                  {terminalLogs.map((log, i) => (
                    <p key={i} className={log.startsWith("GymOS-Coach>") ? "text-amber-400 font-bold" : log.includes("ÉXITO") ? "text-emerald-400 font-bold" : "text-cyan-300"}>
                      {log}
                    </p>
                  ))}
                </div>

                <form onSubmit={handleTerminalSubmit} className="flex gap-2">
                  <span className="text-amber-400 font-bold text-xs py-2.5">GymOS-Coach&gt;</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Escribe 'help', 'checkin list', 'diet generate'..."
                    className="w-full bg-gray-950 text-cyan-300 px-4 py-2.5 rounded-xl border border-gray-800 text-xs font-mono outline-none focus:border-cyan-500"
                  />
                  <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-gray-950 font-black px-5 py-2.5 rounded-xl text-xs uppercase">
                    Ejecutar
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <PaywallNotice onGoToCheckout={() => setActiveTab("checkout")} />
          )
        )}

        {/* PESTAÑA 6: MEMBRESÍAS ÉLITE & DESBLOQUEO TRAS PAGO PAYPAL */}
        {activeTab === "checkout" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-gray-900/90 border border-gray-800 p-8 rounded-3xl text-center max-w-3xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-4 py-1.5 rounded-full border border-emerald-900/40">
                <CreditCard className="w-4 h-4" /> PASARELA PAYPAL Y ACCESO PLENO ÉLITE
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-white">Adquiere tu Membresía VIP & Desbloquea Beneficios</h2>
              <p className="text-gray-300 text-sm max-w-xl mx-auto">
                Al confirmar tu pago, tu cuenta <strong>{currentUser.email}</strong> obtendrá <strong>Acceso Pleno Élite</strong> inmediato para crear dietas por gramos, rutinas biomecánicas y seguimiento semanal.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-3">
                  <span className="text-xs font-bold uppercase text-amber-400">Plan Semanal VIP</span>
                  <p className="text-3xl font-extrabold text-white">$29 <span className="text-xs text-gray-400">USD</span></p>
                  <button
                    onClick={() => handlePaymentSuccess("Plan Semanal VIP ($29 USD)")}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
                  >
                    Activar Plan VIP ($29)
                  </button>
                </div>

                <div className="bg-gray-950 p-6 rounded-2xl border-2 border-[#D4AF37] space-y-3 relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase text-gray-950 bg-[#D4AF37] px-3 py-0.5 rounded-full">
                    MÁS POPULAR
                  </span>
                  <span className="text-xs font-bold uppercase text-[#D4AF37]">Plan Mensual Élite</span>
                  <p className="text-3xl font-extrabold text-white">$89 <span className="text-xs text-gray-400">USD</span></p>
                  <button
                    onClick={() => handlePaymentSuccess("Plan Mensual Élite ($89 USD)")}
                    className="w-full bg-[#D4AF37] hover:bg-amber-500 text-gray-950 font-black py-2.5 rounded-xl text-xs shadow-lg"
                  >
                    Activar Plan Élite ($89)
                  </button>
                </div>

                <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-3">
                  <span className="text-xs font-bold uppercase text-cyan-400">Licencia GymOS Pro</span>
                  <p className="text-3xl font-extrabold text-white">$199 <span className="text-xs text-gray-400">USD</span></p>
                  <button
                    onClick={() => handlePaymentSuccess("Licencia GymOS Pro ($199 USD)")}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-gray-950 font-black py-2.5 rounded-xl text-xs shadow-md"
                  >
                    Activar Licencia Pro ($199)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL DE CAPTACIÓN LEAD */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 text-white w-full max-w-md rounded-2xl border border-gray-800 overflow-hidden p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-lg font-serif">Captar Lead Élite</h3>
              <button onClick={() => setLeadModalOpen(false)} className="text-gray-400 hover:text-white text-2xl">&times;</button>
            </div>
            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                const form = e.target as HTMLFormElement;
                const nameInput = (form.elements[0] as HTMLInputElement)?.value || "Lead Élite";
                const emailInput = (form.elements[1] as HTMLInputElement)?.value || "";
                if (emailInput) {
                  syncLeadToFirestore({ name: nameInput, email: emailInput });
                }
                setLeadModalOpen(false); 
                triggerToast("Lead captado y sincronizado con Firebase Cloud"); 
              }} 
              className="space-y-3"
            >
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-300 mb-1">Nombre Completo</label>
                <input type="text" required placeholder="Carlos Mendoza" className="w-full bg-gray-950 border border-gray-800 px-3 py-2 text-xs rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-300 mb-1">Correo Electrónico</label>
                <input type="email" required placeholder="carlos@ejemplo.com" className="w-full bg-gray-950 border border-gray-800 px-3 py-2 text-xs rounded-lg text-white" />
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] text-gray-950 font-black py-2.5 rounded-xl text-xs uppercase">
                Registrar Lead Élite
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
