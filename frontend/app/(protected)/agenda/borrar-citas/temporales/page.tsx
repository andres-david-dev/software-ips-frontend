"use client";

import { useState } from "react";
import { especialistas } from "@/lib/agendaData";

export default function BorrarCitasTemporalesPage() {
  const [especialistaId, setEspecialistaId] = useState<string>("");
  const [apellidoTrabajador, setApellidoTrabajador] = useState<string>("");
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [resultados, setResultados] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState<any>(null);
  const [confirmText, setConfirmText] = useState("");
  const [exitoOpen, setExitoOpen] = useState(false);

  const handleBuscar = () => {
    // Aquí se conectará a la BD para traer resultados
    const dummy = [
      {
        id: 1,
        asunto: "Evaluación Médica Ocupacional (20min) - LAURA ANGELICA IBAÑEZ CASTILLO",
        especialista: "Dr ALEJANDRO AMAYA GONZALEZ",
        fechaCita: "2025-01-21 22:40:00",
        estado: "Completada",
      },
    ];
    setResultados(dummy);
    setMostrarResultados(true);
  };

  const handleReset = () => {
    setEspecialistaId("");
    setApellidoTrabajador("");
    setFechaInicio("");
    setResultados([]);
    setMostrarResultados(false);
    setConfirmText("");
    setCitaSeleccionada(null);
  };

  const abrirModalEliminar = (cita: any) => {
    setCitaSeleccionada(cita);
    setConfirmText("");
    setModalOpen(true);
  };

  const handleConfirmarEliminar = () => {
    if (confirmText.trim().toUpperCase() !== "ELIMINAR") {
      alert("Escribe ELIMINAR para confirmar");
      return;
    }
    // Aquí se haría la eliminación en BD
    setModalOpen(false);
    setCitaSeleccionada(null);
    setConfirmText("");
    setExitoOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Título externo */}
      <header className="space-y-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-zinc-900">Agenda</h1>
          <span className="text-zinc-200">·</span>
          <span className="text-2xl font-semibold text-[var(--brand-blue)]">Borrar Citas - Temporales</span>
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
                  Especialista
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

              {/* 1er Apellido del Trabajador */}
              <div>
                <label htmlFor="apellido" className="text-sm font-semibold text-zinc-900">
                  1r Apellido del Trabajador
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

              {/* Rango Fecha */}
              <div>
                <label htmlFor="fecha" className="text-sm font-semibold text-zinc-900">
                  Rango Fecha <span className="text-rose-600">*</span>
                </label>
                <input
                  id="fecha"
                  type="date"
                  className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={handleBuscar}
                className="h-12 px-8 rounded-xl text-white font-bold shadow-md transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] hover:shadow-lg hover:scale-105"
              >
                Realizar búsqueda
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[var(--brand-blue)] hover:underline bg-none border-none p-0 cursor-pointer"
              >
                Otra búsqueda
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabla de resultados */}
      {mostrarResultados && (
        <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
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
                        onClick={() => abrirModalEliminar(item)}
                        className="text-rose-600 hover:text-rose-700 transition-colors"
                        title="Eliminar Cita"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18" />
                          <path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6l1-2h4l1 2" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Modal de confirmación */}
      {modalOpen && citaSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full mx-4 overflow-hidden">
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Eliminar Cita</h2>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setCitaSeleccionada(null);
                  setConfirmText("");
                }}
                className="text-white hover:text-white/80 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-4 space-y-3">
              <p className="text-sm text-zinc-800">
                ¿Estás seguro de eliminar esta cita?
              </p>
              <p className="text-sm text-zinc-700 font-semibold">{citaSeleccionada.asunto}</p>
              <p className="text-sm text-zinc-700">
                <strong>Especialista:</strong> {citaSeleccionada.especialista}
              </p>
              <p className="text-sm text-zinc-700">
                <strong>Fecha:</strong> {citaSeleccionada.fechaCita}
              </p>

              <div className="border-t border-zinc-200 pt-3">
                <label htmlFor="confirm" className="text-sm font-semibold text-zinc-900">
                  Escribe "ELIMINAR" para confirmar
                </label>
                <input
                  id="confirm"
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="ELIMINAR"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-zinc-200 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                  setCitaSeleccionada(null);
                  setConfirmText("");
                }}
                className="h-10 px-6 rounded-xl border border-zinc-300 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmarEliminar}
                className="h-10 px-6 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-rose-500 to-rose-600 hover:shadow-lg transition-all"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {exitoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] px-6 py-4">
              <h2 className="text-lg font-bold text-white">Cita eliminada</h2>
            </div>
            <div className="px-6 py-4 space-y-2">
              <p className="text-sm text-zinc-800">La cita se eliminó correctamente.</p>
            </div>
            <div className="px-6 py-4 border-t border-zinc-200 flex justify-end">
              <button
                type="button"
                onClick={() => setExitoOpen(false)}
                className="h-10 px-6 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] hover:shadow-lg transition-all"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
