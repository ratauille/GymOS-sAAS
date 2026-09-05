"use client";

import React from "react";
import { Globe, Server, Cloud, ShieldCheck, Cpu } from "lucide-react";

export function DomainGuide() {
  return (
    <section className="bg-gray-900/80 border border-gray-800 rounded-3xl p-8 shadow-2xl my-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-gray-800 pb-6">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/60 px-3 py-1 rounded-full border border-blue-900/40">
            <Globe className="w-3.5 h-3.5" /> Módulo 4: Dominio Personalizado & Infraestructura Cloud
          </span>
          <h2 className="text-3xl font-black text-white mt-2">
            Vincular Dominio SSL & Guía de Producción
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Instrucciones paso a paso para vincular `gymos.app` o tu propio dominio a Firebase App Hosting y Cloud Run.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Registros DNS */}
        <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-400" /> 1. Registros DNS para tu Dominio
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Agrega los siguientes registros A y CNAME en el panel de tu proveedor de dominio (Namecheap, GoDaddy o Cloudflare):
          </p>
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-xs font-mono space-y-2 text-gray-300">
            <div className="flex justify-between border-b border-gray-800 pb-1">
              <span>Tipo: <strong>A</strong></span>
              <span>Host: <strong>@</strong></span>
              <span>Valor: <strong>199.36.158.100</strong></span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-1">
              <span>Tipo: <strong>A</strong></span>
              <span>Host: <strong>@</strong></span>
              <span>Valor: <strong>199.36.158.101</strong></span>
            </div>
            <div className="flex justify-between">
              <span>Tipo: <strong>CNAME</strong></span>
              <span>Host: <strong>www</strong></span>
              <span>Valor: <strong>gymos-saas.web.app</strong></span>
            </div>
          </div>
        </div>

        {/* Card 2: Firebase App Hosting Domain Mapping */}
        <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cloud className="w-5 h-5 text-emerald-400" /> 2. Mapeo en Firebase Console
          </h3>
          <ol className="list-decimal list-inside text-xs text-gray-300 space-y-2 leading-relaxed bg-gray-900 p-4 rounded-xl border border-gray-800">
            <li>Entra a <strong>Firebase Console</strong> ➔ <strong>App Hosting</strong>.</li>
            <li>En tu backend <strong>`godotiti1983`</strong>, ve a la pestaña <strong>Domains</strong>.</li>
            <li>Haz clic en <strong>Add Custom Domain</strong> e introduce tu dominio.</li>
            <li>Firebase verificará automáticamente el certificado SSL gratuito en 15-30 minutos.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
