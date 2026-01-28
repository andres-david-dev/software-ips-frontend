"use client";

import { useEffect, useMemo, useState } from "react";
import { especialistas as especialistasOriginal } from "@/lib/agendaData";

// Si la lista está vacía, agregar un especialista quemado
const especialistas = especialistasOriginal.length > 0 ? especialistasOriginal : [
  { id: "demo-1", nombre: "Dr. Demo Especialista" }
];

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
  // Forzar que el especialista sea obligatorio (quemado)
  // Quemar un especialista por defecto (el primero de la lista si existe)
  const especialistaDefault = especialistas[0].id;
  const [especialistaId, setEspecialistaId] = useState<string>(especialistaDefault);
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
    // Validar especialista obligatorio
    if (!especialistaId) {
      setError("Por favor seleccione un especialista");
      return;
    }
    if (!fechaISO) {
      setError("Por favor seleccione una fecha");
      return;
    }
    setMostrarAgenda(true);
    setLastUpdated(new Date());
  };

  // Cambia la fecha sumando o restando días
  const navDia = (delta: number) => {
    if (!fechaISO) return;
    const [year, month, day] = fechaISO.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    d.setDate(d.getDate() + delta);
    setFechaISO(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
  };

  return (
    <div className="space-y-8 mt-8">
      {/* Header tipo breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-4xl font-bold text-zinc-900">Agenda</h1>
        <span className="text-2xl text-zinc-400">·</span>
        <span className="text-2xl font-semibold text-[var(--brand-blue)]">Ver Agenda</span>
      </div>
      {/* Panel contenedor igual a Reasignar */}
      <section className="bg-[#f7fafc] rounded-2xl border border-zinc-200 shadow-sm p-6">
        <div className="rounded-2xl border border-zinc-200 bg-white">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Especialista */}
              <div>
                <label htmlFor="especialista" className="text-sm font-semibold text-zinc-900">
                  Especialista <span className="text-rose-600">*</span>
                </label>
                <div className="mt-2 relative">
                  <select
                    id="especialista"
                    className="w-full h-11 rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                    value={especialistaId}
                    onChange={e => setEspecialistaId(e.target.value)}
                  >
                    <option value="">Elija...</option>
                    {especialistas.map(e => (
                      <option key={e.id} value={e.id}>{e.nombre}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Fecha */}
              <div>
                <label htmlFor="fechaAgenda" className="text-sm font-semibold text-zinc-900">
                  Fecha <span className="text-rose-600">*</span>
                </label>
                <input
                  id="fechaAgenda"
                  type="date"
                  className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                  value={fechaISO}
                  onChange={e => setFechaISO(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-5 flex items-center justify-end">
              <button
                type="button"
                onClick={actualizarAgenda}
                className="h-12 px-8 rounded-xl text-white font-bold shadow-md transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] hover:shadow-lg hover:scale-105"
              >
                Ver Agenda
              </button>
            </div>
            {error && (
              <div className="mt-4 rounded-xl border border-rose-300 bg-rose-50 p-3">
                <p className="text-sm text-rose-700">{error}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Header de fecha y flechas y agenda solo si mostrarAgenda */}
      {mostrarAgenda && (
        <>
          <div className="flex items-center justify-between px-2 py-6">
            {/* Flechas izquierda */}
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => navDia(-7)} className="h-10 w-10 rounded-md border border-zinc-300 bg-white flex items-center justify-center hover:bg-zinc-50" aria-label="Semana anterior">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M15 16L9 10L15 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 16L5 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button type="button" onClick={() => navDia(-1)} className="h-10 w-10 rounded-md border border-zinc-300 bg-white flex items-center justify-center hover:bg-zinc-50" aria-label="Día anterior">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M13 16L7 10L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            {/* Fecha grande y día */}
            <div className="flex flex-col items-center flex-1">
              <span className="text-4xl font-bold text-zinc-900">
                {fechaISO ? new Date(fechaISO + 'T00:00:00').toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' }) : '--'}
              </span>
              <span className="text-lg text-zinc-500 font-medium mt-1">
                {fechaISO ? new Date(fechaISO + 'T00:00:00').toLocaleDateString('es-CO', { weekday: 'long' })[0].toUpperCase() + new Date(fechaISO + 'T00:00:00').toLocaleDateString('es-CO', { weekday: 'long' }).slice(1) : ''}
              </span>
            </div>
            {/* Flechas derecha */}
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => navDia(1)} className="h-10 w-10 rounded-md border border-zinc-300 bg-white flex items-center justify-center hover:bg-zinc-50" aria-label="Día siguiente">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button type="button" onClick={() => navDia(7)} className="h-10 w-10 rounded-md border border-zinc-300 bg-white flex items-center justify-center hover:bg-zinc-50" aria-label="Semana siguiente">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M5 4L11 10L5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 4L15 10L9 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
          <section className="space-y-4">
            <div className="rounded-xl border border-emerald-700 bg-emerald-600 text-white shadow-sm">
              <div className="px-4 py-3 text-sm font-medium">
                Información Actualizada a las {lastUpdated ? lastUpdated.toLocaleTimeString("es-CO") : "--:--:--"}
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
        </>
      )}
    </div>
  );
}
