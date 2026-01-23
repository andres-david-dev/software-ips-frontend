"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type TipoIdentificacion =
  | "CC"
  | "CE"
  | "PA"
  | "PEP"
  | "PPT"
  | "RC"
  | "TI";

type SexoBiologico = "F" | "I" | "M";
type IdentidadGenero = "F" | "M" | "T" | "N" | "ND";
type TipoSangre = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "DESC";
type EstadoCivil = "CAS" | "DIV" | "SEP" | "SOL" | "UL" | "VIU";

type Paso1Data = {
  tipoIdentificacion: TipoIdentificacion | "";
  numeroIdentificacion: string;
};

type Paso2Data = {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  sexoBiologico: SexoBiologico | "";
  identidadGenero: IdentidadGenero | "";
  fechaNacimiento: string;
  tipoSangre: TipoSangre | "";
  grupoEtnico: string;
  nivelEstudios: string;
  ocupacion: string;
  estadoCivil: EstadoCivil | "";
};

type CiuoOcupacion = { codigo: string; nombre: string };
type CiuoSubgrupo = { codigo: string; nombre: string; ocupaciones?: CiuoOcupacion[] };
type CiuoSubgrupoPrincipal = { codigo: string; nombre: string; subgrupos?: CiuoSubgrupo[] };
type CiuoGrupo = { codigo: string; nombre: string; subgrupos_principales?: CiuoSubgrupoPrincipal[] };

type CiuoEntry = {
  codigo: string;
  nombre: string;
  label: string;
  search: string;
};

function normalizeCiuo(data: unknown): CiuoGrupo[] {
  let candidate: unknown = data;

  if (candidate && typeof candidate === "object" && "default" in (candidate as object)) {
    candidate = (candidate as { default?: unknown }).default;
  }

  if (typeof candidate === "string") {
    try {
      candidate = JSON.parse(candidate) as unknown;
    } catch {
      return [];
    }
  }

  if (Array.isArray(candidate)) return candidate as CiuoGrupo[];

  if (candidate && typeof candidate === "object") {
    const maybeData = (candidate as { data?: unknown }).data;
    if (Array.isArray(maybeData)) return maybeData as CiuoGrupo[];
    const maybeCiuo = (candidate as { ciuo?: unknown }).ciuo;
    if (Array.isArray(maybeCiuo)) return maybeCiuo as CiuoGrupo[];
  }

  return [];
}

function buildCiuoEntries(data: unknown): CiuoEntry[] {
  const normalized = normalizeCiuo(data);
  const map = new Map<string, CiuoEntry>();

  const addEntry = (codigo: string, nombre: string) => {
    if (!codigo || !nombre) return;
    const label = `${codigo} - ${nombre}`;
    const search = `${codigo} ${nombre}`.toLowerCase();
    if (!map.has(label)) {
      map.set(label, { codigo, nombre, label, search });
    }
  };

  normalized.forEach((grupo) => {
    addEntry(grupo.codigo, grupo.nombre);
    grupo.subgrupos_principales?.forEach((sp) => {
      addEntry(sp.codigo, sp.nombre);
      sp.subgrupos?.forEach((sg) => {
        addEntry(sg.codigo, sg.nombre);
        sg.ocupaciones?.forEach((oc) => {
          addEntry(oc.codigo, oc.nombre);
        });
      });
    });
  });

  return Array.from(map.values()).sort((a, b) => a.codigo.localeCompare(b.codigo));
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function IconClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPlusCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 8v8M8 12h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function Stepper({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  const steps = [
    { n: 1 as const, title: "Paso 1", subtitle: "Identificación de usuario" },
    { n: 2 as const, title: "Paso 2", subtitle: "Información de la orden de servicio" },
    { n: 3 as const, title: "Paso 3", subtitle: "Asignación de citas" },
  ];

  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-5 h-[2px] bg-zinc-200" />
      <div className="grid grid-cols-3 gap-4">
        {steps.map((s) => {
          const isDone = s.n < currentStep;
          const isActive = s.n === currentStep;
          return (
            <div key={s.n} className="relative flex flex-col items-center text-center">
              <div
                className={cn(
                  "z-10 flex items-center justify-center h-10 w-10 rounded-full border-2 bg-white",
                  (isActive || isDone) && "border-[var(--brand-blue)]",
                  !isActive && !isDone && "border-zinc-300",
                )}
              >
                <span
                  className={cn(
                    "text-sm font-semibold",
                    (isActive || isDone) && "text-[var(--brand-blue)]",
                    !isActive && !isDone && "text-zinc-400",
                  )}
                >
                  {s.n}
                </span>
              </div>
              <div className="mt-2">
                <div
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wide",
                    isActive ? "text-zinc-900" : "text-zinc-400",
                  )}
                >
                  {s.title}
                </div>
                <div className={cn("text-xs", isActive ? "text-zinc-700" : "text-zinc-400")}>{s.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Paso2Form({
  data,
  paso1,
  touched,
  onBack,
  onCancel,
  onChange,
  onSubmit,
}: {
  data: Paso2Data;
  paso1: Paso1Data;
  touched: boolean;
  onBack: () => void;
  onCancel: () => void;
  onChange: (data: Paso2Data) => void;
  onSubmit: () => void;
}) {
  const sexoBiologicoOpts = useMemo(
    () => [
      { value: "F" as const, label: "Femenino" },
      { value: "I" as const, label: "Indeterminado/Intersexual" },
      { value: "M" as const, label: "Masculino" },
    ],
    [],
  );

  const identidadGeneroOpts = useMemo(
    () => [
      { value: "F" as const, label: "Femenino" },
      { value: "M" as const, label: "Masculino" },
      { value: "T" as const, label: "Transgénero" },
      { value: "N" as const, label: "Neutro" },
      { value: "ND" as const, label: "No declara" },
    ],
    [],
  );

  const tipoSangreOpts = useMemo(
    () => [
      { value: "A+" as const, label: "A+" },
      { value: "A-" as const, label: "A-" },
      { value: "B+" as const, label: "B+" },
      { value: "B-" as const, label: "B-" },
      { value: "AB+" as const, label: "AB+" },
      { value: "AB-" as const, label: "AB-" },
      { value: "O+" as const, label: "O+" },
      { value: "O-" as const, label: "O-" },
      { value: "DESC" as const, label: "Desconoce" },
    ],
    [],
  );

  const estadoCivilOpts = useMemo(
    () => [
      { value: "CAS" as const, label: "Casado" },
      { value: "DIV" as const, label: "Divorciado" },
      { value: "SEP" as const, label: "Separado" },
      { value: "SOL" as const, label: "Soltero" },
      { value: "UL" as const, label: "Unión Libre" },
      { value: "VIU" as const, label: "Viudo" },
    ],
    [],
  );
  const [ocupacionOptions, setOcupacionOptions] = useState<CiuoEntry[]>([]);
  const [ocupacionOpen, setOcupacionOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch("/data/ciuo08.json")
      .then((res) => (res.ok ? res.json() : []))
      .then((json) => {
        if (!isMounted) return;
        const list = buildCiuoEntries(json);
        setOcupacionOptions(list);
      })
      .catch(() => {
        if (isMounted) setOcupacionOptions([]);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const ocupacionQuery = data.ocupacion.trim().toLowerCase();
  const filteredOcupaciones = useMemo(() => {
    if (ocupacionOptions.length === 0) return [];
    if (!ocupacionQuery) return ocupacionOptions.slice(0, 20);
    return ocupacionOptions.filter((opt) => opt.search.includes(ocupacionQuery)).slice(0, 20);
  }, [ocupacionOptions, ocupacionQuery]);

  return (
    <div className="mt-6 rounded-2xl border border-zinc-200 bg-white">
      <div className="px-5 py-4 border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">Paso 2</h2>
            <p className="mt-1 text-sm text-zinc-600">Información de la orden de servicio</p>
          </div>
          <div className="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
            {data.primerNombre ? `${data.primerNombre} ${data.primerApellido}` : "Sin nombre"}
          </div>
        </div>
      </div>

      <form
        className="p-5"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {/* Identificación (read-only display) */}
        <div className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">No. Identificación</div>
          <div className="text-sm font-mono text-zinc-900">
            {paso1.tipoIdentificacion || "—"} {paso1.numeroIdentificacion || ""}
          </div>
        </div>

        {/* Nombres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label htmlFor="primerNombre" className="text-sm font-semibold text-zinc-900">
              Primer Nombre <span className="text-rose-600">*</span>
            </label>
            <input
              id="primerNombre"
              type="text"
              placeholder="Ingresa primer nombre"
              value={data.primerNombre}
              onChange={(e) => onChange({ ...data, primerNombre: e.target.value })}
              className={cn(
                "mt-2 w-full h-11 rounded-xl border px-3 text-sm outline-none",
                "focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                touched && data.primerNombre.trim().length < 2 ? "border-rose-300" : "border-zinc-200",
              )}
            />
          </div>

          <div>
            <label htmlFor="segundoNombre" className="text-sm font-semibold text-zinc-900">
              Segundo Nombre
            </label>
            <input
              id="segundoNombre"
              type="text"
              placeholder="Opcional"
              value={data.segundoNombre}
              onChange={(e) => onChange({ ...data, segundoNombre: e.target.value })}
              className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="primerApellido" className="text-sm font-semibold text-zinc-900">
              Primer Apellido <span className="text-rose-600">*</span>
            </label>
            <input
              id="primerApellido"
              type="text"
              placeholder="Ingresa primer apellido"
              value={data.primerApellido}
              onChange={(e) => onChange({ ...data, primerApellido: e.target.value })}
              className={cn(
                "mt-2 w-full h-11 rounded-xl border px-3 text-sm outline-none",
                "focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                touched && data.primerApellido.trim().length < 2 ? "border-rose-300" : "border-zinc-200",
              )}
            />
          </div>

          <div>
            <label htmlFor="segundoApellido" className="text-sm font-semibold text-zinc-900">
              Segundo Apellido
            </label>
            <input
              id="segundoApellido"
              type="text"
              placeholder="Opcional"
              value={data.segundoApellido}
              onChange={(e) => onChange({ ...data, segundoApellido: e.target.value })}
              className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
            />
          </div>
        </div>

        {/* Sexo biológico y género */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="sexoBiologico" className="text-sm font-semibold text-zinc-900">
              Sexo Biológico <span className="text-rose-600">*</span>
            </label>
            <div className="mt-2 relative">
              <select
                id="sexoBiologico"
                value={data.sexoBiologico}
                onChange={(e) => onChange({ ...data, sexoBiologico: e.target.value as SexoBiologico })}
                className={cn(
                  "w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none",
                  "focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                  touched && !data.sexoBiologico ? "border-rose-300" : "border-zinc-200",
                )}
              >
                <option value="">Elija...</option>
                {sexoBiologicoOpts.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
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
            <label htmlFor="identidadGenero" className="text-sm font-semibold text-zinc-900">
              Identidad de Género <span className="text-rose-600">*</span>
            </label>
            <div className="mt-2 relative">
              <select
                id="identidadGenero"
                value={data.identidadGenero}
                onChange={(e) => onChange({ ...data, identidadGenero: e.target.value as IdentidadGenero })}
                className={cn(
                  "w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none",
                  "focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                  touched && !data.identidadGenero ? "border-rose-300" : "border-zinc-200",
                )}
              >
                <option value="">Elija...</option>
                {identidadGeneroOpts.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
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

        {/* Fecha, tipo sangre, grupo étnico */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label htmlFor="fechaNacimiento" className="text-sm font-semibold text-zinc-900">
              Fecha Nacimiento <span className="text-rose-600">*</span>
            </label>
            <input
              id="fechaNacimiento"
              type="date"
              value={data.fechaNacimiento}
              onChange={(e) => onChange({ ...data, fechaNacimiento: e.target.value })}
              className={cn(
                "mt-2 w-full h-11 rounded-xl border px-3 text-sm outline-none",
                "focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                touched && !data.fechaNacimiento ? "border-rose-300" : "border-zinc-200",
              )}
            />
          </div>

          <div>
            <label htmlFor="tipoSangre" className="text-sm font-semibold text-zinc-900">
              Tipo Sangre - Rh <span className="text-rose-600">*</span>
            </label>
            <div className="mt-2 relative">
              <select
                id="tipoSangre"
                value={data.tipoSangre}
                onChange={(e) => onChange({ ...data, tipoSangre: e.target.value as TipoSangre })}
                className={cn(
                  "w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none",
                  "focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                  touched && !data.tipoSangre ? "border-rose-300" : "border-zinc-200",
                )}
              >
                <option value="">Elija...</option>
                {tipoSangreOpts.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
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

          <div className="lg:col-span-2">
            <label htmlFor="grupoEtnico" className="text-sm font-semibold text-zinc-900">
              Grupo Étnico
            </label>
            <div className="mt-2 relative">
              <select
                id="grupoEtnico"
                value={data.grupoEtnico}
                onChange={(e) => onChange({ ...data, grupoEtnico: e.target.value })}
                className="w-full h-11 rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
              >
                <option value="">Elija...</option>
                <option value="indigena">Indígena</option>
                <option value="rom">Rom (Gitano)</option>
                <option value="raizal">Raizal</option>
                <option value="palenquero">Palenquero</option>
                <option value="negro">Negro</option>
                <option value="otros">Otros grupos étnicos</option>
                <option value="ninguno">Ninguno</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Nivel estudios, ocupación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="nivelEstudios" className="text-sm font-semibold text-zinc-900">
              Nivel de Estudios
            </label>
            <div className="mt-2 relative">
              <select
                id="nivelEstudios"
                value={data.nivelEstudios}
                onChange={(e) => onChange({ ...data, nivelEstudios: e.target.value })}
                className="w-full h-11 rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
              >
                <option value="">Elija...</option>
                <option value="ninguno">Ninguno</option>
                <option value="preescolar">Preescolar</option>
                <option value="primaria">Primaria</option>
                <option value="secundaria">Secundaria</option>
                <option value="tecnico">Técnico</option>
                <option value="tecnologo">Tecnólogo</option>
                <option value="profesional">Profesional</option>
                <option value="especializacion">Especialización</option>
                <option value="maestria">Maestría</option>
                <option value="doctorado">Doctorado</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="ocupacion" className="text-sm font-semibold text-zinc-900">
              Ocupación <span className="text-rose-600">*</span>
            </label>
            <div className="mt-2 relative">
              <input
                id="ocupacion"
                type="text"
                placeholder="Buscar por código o nombre"
                value={data.ocupacion}
                onChange={(e) => onChange({ ...data, ocupacion: e.target.value })}
                onFocus={() => setOcupacionOpen(true)}
                onBlur={() => {
                  window.setTimeout(() => setOcupacionOpen(false), 120);
                }}
                className="w-full h-11 rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                autoComplete="off"
              />
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 15l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>

              {ocupacionOpen && (
                <div className="absolute left-0 top-full z-20 mt-2 w-full rounded-xl border border-zinc-200 bg-white shadow-lg max-h-64 overflow-auto">
                  {ocupacionOptions.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-zinc-500">Cargando opciones...</div>
                  ) : (
                    filteredOcupaciones.length === 0 ? (
                      <div className="px-3 py-2 text-sm text-zinc-500">Sin resultados</div>
                    ) : (
                      filteredOcupaciones.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            onChange({ ...data, ocupacion: opt.label });
                            setOcupacionOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-zinc-50 flex items-center justify-between gap-3"
                        >
                          <span className="text-zinc-800">{opt.nombre}</span>
                          <span className="text-xs font-mono text-zinc-400">{opt.codigo}</span>
                        </button>
                      ))
                    )
                  )}
                </div>
              )}
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Clasificación Internacional Uniforme de Ocupaciones (CIUO - 08 A.C.)
            </p>
          </div>
        </div>

        {/* Estado civil */}
        <div className="mb-6">
          <label htmlFor="estadoCivil" className="text-sm font-semibold text-zinc-900">
            Estado Civil <span className="text-rose-600">*</span>
          </label>
          <div className="mt-2 relative">
            <select
              id="estadoCivil"
              value={data.estadoCivil}
              onChange={(e) => onChange({ ...data, estadoCivil: e.target.value as EstadoCivil })}
              className={cn(
                "w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none",
                "focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                touched && !data.estadoCivil ? "border-rose-300" : "border-zinc-200",
              )}
            >
              <option value="">Elija...</option>
              {estadoCivilOpts.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
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

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-zinc-200">
          <button
            type="submit"
            className="h-11 px-6 rounded-xl text-white font-semibold shadow-sm bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] hover:opacity-95"
          >
            Continuar
          </button>

          <button
            type="button"
            onClick={onBack}
            className="h-11 px-4 rounded-xl text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
          >
            Regresar
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="h-11 px-4 rounded-xl text-sm font-semibold text-zinc-500 hover:bg-zinc-100"
          >
            Cancelar Registro
          </button>
        </div>
      </form>
    </div>
  );
}

export function IntramuralWizard({ defaultStep = 1 }: { defaultStep?: 1 | 2 }) {
  const router = useRouter();
  const [showBanner, setShowBanner] = useState(true);
  const [currentStep, setCurrentStep] = useState<1 | 2>(defaultStep);
  
  // Paso 1 state
  const [paso1, setPaso1] = useState<Paso1Data>({
    tipoIdentificacion: "",
    numeroIdentificacion: "",
  });
  const [touchedPaso1, setTouchedPaso1] = useState(false);

  // Paso 2 state
  const [paso2, setPaso2] = useState<Paso2Data>({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    sexoBiologico: "",
    identidadGenero: "",
    fechaNacimiento: "",
    tipoSangre: "",
    grupoEtnico: "",
    nivelEstudios: "",
    ocupacion: "",
    estadoCivil: "",
  });
  const [touchedPaso2, setTouchedPaso2] = useState(false);

  const opciones = useMemo(
    () =>
      [
        { value: "CC" as const, label: "Cédula de Ciudadanía" },
        { value: "CE" as const, label: "Cédula de Extranjería" },
        { value: "PA" as const, label: "Pasaporte" },
        { value: "PEP" as const, label: "Permiso Especial de Permanencia" },
        { value: "PPT" as const, label: "Permiso por Protección Temporal" },
        { value: "RC" as const, label: "Registro Civil" },
        { value: "TI" as const, label: "Tarjeta de Identidad" },
      ] as const,
    [],
  );

  const isValidPaso1 = Boolean(paso1.tipoIdentificacion) && paso1.numeroIdentificacion.trim().length >= 4;
  const isValidPaso2 =
    paso2.primerNombre.trim().length >= 2 &&
    paso2.primerApellido.trim().length >= 2 &&
    Boolean(paso2.sexoBiologico) &&
    Boolean(paso2.fechaNacimiento) &&
    Boolean(paso2.tipoSangre) &&
    Boolean(paso2.estadoCivil);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.sessionStorage.getItem("somedi_paso1");
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as Paso1Data;
      if (!paso1.tipoIdentificacion && !paso1.numeroIdentificacion) {
        setPaso1(parsed);
      }
    } catch {
      // ignore malformed data
    }
  }, [paso1.tipoIdentificacion, paso1.numeroIdentificacion]);

  return (
    <div className="space-y-4">
      {showBanner && (
        <div className="rounded-xl border border-rose-200 bg-rose-500 text-white shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <p className="text-sm font-medium">
              El éxito es la suma de pequeños esfuerzos repetidos día tras día.
            </p>
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setShowBanner(false)}
              className="shrink-0 rounded-lg p-1 hover:bg-white/10"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <header className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center">
          <IconPlusCircle className="h-6 w-6 text-zinc-800" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-semibold text-zinc-900">Nuevo Servicio</h1>
            <span className="text-zinc-300">·</span>
            <span className="text-sm font-medium text-zinc-600">Modalidad Intramural</span>
          </div>
        </div>
      </header>

      <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
        <Stepper currentStep={currentStep} />

        {currentStep === 1 && (
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white">
            <div className="px-5 py-4 border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-white">
              <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">Paso 1</h2>
              <p className="mt-1 text-sm text-zinc-600">Identificación de usuario</p>
            </div>

            <form
              className="p-5"
              onSubmit={(e) => {
                e.preventDefault();
                setTouchedPaso1(true);
                if (!isValidPaso1) return;
                if (typeof window !== "undefined") {
                  window.sessionStorage.setItem("somedi_paso1", JSON.stringify(paso1));
                }
                setCurrentStep(2);
                router.push("/nuevo-servicio/intramural/paso-2");
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="tipoIdentificacion" className="text-sm font-semibold text-zinc-900">
                    Tipo Identificación <span className="text-rose-600">*</span>
                  </label>

                  <div className="mt-3 relative">
                    <select
                      id="tipoIdentificacion"
                      name="tipoIdentificacion"
                      value={paso1.tipoIdentificacion}
                      onChange={(e) => {
                        const updated = {
                          ...paso1,
                          tipoIdentificacion: e.target.value as TipoIdentificacion,
                        };
                        setPaso1(updated);
                        if (typeof window !== "undefined") {
                          window.sessionStorage.setItem("somedi_paso1", JSON.stringify(updated));
                        }
                      }}
                      onBlur={() => setTouchedPaso1(true)}
                      className={cn(
                        "w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm text-zinc-900 outline-none appearance-none",
                        "focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                        touchedPaso1 && !paso1.tipoIdentificacion ? "border-rose-300" : "border-zinc-200",
                      )}
                    >
                      <option value="" disabled>
                        Selecciona una opción
                      </option>
                      {opciones.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-zinc-500">Selecciona el tipo de documento del usuario.</p>
                  {touchedPaso1 && !paso1.tipoIdentificacion && (
                    <p className="mt-2 text-sm text-rose-600">Selecciona un tipo de identificación.</p>
                  )}
                </div>

                <div>
                  <label htmlFor="numeroIdentificacion" className="text-sm font-semibold text-zinc-900">
                    No. Identificación <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="numeroIdentificacion"
                    name="numeroIdentificacion"
                    inputMode="numeric"
                    placeholder="Ingresa el número"
                    value={paso1.numeroIdentificacion}
                    onChange={(e) => {
                      const updated = { ...paso1, numeroIdentificacion: e.target.value };
                      setPaso1(updated);
                      if (typeof window !== "undefined") {
                        window.sessionStorage.setItem("somedi_paso1", JSON.stringify(updated));
                      }
                    }}
                    onBlur={() => setTouchedPaso1(true)}
                    className={cn(
                      "mt-3 w-full h-11 rounded-xl border px-3 outline-none transition-shadow",
                      "focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                      touchedPaso1 &&
                        paso1.numeroIdentificacion.trim().length > 0 &&
                        paso1.numeroIdentificacion.trim().length < 4
                        ? "border-rose-300"
                        : "border-zinc-200",
                    )}
                  />
                  {touchedPaso1 &&
                    paso1.numeroIdentificacion.trim().length > 0 &&
                    paso1.numeroIdentificacion.trim().length < 4 && (
                      <p className="mt-2 text-sm text-rose-600">Ingresa un número válido.</p>
                    )}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="submit"
                  className={cn(
                    "h-11 px-6 rounded-xl text-white font-semibold shadow-sm transition-opacity",
                    "bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)]",
                    !isValidPaso1 && "opacity-60 cursor-not-allowed",
                  )}
                >
                  Continuar
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/nuevo-servicio")}
                  className="h-11 px-4 rounded-xl text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
                >
                  Cancelar Registro
                </button>
              </div>
            </form>
          </div>
        )}

        {currentStep === 2 && (
          <Paso2Form
            data={paso2}
            paso1={paso1}
            touched={touchedPaso2}
            onBack={() => {
              setCurrentStep(1);
              router.push("/nuevo-servicio/intramural");
            }}
            onCancel={() => router.push("/nuevo-servicio")}
            onChange={(updated) => setPaso2(updated)}
            onSubmit={() => {
              setTouchedPaso2(true);
              if (!isValidPaso2) return;
              // Paso 3 pendiente
              alert("Paso 2 completado. Paso 3 pendiente.");
            }}
          />
        )}
      </section>
    </div>
  );
}

export default function NuevoServicioIntramural() {
  return <IntramuralWizard defaultStep={1} />;
}
