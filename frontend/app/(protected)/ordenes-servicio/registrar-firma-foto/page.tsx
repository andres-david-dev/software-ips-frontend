"use client";

import { useState, useRef } from "react";

const MOCK_ORDEN = {
  numeroOrden: "92748",
  fechaSolicitud: "2025-07-28 14:00:00",
  realizadoEn: "Datos desde la BD",
  atendidoPor: "Datos desde la BD",
  tipoEvaluacion: "Datos desde la BD",
  enfasisEvaluacion: "Datos desde la BD"
};

export default function RegistrarFirmaFotoPage() {
  const [numeroOrden, setNumeroOrden] = useState("");
  const [ordenEncontrada, setOrdenEncontrada] = useState(false);
  const [error, setError] = useState("");
  const [firma, setFirma] = useState<string | null>(null);
  const [foto, setFoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNumeroOrdenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Solo permitir números
    const value = e.target.value.replace(/\D/g, "");
    setNumeroOrden(value);
  };

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!numeroOrden) {
      setError("Debes ingresar un número de orden");
      setOrdenEncontrada(false);
      return;
    }
    setOrdenEncontrada(true);
  };

  // Simulación de firma y foto
  const handleRegistrarFirma = () => {
    setFirma("/firma-mock.png"); // Cambia por lógica real
  };
  const handleRegistrarFoto = () => {
    setFoto("/foto-mock.png"); // Cambia por lógica real
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-zinc-900">Ordenes de Servicio</h1>
          <span className="text-zinc-200">·</span>
          <span className="text-2xl font-semibold text-[var(--brand-blue)]">Registrar firma / foto del usuario</span>
        </div>
      </header>

      <section className="bg-[#f7fafc] rounded-2xl border border-zinc-200 shadow-sm p-6">
        <form onSubmit={handleBuscar}>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <label htmlFor="numeroOrden" className="text-sm font-semibold text-zinc-900">
              No. Orden <span className="text-rose-600">*</span>
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="numeroOrden"
                name="numeroOrden"
                type="text"
                className="flex-1 h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                placeholder="Ingresa el número de orden"
                value={numeroOrden}
                onChange={handleNumeroOrdenChange}
                required
              />
              <button
                className="h-11 px-6 rounded-xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] text-sm font-semibold text-white hover:opacity-90 shadow-md transition-all"
                type="submit"
              >
                Buscar
              </button>
            </div>
            {error && (
              <div className="mt-2 text-sm text-rose-600">{error}</div>
            )}
          </div>
        </form>

        {ordenEncontrada && (
          <>
            {/* Datos de la orden (solo lectura) */}
            <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-zinc-900 mb-1">Orden Servicio No.</p>
                  <p className="text-sm text-zinc-700">{MOCK_ORDEN.numeroOrden}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 mb-1">Fecha Solicitud</p>
                  <p className="text-sm text-zinc-700">{MOCK_ORDEN.fechaSolicitud}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 mb-1">Realizado en</p>
                  <p className="text-sm text-zinc-700">{MOCK_ORDEN.realizadoEn}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 mb-1">Atendido por</p>
                  <p className="text-sm text-zinc-700">{MOCK_ORDEN.atendidoPor}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 mb-1">Tipo de Evaluación</p>
                  <p className="text-sm text-zinc-700">{MOCK_ORDEN.tipoEvaluacion}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 mb-1">Énfasis Evaluación</p>
                  <p className="text-sm text-zinc-700">{MOCK_ORDEN.enfasisEvaluacion}</p>
                </div>
              </div>
            </div>

            {/* Sección firma y foto */}
            <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-zinc-900 mb-2">Firma</p>
                  {firma ? (
                    <img src={firma} alt="Firma registrada" className="h-28 w-full object-contain rounded-lg bg-zinc-50" />
                  ) : (
                    <button type="button" onClick={handleRegistrarFirma} className="flex items-center gap-2 px-4 py-2 border rounded bg-zinc-50 text-zinc-700 hover:bg-zinc-100">
                      <span>✍️</span> Registrar Firma
                    </button>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 mb-2">Foto</p>
                  {foto ? (
                    <img src={foto} alt="Foto registrada" className="h-48 w-auto max-w-full object-contain rounded-lg bg-zinc-50" />
                  ) : (
                    <button type="button" onClick={handleRegistrarFoto} className="flex items-center gap-2 px-4 py-2 border rounded bg-zinc-50 text-zinc-700 hover:bg-zinc-100">
                      <span>📷</span> Registrar Foto
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
