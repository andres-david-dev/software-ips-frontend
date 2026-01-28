"use client";

import { useEffect, useState } from "react";
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
  const [errorEspecialista, setErrorEspecialista] = useState("");
  const [errorFecha, setErrorFecha] = useState("");
  const [errorApellido, setErrorApellido] = useState("");
  const [errorGlobal, setErrorGlobal] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState<any>(null);
  const [especialistaReasignar, setEspecialistaReasignar] = useState<string>("");
  const [nuevaFecha, setNuevaFecha] = useState<string>("");
  const [motivoCambio, setMotivoCambio] = useState<string>("");
  const [comentario, setComentario] = useState<string>("");
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const motivosCambio = [
    "Aplazar la cita a petición del usuario",
    "Ausencia del especialista",
    "Cancelación de cita por parte de la empresa",
    "Cancelación de cita por parte del trabajador",
    "Falta de equipos",
    "Llegada tarde del trabajador",
    "Reasignación para atención empresarial",
  ];

  // Agrega Dr Simi como especialista quemado
  const especialistas = [
    { id: "2", nombre: "Dr SIMI" },
    { id: "1", nombre: "Dr ALEJANDRO AMAYA GONZALEZ" },
  ];

  // Limpia los campos de búsqueda y errores
  const handleLimpiarBusqueda = () => {
    setEspecialistaId("");
    setFechaInicio("");
    setApellidoTrabajador("");
    setMostrarResultados(false);
    setResultados([]);
    setError("");
    setErrorEspecialista("");
    setErrorFecha("");
    setErrorApellido("");
  };

  // Resetea el formulario al montar la página para evitar persistencia tras recargar
  useEffect(() => {
    setEspecialistaId("");
    setFechaInicio("");
    setApellidoTrabajador("");
    setMostrarResultados(false);
    setResultados([]);
    setError("");
    setErrorEspecialista("");
    setErrorFecha("");
    setErrorApellido("");
    setModalOpen(false);
    setCitaSeleccionada(null);
    setEspecialistaReasignar("");
    setNuevaFecha("");
    setMotivoCambio("");
    setComentario("");
  }, []);

  const handleRealizarBusqueda = () => {
    setErrorGlobal("");
    let errorMsg = "";
    if (!especialistaId) {
      errorMsg = "Por favor seleccione un especialista";
    } else if (!fechaInicio) {
      errorMsg = "La fecha es obligatoria para realizar la búsqueda";
    } else if (!apellidoTrabajador.trim()) {
      errorMsg = "Debes ingresar el apellido del trabajador";
    }
    if (errorMsg) {
      setErrorGlobal(errorMsg);
      return;
    }
    // Validación: al menos uno de los dos campos (especialista o apellido)
    if (!especialistaId && !apellidoTrabajador.trim()) {
      setError("Debes seleccionar un especialista o ingresar el apellido del trabajador");
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
      {
        id: 2,
        asunto: "Consulta General - PACIENTE SIMI",
        especialista: "Dr SIMI",
        fechaCita: "2026-02-10 09:00:00",
        estado: "Pendiente",
      },
    ];

    setMostrarResultados(true);
    setResultados(datosEjemplo);
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
    setNuevaFecha("");
    setMotivoCambio("");
    setComentario("");
    setModalOpen(true);
  };

  const handleConfirmarReasignar = () => {
    if (!nuevaFecha) {
      alert("Por favor selecciona la nueva fecha");
      return;
    }

    if (!motivoCambio) {
      alert("Por favor selecciona el motivo del cambio");
      return;
    }

    if (!especialistaReasignar) {
      alert("Por favor selecciona un especialista");
      return;
    }
    // Aquí se conectará a la BD para realizar la reasignación
    setMostrarModalExito(true);
    setModalOpen(false);
  };

  const handleConfirmarExito = () => {
    setCitaSeleccionada(null);
    setNuevaFecha("");
    setMotivoCambio("");
    setComentario("");
    setEspecialistaReasignar("");
    setMostrarModalExito(false);
    handleRealizarBusqueda();
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
                  {errorEspecialista && (
                    <div className="mt-1 text-xs text-red-600 font-semibold">{errorEspecialista}</div>
                  )}
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
                {errorFecha && (
                  <div className="mt-1 text-xs text-red-600 font-semibold">{errorFecha}</div>
                )}
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
              {errorApellido && (
                <div className="mt-1 text-xs text-red-600 font-semibold">{errorApellido}</div>
              )}
            </div>

            {/* Botones */}
            <div className="mt-5 flex items-center justify-end">
              <button
                type="button"
                onClick={handleRealizarBusqueda}
                className="h-12 px-8 rounded-xl text-white font-bold shadow-md transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] hover:shadow-lg hover:scale-105"
              >
                Realizar búsqueda
              </button>
            </div>
            {errorGlobal && (
              <div className="mt-6 px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium" style={{maxWidth: '100%', minHeight: '44px'}}>
                {errorGlobal}
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
        <div className="fixed inset-0 z-50 bg-black/55 flex items-start justify-center overflow-auto py-8 px-4">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden animate-slideUp">
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] px-6 py-3 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Reasignar Cita</h2>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setCitaSeleccionada(null);
                }}
                className="text-white hover:text-white/80 transition-colors"
                aria-label="Cerrar modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-5">
              {/* Resumen de la cita */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-zinc-800">Trabajador</p>
                  <p className="mt-2 text-base font-semibold text-zinc-900">
                    {citaSeleccionada.trabajador || citaSeleccionada.asunto || "Trabajador no disponible"}
                  </p>
                </div>
                <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-zinc-800">Examen</p>
                  <p className="mt-2 text-base font-semibold text-zinc-900">
                    {citaSeleccionada.asunto || "Examen no disponible"}
                  </p>
                </div>
              </div>

              {/* Formulario de reasignación */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nuevaFecha" className="text-sm font-semibold text-zinc-900">Nueva fecha *</label>
                  <input
                    id="nuevaFecha"
                    type="date"
                    className="mt-2 w-full h-11 rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                    value={nuevaFecha}
                    onChange={(e) => setNuevaFecha(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="motivoCambio" className="text-sm font-semibold text-zinc-900">Motivo cambio *</label>
                  <div className="mt-2 relative">
                    <select
                      id="motivoCambio"
                      className="w-full h-11 rounded-lg border border-zinc-300 bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                      value={motivoCambio}
                      onChange={(e) => setMotivoCambio(e.target.value)}
                    >
                      <option value="" disabled>Elija...</option>
                      {motivosCambio.map((motivo) => (
                        <option key={motivo} value={motivo}>{motivo}</option>
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

              <div>
                <label htmlFor="comentario" className="text-sm font-semibold text-zinc-900">Comentario</label>
                <textarea
                  id="comentario"
                  maxLength={255}
                  className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent min-h-[90px]"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Añade detalles relevantes para la reasignación"
                />
                <div className="mt-1 text-xs text-zinc-500">{comentario.length}/255</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-zinc-200 pt-4">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Especialista actual</p>
                  <p className="mt-1 text-sm text-zinc-800">{citaSeleccionada.especialista}</p>
                </div>
                <div>
                  <label htmlFor="especialistaModal" className="text-sm font-semibold text-zinc-900">Nuevo especialista *</label>
                  <div className="mt-2 relative">
                    <select
                      id="especialistaModal"
                      className="w-full h-11 rounded-lg border border-zinc-300 bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                      value={especialistaReasignar}
                      onChange={(e) => setEspecialistaReasignar(e.target.value)}
                    >
                      <option value="" disabled>Elija...</option>
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
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-zinc-200 bg-white flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                  setCitaSeleccionada(null);
                }}
                className="h-10 px-6 rounded-lg border border-zinc-300 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmarReasignar}
                className="h-10 px-6 rounded-lg text-white text-sm font-semibold bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] hover:shadow-md transition-all"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {mostrarModalExito && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-3">¡Cambios Guardados!</h3>
              <p className="text-base text-zinc-600 mb-8">
                La cita ha sido reasignada exitosamente.
              </p>
              <button
                onClick={handleConfirmarExito}
                className="w-full rounded-xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] px-6 py-3 text-base font-semibold text-white hover:opacity-90 shadow-md transition-all"
                type="button"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="mt-2 text-sm text-red-600 font-semibold">{error}</div>
      )}
    </div>
  );
}
