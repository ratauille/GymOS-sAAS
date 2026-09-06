"use client";

import React, { useState } from "react";
import { Users, DollarSign, Calendar, CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: "Nuevo" | "Contactado" | "Suscrito VIP";
}

const INITIAL_LEADS: LeadItem[] = [
  { id: "L-101", name: "Elena Rostova", email: "elena@luxury.com", phone: "+52 55 9876 5432", plan: "Plan Mensual Élite ($89 USD)", status: "Contactado" },
  { id: "L-102", name: "Mateo Valenzuela", email: "m.valenzuela@tech.io", phone: "+52 81 1234 9988", plan: "Plan Semanal VIP ($29 USD)", status: "Nuevo" },
  { id: "L-103", name: "Sofía Alarcón", email: "sofia@design.net", phone: "+52 33 4455 6677", plan: "Licencia GymOS Pro ($199 USD)", status: "Suscrito VIP" }
];

export function CrmDashboard() {
  const [leads, setLeads] = useState<LeadItem[]>(INITIAL_LEADS);
  const [selectedPlan, setSelectedPlan] = useState("Plan Mensual Élite ($89 USD)");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayPalCheckout = () => {
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 3500);
  };

  return (
    <section className="bg-gray-900/80 border border-gray-800 rounded-3xl p-8 shadow-2xl my-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-gray-800 pb-6">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-900/40">
            <Users className="w-3.5 h-3.5" /> Módulo 3: CRM & Control de Pagos PayPal
          </span>
          <h2 className="text-3xl font-black text-white mt-2">
            Gestión de Miembros & Checkout en Tiempo Real
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Administración de prospectos, suscripciones VIP y pasarela de pago PayPal integrados.
          </p>
        </div>
      </div>

      {/* Grid de Métricas CRM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-950/90 border border-gray-800 p-6 rounded-2xl">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs uppercase font-bold">Miembros Activos</span>
            <Users className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-4xl font-extrabold text-white mt-3">1,240</p>
          <span className="text-xs font-semibold text-emerald-400 mt-2 block">↑ +12.4% este mes</span>
        </div>

        <div className="bg-gray-950/90 border border-gray-800 p-6 rounded-2xl">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs uppercase font-bold">Sesiones de Hoy</span>
            <Calendar className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-4xl font-extrabold text-white mt-3">8 Clases</p>
          <span className="text-xs font-semibold text-gray-400 mt-2 block">Próxima: 18:00 hrs</span>
        </div>

        <div className="bg-gray-950/90 border border-gray-800 p-6 rounded-2xl">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs uppercase font-bold">Ingresos Diarios</span>
            <DollarSign className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-4xl font-extrabold text-emerald-400 mt-3">$3,420 <span className="text-xs text-gray-400 font-normal">USD</span></p>
          <span className="text-xs font-semibold text-gray-400 mt-2 block">Pagos verificados vía PayPal</span>
        </div>
      </div>

      {/* Tabla de Prospectos CRM & Checkout Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CRM Leads Table */}
        <div className="lg:col-span-2 bg-gray-950 p-6 rounded-2xl border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-red-500" /> Registro de Prospectos Recientes
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-900 text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
                <tr>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Contacto</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-900">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-900/50 transition-all">
                    <td className="px-4 py-3.5 font-bold text-white">{lead.name}</td>
                    <td className="px-4 py-3.5 text-gray-400">{lead.email}</td>
                    <td className="px-4 py-3.5 text-gold font-medium">{lead.plan}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        lead.status === "Suscrito VIP"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-900/40"
                          : lead.status === "Contactado"
                          ? "bg-amber-950 text-amber-400 border border-amber-900/40"
                          : "bg-blue-950 text-blue-400 border border-blue-900/40"
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PayPal Checkout Card */}
        <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-900/40">
              PASARELA PAYPAL SDK
            </span>
            <h3 className="text-xl font-bold text-white mt-2">Cobro Instantáneo de Membresías</h3>
            <p className="text-gray-400 text-xs mt-1 mb-4">
              Selecciona un plan y procesa pagos seguros en dólares con confirmación instantánea.
            </p>

            <label className="block text-xs font-bold text-gray-300 uppercase mb-2">
              Plan de Suscripción:
            </label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full bg-gray-900 text-white border border-gray-800 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-emerald-500 mb-4"
            >
              <option value="Plan Semanal VIP ($29 USD)">Plan Semanal VIP ($29 USD)</option>
              <option value="Plan Mensual Élite ($89 USD)">Plan Mensual Élite ($89 USD)</option>
              <option value="Licencia GymOS Pro ($199 USD)">Licencia GymOS Pro ($199 USD)</option>
            </select>
          </div>

          {paymentSuccess ? (
            <div className="p-4 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded-xl text-center text-xs font-bold space-y-2 animate-in fade-in">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
              <p>¡Pago de {selectedPlan} Procesado!</p>
              <p className="text-[10px] font-normal text-emerald-400">Recibo enviado al correo del cliente.</p>
            </div>
          ) : (
            <button
              onClick={handlePayPalCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-emerald-200" /> Pagar Ahora vía PayPal SDK
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
