"use client";

import { useState } from "react";

export default function ModificarDatosServicioPage() {
  const [numeroOrden, setNumeroOrden] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [ordenEncontrada, setOrdenEncontrada] = useState(false);
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [motivo, setMotivo] = useState<string>("");
  
  // Estados para campos editables
  const [sede, setSede] = useState<string>("");
  const [sedeError, setSedeError] = useState<string>("");
  const [tipoServicio, setTipoServicio] = useState<string>("");
  const [tipoServicioError, setTipoServicioError] = useState<string>("");
  const [enfasisServicio, setEnfasisServicio] = useState<string>("");
  const [profesional, setProfesional] = useState<string>("");
  const [profesionalError, setProfesionalError] = useState<string>("");
  const [fechaServicio, setFechaServicio] = useState<string>("");
  const [fechaServicioError, setFechaServicioError] = useState<string>("");
  const [horaServicio, setHoraServicio] = useState<string>("");
  const [horaServicioError, setHoraServicioError] = useState<string>("");
  const [observaciones, setObservaciones] = useState<string>("");
  const [motivoError, setMotivoError] = useState<string>("");

  const handleBuscarOrden = () => {
    setError("");

    if (!numeroOrden.trim()) {
      setError("Debes ingresar un número de orden");
      return;
    }

    if (numeroOrden.trim().length < 4) {
      setError("El número de orden debe tener al menos 4 caracteres");
      return;
    }

    setOrdenEncontrada(true);
  };

  const validarCampos = (): boolean => {
    let esValido = true;
    
    setSedeError("");
    setTipoServicioError("");
    setProfesionalError("");
    setFechaServicioError("");
    setHoraServicioError("");
    setMotivoError("");

    if (!sede.trim()) {
      setSedeError("La sede es requerida");
      esValido = false;
    }

    if (!tipoServicio) {
      setTipoServicioError("Debe seleccionar un tipo de servicio");
      esValido = false;
    }

    if (!profesional.trim()) {
      setProfesionalError("El profesional es requerido");
      esValido = false;
    }

    if (!fechaServicio) {
      setFechaServicioError("La fecha es requerida");
      esValido = false;
    }

    if (!horaServicio) {
      setHoraServicioError("La hora es requerida");
      esValido = false;
    }

    if (!motivo.trim()) {
      setMotivoError("El motivo del cambio es requerido");
      esValido = false;
    } else if (motivo.trim().length < 10) {
      setMotivoError("El motivo debe tener al menos 10 caracteres");
      esValido = false;
    }

    return esValido;
  };

  const handleGuardar = () => {
    if (!ordenEncontrada) {
      setError("Primero debes buscar una orden válida");
      return;
    }

    if (!validarCampos()) {
      return;
    }

    setMostrarModalExito(true);
  };

  const handleCancelar = () => {
    handleReiniciar();
  };

  const handleReiniciar = () => {
    setNumeroOrden("");
    setError("");
    setOrdenEncontrada(false);
    setMotivo("");
    setSede("");
    setTipoServicio("");
    setEnfasisServicio("");
    setProfesional("");
    setFechaServicio("");
    setHoraServicio("");
    setObservaciones("");
    setMostrarModalExito(false);
  };

  const handleNumeroOrdenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setNumeroOrden(value);
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-zinc-900">Ordenes de Servicio</h1>
          <span className="text-zinc-200">·</span>
          <span className="text-2xl font-semibold text-[var(--brand-blue)]">Modificar - Datos del Servicio</span>
        </div>
      </header>

      {/* Panel contenedor */}
      <section className="bg-[#f7fafc] rounded-2xl border border-zinc-200 shadow-sm p-6">
        <div className="space-y-6">
          {/* Mensaje de error */}
          {error && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-4">
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

          {/* Campo de búsqueda de orden */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <label htmlFor="buscarOrden" className="text-sm font-semibold text-zinc-900">
              No. Orden <span className="text-rose-600">*</span>
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="buscarOrden"
                type="text"
                className="flex-1 h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent disabled:bg-zinc-100 disabled:cursor-not-allowed"
                value={numeroOrden}
                onChange={handleNumeroOrdenChange}
                onKeyPress={(e) => e.key === "Enter" && handleBuscarOrden()}
                placeholder="Ingresa el número de orden"
                disabled={ordenEncontrada}
              />
              <button
                onClick={handleBuscarOrden}
                className="h-11 px-6 rounded-xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] text-sm font-semibold text-white hover:opacity-90 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                disabled={ordenEncontrada}
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Formulario editable (se muestra solo si se encontró orden) */}
          {ordenEncontrada && (
            <>
              {/* Sección: Datos del servicio editables */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold text-zinc-900">Información del Servicio</h3>

                  {/* Fila 1: Sede, Tipo de Servicio */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="sede" className="text-sm font-semibold text-zinc-900">
                        Sede <span className="text-rose-600">*</span>
                      </label>
                      <div className="mt-2 relative">
                        <select
                          id="sede"
                          className={`w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:border-transparent transition-all ${
                            sedeError
                              ? "border-rose-300 focus:ring-rose-200"
                              : "border-zinc-200 focus:ring-[var(--brand-blue)]"
                          }`}
                          value={sede}
                          onChange={(e) => {
                            setSede(e.target.value);
                            setSedeError("");
                          }}
                        >
                          <option value="">Elija...</option>
                          <option value="candelaria">Candelaria</option>
                          <option value="central">Central</option>
                          <option value="norte">Norte</option>
                          <option value="sur">Sur</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                      {sedeError && (
                        <p className="mt-1 text-xs text-rose-600">{sedeError}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="tipoServicio" className="text-sm font-semibold text-zinc-900">
                        Tipo de Servicio <span className="text-rose-600">*</span>
                      </label>
                      <div className="mt-2 relative">
                        <select
                          id="tipoServicio"
                          className={`w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:border-transparent transition-all ${
                            tipoServicioError
                              ? "border-rose-300 focus:ring-rose-200"
                              : "border-zinc-200 focus:ring-[var(--brand-blue)]"
                          }`}
                          value={tipoServicio}
                          onChange={(e) => {
                            setTipoServicio(e.target.value);
                            setTipoServicioError("");
                          }}
                        >
                          <option value="">Elija...</option>
                          <option value="valoracion">Valoración</option>
                          <option value="seguimiento">Seguimiento</option>
                          <option value="control">Control</option>
                          <option value="reevaluacion">Reevaluación</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                      {tipoServicioError && (
                        <p className="mt-1 text-xs text-rose-600">{tipoServicioError}</p>
                      )}
                    </div>
                  </div>

                  {/* Fila 2: Énfasis, Profesional */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="enfasisServicio" className="text-sm font-semibold text-zinc-900">
                        Énfasis del Servicio
                      </label>
                      <div className="mt-2 relative">
                        <select
                          id="enfasisServicio"
                          className="w-full h-11 rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                          value={enfasisServicio}
                          onChange={(e) => setEnfasisServicio(e.target.value)}
                        >
                          <option value="">Elija...</option>
                          <option value="medicina_ocupacional">Medicina Ocupacional</option>
                          <option value="higiene">Higiene</option>
                          <option value="seguridad">Seguridad</option>
                          <option value="psicologia">Psicología</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="profesional" className="text-sm font-semibold text-zinc-900">
                        Profesional <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="profesional"
                        type="text"
                        className={`mt-2 w-full h-11 rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:border-transparent transition-all ${
                          profesionalError
                            ? "border-rose-300 focus:ring-rose-200"
                            : "border-zinc-200 focus:ring-[var(--brand-blue)]"
                        }`}
                        value={profesional}
                        onChange={(e) => {
                          setProfesional(e.target.value);
                          setProfesionalError("");
                        }}
                      />
                      {profesionalError && (
                        <p className="mt-1 text-xs text-rose-600">{profesionalError}</p>
                      )}
                    </div>
                  </div>

                  {/* Fila 3: Fecha, Hora */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fechaServicio" className="text-sm font-semibold text-zinc-900">
                        Fecha <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="fechaServicio"
                        type="date"
                        className={`mt-2 w-full h-11 rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:border-transparent transition-all ${
                          fechaServicioError
                            ? "border-rose-300 focus:ring-rose-200"
                            : "border-zinc-200 focus:ring-[var(--brand-blue)]"
                        }`}
                        value={fechaServicio}
                        onChange={(e) => {
                          setFechaServicio(e.target.value);
                          setFechaServicioError("");
                        }}
                      />
                      {fechaServicioError && (
                        <p className="mt-1 text-xs text-rose-600">{fechaServicioError}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="horaServicio" className="text-sm font-semibold text-zinc-900">
                        Hora <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="horaServicio"
                        type="time"
                        className={`mt-2 w-full h-11 rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:border-transparent transition-all ${
                          horaServicioError
                            ? "border-rose-300 focus:ring-rose-200"
                            : "border-zinc-200 focus:ring-[var(--brand-blue)]"
                        }`}
                        value={horaServicio}
                        onChange={(e) => {
                          setHoraServicio(e.target.value);
                          setHoraServicioError("");
                        }}
                      />
                      {horaServicioError && (
                        <p className="mt-1 text-xs text-rose-600">{horaServicioError}</p>
                      )}
                    </div>
                  </div>

                  {/* Observaciones */}
                  <div>
                    <label htmlFor="observaciones" className="text-sm font-semibold text-zinc-900">
                      Observaciones
                    </label>
                    <textarea
                      id="observaciones"
                      maxLength={500}
                      className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent min-h-[100px]"
                      value={observaciones}
                      onChange={(e) => setObservaciones(e.target.value)}
                      placeholder="Detalles del servicio o requerimientos especiales"
                    />
                    <div className="mt-1 text-xs text-zinc-500">{observaciones.length}/500</div>
                  </div>

                  {/* Motivo del cambio */}
                  <div>
                    <label htmlFor="motivo" className="text-sm font-semibold text-zinc-900">
                      Motivo del Cambio <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      id="motivo"
                      maxLength={255}
                      className={`mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:border-transparent transition-all min-h-[100px] ${
                        motivoError
                          ? "border-rose-300 focus:ring-rose-200"
                          : "border-zinc-200 focus:ring-[var(--brand-blue)]"
                      }`}
                      value={motivo}
                      onChange={(e) => {
                        setMotivo(e.target.value);
                        setMotivoError("");
                      }}
                      placeholder="Describe el motivo de la modificación"
                    />
                    {motivoError && (
                      <p className="mt-1 text-xs text-rose-600">{motivoError}</p>
                    )}
                    <div className="mt-1 text-xs text-zinc-500">{motivo.length}/255</div>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="mt-8 flex flex-wrap gap-3 justify-end">
                <button
                  onClick={handleCancelar}
                  className="rounded-xl border border-zinc-300 bg-white px-8 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-all"
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGuardar}
                  className="rounded-xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] px-8 py-2.5 text-sm font-semibold text-white hover:opacity-90 shadow-md transition-all"
                  type="button"
                >
                  Guardar Cambios
                </button>
              </div>
            </>
          )}
        </div>
      </section>

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
                Los datos del servicio se han actualizado exitosamente.
              </p>
              <button
                onClick={handleReiniciar}
                className="w-full rounded-xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] px-6 py-3 text-base font-semibold text-white hover:opacity-90 shadow-md transition-all"
                type="button"
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
