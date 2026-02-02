"use client";

import { useState } from "react";

export default function EliminarEmpresaPage() {
  const [empresa, setEmpresa] = useState("");
  const [error, setError] = useState("");
  const [empresaEncontrada, setEmpresaEncontrada] = useState(false);

  const handleBuscarEmpresa = () => {
    setError("");
    if (!empresa.trim()) {
      setError("Debes ingresar el nombre de la empresa");
      return;
    }
    setEmpresaEncontrada(true);
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-zinc-900">Empresas</h1>
          <span className="text-zinc-200">·</span>
          <span className="text-2xl font-semibold text-[var(--brand-blue)]">Eliminar</span>
        </div>
      </header>
      <section className="bg-[#f7fafc] rounded-2xl border border-zinc-200 shadow-sm p-6">
        <div className="space-y-6">
          {error && (
            <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 p-4">
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-rose-900">Error de validación</h3>
                  <p className="text-sm text-rose-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <label htmlFor="buscarEmpresa" className="text-sm font-semibold text-zinc-900">
              Empresa <span className="text-rose-600">*</span>
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="buscarEmpresa"
                type="text"
                className="flex-1 h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent disabled:bg-zinc-100 disabled:cursor-not-allowed"
                value={empresa}
                onChange={e => setEmpresa(e.target.value)}
                onKeyPress={e => e.key === "Enter" && handleBuscarEmpresa()}
                placeholder="Ingresa el nombre de la empresa"
                disabled={empresaEncontrada}
                required
              />
              <button
                onClick={handleBuscarEmpresa}
                className="h-11 px-6 rounded-xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] text-sm font-semibold text-white hover:opacity-90 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                disabled={empresaEncontrada}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
