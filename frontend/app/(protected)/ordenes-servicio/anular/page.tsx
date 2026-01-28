"use client";


import { useState } from "react";

export default function AnularOrdenPage() {
  const [numeroOrden, setNumeroOrden] = useState("");
  // Estado para los datos de la orden, inicialmente vacío
  const [orden, setOrden] = useState<any>(null);
  const [buscado, setBuscado] = useState(false);

  // Modal de confirmación
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [anulacionExitosa, setAnulacionExitosa] = useState(false);
  const [motivoAnulacion, setMotivoAnulacion] = useState("");
  const [motivoError, setMotivoError] = useState("");

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    setBuscado(true);
    // Aquí se debe consultar la BD y setOrden con los datos reales
    setOrden(null); // Por ahora no hay datos
  };

  const handleAbrirModal = () => {
    setConfirmText("");
    setModalOpen(true);
  };

  const handleCerrarModal = () => {
    setModalOpen(false);
    setConfirmText("");
  };

  const handleAnularOrden = () => {
    if (!motivoAnulacion.trim()) {
      setMotivoError("El motivo de anulación es obligatorio.");
      setModalOpen(false);
      return;
    }
    // Aquí se realizaría la lógica real de anulación en la BD
    // TODO: Implementar petición real de borrado de la orden
    setAnulacionExitosa(true);
    setModalOpen(false);
    setMotivoError("");
    // Ocultar la orden visualmente
    setBuscado(false);
    setOrden(null);
    setNumeroOrden("");
    setMotivoAnulacion("");
  };

  // Datos de ejemplo para mostrar la estructura visual (puedes reemplazar por datos reales de la BD)
  // Datos visuales por defecto (se reemplazarán por datos de la BD)
  const datosVisuales = {
    numero: "--",
    estado: "--",
    fechaSolicitud: "--",
    tipoEvaluacion: "--",
    enfasis: "--",
    sede: "--",
    atendidoPor: "--",
    trabajador: {
      nombre: "--",
      documento: "--",
      sexo: "--",
      telefono: "--",
      edad: "--",
      direccion: "--",
      email: "--",
    },
    empresa: "--",
    empresaUsuaria: "--",
    examenes: [
      { no: 1, nombre: "--", fecha: "--" },
      { no: 2, nombre: "--", fecha: "--" },
      { no: 3, nombre: "--", fecha: "--" },
      { no: 4, nombre: "--", fecha: "--" },
    ],
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-zinc-900">Ordenes de Servicio</h1>
          <span className="text-zinc-200">·</span>
          <span className="text-2xl font-semibold text-[var(--brand-blue)]">Modificar - Datos Generales</span>
        </div>
      </header>

      <section className="bg-[#f7fafc] rounded-2xl border border-zinc-200 shadow-sm p-6">
        <form onSubmit={handleBuscar} className="rounded-2xl border border-zinc-200 bg-white p-6">
          <label htmlFor="numeroOrden" className="text-sm font-semibold text-zinc-900">
            No. Orden <span className="text-rose-600">*</span>
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id="numeroOrden"
              name="numeroOrden"
              type="text"
              className="flex-1 h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent bg-[#f7fafc]"
              placeholder=""
              required
              value={numeroOrden}
              onChange={e => setNumeroOrden(e.target.value)}
            />
            <button
              className="h-11 px-6 rounded-xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] text-sm font-semibold text-white hover:opacity-90 shadow-md transition-all"
              type="submit"
            >
              Buscar
            </button>
          </div>
        </form>
      </section>

      {/* Detalles de la orden, solo estructura, sin datos quemados */}
      {buscado && (
        <div className="space-y-6">
          {/* Datos generales */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-bold mb-1">Orden Servicio No.</div>
              <div className="text-zinc-700"><span className="font-bold">{datosVisuales.numero}</span> - {datosVisuales.estado}</div>
              <div className="font-bold mt-4 mb-1">Realizado en</div>
              <div className="text-zinc-700">{datosVisuales.sede}</div>
            </div>
            <div>
              <div className="font-bold mb-1">Fecha Solicitud</div>
              <div className="text-zinc-700">{datosVisuales.fechaSolicitud}</div>
              <div className="font-bold mt-4 mb-1">Atendido por</div>
              <div className="text-zinc-700">{datosVisuales.atendidoPor}</div>
            </div>
          </div>
          {/* Tipo y énfasis */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-bold mb-1">Tipo de Evaluación</div>
              <div className="text-zinc-700">{datosVisuales.tipoEvaluacion}</div>
              <div className="font-bold mt-4 mb-1">Énfasis Evaluación</div>
              <div className="text-zinc-700">{datosVisuales.enfasis}</div>
            </div>
          </div>
          {/* Trabajador y empresa */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-bold mb-1">Trabajador</div>
              <div className="text-zinc-700">{datosVisuales.trabajador.documento} - {datosVisuales.trabajador.nombre}</div>
              <div className="font-bold mt-4 mb-1">Sexo</div>
              <div className="text-zinc-700">{datosVisuales.trabajador.sexo}</div>
              <div className="font-bold mt-4 mb-1">Teléfono</div>
              <div className="text-zinc-700">{datosVisuales.trabajador.telefono}</div>
            </div>
            <div>
              <div className="font-bold mb-1">Edad</div>
              <div className="text-zinc-700">{datosVisuales.trabajador.edad}</div>
              <div className="font-bold mt-4 mb-1">Dirección</div>
              <div className="text-zinc-700">{datosVisuales.trabajador.direccion}</div>
              <div className="font-bold mt-4 mb-1">e-Mail</div>
              <div className="text-zinc-700">{datosVisuales.trabajador.email || <span className="text-zinc-400">No disponible</span>}</div>
            </div>
          </div>
          {/* Empresa */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-bold mb-1">Empresa/Convenio</div>
              <div className="text-zinc-700">{datosVisuales.empresa}</div>
            </div>
            <div>
              <div className="font-bold mb-1">Empresa Usuaria</div>
              <div className="text-zinc-700">{datosVisuales.empresaUsuaria}</div>
            </div>
          </div>
          {/* Exámenes a realizar */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="font-bold mb-3">Exámenes a Realizar</div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-zinc-200">
                <thead>
                  <tr className="bg-zinc-200 text-zinc-700">
                    <th className="px-3 py-2 text-left font-bold">No.</th>
                    <th className="px-3 py-2 text-left font-bold">Exámenes a Realizar</th>
                    <th className="px-3 py-2 text-left font-bold">Fecha Atención</th>
                  </tr>
                </thead>
                <tbody>
                  {datosVisuales.examenes.map((ex) => (
                    <tr key={ex.no} className="border-b border-zinc-100">
                      <td className="px-3 py-2">{ex.no}</td>
                      <td className="px-3 py-2">{ex.nombre}</td>
                      <td className="px-3 py-2">{ex.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Motivo anulación */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <label htmlFor="motivoAnulacion" className="font-bold mb-2 block">Motivo Anulación <span className="text-rose-600">*</span></label>
            <textarea
              id="motivoAnulacion"
              maxLength={255}
              className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent min-h-[90px]"
              placeholder=""
              value={motivoAnulacion}
              onChange={e => setMotivoAnulacion(e.target.value)}
            />
            <div className="mt-1 text-xs text-zinc-500">{motivoAnulacion.length}/255</div>
            {motivoError && (
              <div className="mt-2 text-sm text-red-600 font-semibold">{motivoError}</div>
            )}
            <div className="flex gap-4 mt-4">
              <button
                type="button"
                className="h-11 px-8 rounded-xl bg-cyan-500 text-white font-bold shadow-md hover:bg-cyan-600 transition-all"
                onClick={handleAbrirModal}
              >
                Anular Orden de Servicio
              </button>
              <button type="button" className="h-11 px-8 rounded-xl border border-zinc-200 text-zinc-700 font-bold shadow-md bg-white hover:bg-zinc-50 transition-all">Otra Orden</button>
            </div>
          </div>
              {/* Modal de confirmación ELIMINAR */}
              {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black/55 flex items-center justify-center">
                  <div className="bg-white rounded-2xl shadow-2xl border border-zinc-200 max-w-md w-full p-8 animate-slideUp">
                    <h2 className="text-xl font-bold text-zinc-900 mb-4">Confirmar Anulación</h2>
                    <p className="mb-4 text-zinc-700">Para anular la orden de servicio, escribe <span className="font-bold text-rose-600">ELIMINAR</span> en el campo de abajo y confirma la acción. Esta operación es irreversible.</p>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xl border border-zinc-200 px-3 text-lg outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent mb-4"
                      placeholder="Escribe ELIMINAR para confirmar"
                      value={confirmText}
                      onChange={e => setConfirmText(e.target.value)}
                      autoFocus
                    />
                    <div className="flex gap-3 justify-end">
                      <button
                        type="button"
                        className="h-10 px-6 rounded-lg border border-zinc-300 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
                        onClick={handleCerrarModal}
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className={`h-10 px-6 rounded-lg text-white text-sm font-semibold bg-gradient-to-r from-rose-600 to-rose-400 hover:shadow-md transition-all ${confirmText !== 'ELIMINAR' ? 'opacity-60 cursor-not-allowed' : ''}`}
                        disabled={confirmText !== 'ELIMINAR'}
                        onClick={handleAnularOrden}
                      >
                        Confirmar Anulación
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal de éxito */}
              {anulacionExitosa && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-zinc-900 mb-3">¡Orden Anulada!</h3>
                      <p className="text-base text-zinc-600 mb-8">
                        La orden de servicio ha sido anulada exitosamente.
                      </p>
                      <button
                        onClick={() => setAnulacionExitosa(false)}
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
      )}
    </div>
  );
}
