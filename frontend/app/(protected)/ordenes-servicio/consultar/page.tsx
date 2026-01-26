"use client";

import { useState } from "react";

export default function ConsultarOrdenesPage() {
  const [sede, setSede] = useState<string>("");
  const [trabajador, setTrabajador] = useState<string>("");
  const [numeroOrden, setNumeroOrden] = useState<string>("");
  const [estadoOrden, setEstadoOrden] = useState<string>("");
  const [convenio, setConvenio] = useState<string>("");
  const [tipoEvaluacion, setTipoEvaluacion] = useState<string>("");
  const [enfasis, setEnfasis] = useState<string>("");
  const [rangoFecha, setRangoFecha] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [resultados, setResultados] = useState<any[]>([]);

  const handleLimpiar = () => {
    setSede("");
    setTrabajador("");
    setNumeroOrden("");
    setEstadoOrden("");
    setConvenio("");
    setTipoEvaluacion("");
    setEnfasis("");
    setRangoFecha("");
    setError("");
    setMostrarResultados(false);
    setResultados([]);
  };

  const handleBuscar = () => {
    setError("");

    // Validación: el rango de fecha es obligatorio
    if (!rangoFecha) {
      setError("El rango de fecha es obligatorio para realizar la búsqueda");
      return;
    }

    // Validación: verificar que la fecha no sea futura
    const fechaSeleccionada = new Date(rangoFecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    fechaSeleccionada.setHours(0, 0, 0, 0);

    if (fechaSeleccionada > hoy) {
      setError("La fecha seleccionada no puede ser una fecha futura");
      return;
    }

    // Validación: verificar que el rango no exceda 4 meses
    const cuatroMesesAtras = new Date();
    cuatroMesesAtras.setMonth(hoy.getMonth() - 4);
    cuatroMesesAtras.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < cuatroMesesAtras) {
      setError("El rango de fecha no puede ser mayor a 4 meses desde hoy");
      return;
    }

    // Validación opcional: al menos un criterio de búsqueda adicional
    const tieneCriterio = sede || trabajador || numeroOrden || estadoOrden || convenio || tipoEvaluacion || enfasis;
    
    if (!tieneCriterio) {
      setError("Debes ingresar al menos un criterio de búsqueda además de la fecha");
      return;
    }

    // Validación: verificar formato del número de orden si está presente
    if (numeroOrden && numeroOrden.trim().length < 3) {
      setError("El número de orden debe tener al menos 3 caracteres");
      return;
    }

    // Validación: verificar que el trabajador tenga al menos 3 caracteres
    if (trabajador && trabajador.trim().length < 3) {
      setError("El nombre del trabajador debe tener al menos 3 caracteres");
      return;
    }

    // Datos quemados de ejemplo
    const datosEjemplo = [
      {
        id: 1,
        noOrden: "1554889",
        fechaRegistro: "2026-01-24 12:33:46",
        nombreCompleto: "FANNY CRISTINA ERAZO PEREZ",
        sede: "Sede Principal",
        tipoEvaluacion: "Pre-Ingreso",
        estado: "Cerrado"
      },
      {
        id: 2,
        noOrden: "1554734",
        fechaRegistro: "2026-01-24 09:43:14",
        nombreCompleto: "Gladis Marlene Domínguez Patiño",
        sede: "Sede Principal",
        tipoEvaluacion: "Pre-Ingreso",
        estado: "Creado"
      },
      {
        id: 3,
        noOrden: "1554720",
        fechaRegistro: "2026-01-24 09:37:52",
        nombreCompleto: "Diego Fernando García Grisales",
        sede: "Sede Principal",
        tipoEvaluacion: "Pre-Ingreso",
        estado: "Creado"
      },
      {
        id: 4,
        noOrden: "1554709",
        fechaRegistro: "2026-01-24 09:30:32",
        nombreCompleto: "Yohury Leany Domínguez Alegría",
        sede: "Sede Principal",
        tipoEvaluacion: "Pre-Ingreso",
        estado: "Creado"
      },
      {
        id: 5,
        noOrden: "1554698",
        fechaRegistro: "2026-01-24 09:24:33",
        nombreCompleto: "Laura Nicole Vélez Londoño",
        sede: "Sede Principal",
        tipoEvaluacion: "Pre-Ingreso",
        estado: "Creado"
      }
    ];

    // Filtrar resultados según criterios
    let resultadosFiltrados = datosEjemplo;

    if (sede) {
      resultadosFiltrados = resultadosFiltrados.filter(r => 
        r.sede.toLowerCase().includes(sede.toLowerCase())
      );
    }

    if (trabajador) {
      resultadosFiltrados = resultadosFiltrados.filter(r => 
        r.nombreCompleto.toLowerCase().includes(trabajador.toLowerCase())
      );
    }

    if (numeroOrden) {
      resultadosFiltrados = resultadosFiltrados.filter(r => 
        r.noOrden.includes(numeroOrden)
      );
    }

    if (estadoOrden) {
      resultadosFiltrados = resultadosFiltrados.filter(r => 
        r.estado.toLowerCase() === estadoOrden.toLowerCase()
      );
    }

    if (tipoEvaluacion) {
      resultadosFiltrados = resultadosFiltrados.filter(r => 
        r.tipoEvaluacion.toLowerCase().includes(tipoEvaluacion.toLowerCase())
      );
    }

    setResultados(resultadosFiltrados);
    setMostrarResultados(true);
  };

  return (
    <div className="space-y-8">
      {/* Título externo */}
      <header className="space-y-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-zinc-900">Ordenes de Servicio</h1>
          <span className="text-zinc-200">·</span>
          <span className="text-2xl font-semibold text-[var(--brand-blue)]">Consultar</span>
        </div>
      </header>

      {/* Panel contenedor */}
      <section className="bg-[#f7fafc] rounded-2xl border border-zinc-200 shadow-sm p-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            {/* Mensaje de error */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sede */}
              <div>
                <label htmlFor="sede" className="text-sm font-semibold text-zinc-900">
                  Sede
                </label>
                <div className="mt-2 relative">
                  <select
                    id="sede"
                    className="w-full h-11 rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                    value={sede}
                    onChange={(e) => setSede(e.target.value)}
                  >
                    <option value="">Elija...</option>
                    <option value="candelaria">Candelaria</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* No. Orden */}
              <div>
                <label htmlFor="numeroOrden" className="text-sm font-semibold text-zinc-900">
                  No. Orden
                </label>
                <div className="mt-2 relative">
                  <input
                    id="numeroOrden"
                    type="text"
                    className="w-full h-11 rounded-xl border border-zinc-200 px-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                    value={numeroOrden}
                    onChange={(e) => setNumeroOrden(e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Trabajador */}
              <div>
                <label htmlFor="trabajador" className="text-sm font-semibold text-zinc-900">
                  Trabajador
                </label>
                <div className="mt-2 relative">
                  <input
                    id="trabajador"
                    type="text"
                    className="w-full h-11 rounded-xl border border-zinc-200 px-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                    value={trabajador}
                    onChange={(e) => setTrabajador(e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Estado Orden */}
              <div>
                <label htmlFor="estadoOrden" className="text-sm font-semibold text-zinc-900">
                  Estado Orden
                </label>
                <div className="mt-2 relative">
                  <select
                    id="estadoOrden"
                    className="w-full h-11 rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                    value={estadoOrden}
                    onChange={(e) => setEstadoOrden(e.target.value)}
                  >
                    <option value="">Elija...</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="programada">Programada</option>
                    <option value="ejecutada">Ejecutada</option>
                    <option value="anulada">Anulada</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Convenio */}
              <div>
                <label htmlFor="convenio" className="text-sm font-semibold text-zinc-900">
                  Convenio
                </label>
                <div className="mt-2 relative">
                  <input
                    id="convenio"
                    type="text"
                    className="w-full h-11 rounded-xl border border-zinc-200 px-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                    value={convenio}
                    onChange={(e) => setConvenio(e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Empresa usuaria */}
              <div>
                <label htmlFor="empresaUsuaria" className="text-sm font-semibold text-zinc-900">
                  Empresa usuaria
                </label>
                <div className="mt-2 relative">
                  <input
                    id="empresaUsuaria"
                    type="text"
                    className="w-full h-11 rounded-xl border border-zinc-200 px-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Tipo Evaluación */}
              <div>
                <label htmlFor="tipoEvaluacion" className="text-sm font-semibold text-zinc-900">
                  Tipo Evaluación
                </label>
                <div className="mt-2 relative">
                  <select
                    id="tipoEvaluacion"
                    className="w-full h-11 rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                    value={tipoEvaluacion}
                    onChange={(e) => setTipoEvaluacion(e.target.value)}
                  >
                    <option value="">Elija...</option>
                    <option value="ingreso">Ingreso</option>
                    <option value="periodico">Periódico</option>
                    <option value="retiro">Retiro</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Énfasis */}
              <div>
                <label htmlFor="enfasis" className="text-sm font-semibold text-zinc-900">
                  Énfasis
                </label>
                <div className="mt-2 relative">
                  <select
                    id="enfasis"
                    className="w-full h-11 rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                    value={enfasis}
                    onChange={(e) => setEnfasis(e.target.value)}
                  >
                    <option value="">Elija...</option>
                    <option value="osteomuscular">Osteomuscular</option>
                    <option value="psicosocial">Psicosocial</option>
                    <option value="visual">Visual</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Rango Fecha Orden Servicio */}
            <div className="mt-6">
              <label htmlFor="rangoFecha" className="text-sm font-semibold text-zinc-900">
                Rango Fecha Orden Servicio <span className="text-rose-600">*</span>
              </label>
              <input
                id="rangoFecha"
                type="date"
                className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                value={rangoFecha}
                onChange={(e) => setRangoFecha(e.target.value)}
              />
              <p className="text-xs text-zinc-500 mt-1">Periodo de tiempo de hasta 4 meses</p>
            </div>

            {/* Botones */}
            <div className="mt-8 flex flex-wrap justify-end gap-3">
              <button
                onClick={handleLimpiar}
                className="rounded-xl bg-zinc-100 border border-zinc-200 px-8 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-200 transition-all"
                type="button"
              >
                Limpiar
              </button>
              <button
                onClick={handleBuscar}
                className="rounded-xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] px-8 py-2.5 text-sm font-semibold text-white hover:opacity-90 shadow-md transition-all"
                type="button"
              >
                Realizar búsqueda
              </button>
            </div>
        </div>
      </section>

      {/* Mensaje de éxito y tabla de resultados */}
      {mostrarResultados && (
        <section className="space-y-4">
          {/* Mensaje de éxito */}
          <div className="rounded-2xl bg-emerald-600 px-6 py-4">
            <p className="text-base font-medium text-white">
              Se encontraron ({resultados.length}) resultados para la búsqueda
            </p>
          </div>

          {/* Tabla de resultados */}
          <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
            {/* Controles de la tabla */}
            <div className="px-5 py-3 flex flex-wrap items-center justify-between gap-3 bg-white">
              <div className="flex items-center gap-2 text-sm text-zinc-700">
                <span>Mostrar</span>
                <select className="h-9 rounded border border-zinc-300 bg-white px-2 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent">
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
                <span>registros</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-700">Buscar:</span>
                <input 
                  type="text" 
                  className="h-9 rounded border border-zinc-300 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent w-56"
                  placeholder=""
                />
              </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50">
                  <tr className="border-y border-zinc-200">
                    <th className="px-4 py-3 text-left text-sm font-bold text-zinc-700">No.</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-zinc-700">No_Orden</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-zinc-700">Fecha Registro</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-zinc-700">Nombres y Apellidos</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-zinc-700">Sede</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-zinc-700">Tipo Evaluación</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-zinc-700">Estado</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {resultados.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-sm text-zinc-500">
                        No se encontraron resultados para los criterios de búsqueda
                      </td>
                    </tr>
                  ) : (
                    resultados.map((item, index) => (
                      <tr key={item.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-zinc-900">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-[var(--brand-blue)] font-medium">
                          <a href="#" className="hover:underline">{item.noOrden}</a>
                        </td>
                        <td className="px-4 py-3 text-sm text-zinc-700">{item.fechaRegistro}</td>
                        <td className="px-4 py-3 text-sm text-zinc-900">{item.nombreCompleto}</td>
                        <td className="px-4 py-3 text-sm text-zinc-700">{item.sede}</td>
                        <td className="px-4 py-3 text-sm text-zinc-700">{item.tipoEvaluacion}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                            item.estado === "Cerrado" 
                              ? "text-zinc-700" 
                              : "text-zinc-700"
                          }`}>
                            {item.estado}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
