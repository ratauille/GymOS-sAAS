"use client";

import React, { useState } from "react";
import { Dumbbell, ShieldCheck, Zap, Activity, CheckCircle2 } from "lucide-react";

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  setsReps: string;
  biomechanicalTip: string;
  targetRPE: string;
}

const WORKOUT_ROUTINES: Record<string, Exercise[]> = {
  push: [
    {
      id: "push-1",
      name: "Press de Banca Inclinado con Mancuernas (30°)",
      muscleGroup: "Pectoral Mayor (Haz Clavicular)",
      setsReps: "4 Series × 8-10 Reps",
      biomechanicalTip: "Mantén depresión escapular y retraé ligeramente las escápulas. Alinea los codos a 45° del torso para maximizar la línea de fuerza sin comprometer el hombro anterior.",
      targetRPE: "RPE 8-9"
    },
    {
      id: "push-2",
      name: "Press Militar de Pie con Barra",
      muscleGroup: "Deltoides Anterior & Tríceps",
      setsReps: "4 Series × 6-8 Reps",
      biomechanicalTip: "Bloquea glúteos y core en retroversión pélvica neutra. Deja pasar la barra pegada al rostro sin hiperextender la zona lumbar.",
      targetRPE: "RPE 8"
    },
    {
      id: "push-3",
      name: "Cruce de Poleas en Declinado",
      muscleGroup: "Pectoral Inferior & Esternal",
      setsReps: "3 Series × 12-15 Reps",
      biomechanicalTip: "Enfatiza el pico de contracción máxima cruzando ligeramente las muñecas en el punto final del recorrido.",
      targetRPE: "RPE 9"
    }
  ],
  pull: [
    {
      id: "pull-1",
      name: "Jalón al Pecho Agarre Neutro Ancho",
      muscleGroup: "Dorsal Ancho & Redondo Mayor",
      setsReps: "4 Series × 10-12 Reps",
      biomechanicalTip: "Inicia la tracción bajando primero las escápulas y luego flexionando codos. Dirige los codos hacia la cadera en lugar de tirar solo con bíceps.",
      targetRPE: "RPE 8.5"
    },
    {
      id: "pull-2",
      name: "Remo Pecho Apoyado en Banco Inclinado",
      muscleGroup: "Trapecio Medio, Romboides & Dorsal",
      setsReps: "4 Series × 8-10 Reps",
      biomechanicalTip: "El apoyo ester nal elimina la compensación de inercia lumbar, asegurando tensión mecánica pura en los flexores de la espalda.",
      targetRPE: "RPE 9"
    },
    {
      id: "pull-3",
      name: "Curl de Bíceps en Banco Scott / Predicador",
      muscleGroup: "Bíceps Braquial (Porción Corta)",
      setsReps: "3 Series × 10-12 Reps",
      biomechanicalTip: "Evita la extensión completa agresiva abajo para proteger el tendón distal. Mantén la tensión sin perder la alineación hombro-codo.",
      targetRPE: "RPE 8"
    }
  ],
  legs: [
    {
      id: "legs-1",
      name: "Sentadilla Hack o Barra Trasera Guiada",
      muscleGroup: "Cuádriceps (Vasto Lateral & Medial)",
      setsReps: "4 Series × 6-8 Reps",
      biomechanicalTip: "Busca máxima flexión de rodilla con dorsiflexión profunda del tobillo. Mantén el talón firme sobre la plataforma sin guiño de glúteo abajo.",
      targetRPE: "RPE 9"
    },
    {
      id: "legs-2",
      name: "Peso Muerto Rumano con Mancuernas",
      muscleGroup: "Isquiosurales & Glúteo Mayor",
      setsReps: "4 Series × 8-10 Reps",
      biomechanicalTip: "Desplaza la cadera hacia atrás como si quisieras tocar la pared trasera. Detén el descenso cuando la cadera no se desplace más para evitar flexionar la espalda.",
      targetRPE: "RPE 8.5"
    },
    {
      id: "legs-3",
      name: "Hip Thrust con Barra en Banco Pelvíco",
      muscleGroup: "Glúteo Mayor (Máxima Contracción)",
      setsReps: "4 Series × 10-12 Reps",
      biomechanicalTip: "Realiza una retroversión pélvica al arriba del movimiento sosteniendo 1.5 segundos arriba antes del descenso controlado.",
      targetRPE: "RPE 9.5"
    }
  ]
};

export function WorkoutSection() {
  const [activeTab, setActiveTab] = useState<"push" | "pull" | "legs">("push");
  const [loads, setLoads] = useState<Record<string, string>>({});
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);

  const handleLoadChange = (id: string, weight: string) => {
    setLoads((prev) => ({ ...prev, [id]: weight }));
  };

  const handleSaveLoad = (exerciseName: string, id: string) => {
    const val = loads[id] || "0";
    setSavedSuccess(`¡Carga registrada! ${exerciseName}: ${val} kg`);
    setTimeout(() => setSavedSuccess(null), 3000);
  };

  return (
    <section className="bg-gray-900/80 border border-gray-800 rounded-3xl p-8 shadow-2xl my-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-gray-800 pb-6">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 bg-red-950/60 px-3 py-1 rounded-full border border-red-900/40">
            <Activity className="w-3.5 h-3.5" /> Módulo 1: Biomecánica & Entrenamiento Élite
          </span>
          <h2 className="text-3xl font-black text-white mt-2">
            Rutinas de Alta Precisión & Cargas Progresivas
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Optimización del vector de fuerza, picos de contracción y registro de peso por ejercicio.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-gray-950 p-1.5 rounded-2xl border border-gray-800 gap-1">
          <button
            onClick={() => setActiveTab("push")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "push"
                ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Push (Pecho/Hombro)
          </button>
          <button
            onClick={() => setActiveTab("pull")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "pull"
                ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Pull (Espalda/Bíceps)
          </button>
          <button
            onClick={() => setActiveTab("legs")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "legs"
                ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Legs (Pierna/Glúteo)
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="mb-6 p-4 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" /> {savedSuccess}
        </div>
      )}

      {/* Routine Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {WORKOUT_ROUTINES[activeTab].map((item) => (
          <div
            key={item.id}
            className="bg-gray-950/90 border border-gray-800/90 hover:border-red-600/50 p-6 rounded-2xl transition-all shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] uppercase font-bold text-red-400 bg-red-950/40 px-2.5 py-1 rounded-md border border-red-900/30">
                  {item.muscleGroup}
                </span>
                <span className="text-xs font-semibold text-gold font-mono">{item.targetRPE}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 leading-snug">{item.name}</h3>
              <p className="text-xs font-semibold text-gray-300 mb-3">{item.setsReps}</p>
              
              <div className="bg-gray-900/90 p-3.5 rounded-xl border border-gray-800 text-xs text-gray-300 leading-relaxed mb-4">
                <strong className="text-red-400 block mb-1 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 inline" /> Tips Biomecánico:
                </strong>
                {item.biomechanicalTip}
              </div>
            </div>

            {/* Load Logger */}
            <div className="pt-3 border-t border-gray-900 flex items-center gap-2">
              <input
                type="number"
                placeholder="Carga (kg)"
                value={loads[item.id] || ""}
                onChange={(e) => handleLoadChange(item.id, e.target.value)}
                className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-800 text-xs focus:ring-1 focus:ring-red-500 outline-none"
              />
              <button
                onClick={() => handleSaveLoad(item.name, item.id)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-md shrink-0"
              >
                Guardar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
