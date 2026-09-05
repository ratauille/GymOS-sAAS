"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Users, DollarSign, Calendar, Dumbbell, Utensils, Flame, Sparkles, 
  ShieldCheck, CheckCircle2, Crown, CreditCard, Activity, FileText, 
  Download, Send, Terminal, ChevronDown, Lock, Award, HeartPulse
} from "lucide-react";

export interface UserState {
  name: string;
  email: string;
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

export interface ExerciseLoad {
  exerciseId: string;
  exerciseName: string;
  weightKg: number;
  date: string;
}

export default function GymOSMainApp() {
  // --- ESTADO UBICADO POR USUARIO ---
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "coach-shell" | "nutrition" | "workout" | "academy" | "checkout"
  >("dashboard");

  const [currentUser, setCurrentUser] = useState<UserState>({
    name: "Carlos Mendoza",
    email: "carlos.mendoza@luxury.com",
    age: 29,
    gender: "male",
    weight: 76.4,
    targetWeight: 74.0,
    height: 178,
    activity: 1.55,
    goal: "fatloss",
    dietType: "omnivore",
    tdee: 2650,
    targetCalories: 2120,
    membership: "Plan Mensual Élite",
    paymentStatus: "Activo Élite VIP"
  });

  const [checkins, setCheckins] = useState<CheckinItem[]>([
    { id: "ck-1", userId: "carlos.mendoza@luxury.com", week: 1, date: "2026-08-01", weight: 78.5, waistCm: 88, adherencePct: 92, pressLoadKg: 70, squatLoadKg: 100, status: "Verificado" },
    { id: "ck-2", userId: "carlos.mendoza@luxury.com", week: 2, date: "2026-08-08", weight: 77.8, waistCm: 87, adherencePct: 95, pressLoadKg: 72.5, squatLoadKg: 105, status: "Verificado" },
    { id: "ck-3", userId: "carlos.mendoza@luxury.com", week: 3, date: "2026-08-15", weight: 77.1, waistCm: 86, adherencePct: 90, pressLoadKg: 75, squatLoadKg: 110, status: "Verificado" },
    { id: "ck-4", userId: "carlos.mendoza@luxury.com", week: 4, date: "2026-08-22", weight: 76.4, waistCm: 85, adherencePct: 96, pressLoadKg: 77.5, squatLoadKg: 112.5, status: "Élite Verificado" }
  ]);

  // Terminal & Loggers State
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "GymOS Coach Shell — Consola de Rendimiento Iniciada.",
    "Escriba 'help' para listar los comandos disponibles."
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  
  // Custom Routine & Loads per User
  const [workoutLoads, setWorkoutLoads] = useState<Record<string, number>>({
    "push-1": 77.5,
    "pull-1": 85.0,
    "legs-1": 112.5
  });

  // Modal Recipe State
  const [selectedRecipePdf, setSelectedRecipePdf] = useState<any | null>(null);
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

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // --- ACCESO PLENO TRAS PAGO PAYPAL ---
  const handlePaymentSuccess = (planName: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      membership: planName,
      paymentStatus: "Activo Élite VIP"
    }));
    triggerToast(`¡Pago confirmado! Acceso Pleno Élite activado para ${currentUser.name}`);
  };

  // --- REGISTRAR CHECKIN UBICADO POR USUARIO ---
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
    setCurrentUser((prev) => ({ ...prev, weight: newWeight }));
    triggerToast(`Check-in Semana ${nextWeek} guardado para ${currentUser.name}`);
  };

  // --- COMANDOS TERMINAL COACH SHELL ---
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
          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "dashboard" ? "bg-white/15 text-[#D4AF37] border border-[#D4AF37]/40" : "text-gray-300 hover:text-white"
              }`}
            >
              <Activity className="w-3.5 h-3.5" /> Dashboard CRM
            </button>

            <button
              onClick={() => setActiveTab("workout")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "workout" ? "bg-white/15 text-[#D4AF37] border border-[#D4AF37]/40" : "text-gray-300 hover:text-white"
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5" /> Rutina & Biomecánica
            </button>

            <button
              onClick={() => setActiveTab("nutrition")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "nutrition" ? "bg-white/15 text-[#D4AF37] border border-[#D4AF37]/40" : "text-gray-300 hover:text-white"
              }`}
            >
              <Utensils className="w-3.5 h-3.5" /> Dietas TDEE & Recetas PDF
            </button>

            <button
              onClick={() => setActiveTab("coach-shell")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "coach-shell" ? "bg-white/15 text-[#D4AF37] border border-[#D4AF37]/40" : "text-gray-300 hover:text-white"
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Terminal Coach Shell
            </button>

            <button
              onClick={() => setActiveTab("checkout")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "checkout" ? "bg-emerald-600 text-white shadow-lg" : "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" /> Membresías Élite
            </button>
          </nav>

          {/* Acciones de Encabezado */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLeadModalOpen(true)}
              className="bg-[#D4AF37] hover:bg-amber-500 text-gray-950 font-extrabold px-4 py-2 rounded-xl text-xs shadow-lg transition-all flex items-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5" /> Captar Lead VIP
            </button>
          </div>
        </div>
      </header>

      {/* BANNER PRINCIPAL (FOTO REAL DE MANCUERNAS CON MOVIMIENTO KEN BURNS DE ZOOM LENTO) */}
      <section className="relative h-[440px] w-full flex items-center justify-center overflow-hidden border-b-2 border-[#00f2fe]/40 shadow-2xl bg-black">
        {/* Foto Real de Gimnasio & Fuerza (Entrenamiento de Alta Precisión) con Animación Continuous Zoom */}
        <Image
          src="/img/hero-banner.jpg"
          alt="GymOS Fuerza & Entrenamiento Real"
          fill
          priority
          className="object-cover object-center opacity-55 filter contrast-125 brightness-95 hero-motion-img"
        />
        {/* Watermark Logo Irahi Reynosa */}
        <Image
          src="/img/irahi-reynosa-logo.png"
          alt="Watermark Logo"
          width={400}
          height={400}
          className="absolute inset-0 w-full h-full object-contain opacity-15 pointer-events-none p-12"
        />
        {/* Overlay Degradado Radial y Viñeta Cinemática */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#08090B] z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,9,11,0.8)_70%)] z-10 pointer-events-none" />

        {/* Contenido Central del Banner */}
        <div className="relative z-20 max-w-4xl mx-auto text-center px-4 space-y-4">
          <div className="inline-flex items-center gap-2 bg-cyan-950/80 text-[#00f2fe] border border-[#00f2fe]/40 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,242,254,0.2)]">
            <Sparkles className="w-4 h-4 text-[#00f2fe]" /> INGENIERÍA DE RENDIMIENTO HUMANO • IRAHI REYNOSA
          </div>

          {/* Carrusel de Filosofía */}
          <div className="min-h-[90px] flex items-center justify-center">
            <blockquote className="text-2xl md:text-4xl font-serif text-white font-normal leading-tight max-w-3xl transition-all duration-700">
              {quotes[quoteIndex]}
            </blockquote>
          </div>

          {/* Paginador Neón */}
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
        {/* PESTAÑA 1: DASHBOARD CRM & SEGUIMIENTO PERSONALIZADO UBICADO POR USUARIO */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-amber-950/60 px-3 py-1 rounded-full border border-amber-900/40">
                  USUARIO ACTIVO: {currentUser.name.toUpperCase()}
                </span>
                <h2 className="text-3xl font-serif text-white mt-2">Panel de Control & Confrontación de Logros</h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Estatus: {currentUser.paymentStatus}
                </span>
              </div>
            </div>

            {/* Grid de Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-900/90 border border-gray-800 p-6 rounded-2xl">
                <span className="text-[10px] text-gray-400 uppercase font-bold">Peso Actual / Meta</span>
                <p className="text-3xl font-extrabold text-white mt-2">{currentUser.weight} <span className="text-xs font-normal text-gray-400">kg</span></p>
                <span className="text-xs text-amber-400 font-semibold mt-1 block">Meta: {currentUser.targetWeight} kg</span>
              </div>

              <div className="bg-gray-900/90 border border-gray-800 p-6 rounded-2xl">
                <span className="text-[10px] text-gray-400 uppercase font-bold">Calorías Objetivo</span>
                <p className="text-3xl font-extrabold text-amber-400 mt-2">{currentUser.targetCalories} <span className="text-xs font-normal text-gray-400">kcal</span></p>
                <span className="text-xs text-gray-400 font-semibold mt-1 block">TDEE Mantenimiento: {currentUser.tdee}</span>
              </div>

              <div className="bg-gray-900/90 border border-gray-800 p-6 rounded-2xl">
                <span className="text-[10px] text-gray-400 uppercase font-bold">Adherencia Media</span>
                <p className="text-3xl font-extrabold text-emerald-400 mt-2">94.5%</p>
                <span className="text-xs text-emerald-400 font-semibold mt-1 block">↑ 4 Semanas Verificadas</span>
              </div>

              <div className="bg-gray-900/90 border border-gray-800 p-6 rounded-2xl">
                <span className="text-[10px] text-gray-400 uppercase font-bold">Carga Press de Banca</span>
                <p className="text-3xl font-extrabold text-red-500 mt-2">77.5 <span className="text-xs font-normal text-gray-400">kg</span></p>
                <span className="text-xs text-red-400 font-semibold mt-1 block">+7.5 kg Sobrecarga Progresiva</span>
              </div>
            </div>

            {/* TABLA DE CHECK-INS PERSONALIZADOS POR USUARIO */}
            <div className="bg-gray-900/90 border border-gray-800 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-serif text-white">Historial de Seguimiento Personalizado</h3>
                  <p className="text-xs text-gray-400 mt-1">Registros vinculados a la cuenta de {currentUser.email}</p>
                </div>

                <button
                  onClick={handleAddCheckin}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <Activity className="w-3.5 h-3.5" /> Agregar Check-in Semanal
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
          </div>
        )}

        {/* PESTAÑA 2: MOTOR DE NUTRICIÓN TDEE & DIETAS PERSONALIZADAS POR USUARIO */}
        {activeTab === "nutrition" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-gray-900/90 border border-gray-800 p-8 rounded-3xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-gray-800 pb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold bg-amber-950/60 px-3 py-1 rounded-full border border-amber-900/40">
                    PRESCRIPCIÓN NUTRICIONAL VINCULADA A: {currentUser.name.toUpperCase()}
                  </span>
                  <h2 className="text-3xl font-serif text-white mt-2">Motor Nutricional TDEE & Gramajes Exactos</h2>
                </div>
              </div>

              {/* Controles de Selección de Dieta */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">
                    Tipo de Dieta Preferida:
                  </label>
                  <select
                    value={currentUser.dietType}
                    onChange={(e) => setCurrentUser({ ...currentUser, dietType: e.target.value as any })}
                    className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 text-xs outline-none focus:border-amber-500"
                  >
                    <option value="omnivore">Omnívora Élite</option>
                    <option value="pescatarian">Pescetariana & Omegas</option>
                    <option value="vegetarian">Vegetariana Anabólica</option>
                    <option value="lowcarb">Low Carb / Definición Extrema</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">
                    Objetivo Biológico:
                  </label>
                  <select
                    value={currentUser.goal}
                    onChange={(e) => setCurrentUser({ ...currentUser, goal: e.target.value as any })}
                    className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 text-xs outline-none focus:border-amber-500"
                  >
                    <option value="fatloss">Déficit Calórico (Pérdida de Grasa)</option>
                    <option value="muscle">Superávit Limpio (Hipertrofia Muscular)</option>
                    <option value="strength">Recomposición Corporal (Fuerza)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-2">
                    Calorías Ajustadas:
                  </label>
                  <input
                    type="number"
                    value={currentUser.targetCalories}
                    onChange={(e) => setCurrentUser({ ...currentUser, targetCalories: Number(e.target.value) })}
                    className="w-full bg-gray-950 border border-gray-800 text-amber-400 font-extrabold rounded-xl px-4 py-3 text-xs outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Muestra de Comidas Diarias con Gramajes Exactos */}
              <div className="space-y-4">
                <h3 className="text-lg font-serif text-white mb-2">Menú Diario Asignado por Gramos:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-amber-400">1. Desayuno Anabólico</span>
                    <p className="text-xs text-white font-semibold">120g Huevos Enteros Orgánicos + 60g Avena Integral + 80g Frutos Rojos</p>
                    <span className="text-[10px] text-gray-400 block">Proteína: 38g | Carbos: 45g | Grasas: 14g</span>
                  </div>

                  <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-amber-400">2. Colación Pre-Workout</span>
                    <p className="text-xs text-white font-semibold">200g Yogur Griego 0% + 20g Almendras Tostadas en Lascas</p>
                    <span className="text-[10px] text-gray-400 block">Proteína: 24g | Carbos: 12g | Grasas: 10g</span>
                  </div>

                  <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-amber-400">3. Comida Principal de Rendimiento</span>
                    <p className="text-xs text-white font-semibold">180g Pechuga de Pollo + 180g Arroz Jasmine al Vapor + 10g Aceite de Oliva</p>
                    <span className="text-[10px] text-gray-400 block">Proteína: 56g | Carbos: 50g | Grasas: 12g</span>
                  </div>

                  <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-amber-400">4. Cena de Reparación Tisular</span>
                    <p className="text-xs text-white font-semibold">170g Filete de Salmón Noruego + 180g Camote Horneado + Ensalada Verde</p>
                    <span className="text-[10px] text-gray-400 block">Proteína: 45g | Carbos: 38g | Grasas: 22g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 3: RUTINA BIOMECÁNICA UBICADA POR USUARIO */}
        {activeTab === "workout" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-gray-900/90 border border-gray-800 p-8 rounded-3xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-gray-800 pb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-950/60 px-3 py-1 rounded-full border border-red-900/40">
                    PRESCRIPCIÓN BIOMECÁNICA: {currentUser.name.toUpperCase()}
                  </span>
                  <h2 className="text-3xl font-serif text-white mt-2">Generador de Rutinas & Cargas Progresivas</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-red-400 bg-red-950/50 px-2.5 py-1 rounded-md">PECTORAL MAYOR</span>
                    <h3 className="text-lg font-bold text-white mt-2">Press de Banca Inclinado (30°)</h3>
                    <p className="text-xs text-gray-300 mt-1">4 Series × 8-10 Reps (RIR 1)</p>
                    <p className="text-[11px] text-gray-400 mt-3 bg-gray-900 p-3 rounded-xl border border-gray-800">
                      <strong>Tip Biomecánico:</strong> Mantén depresión escapular fija y codos a 45° del torso.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-900 flex gap-2">
                    <input
                      type="number"
                      placeholder="Carga (kg)"
                      defaultValue={workoutLoads["push-1"]}
                      onChange={(e) => setWorkoutLoads({ ...workoutLoads, "push-1": Number(e.target.value) })}
                      className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-800 text-xs outline-none"
                    />
                    <button
                      onClick={() => triggerToast(`Carga guardada: Press Inclinado ${workoutLoads["push-1"]} kg`)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-xs"
                    >
                      Guardar
                    </button>
                  </div>
                </div>

                <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-red-400 bg-red-950/50 px-2.5 py-1 rounded-md">DORSAL ANCHO</span>
                    <h3 className="text-lg font-bold text-white mt-2">Jalón al Pecho Agarre Neutro</h3>
                    <p className="text-xs text-gray-300 mt-1">4 Series × 10-12 Reps (RIR 2)</p>
                    <p className="text-[11px] text-gray-400 mt-3 bg-gray-900 p-3 rounded-xl border border-gray-800">
                      <strong>Tip Biomecánico:</strong> Dirige los codos hacia las crestas ilíacas bajando escápulas primero.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-900 flex gap-2">
                    <input
                      type="number"
                      placeholder="Carga (kg)"
                      defaultValue={workoutLoads["pull-1"]}
                      onChange={(e) => setWorkoutLoads({ ...workoutLoads, "pull-1": Number(e.target.value) })}
                      className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-800 text-xs outline-none"
                    />
                    <button
                      onClick={() => triggerToast(`Carga guardada: Jalón ${workoutLoads["pull-1"]} kg`)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-xs"
                    >
                      Guardar
                    </button>
                  </div>
                </div>

                <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-red-400 bg-red-950/50 px-2.5 py-1 rounded-md">CUÁDRICEPS & GLÚTEO</span>
                    <h3 className="text-lg font-bold text-white mt-2">Sentadilla Hack o Guiada</h3>
                    <p className="text-xs text-gray-300 mt-1">4 Series × 6-8 Reps (RIR 1)</p>
                    <p className="text-[11px] text-gray-400 mt-3 bg-gray-900 p-3 rounded-xl border border-gray-800">
                      <strong>Tip Biomecánico:</strong> Máxima flexión de rodilla con dorsiflexión profunda de tobillos.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-900 flex gap-2">
                    <input
                      type="number"
                      placeholder="Carga (kg)"
                      defaultValue={workoutLoads["legs-1"]}
                      onChange={(e) => setWorkoutLoads({ ...workoutLoads, "legs-1": Number(e.target.value) })}
                      className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-800 text-xs outline-none"
                    />
                    <button
                      onClick={() => triggerToast(`Carga guardada: Sentadilla ${workoutLoads["legs-1"]} kg`)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-xs"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 4: TERMINAL COACH SHELL CLI */}
        {activeTab === "coach-shell" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#090D16] border border-cyan-900/60 rounded-3xl p-6 shadow-2xl font-mono">
              <div className="flex items-center justify-between border-b border-cyan-950 pb-4 mb-4">
                <span className="text-xs text-cyan-400 font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> TERMINAL COACH SHELL CLI v3.0
                </span>
                <span className="text-[10px] text-gray-500 uppercase">USUARIO: {currentUser.name}</span>
              </div>

              {/* Logs de Consola */}
              <div className="h-80 overflow-y-auto space-y-2 text-xs bg-black/60 p-4 rounded-xl border border-gray-900 mb-4 font-mono">
                {terminalLogs.map((log, i) => (
                  <p key={i} className={log.startsWith("GymOS-Coach>") ? "text-amber-400 font-bold" : log.includes("ÉXITO") ? "text-emerald-400 font-bold" : "text-cyan-300"}>
                    {log}
                  </p>
                ))}
              </div>

              {/* Formulario de Entrada */}
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
        )}

        {/* PESTAÑA 5: MEMBRESÍAS ÉLITE & DESBLOQUEO TRAS PAGO PAYPAL */}
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
            <form onSubmit={(e) => { e.preventDefault(); setLeadModalOpen(false); triggerToast("Lead captado y enviado a CRM de GymOS"); }} className="space-y-3">
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
