"use client";

import { useState } from "react";
import { especialistas } from "@/lib/agendaData";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function ReasignarAgendaPage() {
  const [especialistaId, setEspecialistaId] = useState<string>("");
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [apellidoTrabajador, setApellidoTrabajador] = useState<string>("");
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [resultados, setResultados] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState<any>(null);
  const [especialistaReasignar, setEspecialistaReasignar] = useState<string>("");

  const handleRealizarBusqueda = () => {
    setError("");
    
    if (!fechaInicio) {
      setError("La fecha es obligatoria");
      return;
    }
    
    if (!especialistaId && !apellidoTrabajador) {
      setError("Por favor selecciona especialista o ingresa el apellido del trabajador");
      return;
    }
    
    // Datos quemados de ejemplo para visualizar mientras se conecta BD
    const datosEjemplo = [
      {
        id: 1,
        asunto: "Evaluación Médica Ocupacional (20min) - LAURA ANGELICA IBAÑEZ CASTILLO",
        especialista: "Dr ALEJANDRO AMAYA GONZALEZ",
        fechaCita: "2025-01-21 22:40:00",
        estado: "Completada",
      },
    ];
    
    setMostrarResultados(true);
    setResultados(datosEjemplo); // Datos de ejemplo
  };

  const handleOtraBusqueda = () => {
    setEspecialistaId("");
    setFechaInicio("");
    setApellidoTrabajador("");
    setMostrarResultados(false);
    setResultados([]);
    setError("");
  };

  const abrirModalReasignar = (cita: any) => {
    setCitaSeleccionada(cita);
    setEspecialistaReasignar("");
    setModalOpen(true);
  };

  const handleConfirmarReasignar = () => {
    if (!especialistaReasignar) {
      alert("Por favor selecciona un especialista");
      return;
    }
    // Aquí se conectará a la BD para realizar la reasignación
    alert(`Cita reasignada al especialista seleccionado`);
    setModalOpen(false);
    setCitaSeleccionada(null);
  };

  return (
    <div className="space-y-8">
      {/* Título externo */}
      <header className="space-y-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-zinc-900">Agenda</h1>
          <span className="text-zinc-200">·</span>
          <span className="text-2xl font-semibold text-[var(--brand-blue)]">Reasignar</span>
        </div>
      </header>

      {/* Panel contenedor */}
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

              {/* Rango Fecha */}
              <div>
                <label htmlFor="fechaInicio" className="text-sm font-semibold text-zinc-900">
                  Rango Fecha <span className="text-rose-600">*</span>
                </label>
                <input
                  id="fechaInicio"
                  type="date"
                  className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
              </div>
            </div>

            {/* TI Apellido del Trabajador */}
            <div className="mt-4">
              <label htmlFor="apellido" className="text-sm font-semibold text-zinc-900">
                TI Apellido del Trabajador <span className="text-rose-600">*</span>
              </label>
              <input
                id="apellido"
                type="text"
                placeholder="Ingresa apellido del trabajador"
                className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                value={apellidoTrabajador}
                onChange={(e) => setApellidoTrabajador(e.target.value)}
              />
            </div>

            {/* Botones */}
            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={handleRealizarBusqueda}
                className="h-12 px-8 rounded-xl text-white font-bold shadow-md transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] hover:shadow-lg hover:scale-105"
              >
                Realizar búsqueda
              </button>
              <button
                type="button"
                onClick={handleOtraBusqueda}
                className="text-xs text-[var(--brand-blue)] hover:underline bg-none border-none p-0 cursor-pointer"
              >
                Otra búsqueda
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

      {/* Banner de resultados */}
      {mostrarResultados && (
        <div className="rounded-xl border border-emerald-700 bg-emerald-600 text-white shadow-sm">
          <div className="px-4 py-3 text-sm font-medium">
            Se encontraron ({resultados.length}) resultados para la búsqueda
          </div>
        </div>
      )}

      {/* Tabla de resultados */}
      {mostrarResultados && (
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200">
            <div className="text-xs text-zinc-900">
              Mostrar
              <select className="mx-2 h-8 rounded-lg border border-zinc-200 bg-white px-2 text-xs">
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              registros
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-900">
              Buscar:
              <input className="h-8 w-40 rounded-lg border border-zinc-200 px-2" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-zinc-100 text-zinc-700">
                  <th className="text-left px-3 py-2 w-12">No.</th>
                  <th className="text-left px-3 py-2">Asunto</th>
                  <th className="text-left px-3 py-2">Especialista</th>
                  <th className="text-left px-3 py-2">Fecha Cita</th>
                  <th className="text-left px-3 py-2">Estado</th>
                  <th className="text-left px-3 py-2">Acción</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((item, index) => (
                  <tr key={item.id} className="border-b border-zinc-100">
                    <td className="px-3 py-2 text-zinc-600">{index + 1}</td>
                    <td className="px-3 py-2 text-zinc-800">{item.asunto}</td>
                    <td className="px-3 py-2 text-zinc-700">{item.especialista}</td>
                    <td className="px-3 py-2 text-zinc-700">{item.fechaCita}</td>
                    <td className="px-3 py-2 text-zinc-700">{item.estado}</td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => abrirModalReasignar(item)}
                        className="text-[var(--brand-blue)] hover:text-[var(--brand-green)] transition-colors"
                        title="Reasignar Cita"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 4v6h6M23 20v-6h-6" />
                          <path d="M20.49 9A9 9 0 0 0 5.64 5.64M3.51 15A9 9 0 0 0 18.36 18.36" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal para reasignar cita */}
      {modalOpen && citaSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full mx-4 overflow-hidden">
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Reasignar Cita</h2>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setCitaSeleccionada(null);
                }}
                className="text-white hover:text-white/80 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4 space-y-4">
              <div>
                <p className="text-sm font-semibold text-zinc-900 mb-2">Cita actual:</p>
                <p className="text-sm text-zinc-700">{citaSeleccionada.asunto}</p>
                <p className="text-sm text-zinc-700 mt-2">
                  <strong>Especialista:</strong> {citaSeleccionada.especialista}
                </p>
                <p className="text-sm text-zinc-700">
                  <strong>Fecha:</strong> {citaSeleccionada.fechaCita}
                </p>
              </div>

              <div className="border-t border-zinc-200 pt-4">
                <label htmlFor="especialistaModal" className="text-sm font-semibold text-zinc-900">
                  Selecciona nuevo especialista <span className="text-rose-600">*</span>
                </label>
                <div className="mt-2 relative">
                  <select
                    id="especialistaModal"
                    className="w-full h-11 rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                    value={especialistaReasignar}
                    onChange={(e) => setEspecialistaReasignar(e.target.value)}
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
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-zinc-200 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                  setCitaSeleccionada(null);
                }}
                className="h-10 px-6 rounded-xl border border-zinc-300 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmarReasignar}
                className="h-10 px-6 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] hover:shadow-lg transition-all"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
