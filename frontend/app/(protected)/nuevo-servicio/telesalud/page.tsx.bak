"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";

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
  lugarResidencia: string;
  direccion: string;
  estrato: string;
  zonaResidencia: string;
  localidad: string;
  telefono: string;
  email: string;
  eps: string;
  arl: string;
  afp: string;
  acompanante: string;
  convenio: string;
  empresaUsuaria: string;
  empresaIgualConvenio: boolean;
  cargo: string;
  sede: string;
  ciudadAtencion: string;
  entornoAtencion: string;
  tipoEvaluacion: string;
  enfasisEvaluacion: string[];
  examenesParaclinicos: string[];
  examenesLaboratorio: string[];
  vacunacion: string[];
  observaciones: string;
  prioridadAtencion: string;
};

type CiuoOcupacion = { codigo: string; nombre: string };
type CiuoSubgrupo = { codigo: string; nombre: string; grupos_primarios?: Record<string, CiuoOcupacion> };
type CiuoSubgrupoPrincipal = { codigo: string; nombre: string; subgrupos?: Record<string, CiuoSubgrupo> };
type CiuoGrupo = { codigo: string; nombre: string; subgrupos_principales?: Record<string, CiuoSubgrupoPrincipal> };

type CiuoItem = {
  codigo: string;
  nombre: string;
  search: string;
};

type MunicipioItem = {
  nombre: string;
  departamento?: string;
  codigo?: string;
  search: string;
};

function aplanarCIUO(ciuo: unknown): CiuoItem[] {
  if (!Array.isArray(ciuo)) return [];
  const lista: CiuoItem[] = [];

  ciuo.forEach((entry) => {
    if (!entry || typeof entry !== "object") return;
    Object.values(entry as Record<string, CiuoGrupo>).forEach((gg) => {
      const subprincipales = gg.subgrupos_principales ?? {};
      Object.values(subprincipales).forEach((subp) => {
        const subgrupos = subp.subgrupos ?? {};
        Object.values(subgrupos).forEach((sub) => {
          const primarios = sub.grupos_primarios ?? {};
          Object.entries(primarios).forEach(([codigo, data]) => {
            lista.push({ codigo, nombre: data.nombre, search: "" });
          });
        });
      });
    });
  });

  return lista;
}

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const reglasSinonimos = [
  { match: /jardin|jardiner/i, add: "jardinero jardineria" },
  { match: /conductor|chofer/i, add: "chofer manejar" },
  { match: /programador|software/i, add: "desarrollador programacion" },
  { match: /agricultor|huerta/i, add: "campo cultivo" },
];

function prepararBusqueda(lista: CiuoItem[]) {
  return lista.map((item) => ({
    ...item,
    search: normalizar(`${item.codigo} ${item.nombre}`),
  }));
}

function agregarSinonimos(item: CiuoItem) {
  let search = item.search;
  reglasSinonimos.forEach((r) => {
    if (r.match.test(search)) {
      search += ` ${r.add}`;
    }
  });
  return { ...item, search };
}

function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${safe})`, "ig");
  const parts = text.split(regex);
  return parts.map((part, index) => {
    const isMatch = part.toLowerCase() === query.toLowerCase();
    return isMatch ? (
      <mark
        key={`${part}-${index}`}
        className="bg-[rgb(var(--brand-green-rgb)/0.25)] text-zinc-900 rounded-sm"
      >
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    );
  });
}

function SearchableSelect({
  id,
  label,
  placeholder,
  value,
  options,
  onChange,
  error,
}: {
  id: string;
  label?: string;
  placeholder: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const query = value.trim();
  const filtered = useMemo(() => {
    if (!query) return [];
    const q = normalizar(query);
    return options
      .filter((opt) => normalizar(opt).includes(q))
      .slice(0, 20);
  }, [options, query]);

  return (
    <div>
      {label ? (
        <label htmlFor={id} className="text-sm font-semibold text-zinc-900">
          {label} <span className="text-rose-600">*</span>
        </label>
      ) : null}
      <div className="mt-2 relative">
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          className={cn(
            "w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
            error ? "border-rose-300" : "border-zinc-200",
          )}
          autoComplete="off"
        />
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 15l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {open && query.length > 0 && (
          <div className="absolute left-0 top-full z-20 mt-2 w-full rounded-xl border border-zinc-200 bg-white shadow-lg max-h-64 overflow-auto">
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-sm text-zinc-500">Sin resultados</div>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-zinc-50"
                >
                  <span className="text-zinc-800">{highlightMatch(opt, query)}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function InlineError({ message }: { message: string }) {
  return (
    <div className="mt-2 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
      <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 text-rose-500" aria-hidden="true">
        <path
          d="M12 9v4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 17h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M10.3 4.7 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.7a2 2 0 0 0-3.4 0Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
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

function Stepper({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  const steps = [
    { n: 1 as const, title: "Paso 1", subtitle: "Identificación de usuario" },
    { n: 2 as const, title: "Paso 2", subtitle: "Información de la orden de servicio" },
    { n: 3 as const, title: "Paso 3", subtitle: "Asignación de citas" },
  ];

  return (
    <div className="relative py-6">
      {/* Línea de progreso - Fondo */}
      <div className="absolute left-0 right-0 top-[calc(1.25rem+20px)] h-1 bg-zinc-200 rounded-full" />
      
      {/* Línea de progreso - Activa con gradiente */}
      <div 
        className="absolute left-0 top-[calc(1.25rem+20px)] h-1 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] rounded-full transition-all duration-500"
        style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
      />

      <div className="grid grid-cols-3 gap-4 relative z-10">
        {steps.map((s) => {
          const isDone = s.n < currentStep;
          const isActive = s.n === currentStep;
          return (
            <div key={s.n} className="relative flex flex-col items-center text-center">
              {/* Círculo del paso */}
              <div
                className={cn(
                  "flex items-center justify-center h-12 w-12 rounded-full border-2 font-bold text-white transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] border-[var(--brand-blue)] shadow-lg shadow-[rgba(27,120,214,0.3)]"
                    : isDone
                    ? "bg-[var(--brand-green)] border-[var(--brand-green)] shadow-md"
                    : "bg-white border-zinc-300 text-zinc-400",
                )}
              >
                {isDone ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{s.n}</span>
                )}
              </div>

              {/* Etiquetas */}
              <div className="mt-3">
                <div
                  className={cn(
                    "text-xs font-bold uppercase tracking-widest transition-colors duration-300",
                    isActive ? "text-[var(--brand-blue)]" : isDone ? "text-[var(--brand-green)]" : "text-zinc-400",
                  )}
                >
                  {s.title}
                </div>
                <div 
                  className={cn(
                    "text-xs mt-1 transition-colors duration-300",
                    isActive ? "text-zinc-700 font-medium" : "text-zinc-500",
                  )}
                >
                  {s.subtitle}
                </div>
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
  isValid,
  onBack,
  onCancel,
  onChange,
  onSubmit,
}: {
  data: Paso2Data;
  paso1: Paso1Data;
  touched: boolean;
  isValid: boolean;
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

  const epsOptions = useMemo(() => ["SURA", "Sanitas", "Nueva EPS", "Coomeva"], []);
  const arlOptions = useMemo(() => ["SURA", "Colmena", "Bolívar", "Positiva"], []);
  const afpOptions = useMemo(() => ["Porvenir", "Protección", "Colfondos", "Old Mutual"], []);
  const convenioOptions = useMemo(() => ["DISTRI SOL PACÍFICO SAS", "SALUD OCUPACIONAL INTEGRAL SAS"], []);
  const empresaOptions = useMemo(() => ["DISTRI SOL PACÍFICO SAS", "INTEGRAL MEDICINA SAS"], []);
  const cargoOptions = useMemo(() => ["Jardinero", "Operario", "Conductor", "Supervisor"], []);
  const [showCrearCargoModal, setShowCrearCargoModal] = useState(false);
  const [newCargo, setNewCargo] = useState("");
  const [customCargoOptions, setCustomCargoOptions] = useState<string[]>([]);
  const cargoOptionsCombined = useMemo(() => [...cargoOptions, ...customCargoOptions], [cargoOptions, customCargoOptions]);
  const sedeOptions = useMemo(
    () => ["SALUD OCUPACIONAL Y MEDICINA INTEGRAL S.A.S. - Sede Principal"],
    [],
  );
  const entornoOptions = useMemo(() => ["Intra", "Extra", "Mixto"], []);
  const tipoEvaluacionOptions = useMemo(
    () => [
      "Pre-Ingreso",
      "Periódico",
      "Cambio de Ocupación",
      "Egreso",
      "Post-Incapacidad",
      "Retorno Laboral",
      "Seguimiento",
      "No Aplica",
    ],
    [],
  );
  const enfasisOptions = useMemo(
    () => [
      "Trabajo en Alturas",
      "Espacios Confinados",
      "Manipulación de Alimentos",
      "Manipulación Sustancias Químicas",
      "Manipulación Productos Farmacéuticos",
      "Aptitud física, mental y de coordinación motriz para conductores",
      "Osteomuscular",
      "Osteomuscular (Fisioterapeuta)",
      "Actividad Deportiva",
      "Dermatológico",
      "Brigadista",
      "Cardiovascular",
      "Neurológico",
      "Exposición a Radiaciones Ionizantes",
      "Sistema Fonatorio",
      "Trabajo Riesgo Eléctrico",
      "Respiratorio",
      "Riesgo para COVID-19",
      "No Aplica",
    ],
    [],
  );

  // Datos y búsqueda para municipios de Colombia
  const [municipios, setMunicipios] = useState<MunicipioItem[]>([]);
  const fuseMunicipios = useMemo(() => new Fuse(municipios, { keys: ["search"], threshold: 0.3 }), [municipios]);
  useEffect(() => {
    let active = true;
    fetch("/data/municipios-colombia.json")
      .then((r) => r.json())
      .then((list: Array<{ nombre: string; departamento?: string; codigo?: string }>) => {
        if (!active) return;
        const prep = list.map((m) => ({
          ...m,
          search: normalizar(`${m.nombre} ${m.departamento ?? ""}`),
        }));
        setMunicipios(prep);
      })
      .catch(() => {
        // silencioso: si no existe el archivo aún, no rompe la UI
      });
    return () => {
      active = false;
    };
  }, []);
  const municipioSuggestions = useMemo(() => {
    const q = normalizar(data.lugarResidencia || "");
    if (!q) return [] as MunicipioItem[];
    return fuseMunicipios.search(q).map((r) => r.item).slice(0, 8);
  }, [data.lugarResidencia, fuseMunicipios]);
  const ciudadAtencionSuggestions = useMemo(() => {
    const q = normalizar(data.ciudadAtencion || "");
    if (!q) return [] as MunicipioItem[];
    return fuseMunicipios.search(q).map((r) => r.item).slice(0, 8);
  }, [data.ciudadAtencion, fuseMunicipios]);

  // Validadores de entrada
  const sanitizeLettersOnly = (value: string) => value.replace(/[^a-záéíóúñA-ZÁÉÍÓÚÑ\s]/g, "");
  const sanitizeNumbersOnly = (value: string) => value.replace(/\D+/g, "");
  const blockNonLetters = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Home", "End"];
    if (e.ctrlKey || e.metaKey) return;
    const isLetter = /[a-záéíóúñA-ZÁÉÍÓÚÑ\s]/.test(e.key);
    const isAllowed = allowed.includes(e.key);
    if (!isLetter && !isAllowed) e.preventDefault();
  };
  const blockNonNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Home", "End"];
    if (e.ctrlKey || e.metaKey) return;
    const isDigit = /[0-9]/.test(e.key);
    const isAllowed = allowed.includes(e.key);
    if (!isDigit && !isAllowed) e.preventDefault();
  };

  // Scroll to first error field
  useEffect(() => {
    if (touched && !isValid) {
      const firstErrorId = [
        !data.primerNombre && "primerNombre",
        !data.primerApellido && "primerApellido",
        !data.sexoBiologico && "sexoBiologico",
        !data.identidadGenero && "identidadGenero",
        !data.fechaNacimiento && "fechaNacimiento",
        !data.tipoSangre && "tipoSangre",
        !data.estadoCivil && "estadoCivil",
        !data.lugarResidencia && "lugarResidencia",
        !data.telefono && "telefono",
        !data.email && "email",
        !data.eps && "eps",
      ].find(Boolean);
      if (firstErrorId) {
        const el = document.getElementById(firstErrorId as string);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
        }
      }
    }
  }, [touched, isValid, data]);
  const [paraclinicosOptions, setParaclinicosOptions] = useState<string[]>([]);
  const [laboratorioOptions, setLaboratorioOptions] = useState<string[]>([]);
  const [vacunacionOptions, setVacunacionOptions] = useState<string[]>([]);

  useEffect(() => {
    fetch("/data/examenes.json")
      .then((res) => res.json())
      .then((data) => {
        setParaclinicosOptions(data.Paraclinicos || []);
        setLaboratorioOptions(data.Laboratorio || []);
        setVacunacionOptions(data.Vacunacion || []);
      })
      .catch(() => {
        console.error("Error cargando exámenes");
      });
  }, []);
  const [ocupacionOptions, setOcupacionOptions] = useState<CiuoItem[]>([]);
  const [ocupacionOpen, setOcupacionOpen] = useState(false);
  const [lugarResidenciaOpen, setLugarResidenciaOpen] = useState(false);
  const [ciudadAtencionOpen, setCiudadAtencionOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch("/data/ciuo08.json")
      .then((res) => (res.ok ? res.json() : []))
      .then((json) => {
        if (!isMounted) return;
        const lista = prepararBusqueda(aplanarCIUO(json)).map(agregarSinonimos);
        setOcupacionOptions(lista);
      })
      .catch(() => {
        if (isMounted) setOcupacionOptions([]);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const ocupacionQuery = data.ocupacion.trim();
  const fuse = useMemo(() => {
    if (ocupacionOptions.length === 0) return null;
    return new Fuse(ocupacionOptions, {
      keys: ["search"],
      threshold: 0.4,
    });
  }, [ocupacionOptions]);

  const filteredOcupaciones = useMemo(() => {
    if (!fuse || !ocupacionQuery) return [];
    return fuse.search(normalizar(ocupacionQuery)).map((r) => r.item).slice(0, 20);
  }, [fuse, ocupacionQuery]);

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
        {/* Datos personales */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-[var(--brand-blue)] mb-6">Datos Personales</h3>

          {/* Identificación (read-only display) */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
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
              onChange={(e) => onChange({ ...data, primerNombre: sanitizeLettersOnly(e.target.value) })}
              onKeyDown={blockNonLetters}
              className={cn(
                "mt-2 w-full h-11 rounded-xl border px-3 text-sm outline-none",
                "focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                touched && data.primerNombre.trim().length < 2 ? "border-rose-300" : "border-zinc-200",
              )}
            />
            {touched && data.primerNombre.trim().length < 2 && (
              <InlineError message="Ingresa el primer nombre." />
            )}
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
              onChange={(e) => onChange({ ...data, segundoNombre: sanitizeLettersOnly(e.target.value) })}
              onKeyDown={blockNonLetters}
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
              onChange={(e) => onChange({ ...data, primerApellido: sanitizeLettersOnly(e.target.value) })}
              onKeyDown={blockNonLetters}
              className={cn(
                "mt-2 w-full h-11 rounded-xl border px-3 text-sm outline-none",
                "focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                touched && data.primerApellido.trim().length < 2 ? "border-rose-300" : "border-zinc-200",
              )}
            />
            {touched && data.primerApellido.trim().length < 2 && (
              <InlineError message="Ingresa el primer apellido." />
            )}
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
              onChange={(e) => onChange({ ...data, segundoApellido: sanitizeLettersOnly(e.target.value) })}
              onKeyDown={blockNonLetters}
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
            {touched && !data.sexoBiologico && (
              <InlineError message="Selecciona el sexo biológico." />
            )}
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
            {touched && !data.identidadGenero && (
              <InlineError message="Selecciona la identidad de género." />
            )}
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
            {touched && !data.fechaNacimiento && (
              <InlineError message="Selecciona la fecha de nacimiento." />
            )}
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
            {touched && !data.tipoSangre && (
              <InlineError message="Selecciona el tipo de sangre." />
            )}
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
                className={cn(
                  "w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                  touched && !data.ocupacion ? "border-rose-300" : "border-zinc-200",
                )}
                autoComplete="off"
              />
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 15l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>

              {ocupacionOpen && ocupacionQuery.length > 0 && (
                <div className="absolute left-0 top-full z-20 mt-2 w-full rounded-xl border border-zinc-200 bg-white shadow-lg max-h-64 overflow-auto">
                  {ocupacionOptions.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-zinc-500">Cargando opciones...</div>
                  ) : (
                    filteredOcupaciones.length === 0 ? (
                      <div className="px-3 py-2 text-sm text-zinc-500">Sin resultados</div>
                    ) : (
                      filteredOcupaciones.map((opt) => (
                        <button
                          key={`${opt.codigo}-${opt.nombre}`}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            onChange({ ...data, ocupacion: `${opt.codigo} - ${opt.nombre}` });
                            setOcupacionOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-zinc-50 flex items-center justify-between gap-3"
                        >
                          <span className="text-zinc-800">{highlightMatch(opt.nombre, data.ocupacion)}</span>
                          <span className="text-xs font-mono text-zinc-400">{opt.codigo}</span>
                        </button>
                      ))
                    )
                  )}
                </div>
              )}
            </div>
            {touched && !data.ocupacion && (
              <InlineError message="Selecciona una ocupación." />
            )}
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
          {touched && !data.estadoCivil && (
            <InlineError message="Selecciona el estado civil." />
          )}
        </div>
        </div>

        {/* Residencia y contacto */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-[var(--brand-blue)] mb-6">Residencia y Contacto</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="lugarResidencia" className="text-sm font-semibold text-zinc-900">
              Lugar Residencia <span className="text-rose-600">*</span>
            </label>
            <div className="mt-2 relative">
              <input
                id="lugarResidencia"
                type="text"
                placeholder="Buscar municipio o ciudad"
                value={data.lugarResidencia}
                onChange={(e) => onChange({ ...data, lugarResidencia: e.target.value })}
                onFocus={() => setLugarResidenciaOpen(true)}
                onBlur={() => setTimeout(() => setLugarResidenciaOpen(false), 150)}
                className={cn(
                  "w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                  touched && !data.lugarResidencia ? "border-rose-300" : "border-zinc-200",
                )}
              />
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 15l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              {lugarResidenciaOpen && data.lugarResidencia && (
                <div className="absolute z-20 mt-2 w-full rounded-xl border border-zinc-200 bg-white shadow-sm max-h-56 overflow-auto">
                  {municipioSuggestions.length > 0 ? (
                    municipioSuggestions.map((m) => (
                      <button
                        type="button"
                        key={`${m.codigo ?? m.nombre}-${m.nombre}`}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-zinc-50"
                        onClick={() => {
                          onChange({ ...data, lugarResidencia: m.departamento ? `${m.nombre}, ${m.departamento}` : m.nombre });
                          setLugarResidenciaOpen(false);
                        }}
                      >
                        <span className="font-medium text-zinc-900">{m.nombre}</span>
                        {m.departamento ? <span className="ml-1 text-zinc-500">({m.departamento})</span> : null}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-xs text-zinc-500">Sin coincidencias</div>
                  )}
                </div>
              )}
            </div>
            {touched && !data.lugarResidencia && (
              <InlineError message="Selecciona el lugar de residencia." />
            )}
          </div>

          <div>
            <label htmlFor="direccion" className="text-sm font-semibold text-zinc-900">
              Dirección
            </label>
            <input
              id="direccion"
              type="text"
              placeholder="Ej: Cra 50 # 45-25"
              value={data.direccion}
              onChange={(e) => onChange({ ...data, direccion: e.target.value })}
              className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
            />
          </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="estrato" className="text-sm font-semibold text-zinc-900">
              Estrato <span className="text-rose-600">*</span>
            </label>
            <div className="mt-2 relative">
              <select
                id="estrato"
                value={data.estrato}
                onChange={(e) => onChange({ ...data, estrato: e.target.value })}
                className={cn(
                  "w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                  touched && !data.estrato ? "border-rose-300" : "border-zinc-200",
                )}
              >
                <option value="">Elija...</option>
                <option value="NR">No recuerda</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            {touched && !data.estrato && (
              <InlineError message="Selecciona el estrato." />
            )}
          </div>

          <div>
            <label htmlFor="zonaResidencia" className="text-sm font-semibold text-zinc-900">
              Zona de Residencia <span className="text-rose-600">*</span>
            </label>
            <div className="mt-2 relative">
              <select
                id="zonaResidencia"
                value={data.zonaResidencia}
                onChange={(e) => onChange({ ...data, zonaResidencia: e.target.value })}
                className={cn(
                  "w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                  touched && !data.zonaResidencia ? "border-rose-300" : "border-zinc-200",
                )}
              >
                <option value="">Elija...</option>
                <option value="urbana">Urbana</option>
                <option value="rural">Rural</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            {touched && !data.zonaResidencia && (
              <InlineError message="Selecciona la zona de residencia." />
            )}
          </div>
        </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="localidad" className="text-sm font-semibold text-zinc-900">
              Localidad/Comuna
            </label>
            <div className="mt-2 relative">
              <input
                id="localidad"
                type="text"
                placeholder="Buscar localidad"
                value={data.localidad}
                onChange={(e) => onChange({ ...data, localidad: e.target.value })}
                className="w-full h-11 rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
              />
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 15l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="telefono" className="text-sm font-semibold text-zinc-900">
              Teléfono <span className="text-rose-600">*</span>
            </label>
            <input
              id="telefono"
              type="tel"
              placeholder="Ej: 3157051782"
              value={data.telefono}
              onChange={(e) => onChange({ ...data, telefono: sanitizeNumbersOnly(e.target.value) })}
              onKeyDown={blockNonNumbers}
              className={cn(
                "mt-2 w-full h-11 rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                touched && !data.telefono ? "border-rose-300" : "border-zinc-200",
              )}
            />
            {touched && !data.telefono && (
              <InlineError message="Ingresa el número de teléfono." />
            )}
          </div>
        </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-zinc-900">
                e-Mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="usuario@correo.com"
                value={data.email}
                onChange={(e) => onChange({ ...data, email: e.target.value })}
                className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="acompanante" className="text-sm font-semibold text-zinc-900">
                Acompañante/Responsable <span className="text-rose-600">*</span>
              </label>
            <div className="mt-2 relative">
              <select
                id="acompanante"
                value={data.acompanante}
                onChange={(e) => onChange({ ...data, acompanante: e.target.value })}
                className={cn(
                  "w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                  touched && !data.acompanante ? "border-rose-300" : "border-zinc-200",
                )}
              >
                <option value="">Elija...</option>
                <option value="si">Sí</option>
                <option value="no">No registra</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            {touched && !data.acompanante && (
              <InlineError message="Selecciona si hay acompañante/responsable." />
            )}
            </div>
          </div>
        </div>

        {/* Seguridad social */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-[var(--brand-blue)] mb-6">Seguridad Social</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <SearchableSelect
              id="eps"
              label="EPS"
              placeholder="Buscar EPS"
              value={data.eps}
              options={epsOptions}
              onChange={(value) => onChange({ ...data, eps: value })}
              error={touched && !data.eps}
            />
            {touched && !data.eps && <InlineError message="Selecciona la EPS." />}
          </div>
          <div>
            <SearchableSelect
              id="arl"
              label="ARL"
              placeholder="Buscar ARL"
              value={data.arl}
              options={arlOptions}
              onChange={(value) => onChange({ ...data, arl: value })}
              error={touched && !data.arl}
            />
            {touched && !data.arl && <InlineError message="Selecciona la ARL." />}
          </div>
          <div>
            <SearchableSelect
              id="afp"
              label="AFP"
              placeholder="Buscar AFP"
              value={data.afp}
              options={afpOptions}
              onChange={(value) => onChange({ ...data, afp: value })}
              error={touched && !data.afp}
            />
            {touched && !data.afp && <InlineError message="Selecciona la AFP." />}
          </div>
          </div>
        </div>

        {/* Convenio / Empresa / Cargo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <SearchableSelect
              id="convenio"
              label="Convenio"
              placeholder="Buscar convenio"
              value={data.convenio}
              options={convenioOptions}
              onChange={(value) => {
                onChange({
                  ...data,
                  convenio: value,
                  empresaUsuaria: data.empresaIgualConvenio ? value : data.empresaUsuaria,
                });
              }}
              error={touched && !data.convenio}
            />
            {touched && !data.convenio && <InlineError message="Selecciona el convenio." />}
          </div>
          <div>
            <SearchableSelect
              id="empresaUsuaria"
              label="Empresa Usuaria"
              placeholder="Buscar empresa"
              value={data.empresaUsuaria}
              options={empresaOptions}
              onChange={(value) =>
                onChange({
                  ...data,
                  empresaUsuaria: value,
                  empresaIgualConvenio: value === data.convenio ? data.empresaIgualConvenio : false,
                })
              }
              error={touched && !data.empresaUsuaria}
            />
            {touched && !data.empresaUsuaria && (
              <InlineError message="Selecciona la empresa usuaria." />
            )}
            <label className="mt-2 flex items-center gap-2 text-xs text-zinc-600">
              <input
                type="checkbox"
                checked={data.empresaIgualConvenio}
                onChange={(e) =>
                  onChange({
                    ...data,
                    empresaIgualConvenio: e.target.checked,
                    empresaUsuaria: e.target.checked ? data.convenio : data.empresaUsuaria,
                  })
                }
                className="h-4 w-4 accent-[var(--brand-blue)]"
              />
              La empresa usuaria es igual a la empresa del convenio
            </label>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label htmlFor="cargo" className="text-sm font-semibold text-zinc-900">
              Cargo a Desempeñar <span className="text-rose-600">*</span>
            </label>
            <button type="button" className="text-xs text-[var(--brand-blue)] hover:underline" onClick={() => setShowCrearCargoModal(true)}>
              + Crear cargo
            </button>
          </div>
          <SearchableSelect
            id="cargo"
            label=""
            placeholder="Buscar cargo"
            value={data.cargo}
            options={cargoOptionsCombined}
            onChange={(value) => onChange({ ...data, cargo: value })}
            error={touched && !data.cargo}
          />
          {touched && !data.cargo && (
            <InlineError message="Selecciona el cargo a desempeñar." />
          )}
        </div>

        {showCrearCargoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-zinc-200">
              <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white rounded-t-2xl">
                <div className="font-semibold">Crear cargo</div>
                <button type="button" onClick={() => setShowCrearCargoModal(false)} className="h-8 w-8 rounded-full hover:bg-white/20" aria-label="Cerrar">×</button>
              </div>
              <div className="p-5">
                <label htmlFor="nuevoCargo" className="text-sm font-semibold text-zinc-900">Nombre del cargo</label>
                <input
                  id="nuevoCargo"
                  type="text"
                  placeholder="Ej: Auxiliar Administrativo"
                  value={newCargo}
                  onChange={(e) => setNewCargo(e.target.value)}
                  className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                />
                <p className="mt-2 text-xs text-zinc-600">Evita duplicados; usaremos el texto tal cual.</p>
              </div>
              <div className="px-5 py-4 border-t border-zinc-200 flex justify-end gap-3">
                <button type="button" onClick={() => { setShowCrearCargoModal(false); setNewCargo(""); }} className="h-10 px-4 rounded-xl text-sm font-semibold text-zinc-700 border border-zinc-200 hover:bg-zinc-50">Cancelar</button>
                <button
                  type="button"
                  onClick={() => {
                    const nombre = newCargo.trim();
                    if (!nombre) return;
                    const exists = cargoOptionsCombined.some((c) => c.toLowerCase() === nombre.toLowerCase());
                    if (!exists) {
                      setCustomCargoOptions((prev) => [...prev, nombre]);
                    }
                    onChange({ ...data, cargo: nombre });
                    setShowCrearCargoModal(false);
                    setNewCargo("");
                  }}
                  className="h-10 px-5 rounded-xl text-sm font-semibold text-white bg-[var(--brand-blue)] hover:opacity-95"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Exámenes a Realizar */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-[var(--brand-blue)] mb-6">Exámenes a Realizar</h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div>
              <label htmlFor="sede" className="text-sm font-semibold text-zinc-900">
                Sede
              </label>
              <div className="mt-2 relative">
                <select
                  id="sede"
                  value={data.sede}
                  onChange={(e) => onChange({ ...data, sede: e.target.value })}
                  className="w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                >
                  <option value="">Elija...</option>
                  {sedeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
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
              <label htmlFor="ciudadAtencion" className="text-sm font-semibold text-zinc-900">
                Ciudad Atención <span className="text-rose-600">*</span>
              </label>
              <div className="mt-2 relative">
                <input
                  id="ciudadAtencion"
                  type="text"
                  placeholder="Buscar ciudad o municipio"
                  value={data.ciudadAtencion}
                  onChange={(e) => onChange({ ...data, ciudadAtencion: e.target.value })}
                  onFocus={() => setCiudadAtencionOpen(true)}
                  onBlur={() => setTimeout(() => setCiudadAtencionOpen(false), 150)}
                  className={cn(
                    "w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                    touched && !data.ciudadAtencion ? "border-rose-300" : "border-zinc-200",
                  )}
                />
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M15 15l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                {ciudadAtencionOpen && data.ciudadAtencion && (
                  <div className="absolute z-20 mt-2 w-full rounded-xl border border-zinc-200 bg-white shadow-sm max-h-56 overflow-auto">
                    {ciudadAtencionSuggestions.length > 0 ? (
                      ciudadAtencionSuggestions.map((m) => (
                        <button
                          type="button"
                          key={`${m.codigo ?? m.nombre}-${m.nombre}`}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-zinc-50"
                          onClick={() => {
                            onChange({ ...data, ciudadAtencion: m.departamento ? `${m.nombre}, ${m.departamento}` : m.nombre });
                            setCiudadAtencionOpen(false);
                          }}
                        >
                          <span className="font-medium text-zinc-900">{m.nombre}</span>
                          {m.departamento ? <span className="ml-1 text-zinc-500">({m.departamento})</span> : null}
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-xs text-zinc-500">Sin coincidencias</div>
                    )}
                  </div>
                )}
              </div>
              {touched && !data.ciudadAtencion && (
                <InlineError message="Selecciona la ciudad de atención." />
              )}
            </div>

            <div>
              <label htmlFor="entornoAtencion" className="text-sm font-semibold text-zinc-900">
                Entorno de la atención <span className="text-rose-600">*</span>
              </label>
              <div className="mt-2 relative">
                <select
                  id="entornoAtencion"
                  value={data.entornoAtencion}
                  onChange={(e) => onChange({ ...data, entornoAtencion: e.target.value })}
                  className={cn(
                    "w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                    touched && !data.entornoAtencion ? "border-rose-300" : "border-zinc-200",
                  )}
                >
                  <option value="">Elija...</option>
                  {entornoOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              {touched && !data.entornoAtencion && (
                <InlineError message="Selecciona el entorno de la atención." />
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-semibold text-zinc-900">
              Tipo de Evaluación <span className="text-rose-600">*</span>
            </label>
            <div className="mt-2 relative">
              <select
                id="tipoEvaluacion"
                value={data.tipoEvaluacion}
                onChange={(e) => onChange({ ...data, tipoEvaluacion: e.target.value })}
                className={cn(
                  "w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent",
                  touched && !data.tipoEvaluacion ? "border-rose-300" : "border-zinc-200",
                )}
              >
                <option value="">Elija...</option>
                {tipoEvaluacionOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            {touched && !data.tipoEvaluacion && (
              <InlineError message="Selecciona el tipo de evaluación." />
            )}
          </div>

          <div className="mt-4">
            <label className="text-sm font-semibold text-zinc-900">Énfasis Evaluación</label>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {enfasisOptions.map((opt) => {
                const checked = data.enfasisEvaluacion.includes(opt);
                return (
                  <label
                    key={opt}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-3 py-2 text-sm cursor-pointer",
                      checked
                        ? "border-[var(--brand-blue)] bg-[rgb(var(--brand-blue-rgb)/0.06)]"
                        : "border-zinc-200 hover:bg-zinc-50",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...data.enfasisEvaluacion, opt]
                          : data.enfasisEvaluacion.filter((item) => item !== opt);
                        onChange({ ...data, enfasisEvaluacion: next });
                      }}
                      className="h-4 w-4 accent-[var(--brand-blue)]"
                    />
                    {opt}
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Exámenes Paraclínicos / Laboratorio / Vacunación */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-[var(--brand-blue)] mb-6">Exámenes Adicionales</h3>
          <div className="space-y-4">
            {/* Exámenes Paraclínicos */}
            <div>
              <label className="text-sm font-semibold text-zinc-900">Exámenes Paraclínicos</label>
              <div className="mt-1 flex flex-wrap gap-2 min-h-[44px]">
                {data.examenesParaclinicos.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm"
                  >
                    {item}
                    <button
                      type="button"
                      className="text-zinc-400 hover:text-zinc-700"
                      onClick={() =>
                        onChange({
                          ...data,
                          examenesParaclinicos: data.examenesParaclinicos.filter((x) => x !== item),
                        })
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-1 relative">
                <select
                  value=""
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!value) return;
                    if (!data.examenesParaclinicos.includes(value)) {
                      onChange({
                        ...data,
                        examenesParaclinicos: [...data.examenesParaclinicos, value],
                      });
                    }
                    e.target.value = "";
                  }}
                  className="w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                >
                  <option value="">Elija...</option>
                  {paraclinicosOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
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

            {/* Exámenes de Laboratorio */}
            <div>
              <label className="text-sm font-semibold text-zinc-900">Exámenes de Laboratorio</label>
              <div className="mt-1 flex flex-wrap gap-2 min-h-[44px]">
                {data.examenesLaboratorio.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm"
                  >
                    {item}
                    <button
                      type="button"
                      className="text-zinc-400 hover:text-zinc-700"
                      onClick={() =>
                        onChange({
                          ...data,
                          examenesLaboratorio: data.examenesLaboratorio.filter((x) => x !== item),
                        })
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-1 relative">
                <select
                  value=""
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!value) return;
                    if (!data.examenesLaboratorio.includes(value)) {
                      onChange({
                        ...data,
                        examenesLaboratorio: [...data.examenesLaboratorio, value],
                      });
                    }
                    e.target.value = "";
                  }}
                  className="w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                >
                  <option value="">Elija...</option>
                  {laboratorioOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
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

            {/* Vacunación */}
            <div>
              <label className="text-sm font-semibold text-zinc-900">Vacunación</label>
              <div className="mt-1 flex flex-wrap gap-2 min-h-[44px]">
                {data.vacunacion.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm"
                  >
                    {item}
                    <button
                      type="button"
                      className="text-zinc-400 hover:text-zinc-700"
                      onClick={() =>
                        onChange({
                          ...data,
                          vacunacion: data.vacunacion.filter((x) => x !== item),
                        })
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-1 relative">
                <select
                  value=""
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!value) return;
                    if (!data.vacunacion.includes(value)) {
                      onChange({
                        ...data,
                        vacunacion: [...data.vacunacion, value],
                      });
                    }
                    e.target.value = "";
                  }}
                  className="w-full h-11 rounded-xl border bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                >
                  <option value="">Elija...</option>
                  {vacunacionOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
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

        {/* Observaciones */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-[var(--brand-blue)] mb-6">Observaciones</h3>
          <div className="mt-4">
            <label className="text-sm font-semibold text-zinc-900">
              Prioridad para la atención <span className="text-rose-600">*</span>
            </label>
            <div className="mt-2 flex gap-2">
              {["Prioritaria", "Normal"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onChange({ ...data, prioridadAtencion: opt })}
                  className={cn(
                    "px-3 py-2 rounded-xl border text-sm",
                    data.prioridadAtencion === opt
                      ? opt === "Prioritaria"
                        ? "border-transparent text-white bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)]"
                        : "border-[var(--brand-blue)] bg-[rgb(var(--brand-blue-rgb)/0.06)]"
                      : "border-zinc-200 hover:bg-zinc-50",
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
            {touched && !data.prioridadAtencion && (
              <InlineError message="Selecciona la prioridad de atención." />
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="observaciones" className="text-sm font-semibold text-zinc-900">
              Observaciones
            </label>
            <textarea
              id="observaciones"
              rows={4}
              value={data.observaciones}
              onChange={(e) => onChange({ ...data, observaciones: e.target.value })}
              placeholder="Escribe observaciones adicionales"
              className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-6 border-t border-zinc-200">
          <button
            type="submit"
            className={cn(
              "h-12 px-8 rounded-xl text-white font-bold shadow-md transition-all duration-200 flex items-center gap-2",
              "bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)]",
              "hover:shadow-lg hover:scale-105",
            )}
          >
            Continuar
          </button>

          <button
            type="button"
            onClick={onBack}
            className="h-12 px-6 rounded-xl text-sm font-semibold text-zinc-700 border-2 border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 transition-all duration-200"
          >
            Regresar
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="h-12 px-6 rounded-xl text-sm font-semibold text-zinc-600 border-2 border-zinc-200 hover:bg-zinc-50 transition-all duration-200"
          >
            Cancelar Registro
          </button>
        </div>
      </form>
    );
  }

  function SummaryCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="px-6 py-4 border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-white rounded-t-2xl">
        <h3 className="text-lg font-semibold text-[var(--brand-blue)]">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <div className="text-xs text-zinc-500 uppercase tracking-wide">{label}</div>
      <div className="text-sm text-zinc-900 mt-1">{value || "—"}</div>
    </div>
  );
}

function Paso3Summary({
  paso1,
  paso2,
  onBack,
}: {
  paso1: Paso1Data;
  paso2: Paso2Data;
  onBack: () => void;
}) {
  const [autoEnviar, setAutoEnviar] = useState<"si" | "no" | "">("");
  const [showAsignar, setShowAsignar] = useState(false);
  const [selectedExamen, setSelectedExamen] = useState<string>("");
  const [selectedFecha, setSelectedFecha] = useState("Miércoles, 21 de Enero de 2026");
  const [showFirmaModal, setShowFirmaModal] = useState(false);
  const [showFotoModal, setShowFotoModal] = useState(false);
  const [firmaDataUrl, setFirmaDataUrl] = useState<string>("");
  const [fotoDataUrl, setFotoDataUrl] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (showFotoModal && !fotoDataUrl && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "user" } })
        .then((stream) => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Error accediendo a cámara:", err));
    }
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream | null;
      stream?.getTracks().forEach((t) => t.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [showFotoModal, fotoDataUrl]);
  const [noSabeFirmar, setNoSabeFirmar] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const examenes = paso2.examenesParaclinicos;

  const startDraw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    drawingRef.current = true;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
  };

  const draw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const endDraw = () => {
    drawingRef.current = false;
  };

  const clearFirma = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const saveFirma = () => {
    if (!canvasRef.current) return;
    setFirmaDataUrl(canvasRef.current.toDataURL("image/png"));
    setShowFirmaModal(false);
  };

  return (
    <div className="mt-6 space-y-4">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SummaryCard title="Usuario">
          <div className="grid grid-cols-1 gap-4">
            <SummaryItem label="Identificación" value={`${paso1.tipoIdentificacion} ${paso1.numeroIdentificacion}`} />
            <SummaryItem label="Nombre" value={`${paso2.primerNombre} ${paso2.segundoNombre} ${paso2.primerApellido} ${paso2.segundoApellido}`.replace(/\s+/g, " ").trim()} />
            <SummaryItem label="Sexo / Género" value={`${paso2.sexoBiologico} / ${paso2.identidadGenero}`} />
            <SummaryItem label="Fecha Nacimiento" value={paso2.fechaNacimiento} />
          </div>
        </SummaryCard>

        <SummaryCard title="Orden de Servicio">
          <div className="grid grid-cols-1 gap-4">
            <SummaryItem label="Convenio" value={paso2.convenio} />
            <SummaryItem label="Empresa Usuaria" value={paso2.empresaUsuaria} />
            <SummaryItem label="Cargo" value={paso2.cargo} />
            <SummaryItem label="Tipo Evaluación" value={paso2.tipoEvaluacion} />
          </div>
        </SummaryCard>

        <SummaryCard title="Atención">
          <div className="grid grid-cols-1 gap-4">
            <SummaryItem label="Sede" value={paso2.sede} />
            <SummaryItem label="Ciudad" value={paso2.ciudadAtencion} />
            <SummaryItem label="Entorno" value={paso2.entornoAtencion} />
            <SummaryItem label="Prioridad" value={paso2.prioridadAtencion} />
          </div>
        </SummaryCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SummaryCard title="Énfasis & Paraclínicos">
          <div className="space-y-3">
            <div>
              <div className="text-xs text-zinc-500 uppercase tracking-wide">Énfasis Evaluación</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {paso2.enfasisEvaluacion.length > 0 ? (
                  paso2.enfasisEvaluacion.map((item) => (
                    <span key={item} className="px-2 py-1 rounded-full text-xs bg-zinc-100 text-zinc-700">
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-zinc-500">—</span>
                )}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 uppercase tracking-wide">Paraclínicos</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {paso2.examenesParaclinicos.length > 0 ? (
                  paso2.examenesParaclinicos.map((item) => (
                    <span key={item} className="px-2 py-1 rounded-full text-xs bg-zinc-100 text-zinc-700">
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-zinc-500">—</span>
                )}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 uppercase tracking-wide">Laboratorio</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {paso2.examenesLaboratorio.length > 0 ? (
                  paso2.examenesLaboratorio.map((item) => (
                    <span key={item} className="px-2 py-1 rounded-full text-xs bg-zinc-100 text-zinc-700">
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-zinc-500">—</span>
                )}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 uppercase tracking-wide">Vacunación</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {paso2.vacunacion.length > 0 ? (
                  paso2.vacunacion.map((item) => (
                    <span key={item} className="px-2 py-1 rounded-full text-xs bg-zinc-100 text-zinc-700">
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-zinc-500">—</span>
                )}
              </div>
            </div>
          </div>
        </SummaryCard>

        <SummaryCard title="Contacto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SummaryItem label="Residencia" value={paso2.lugarResidencia} />
            <SummaryItem label="Dirección" value={paso2.direccion} />
            <SummaryItem label="Teléfono" value={paso2.telefono} />
            <SummaryItem label="Email" value={paso2.email} />
            <SummaryItem label="EPS / ARL / AFP" value={`${paso2.eps} / ${paso2.arl} / ${paso2.afp}`} />
            <SummaryItem label="Acompañante" value={paso2.acompanante} />
          </div>
        </SummaryCard>
      </div>

      <SummaryCard title="Registro de Firma y Foto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-zinc-200 bg-white">
            <div className="px-4 py-3 border-b border-zinc-200 text-xs font-semibold text-zinc-600 uppercase tracking-wide">
              Firma Usuario
            </div>
            <div className="p-4">
              {firmaDataUrl ? (
                <img src={firmaDataUrl} alt="Firma registrada" className="h-28 w-full object-contain rounded-lg bg-zinc-50" />
              ) : (
                <div className="h-28 w-full rounded-lg border border-dashed border-zinc-200 bg-zinc-50 flex items-center justify-center text-xs text-zinc-500">
                  Sin firma registrada
                </div>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowFirmaModal(true)}
                  className="h-9 px-4 rounded-lg text-sm font-semibold text-white bg-[var(--brand-blue)] hover:opacity-95"
                >
                  Registrar Firma
                </button>
                <label className="flex items-center gap-2 text-xs text-zinc-600">
                  <input
                    type="checkbox"
                    checked={noSabeFirmar}
                    onChange={(e) => setNoSabeFirmar(e.target.checked)}
                    className="h-4 w-4 accent-[var(--brand-blue)]"
                  />
                  Manifiesta NO saber firmar
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white">
            <div className="px-4 py-3 border-b border-zinc-200 text-xs font-semibold text-zinc-600 uppercase tracking-wide">
              Foto Usuario
            </div>
            <div className="p-4">
              {fotoDataUrl ? (
                <div className="flex justify-center">
                  <img src={fotoDataUrl} alt="Foto registrada" className="h-48 w-auto max-w-full object-contain rounded-lg bg-zinc-50" />
                </div>
              ) : (
                <div className="h-28 w-full rounded-lg border border-dashed border-zinc-200 bg-zinc-50 flex items-center justify-center text-xs text-zinc-500">
                  Sin foto registrada
                </div>
              )}
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowFotoModal(true)}
                  className="h-9 px-4 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:opacity-95"
                >
                  Registrar Foto
                </button>
              </div>
            </div>
          </div>
        </div>
      </SummaryCard>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5">
        <div className="text-xs text-zinc-500 uppercase tracking-wide">Observaciones</div>
        <div className="text-sm text-zinc-900 mt-2 whitespace-pre-wrap">
          {paso2.observaciones || "—"}
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5">
        <div className="text-sm font-semibold text-zinc-900">Exámenes a Realizar</div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-zinc-100 text-zinc-700">
                <th className="text-left px-3 py-2 w-12">No.</th>
                <th className="text-left px-3 py-2">Exámenes a Realizar</th>
                <th className="text-left px-3 py-2 w-40">Fecha Atención</th>
              </tr>
            </thead>
            <tbody>
              {examenes.map((examen, index) => (
                <tr key={`${examen}-${index}`} className="border-b border-zinc-100">
                  <td className="px-3 py-2 text-zinc-600">{index + 1}</td>
                  <td className="px-3 py-2 text-zinc-800">{examen}</td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      className="text-[var(--brand-blue)] hover:underline text-sm"
                      onClick={() => {
                        setSelectedExamen(examen);
                        setShowAsignar(true);
                      }}
                    >
                      Asignar Cita
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <label className="text-sm font-semibold text-zinc-900">
            Enviar automáticamente el Concepto Médico Ocupacional cuando se registre la firma de recibido del trabajador? <span className="text-rose-600">*</span>
          </label>
          <div className="mt-2 flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-zinc-700">
              <input
                type="radio"
                name="autoEnviar"
                value="si"
                checked={autoEnviar === "si"}
                onChange={() => setAutoEnviar("si")}
                className="h-4 w-4 accent-[var(--brand-blue)]"
              />
              Sí
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-700">
              <input
                type="radio"
                name="autoEnviar"
                value="no"
                checked={autoEnviar === "no"}
                onChange={() => setAutoEnviar("no")}
                className="h-4 w-4 accent-[var(--brand-blue)]"
              />
              No
            </label>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex items-center gap-3 pt-6 border-t border-zinc-200 rounded-2xl bg-white p-6">
        <button
          type="button"
          onClick={onBack}
          className="h-12 px-6 rounded-xl text-sm font-semibold text-zinc-700 border-2 border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 transition-all duration-200"
        >
          Volver
        </button>

        <button
          type="button"
          className="h-12 px-8 rounded-xl text-white font-bold shadow-md transition-all duration-200 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] hover:shadow-lg hover:scale-105"
        >
          Agendar Cita
        </button>

        <button
          type="button"
          className="h-12 px-6 rounded-xl text-sm font-semibold text-zinc-600 border-2 border-zinc-200 hover:bg-zinc-50 transition-all duration-200"
        >
          Cancelar
        </button>
      </div>

      {showFirmaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-zinc-200">
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white rounded-t-2xl">
              <div className="font-semibold">Registrar Firma</div>
              <button
                type="button"
                onClick={() => setShowFirmaModal(false)}
                className="h-8 w-8 rounded-full hover:bg-white/20"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>
            <div className="p-5">
              <div className="text-sm text-zinc-700 mb-3">
                {`${paso2.primerNombre} ${paso2.segundoNombre} ${paso2.primerApellido} ${paso2.segundoApellido}`
                  .replace(/\s+/g, " ")
                  .trim()}
              </div>
              <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-3">
                <canvas
                  ref={canvasRef}
                  width={720}
                  height={220}
                  onPointerDown={startDraw}
                  onPointerMove={draw}
                  onPointerUp={endDraw}
                  onPointerLeave={endDraw}
                  className="w-full h-48 rounded-lg bg-white"
                />
              </div>
            </div>
            <div className="px-5 py-4 border-t border-zinc-200 flex justify-between gap-3">
              <button
                type="button"
                onClick={clearFirma}
                className="h-10 px-4 rounded-xl text-sm font-semibold text-zinc-700 border border-zinc-200 hover:bg-zinc-50"
              >
                Borrar firma
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowFirmaModal(false)}
                  className="h-10 px-4 rounded-xl text-sm font-semibold text-zinc-700 border border-zinc-200 hover:bg-zinc-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={saveFirma}
                  className="h-10 px-5 rounded-xl text-sm font-semibold text-white bg-[var(--brand-blue)]"
                >
                  Registrar Firma
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-zinc-200">
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white rounded-t-2xl">
              <div className="font-semibold">Capturar Foto</div>
              <button
                type="button"
                onClick={() => setShowFotoModal(false)}
                className="h-8 w-8 rounded-full hover:bg-white/20"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>
            <div className="p-5">
              <div className="text-sm text-zinc-700 mb-3">
                {`${paso2.primerNombre} ${paso2.segundoNombre} ${paso2.primerApellido} ${paso2.segundoApellido}`
                  .replace(/\s+/g, " ")
                  .trim()}
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 flex flex-col items-center gap-3">
                {fotoDataUrl ? (
                  <img src={fotoDataUrl} alt="Foto capturada" className="h-96 w-64 rounded-lg object-cover" />
                ) : (
                  <video ref={videoRef} autoPlay playsInline className="h-96 w-64 rounded-lg object-cover bg-black" />
                )}
              </div>
            </div>
            <div className="px-5 py-4 border-t border-zinc-200 flex flex-col gap-3">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const stream = videoRef.current?.srcObject as MediaStream | null;
                    stream?.getTracks().forEach((t) => t.stop());
                    if (videoRef.current) videoRef.current.srcObject = null;
                    setFotoDataUrl("");
                    setShowFotoModal(false);
                  }}
                  className="flex-1 h-10 rounded-xl text-sm font-semibold text-zinc-700 border border-zinc-200 hover:bg-zinc-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (videoRef.current) {
                      const canvas = document.createElement("canvas");
                      const vw = videoRef.current.videoWidth;
                      const vh = videoRef.current.videoHeight;
                      canvas.width = vw;
                      canvas.height = vh;
                      const ctx = canvas.getContext("2d");
                      if (ctx) {
                        ctx.drawImage(videoRef.current, 0, 0, vw, vh);
                        const dataUrl = canvas.toDataURL("image/jpeg");
                        setFotoDataUrl(dataUrl);
                        const stream = videoRef.current.srcObject as MediaStream | null;
                        stream?.getTracks().forEach((t) => t.stop());
                        videoRef.current.srcObject = null;
                      }
                    }
                  }}
                  className="flex-1 h-10 rounded-xl text-sm font-semibold text-white bg-[var(--brand-blue)] hover:opacity-95"
                >
                  Capturar
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFotoDataUrl("");
                    if (showFotoModal && videoRef.current) {
                      navigator.mediaDevices
                        .getUserMedia({ video: { facingMode: "user" } })
                        .then((stream) => {
                          if (videoRef.current) videoRef.current.srcObject = stream;
                        })
                        .catch((err) => console.error("Error accediendo a cámara:", err));
                    }
                  }}
                  disabled={!fotoDataUrl}
                  className="flex-1 h-10 rounded-xl text-sm font-semibold text-zinc-700 border border-zinc-200 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Limpiar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const stream = videoRef.current?.srcObject as MediaStream | null;
                    stream?.getTracks().forEach((t) => t.stop());
                    if (videoRef.current) videoRef.current.srcObject = null;
                    setShowFotoModal(false);
                  }}
                  disabled={!fotoDataUrl}
                  className="flex-1 h-10 rounded-xl text-sm font-semibold text-white bg-[var(--brand-green)] hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAsignar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 p-4">
          <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-zinc-200">
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white rounded-t-2xl">
              <div className="font-semibold">Asignar - {selectedExamen}</div>
              <button
                type="button"
                onClick={() => setShowAsignar(false)}
                className="h-8 w-8 rounded-full hover:bg-white/20"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="px-5 py-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                  <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Trabajador</div>
                  <div className="mt-2 text-sm font-semibold text-zinc-900">
                    {`${paso2.primerNombre} ${paso2.segundoNombre} ${paso2.primerApellido} ${paso2.segundoApellido}`.replace(/\s+/g, " ").trim() || "—"}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600">
                    {selectedExamen}
                    <span className="h-1 w-1 rounded-full bg-zinc-400" />
                    20 min
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                  <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Examen</div>
                  <div className="mt-2 text-sm text-zinc-900">{selectedExamen}</div>
                  <div className="mt-3 text-xs text-zinc-500">Tipo de evaluación asignada</div>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                  <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Fecha</div>
                  <div className="mt-2 text-sm text-zinc-900">Selecciona una fecha</div>
                  <select
                    value={selectedFecha}
                    onChange={(e) => setSelectedFecha(e.target.value)}
                    className="mt-3 w-full h-11 rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                  >
                    <option>Miércoles, 21 de Enero de 2026</option>
                    <option>Jueves, 22 de Enero de 2026</option>
                    <option>Viernes, 23 de Enero de 2026</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-zinc-200 bg-white overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 border-b border-zinc-200">
                  <div className="text-sm font-semibold text-zinc-700">Disponibilidad · {selectedFecha}</div>
                  <div className="text-xs text-zinc-500">Selecciona un horario</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  {["Dr. Alejandro Amaya", "Dr. Juan Carlos Bentería", "Dra. Tania Pamela Arteaga"].map((medico) => (
                    <div key={medico} className="border-t border-zinc-200 md:border-t-0 md:border-l first:md:border-l-0">
                      <div className="px-4 py-3 text-sm font-semibold text-zinc-800 bg-white">
                        {medico}
                      </div>
                      <div className="px-4 pb-4 grid gap-2">
                        {["10:30", "11:00", "11:30"].map((hora) => (
                          <label key={hora} className="flex items-center justify-between rounded-xl border border-zinc-200 px-3 py-2 text-sm hover:border-[var(--brand-blue)] hover:bg-[rgb(var(--brand-blue-rgb)/0.06)]">
                            <span className="font-medium text-zinc-800">{hora}</span>
                            <input type="radio" name="slot" className="h-4 w-4 accent-[var(--brand-blue)]" />
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-zinc-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAsignar(false)}
                className="h-10 px-4 rounded-xl text-sm font-semibold text-zinc-700 border border-zinc-200 hover:bg-zinc-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => setShowAsignar(false)}
                className="h-10 px-5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)]"
              >
                Confirmar cita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ExtramuralWizard({ defaultStep = 1 }: { defaultStep?: 1 | 2 | 3 }) {
  const router = useRouter();
  const [showBanner, setShowBanner] = useState(true);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(defaultStep);
  
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
    lugarResidencia: "",
    direccion: "",
    estrato: "",
    zonaResidencia: "",
    localidad: "",
    telefono: "",
    email: "",
    eps: "",
    arl: "",
    afp: "",
    acompanante: "",
    convenio: "",
    empresaUsuaria: "",
    empresaIgualConvenio: false,
    cargo: "",
    sede: "",
    ciudadAtencion: "",
    entornoAtencion: "",
    tipoEvaluacion: "",
    enfasisEvaluacion: [],
    examenesParaclinicos: [],
    examenesLaboratorio: [],
    vacunacion: [],
    observaciones: "",
    prioridadAtencion: "",
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
    Boolean(paso2.identidadGenero) &&
    Boolean(paso2.fechaNacimiento) &&
    Boolean(paso2.tipoSangre) &&
    Boolean(paso2.ocupacion) &&
    Boolean(paso2.estadoCivil) &&
    Boolean(paso2.lugarResidencia) &&
    Boolean(paso2.estrato) &&
    Boolean(paso2.zonaResidencia) &&
    Boolean(paso2.telefono) &&
    Boolean(paso2.eps) &&
    Boolean(paso2.arl) &&
    Boolean(paso2.afp) &&
    Boolean(paso2.acompanante) &&
    Boolean(paso2.convenio) &&
    Boolean(paso2.empresaUsuaria) &&
    Boolean(paso2.cargo) &&
    Boolean(paso2.ciudadAtencion) &&
    Boolean(paso2.entornoAtencion) &&
    Boolean(paso2.tipoEvaluacion) &&
    Boolean(paso2.prioridadAtencion);



  return (
    <div className="space-y-8">

      <header className="space-y-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-zinc-900">Nuevo Servicio</h1>
          <span className="text-zinc-200">·</span>
          <span className="text-2xl font-semibold text-[var(--brand-blue)]">Modalidad Extramural</span>
        </div>
      </header>

      <section className="bg-[#f7fafc] rounded-2xl border border-zinc-200 shadow-sm p-6">
        <Stepper currentStep={currentStep} />

        {currentStep === 1 && (
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white">
            <form
              className="p-6 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                setTouchedPaso1(true);
                if (!isValidPaso1) return;
                setCurrentStep(2);
                router.push("/nuevo-servicio/extramural/paso-2");
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="tipoIdentificacion" className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                    Tipo de Identificación
                    <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="tipoIdentificacion"
                      name="tipoIdentificacion"
                      value={paso1.tipoIdentificacion}
                      onChange={(e) => {
                        setPaso1({
                          ...paso1,
                          tipoIdentificacion: e.target.value as TipoIdentificacion,
                        });
                      }}
                      className={cn(
                        "w-full h-12 rounded-xl border-2 bg-white px-4 pr-10 text-sm text-zinc-900 outline-none appearance-none font-medium transition-all duration-200",
                        "focus:ring-2 focus:ring-[rgb(var(--brand-blue-rgb)/0.3)] focus:border-[var(--brand-blue)] focus:shadow-md",
                        "hover:border-[var(--brand-blue)]/30",
                        touchedPaso1 && !paso1.tipoIdentificacion 
                          ? "border-rose-400 bg-rose-50" 
                          : "border-zinc-300",
                      )}
                    >
                      <option value="" disabled>
                        Selecciona el tipo de documento
                      </option>
                      {opciones.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-500">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-600 italic">
                    Selecciona cédula, pasaporte u otro documento válido
                  </p>
                  {touchedPaso1 && !paso1.tipoIdentificacion && (
                    <InlineError message="Por favor, selecciona el tipo de identificación." />
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="numeroIdentificacion" className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                    Número de Identificación
                    <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="numeroIdentificacion"
                    name="numeroIdentificacion"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Ej: 1109542604"
                    value={paso1.numeroIdentificacion}
                    onChange={(e) => {
                      const onlyDigits = e.target.value.replace(/\D+/g, "");
                      setPaso1({ ...paso1, numeroIdentificacion: onlyDigits });
                    }}
                    onKeyDown={(e) => {
                      const allowed = [
                        "Backspace",
                        "Delete",
                        "Tab",
                        "ArrowLeft",
                        "ArrowRight",
                        "Home",
                        "End",
                      ];
                      if (e.ctrlKey || e.metaKey) return; // permitir copiar/pegar, seleccionar todo
                      const isDigit = /[0-9]/.test(e.key);
                      const isAllowed = allowed.includes(e.key);
                      if (!isDigit && !isAllowed) {
                        e.preventDefault();
                      }
                    }}
                    onPaste={(e) => {
                      const text = (e.clipboardData.getData("text") || "").replace(/\D+/g, "");
                      e.preventDefault();
                      const target = e.target as HTMLInputElement;
                      const start = target.selectionStart ?? target.value.length;
                      const end = target.selectionEnd ?? target.value.length;
                      const next = target.value.slice(0, start) + text + target.value.slice(end);
                      setPaso1({ ...paso1, numeroIdentificacion: next });
                    }}
                    className={cn(
                      "w-full h-12 rounded-xl border-2 px-4 outline-none transition-all duration-200 font-medium",
                      "focus:ring-2 focus:ring-[rgb(var(--brand-blue-rgb)/0.3)] focus:border-[var(--brand-blue)] focus:shadow-md",
                      "hover:border-[var(--brand-blue)]/30",
                      touchedPaso1 && !paso1.numeroIdentificacion.trim()
                        ? "border-rose-400 bg-rose-50"
                        : touchedPaso1 && paso1.numeroIdentificacion.trim().length > 0 && paso1.numeroIdentificacion.trim().length < 4
                          ? "border-amber-400 bg-amber-50"
                          : "border-zinc-300 bg-white",
                    )}
                  />
                  {touchedPaso1 && !paso1.numeroIdentificacion.trim() && (
                    <InlineError message="Por favor, ingresa el número de identificación." />
                  )}
                  {touchedPaso1 &&
                    paso1.numeroIdentificacion.trim().length > 0 &&
                    paso1.numeroIdentificacion.trim().length < 4 && (
                      <InlineError message="Mínimo 4 caracteres requeridos." />
                    )}
                  <p className="text-xs text-zinc-600 italic">Sin puntos ni guiones.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-zinc-200">
                <button
                  type="submit"
                  disabled={!isValidPaso1}
                  className={cn(
                    "h-12 px-8 rounded-xl text-white font-bold shadow-md transition-all duration-200 flex items-center gap-2",
                    "bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)]",
                    "hover:shadow-lg hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none",
                  )}
                >
                  Continuar
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/nuevo-servicio")}
                  className="h-12 px-6 rounded-xl text-sm font-semibold text-zinc-700 border-2 border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 transition-all duration-200"
                >
                  Cancelar
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
            isValid={isValidPaso2}
            onBack={() => {
              setCurrentStep(1);
              router.push("/nuevo-servicio/extramural");
            }}
            onCancel={() => {
              router.push("/nuevo-servicio");
            }}
            onChange={(data) => setPaso2(data)}
            onSubmit={() => {
              setTouchedPaso2(true);
              if (!isValidPaso2) return;
              setCurrentStep(3);
              router.push("/nuevo-servicio/extramural/paso-3");
            }}
          />
        )}

        {currentStep === 3 && (
          <Paso3Summary
            paso1={paso1}
            paso2={paso2}
            onBack={() => {
              setCurrentStep(2);
              router.push("/nuevo-servicio/extramural/paso-2");
            }}
          />
        )}
      </section>
    </div>
  );
}

export default function NuevoServicioExtramural() {
  return <ExtramuralWizard defaultStep={1} />;
}
