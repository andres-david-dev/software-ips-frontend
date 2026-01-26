"use client";

import { useEffect, useMemo, useState } from "react";
import { especialistas } from "@/lib/agendaData";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

// Obtiene la fecha de "hoy" sin desfasarla a UTC para evitar que aparezca el día anterior
function obtenerHoyLocalISO() {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function generarHorariosHoras(inicioHora = 8, finHora = 20) {
  const slots: Array<{ hora: string; slot: number }> = [];
  for (let h = inicioHora; h <= finHora; h++) {
    for (let s = 1; s <= 2; s++) {
      slots.push({ hora: `${pad(h)}:00`, slot: s });
    }
  }
  return slots;
}

function formatearFecha(fechaISO: string) {
  try {
    // Parse YYYY-MM-DD en zona local para evitar ajuste de zona horaria
    const [year, month, day] = fechaISO.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    const dia = d.toLocaleDateString("es-CO", { weekday: "long" });
    const cuerpo = d.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
    return { dia, cuerpo };
  } catch {
    return { dia: "", cuerpo: "" };
  }
}

export default function VerAgendaPage() {
  const [especialistaId, setEspecialistaId] = useState<string>("");
  const [fechaISO, setFechaISO] = useState<string>(obtenerHoyLocalISO());
  const [mostrarAgenda, setMostrarAgenda] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string>("");

  // Limpia el formulario al montar para evitar que persistan datos tras recargar
  useEffect(() => {
    setEspecialistaId("");
    setFechaISO(obtenerHoyLocalISO());
    setMostrarAgenda(false);
    setLastUpdated(null);
    setError("");
  }, []);

  const horarios = useMemo(() => generarHorariosHoras(8, 20), []);
  const { dia, cuerpo } = useMemo(() => (fechaISO ? formatearFecha(fechaISO) : { dia: "", cuerpo: "" }), [fechaISO]);

  const actualizarAgenda = () => {
    setError("");
    
    if (!especialistaId && !fechaISO) {
      setError("Por favor selecciona especialista o fecha");
      return;
    }
    
    setMostrarAgenda(true);
    setLastUpdated(new Date());
  };

  const navDia = (delta: number) => {
    if (!fechaISO) return;
    // Parse YYYY-MM-DD safely
    const [year, month, day] = fechaISO.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    // Add delta days
    d.setDate(d.getDate() + delta);
    // Rebuild as YYYY-MM-DD
    const next = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    setFechaISO(next);
    setLastUpdated(new Date());
  };

  return (
    <div className="space-y-8">
      {/* Título externo para mantener consistencia con Nuevo Servicio */}
      <header className="space-y-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-zinc-900">Agenda</h1>
          <span className="text-zinc-200">·</span>
          <span className="text-2xl font-semibold text-[var(--brand-blue)]">Ver Agenda</span>
        </div>
      </header>

      {/* Panel contenedor similar al de Nuevo Servicio */}
      <section className="bg-[#f7fafc] rounded-2xl border border-zinc-200 shadow-sm p-6">
        <div className="rounded-2xl border border-zinc-200 bg-white">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="especialista" className="text-sm font-semibold text-zinc-900">
                  Especialista <span className="text-rose-600">*</span>
                </label>
                <div className="mt-2 relative">
                  <select
                    id="especialista"
                    className="w-full h-11 rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                    value={especialistaId}
                    onChange={(e) => setEspecialistaId(e.target.value)}
                  >
                    <option value="" disabled>
                      Elija...
                    </option>
                    {especialistas.length === 0 ? null :
                      especialistas.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.nombre}
                        </option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="fechaAgenda" className="text-sm font-semibold text-zinc-900">
                  Fecha <span className="text-rose-600">*</span>
                </label>
                <input
                  id="fechaAgenda"
                  type="date"
                  className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                  value={fechaISO}
                  onChange={(e) => setFechaISO(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-rose-300 bg-rose-50 p-3">
                <p className="text-sm text-rose-700">{error}</p>
              </div>
            )}

            <div className="mt-5 flex items-center justify-end">
              <button
                type="button"
                className="h-12 px-8 rounded-xl text-white font-bold shadow-md transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] hover:shadow-lg hover:scale-105"
                onClick={actualizarAgenda}
              >
                Ver Agenda
              </button>
            </div>
          </div>
        </div>
      </section>

      {mostrarAgenda && (
        <section className="space-y-4">
          <div className="rounded-xl border border-emerald-700 bg-emerald-600 text-white shadow-sm">
            <div className="px-4 py-3 text-sm font-medium">
              Información Actualizada a las {lastUpdated ? lastUpdated.toLocaleTimeString("es-CO") : "--:--:--"}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-3xl font-semibold text-zinc-900">
              {cuerpo || "Seleccione una fecha"}
              {dia ? <span className="ml-3 text-sm font-medium text-zinc-600">{dia[0].toUpperCase() + dia.slice(1)}</span> : null}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex rounded-lg border border-zinc-300 overflow-hidden">
                <button type="button" className="px-3 py-1 text-sm bg-zinc-100">Semana</button>
                <button type="button" className="px-3 py-1 text-sm bg-white">Día</button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navDia(-1)}
                  className="h-9 w-9 rounded-lg border border-zinc-300 bg-white flex items-center justify-center hover:bg-zinc-50"
                  aria-label="Día anterior"
                >
                  <span className="text-zinc-700">«</span>
                </button>
                <button
                  type="button"
                  onClick={() => navDia(1)}
                  className="h-9 w-9 rounded-lg border border-zinc-300 bg-white flex items-center justify-center hover:bg-zinc-50"
                  aria-label="Día siguiente"
                >
                  <span className="text-zinc-700">»</span>
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white">
            <div className="p-4">
              <div>
                {horarios.map((h, idx) => (
                  <div
                    key={`${h.hora}-${h.slot}-${idx}`}
                    className={cn(
                      "grid grid-cols-[100px_1fr] items-start gap-3 py-3",
                      h.slot === 2 && idx !== horarios.length - 1 && "border-b border-zinc-200"
                    )}
                  >
                    <div className="text-xs text-zinc-500 pt-1">{h.slot === 1 ? h.hora : ""}</div>
                    <div className="h-24 rounded-lg bg-zinc-50 border border-zinc-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
