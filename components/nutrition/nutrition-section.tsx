"use client";

import React, { useState } from "react";
import { Utensils, Flame, Sparkles, FileText, Download, CheckCircle2 } from "lucide-react";

export interface Recipe {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  preparation: string;
}

const FITNESS_RECIPES: Recipe[] = [
  {
    id: "rec-1",
    name: "Pechuga Sellada al Romero con Quinoa & Aguacate",
    category: "Comida Élite / Pérdida de Grasa",
    calories: 540,
    protein: 48,
    carbs: 42,
    fats: 16,
    ingredients: [
      "200g Pechuga de Pollo Limpia",
      "120g Quinoa Cocida al Vapor",
      "50g Aguacate Hass maduro",
      "1 cdta Aceite de Oliva Extra Virgen",
      "Romero fresco, ajo en polvo y sal rosa"
    ],
    preparation: "Sella la pechuga en sartén a fuego alto durante 4 min por lado. Sirve sobre cama de quinoa templada y decora con láminas de aguacate."
  },
  {
    id: "rec-2",
    name: "Filete de Salmón en Costra de Sésamo con Mousse de Camote",
    category: "Cena de Hipertrofia & Omegas",
    calories: 620,
    protein: 45,
    carbs: 38,
    fats: 26,
    ingredients: [
      "220g Lomo de Salmón Noruego",
      "150g Camote horneado puré",
      "10g Semillas de sésamo mixto",
      "Espárragos verdes al grill"
    ],
    preparation: "Empaniza el lomo con ajonjolí y sella 3 min por lado en sartén antiadherente. Acompaña con el puré de camote sazonado con pimienta negra."
  },
  {
    id: "rec-3",
    name: "Bowl de Pollo Teriyaki Low-Carb con Arroz de Coliflor",
    category: "Definición Extrema",
    calories: 410,
    protein: 52,
    carbs: 18,
    fats: 12,
    ingredients: [
      "220g Pechuga de Pollo cortada en cubos",
      "200g Arroz de Coliflor rallado",
      "30ml Salsa Amino de Coco Low Sodium",
      "Vegetales mixtos (Brócoli, pimiento)"
    ],
    preparation: "Saltea la coliflor rallada 5 min. En otra sartén dota el pollo con los aminos de coco y saltea con brócoli al dente."
  },
  {
    id: "rec-4",
    name: "Protein Pancakes Gourmet de Avena & Mousse de Frutos Rojos",
    category: "Desayuno Anabólico Élite",
    calories: 480,
    protein: 40,
    carbs: 55,
    fats: 8,
    ingredients: [
      "60g Harina de Avena Integral",
      "1 Scoop (30g) Whey Protein Isolate",
      "150ml Claras de Huevo",
      "80g Frutos Rojos Mixtos (Arándano, Frambuesa)"
    ],
    preparation: "Mezcla la harina, proteína y claras. Cocina los pancakes a fuego medio en sartén antiadherente 2 min por lado. Baña con los frutos rojos."
  }
];

export function NutritionSection() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setSelectedRecipe(null);
    }, 2500);
  };

  return (
    <section className="bg-gray-900/80 border border-gray-800 rounded-3xl p-8 shadow-2xl my-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-gray-800 pb-6">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold bg-amber-950/60 px-3 py-1 rounded-full border border-amber-900/40">
            <Utensils className="w-3.5 h-3.5" /> Módulo 2: Gastronomía Fitness & Nutrición Gourmet
          </span>
          <h2 className="text-3xl font-black text-white mt-2">
            Catálogo Gastronómico con Gramajes Exactos
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Recetas anabólicas diseñadas con macros biológicos exactos y fichas descargables en PDF.
          </p>
        </div>
      </div>

      {/* Grid de Recetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FITNESS_RECIPES.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-gray-950/90 border border-gray-800/90 hover:border-gold/50 p-6 rounded-2xl transition-all shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] uppercase font-bold text-gold bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-900/30">
                  {recipe.category}
                </span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 font-mono">
                  <Flame className="w-3.5 h-3.5" /> {recipe.calories} kcal
                </span>
              </div>

              <h3 className="text-xl font-serif text-white mb-3 font-medium">{recipe.name}</h3>

              {/* Macros Badges */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="bg-gray-900/90 border border-gray-800 p-2 rounded-xl">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase">Proteína</span>
                  <span className="text-sm font-extrabold text-red-400">{recipe.protein}g</span>
                </div>
                <div className="bg-gray-900/90 border border-gray-800 p-2 rounded-xl">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase">Carbos</span>
                  <span className="text-sm font-extrabold text-amber-400">{recipe.carbs}g</span>
                </div>
                <div className="bg-gray-900/90 border border-gray-800 p-2 rounded-xl">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase">Grasas</span>
                  <span className="text-sm font-extrabold text-blue-400">{recipe.fats}g</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedRecipe(recipe)}
              className="w-full bg-gray-900 hover:bg-gray-800 text-gold border border-gold/30 font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md mt-2"
            >
              <FileText className="w-4 h-4" /> Ver Ficha Técnica & Descargar PDF
            </button>
          </div>
        ))}
      </div>

      {/* Modal Ficha Técnica PDF */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gold/40 text-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-gray-950 px-6 py-4 border-b border-gray-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-900/40">
                  FICHA TÉCNICA GASTRONÓMICA
                </span>
                <h3 className="text-lg font-serif text-white mt-1">{selectedRecipe.name}</h3>
              </div>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="text-gray-400 hover:text-white text-2xl font-light"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-4">
              {downloadSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-2xl font-serif text-white">¡Ficha Descargada!</h4>
                  <p className="text-gray-300 text-xs">
                    El documento PDF con gramajes y modo de preparación se ha generado correctamente.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gold tracking-wider mb-2">
                      Ingredientes (Gramajes Exactos):
                    </h4>
                    <ul className="list-disc list-inside text-xs text-gray-300 space-y-1 bg-gray-950 p-3 rounded-xl border border-gray-800">
                      {selectedRecipe.ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase text-gold tracking-wider mb-2">
                      Modo de Preparación:
                    </h4>
                    <p className="text-xs text-gray-300 bg-gray-950 p-3 rounded-xl border border-gray-800 leading-relaxed">
                      {selectedRecipe.preparation}
                    </p>
                  </div>

                  <button
                    onClick={handleDownloadPdf}
                    className="w-full bg-gold hover:bg-amber-500 text-gray-950 font-black py-3.5 rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
                  >
                    <Download className="w-4 h-4" /> Imprimir / Descargar PDF Oficial
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
