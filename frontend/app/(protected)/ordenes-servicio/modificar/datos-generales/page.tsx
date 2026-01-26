"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ModificarDatosGeneralesPage() {
  const router = useRouter();
  
  const [numeroOrden, setNumeroOrden] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [ordenEncontrada, setOrdenEncontrada] = useState(false);
  const [motivo, setMotivo] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Estados para campos editables
  const [direccion, setDireccion] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [discapacidad, setDiscapacidad] = useState<string>("");
  const [certificadoDiscapacidad, setCertificadoDiscapacidad] = useState<string>("no");
  const [eps, setEps] = useState<string>("");
  const [arl, setArl] = useState<string>("");
  const [afp, setAfp] = useState<string>("");
  const [empresaConvenio, setEmpresaConvenio] = useState<string>("");
  const [empresaUsuaria, setEmpresaUsuaria] = useState<string>("");
  const [empresaIgual, setEmpresaIgual] = useState<boolean>(false);

  // Estados para errores de cada campo
  const [errorDireccion, setErrorDireccion] = useState<string>("");
  const [errorTelefono, setErrorTelefono] = useState<string>("");
  const [errorEps, setErrorEps] = useState<string>("");
  const [errorArl, setErrorArl] = useState<string>("");
  const [errorAfp, setErrorAfp] = useState<string>("");
  const [errorEmpresaConvenio, setErrorEmpresaConvenio] = useState<string>("");
  const [errorEmpresaUsuaria, setErrorEmpresaUsuaria] = useState<string>("");
  const [errorMotivo, setErrorMotivo] = useState<string>("");

  // Datos de solo lectura (se cargarían desde BD)
  const [datosOrden, setDatosOrden] = useState({
    numeroOrden: "",
    estado: "",
    fechaSolicitud: "",
    realizadoEn: "",
    atendidoPor: "",
    tipoEvaluacion: "",
    enfasisEvaluacion: "",
    trabajador: "",
    sexo: "",
    edad: ""
  });

  const limpiarErroresCampos = () => {
    setErrorDireccion("");
    setErrorTelefono("");
    setErrorEps("");
    setErrorArl("");
    setErrorAfp("");
    setErrorEmpresaConvenio("");
    setErrorEmpresaUsuaria("");
    setErrorMotivo("");
  };

  const validarCampos = (): boolean => {
    limpiarErroresCampos();
    let esValido = true;

    // Validar dirección
    if (direccion.trim() && direccion.trim().length < 5) {
      setErrorDireccion("La dirección debe tener al menos 5 caracteres");
      esValido = false;
    }

    // Validar teléfono
    if (telefono.trim() && telefono.trim().length < 7) {
      setErrorTelefono("El teléfono debe tener al menos 7 dígitos");
      esValido = false;
    }

    // Validar EPS
    if (!eps.trim()) {
      setErrorEps("Debes seleccionar una EPS");
      esValido = false;
    }

    // Validar ARL
    if (!arl.trim()) {
      setErrorArl("Debes seleccionar una ARL");
      esValido = false;
    }

    // Validar AFP
    if (!afp.trim()) {
      setErrorAfp("Debes seleccionar una AFP");
      esValido = false;
    }

    // Validar Empresa/Convenio
    if (!empresaConvenio.trim()) {
      setErrorEmpresaConvenio("Debes ingresar la empresa o convenio");
      esValido = false;
    }

    // Validar Empresa Usuaria
    if (!empresaUsuaria.trim() && !empresaIgual) {
      setErrorEmpresaUsuaria("Debes ingresar la empresa usuaria");
      esValido = false;
    }

    // Validar motivo
    if (!motivo.trim()) {
      setErrorMotivo("Debes ingresar el motivo del cambio");
      esValido = false;
    } else if (motivo.trim().length < 10) {
      setErrorMotivo("El motivo debe tener al menos 10 caracteres");
      esValido = false;
    }

    return esValido;
  };

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

    // Aquí se conectará a BD - por ahora simulamos que encuentra
    setOrdenEncontrada(true);
    // Los datos se cargarán desde la BD cuando esté lista
  };

  const handleGuardar = () => {
    if (!ordenEncontrada) {
      setError("Primero debes buscar una orden válida");
      return;
    }

    if (!validarCampos()) {
      setError("Por favor corrige los errores en los campos marcados");
      return;
    }

    // Aquí se guardarán los cambios en la BD
    setShowSuccessModal(true);
  };

  const handleCancelar = () => {
    router.push("/ordenes-servicio/modificar/datos-generales");
    handleReiniciar();
  };

  const handleReiniciar = () => {
    setNumeroOrden("");
    setError("");
    setOrdenEncontrada(false);
    setMotivo("");
    setDireccion("");
    setTelefono("");
    setDiscapacidad("");
    setCertificadoDiscapacidad("no");
    setEps("");
    setArl("");
    setAfp("");
    setEmpresaConvenio("");
    setEmpresaUsuaria("");
    setEmpresaIgual(false);
    limpiarErroresCampos();
    setDatosOrden({
      numeroOrden: "",
      estado: "",
      fechaSolicitud: "",
      realizadoEn: "",
      atendidoPor: "",
      tipoEvaluacion: "",
      enfasisEvaluacion: "",
      trabajador: "",
      sexo: "",
      edad: ""
    });
  };

  const handleConfirmarExito = () => {
    setShowSuccessModal(false);
    handleReiniciar();
  };

  const handleNumeroOrdenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Solo números
    setNumeroOrden(value);
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

      {/* Panel contenedor */}
      <section className="bg-[#f7fafc] rounded-2xl border border-zinc-200 shadow-sm p-6">
        <div className="space-y-6">
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

          {/* Campo de búsqueda de orden */}
          <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6">
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

          {/* Información de la orden (se muestra solo si se encontró) */}
          {ordenEncontrada && (
            <>
              {/* Sección 1: Información general de la orden */}
              <div className="mb-6 rounded-xl border border-zinc-200 bg-white p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 mb-1">Orden Servicio No.</p>
                    <p className="text-base text-zinc-900">Datos desde la BD</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 mb-1">Fecha Solicitud</p>
                    <p className="text-base text-zinc-900">Datos desde la BD</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 mb-1">Realizado en</p>
                    <p className="text-base text-zinc-900">Datos desde la BD</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 mb-1">Atendido por</p>
                    <p className="text-base text-zinc-900">Datos desde la BD</p>
                  </div>
                </div>
              </div>

              {/* Sección 2: Tipo y énfasis de evaluación */}
              <div className="mb-6 rounded-xl border border-zinc-200 bg-white p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 mb-1">Tipo de Evaluación</p>
                    <p className="text-base text-zinc-900">Datos desde la BD</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 mb-1">Énfasis Evaluación</p>
                    <p className="text-base text-zinc-900">Datos desde la BD</p>
                  </div>
                </div>
              </div>

              {/* Sección 3: Datos del trabajador */}
              <div className="mb-6 rounded-xl border border-zinc-200 bg-white p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 mb-1">Trabajador</p>
                    <p className="text-base text-zinc-900">Datos desde la BD</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 mb-1">Sexo</p>
                    <p className="text-base text-zinc-900">Datos desde la BD</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 mb-1">Edad</p>
                    <p className="text-base text-zinc-900">Datos desde la BD</p>
                  </div>
                </div>

                {/* Campos editables - Fila 1: Dirección y Teléfono */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="direccion" className="text-sm font-semibold text-zinc-900">
                      Dirección
                    </label>
                    <input
                      id="direccion"
                      type="text"
                      className={`mt-2 w-full h-11 rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent ${
                        errorDireccion ? "border-rose-500" : "border-zinc-200"
                      }`}
                      value={direccion}
                      onChange={(e) => {
                        setDireccion(e.target.value);
                        setErrorDireccion("");
                      }}
                    />
                    {errorDireccion && (
                      <p className="text-xs text-rose-600 mt-1">{errorDireccion}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="telefono" className="text-sm font-semibold text-zinc-900">
                      Teléfono
                    </label>
                    <input
                      id="telefono"
                      type="tel"
                      className={`mt-2 w-full h-11 rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent ${
                        errorTelefono ? "border-rose-500" : "border-zinc-200"
                      }`}
                      value={telefono}
                      onChange={(e) => {
                        setTelefono(e.target.value.replace(/\D/g, ""));
                        setErrorTelefono("");
                      }}
                    />
                    {errorTelefono && (
                      <p className="text-xs text-rose-600 mt-1">{errorTelefono}</p>
                    )}
                  </div>
                </div>

                {/* Fila 2: Discapacidad y Certificado */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="discapacidad" className="text-sm font-semibold text-zinc-900">
                      Discapacidad
                    </label>
                    <div className="mt-2 relative">
                      <select
                        id="discapacidad"
                        className="w-full h-11 rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                        value={discapacidad}
                        onChange={(e) => setDiscapacidad(e.target.value)}
                      >
                        <option value="">Elija...</option>
                        <option value="sin_discapacidad">Sin Discapacidad</option>
                        <option value="visual">Visual</option>
                        <option value="auditiva">Auditiva</option>
                        <option value="fisica">Física</option>
                        <option value="mental">Mental</option>
                        <option value="multiple">Múltiple</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-zinc-900 mb-2 block">
                      Tiene certificado de discapacidad?
                    </label>
                    <div className="flex items-center gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="certificadoDiscapacidad"
                          value="si"
                          checked={certificadoDiscapacidad === "si"}
                          onChange={(e) => setCertificadoDiscapacidad(e.target.value)}
                          className="w-4 h-4 text-[var(--brand-blue)]"
                        />
                        <span className="text-sm text-zinc-900">Sí</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="certificadoDiscapacidad"
                          value="no"
                          checked={certificadoDiscapacidad === "no"}
                          onChange={(e) => setCertificadoDiscapacidad(e.target.value)}
                          className="w-4 h-4 text-[var(--brand-blue)]"
                        />
                        <span className="text-sm text-zinc-900">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Fila 3: EPS, ARL, AFP, Empresa/Convenio */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div>
                    <label htmlFor="eps" className="text-sm font-semibold text-zinc-900">
                      EPS <span className="text-rose-600">*</span>
                    </label>
                    <div className="mt-2 relative">
                      <select
                        id="eps"
                        className={`w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent ${
                          errorEps ? "border-rose-500" : "border-zinc-200"
                        }`}
                        value={eps}
                        onChange={(e) => {
                          setEps(e.target.value);
                          setErrorEps("");
                        }}
                      >
                        <option value="">Elija...</option>
                        <option value="nueva_eps">Nueva EPS</option>
                        <option value="sanitas">Sanitas</option>
                        <option value="compensar">Compensar</option>
                        <option value="sura">Sura</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    {errorEps && (
                      <p className="text-xs text-rose-600 mt-1">{errorEps}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="arl" className="text-sm font-semibold text-zinc-900">
                      ARL <span className="text-rose-600">*</span>
                    </label>
                    <div className="mt-2 relative">
                      <select
                        id="arl"
                        className={`w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent ${
                          errorArl ? "border-rose-500" : "border-zinc-200"
                        }`}
                        value={arl}
                        onChange={(e) => {
                          setArl(e.target.value);
                          setErrorArl("");
                        }}
                      >
                        <option value="">Elija...</option>
                        <option value="positiva">Positiva</option>
                        <option value="sura">Sura</option>
                        <option value="axa_colpatria">AXA Colpatria</option>
                        <option value="bolivar">Bolívar</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    {errorArl && (
                      <p className="text-xs text-rose-600 mt-1">{errorArl}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="afp" className="text-sm font-semibold text-zinc-900">
                      AFP <span className="text-rose-600">*</span>
                    </label>
                    <div className="mt-2 relative">
                      <select
                        id="afp"
                        className={`w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent ${
                          errorAfp ? "border-rose-500" : "border-zinc-200"
                        }`}
                        value={afp}
                        onChange={(e) => {
                          setAfp(e.target.value);
                          setErrorAfp("");
                        }}
                      >
                        <option value="">Elija...</option>
                        <option value="porvenir">Porvenir</option>
                        <option value="proteccion">Protección</option>
                        <option value="colfondos">Colfondos</option>
                        <option value="old_mutual">Old Mutual</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    {errorAfp && (
                      <p className="text-xs text-rose-600 mt-1">{errorAfp}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="empresaConvenio" className="text-sm font-semibold text-zinc-900">
                      Empresa/Convenio <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="empresaConvenio"
                      type="text"
                      className={`mt-2 w-full h-11 rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent ${
                        errorEmpresaConvenio ? "border-rose-500" : "border-zinc-200"
                      }`}
                      value={empresaConvenio}
                      onChange={(e) => {
                        setEmpresaConvenio(e.target.value);
                        setErrorEmpresaConvenio("");
                        if (empresaIgual) {
                          setEmpresaUsuaria(e.target.value);
                        }
                      }}
                    />
                    {errorEmpresaConvenio && (
                      <p className="text-xs text-rose-600 mt-1">{errorEmpresaConvenio}</p>
                    )}
                  </div>
                </div>

                {/* Empresa Usuaria - Full Width */}
                <div className="mb-6">
                  <label htmlFor="empresaUsuaria" className="text-sm font-semibold text-zinc-900">
                    Empresa Usuaria <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="empresaUsuaria"
                    type="text"
                    className={`mt-2 w-full h-11 rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent ${
                      errorEmpresaUsuaria ? "border-rose-500" : "border-zinc-200"
                    }`}
                    value={empresaUsuaria}
                    onChange={(e) => {
                      setEmpresaUsuaria(e.target.value);
                      setErrorEmpresaUsuaria("");
                    }}
                    disabled={empresaIgual}
                  />
                  {errorEmpresaUsuaria && (
                    <p className="text-xs text-rose-600 mt-1">{errorEmpresaUsuaria}</p>
                  )}
                  <label className="mt-2 flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={empresaIgual}
                      onChange={(e) => {
                        setEmpresaIgual(e.target.checked);
                        if (e.target.checked) {
                          setEmpresaUsuaria(empresaConvenio);
                          setErrorEmpresaUsuaria("");
                        }
                      }}
                      className="w-4 h-4 text-[var(--brand-blue)]"
                    />
                    <span className="text-xs text-zinc-600">La empresa usuaria es igual a la empresa del convenio</span>
                  </label>
                </div>
              </div>

              {/* Motivo del cambio - Full Width */}
              <div className="mb-6">
                <label htmlFor="motivo" className="text-sm font-semibold text-zinc-900">
                  Motivo Cambio de datos en Orden de Servicio <span className="text-rose-600">*</span>
                </label>
                <textarea
                  id="motivo"
                  maxLength={255}
                  className={`mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent min-h-[100px] ${
                    errorMotivo ? "border-rose-500" : "border-zinc-200"
                  }`}
                  value={motivo}
                  onChange={(e) => {
                    setMotivo(e.target.value);
                    setErrorMotivo("");
                  }}
                  placeholder="Describe el motivo de la modificación"
                />
                {errorMotivo && (
                  <p className="text-xs text-rose-600 mt-1">{errorMotivo}</p>
                )}
                <div className="mt-1 text-xs text-zinc-500">{motivo.length}/255</div>
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
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-2">¡Cambios Guardados!</h3>
              <p className="text-zinc-600 mb-6">
                Los datos de la orden se han actualizado exitosamente.
              </p>
              <button
                onClick={handleConfirmarExito}
                className="w-full rounded-xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 shadow-md transition-all"
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
