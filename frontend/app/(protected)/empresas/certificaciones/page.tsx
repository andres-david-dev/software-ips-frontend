"use client";

import { useState } from "react";

export default function CertificacionesEmpresaPage() {
  const [convenio, setConvenio] = useState("");
  const [error, setError] = useState("");

  const handleDescargar = () => {
    setError("");
    if (!convenio.trim()) {
      setError("Debes ingresar el convenio");
      return;
    }
    // Aquí iría la lógica de descarga
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-zinc-900">Empresas</h1>
          <span className="text-zinc-200">·</span>
          <span className="text-2xl font-semibold text-[var(--brand-blue)]">Certificaciones</span>
        </div>
      </header>
      <div className="flex mt-4">
        <div className="flex rounded-tl-xl rounded-bl-xl bg-gradient-to-b from-[#3bb77e]/30 to-[#00b4d8]/30 items-center justify-center w-32 min-h-[180px]">
          <svg width="64" height="64" fill="none" viewBox="0 0 24 24">
            <rect width="48" height="48" fill="none" />
            <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="#fff" strokeWidth="2" fill="none" />
            <path d="M14 3v5h5" stroke="#fff" strokeWidth="2" fill="none" />
            <rect x="9" y="12" width="6" height="1.5" rx="0.75" fill="#fff" />
            <rect x="9" y="15" width="6" height="1.5" rx="0.75" fill="#fff" />
          </svg>
        </div>
        <div className="flex-1 bg-gradient-to-b from-[#3bb77e]/20 to-[#00b4d8]/20 rounded-tr-xl rounded-br-xl p-6 min-h-[180px] flex flex-col justify-between backdrop-blur-sm">
          <div>
            <h2 className="text-2xl font-bold text-cyan-900 mb-2">Custodia de HC</h2>
            <hr className="border-cyan-300 mb-4" />
            <label htmlFor="convenio" className="text-cyan-900 font-medium">Convenio *</label>
            <div className="relative mt-2">
              <input
                id="convenio"
                type="text"
                className="w-full h-11 rounded-xl border border-cyan-300 px-3 pr-10 text-base outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white/80"
                value={convenio}
                onChange={e => setConvenio(e.target.value)}
                placeholder=""
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-cyan-700">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            {error && (
              <div className="mt-2 text-sm text-rose-900 bg-rose-100 rounded p-2 border border-rose-300">{error}</div>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleDescargar}
              className="h-11 px-8 rounded-xl text-white font-bold shadow-md transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] hover:shadow-lg hover:scale-105"
              type="button"
            >
              Descargar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
