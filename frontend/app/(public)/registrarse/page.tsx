
"use client";

// Componente para mostrar cada requisito de contraseña
function PasswordRequirement({ label, valid }) {
  return (
    <li className={valid ? "text-green-600 flex items-center" : "text-red-500 flex items-center"}>
      {valid ? (
        <svg className="mr-1" width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
      ) : (
        <svg className="mr-1" width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
      )}
      {label}
    </li>
  );
}

import { useEffect, useState, useRef } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegistrarsePage() {
    // Para autocompletado de ciudades/departamentos
    const [cityQuery, setCityQuery] = useState("");
    const [cityResults, setCityResults] = useState([]);
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [municipiosColombia, setMunicipiosColombia] = useState([]);
    const cityInputRef = useRef(null);
    // Cargar municipios una sola vez
    useEffect(() => {
      fetch("/data/municipios-colombia.json")
        .then((res) => res.json())
        .then((data) => setMunicipiosColombia(data));
    }, []);

    // Buscar ciudades/departamentos según el query
    useEffect(() => {
      if (cityQuery.length > 1 && municipiosColombia.length > 0) {
        const q = cityQuery.toLowerCase();
        const results = municipiosColombia.filter(
          (m) =>
            m.nombre.toLowerCase().includes(q) ||
            m.departamento.toLowerCase().includes(q)
        ).slice(0, 10);
        setCityResults(results);
        setShowCityDropdown(results.length > 0);
      } else {
        setCityResults([]);
        setShowCityDropdown(false);
      }
    }, [cityQuery, municipiosColombia]);
  const router = useRouter();
  const [logoError, setLogoError] = useState(false);
  const [form, setForm] = useState({
    // usuario: "",
    nombre: "",
    numeroIdentificacion: "",
    sexo: "",
    tipoUsuario: "",
    fechaNacimiento: "",
    lugarResidencia: "",
    direccion: "",
    telefono: "",
    email: "",
    contrasena: "",
    confirmContrasena: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [logoIndex, setLogoIndex] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const logoCandidates = [
    "/images/logo.jpeg",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando empiece a escribir
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Ya no se valida usuario, solo número de identificación

    // Validar contraseña
    if (!form.contrasena.trim()) {
      errors.contrasena = "La contraseña es requerida";
    } else if (form.contrasena.length < 8) {
      errors.contrasena = "Mínimo 8 caracteres";
    } else if (!/[A-Z]/.test(form.contrasena)) {
      errors.contrasena = "Debe contener mayúscula";
    } else if (!/[0-9]/.test(form.contrasena)) {
      errors.contrasena = "Debe contener número";
    } else if (!/[!@#$%^&*]/.test(form.contrasena)) {
      errors.contrasena = "Debe contener !@#$%^&*";
    }

    // Validar confirmación de contraseña
    if (form.contrasena !== form.confirmContrasena) {
      errors.confirmContrasena = "Las contraseñas no coinciden";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("http://localhost:4000/api/usuarios/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // usuario: form.usuario,
          nombre: form.nombre,
          numeroIdentificacion: form.numeroIdentificacion,
          sexo: form.sexo,
          tipoUsuario: form.tipoUsuario,
          fechaNacimiento: form.fechaNacimiento,
          lugarResidencia: form.lugarResidencia,
          direccion: form.direccion,
          telefono: form.telefono,
          email: form.email,
          contrasena: form.contrasena
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error en el registro");
      } else {
        setSuccess(true);
        setForm({
          // usuario: "",
          nombre: "",
          numeroIdentificacion: "",
          sexo: "",
          tipoUsuario: "",
          fechaNacimiento: "",
          lugarResidencia: "",
          direccion: "",
          telefono: "",
          email: "",
          contrasena: "",
          confirmContrasena: ""
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      setError("Error de red o servidor");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#eaf6fb] to-[#e6f7ef] overflow-hidden">
      <div className="w-full flex h-screen overflow-hidden">
        {/* Columna Izquierda - Imagen */}
        <div className="hidden lg:flex w-1/2 bg-white items-center justify-center p-0 overflow-hidden">
          <Image 
            src="/images/imagen1.jpeg" 
            alt="Imagen Registro" 
            width={600} 
            height={900} 
            className="w-full h-full object-cover" 
            style={{ objectPosition: "center bottom" }}
            priority
          />
        </div>

        {/* Columna Derecha - Formulario Centrado */}
        <main className="w-full lg:w-1/2 bg-[#f0fdf4] flex flex-col items-center justify-center p-8 overflow-hidden">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div className="flex flex-col items-center space-y-4 mb-8">
              {logoError ? (
                <h1 className="text-3xl font-semibold text-zinc-900">Somedi IPS</h1>
              ) : (
                <Image
                  src={logoCandidates[logoIndex]}
                  alt="Logo Somedi IPS"
                  width={180}
                  height={85}
                  className="rounded-2xl"
                  priority
                  onError={() => {
                    if (logoIndex < logoCandidates.length - 1) {
                      setLogoIndex((i) => i + 1);
                    } else {
                      setLogoError(true);
                    }
                  }}
                />
              )}
              <h1 className="text-2xl font-semibold text-zinc-900">Registro de Usuario</h1>
              <p className="text-[var(--brand-blue)] text-center text-sm">Completa tus datos para crear tu cuenta</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>


              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-1">Nombre Usuario</label>
                <input 
                  name="nombre" 
                  type="text" 
                  placeholder="Digite su nombre completo aquí"
                  className={`w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 ${fieldErrors.nombre ? 'border-red-500' : 'border-zinc-200'}`}
                  value={form.nombre} 
                  onChange={handleChange} 
                  required 
                />
                {fieldErrors.nombre && <p className="text-xs text-red-600 mt-1">{fieldErrors.nombre}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-1">Número de Identificación</label>
                <input 
                  name="numeroIdentificacion" 
                  type="text" 
                  placeholder="Digite su cédula o documento"
                  className={`w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 ${fieldErrors.numeroIdentificacion ? 'border-red-500' : 'border-zinc-200'}`}
                  value={form.numeroIdentificacion} 
                  onChange={handleChange} 
                  required 
                />
                {fieldErrors.numeroIdentificacion && <p className="text-xs text-red-600 mt-1">{fieldErrors.numeroIdentificacion}</p>}
              </div>


              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-1">Contraseña</label>
                <div className="relative">
                  <input
                    name="contrasena"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite su contraseña aquí"
                    className={`w-full h-12 pl-3 pr-12 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 ${fieldErrors.contrasena ? 'border-red-500' : 'border-zinc-200'}`}
                    value={form.contrasena}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.15 3.15a1 1 0 0 1 1.41 0l16.3 16.3a1 1 0 0 1-1.41 1.41l-2.28-2.28A12 12 0 0 1 12 20C6 20 1.73 15.64.37 12.94a2.2 2.2 0 0 1 0-1.88 14.3 14.3 0 0 1 5.3-5.59L3.15 4.56a1 1 0 0 1 0-1.41ZM12 6a6 6 0 0 1 6 6c0 .87-.16 1.7-.47 2.47l-2.01-2.01A3.99 3.99 0 0 0 12 8c-.37 0-.73.05-1.07.14L9.43 6.64A5.9 5.9 0 0 1 12 6Z" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4C6 4 1.73 8.36.37 11.06a2.2 2.2 0 0 0 0 1.88C1.73 15.64 6 20 12 20s10.27-4.36 11.63-7.06a2.2 2.2 0 0 0 0-1.88C22.27 8.36 18 4 12 4Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" fill="currentColor" />
                      </svg>
                    )}
                  </button>
                </div>
                {/* Validación visual de contraseña */}
                <ul className="mt-2 space-y-1 text-xs">
                  <PasswordRequirement
                    label="Mínimo 8 caracteres"
                    valid={form.contrasena.length >= 8}
                  />
                  <PasswordRequirement
                    label="Al menos una mayúscula"
                    valid={/[A-Z]/.test(form.contrasena)}
                  />
                  <PasswordRequirement
                    label="Al menos un número"
                    valid={/[0-9]/.test(form.contrasena)}
                  />
                  <PasswordRequirement
                    label="Al menos un carácter especial (!@#$%^&*)"
                    valid={/[!@#$%^&*]/.test(form.contrasena)}
                  />
                </ul>
                {fieldErrors.contrasena && <p className="text-xs text-red-600 mt-1">{fieldErrors.contrasena}</p>}
              </div>



              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-1">Confirmar Contraseña</label>
                <div className="relative">
                  <input 
                    name="confirmContrasena" 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme su contraseña"
                    className={`w-full h-12 pl-3 pr-12 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 ${fieldErrors.confirmContrasena ? 'border-red-500' : 'border-zinc-200'}`}
                    value={form.confirmContrasena} 
                    onChange={handleChange} 
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    {showConfirmPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.15 3.15a1 1 0 0 1 1.41 0l16.3 16.3a1 1 0 0 1-1.41 1.41l-2.28-2.28A12 12 0 0 1 12 20C6 20 1.73 15.64.37 12.94a2.2 2.2 0 0 1 0-1.88 14.3 14.3 0 0 1 5.3-5.59L3.15 4.56a1 1 0 0 1 0-1.41ZM12 6a6 6 0 0 1 6 6c0 .87-.16 1.7-.47 2.47l-2.01-2.01A3.99 3.99 0 0 0 12 8c-.37 0-.73.05-1.07.14L9.43 6.64A5.9 5.9 0 0 1 12 6Z" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4C6 4 1.73 8.36.37 11.06a2.2 2.2 0 0 0 0 1.88C1.73 15.64 6 20 12 20s10.27-4.36 11.63-7.06a2.2 2.2 0 0 0 0-1.88C22.27 8.36 18 4 12 4Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" fill="currentColor" />
                      </svg>
                    )}
                  </button>
                </div>
                {fieldErrors.confirmContrasena && <p className="text-xs text-red-600 mt-1">{fieldErrors.confirmContrasena}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-1">Tipo de Usuario</label>
                  <select 
                    name="tipoUsuario"
                    value={form.tipoUsuario}
                    onChange={handleChange}
                    className={`w-full h-12 pl-3 pr-4 rounded-xl border bg-white text-zinc-800 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent ${fieldErrors.tipoUsuario ? 'border-red-500' : 'border-zinc-200'}`}
                    required
                  >
                    <option value="">Selecciona</option>
                    <option value="medico">Médico</option>
                    <option value="administrador">Administrador</option>
                  </select>
                  {fieldErrors.tipoUsuario && <p className="text-xs text-red-600 mt-1">{fieldErrors.tipoUsuario}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-1">Sexo</label>
                  <select 
                    name="sexo"
                    value={form.sexo}
                    onChange={handleChange}
                    className={`w-full h-12 pl-3 pr-4 rounded-xl border bg-white text-zinc-800 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent ${fieldErrors.sexo ? 'border-red-500' : 'border-zinc-200'}`}
                    required
                  >
                    <option value="">Selecciona</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Indeterminado/Intersexual">Otro</option>
                  </select>
                  {fieldErrors.sexo && <p className="text-xs text-red-600 mt-1">{fieldErrors.sexo}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-1">Fecha Nacimiento</label>
                <input 
                  name="fechaNacimiento" 
                  type="date" 
                  className={`w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent ${fieldErrors.fechaNacimiento ? 'border-red-500' : 'border-zinc-200'}`}
                  value={form.fechaNacimiento} 
                  onChange={handleChange} 
                  required 
                />
                {fieldErrors.fechaNacimiento && <p className="text-xs text-red-600 mt-1">{fieldErrors.fechaNacimiento}</p>}
              </div>


              <div className="relative">
                <label className="block text-sm font-semibold text-zinc-900 mb-1">Lugar Residencia</label>
                <input
                  name="lugarResidencia"
                  type="text"
                  placeholder="Digite ciudad o departamento"
                  className={`w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 ${fieldErrors.lugarResidencia ? 'border-red-500' : 'border-zinc-200'}`}
                  value={form.lugarResidencia}
                  onChange={e => {
                    handleChange(e);
                    setCityQuery(e.target.value);
                  }}
                  onFocus={() => setShowCityDropdown(cityResults.length > 0)}
                  autoComplete="off"
                  ref={cityInputRef}
                  required
                />
                {showCityDropdown && (
                  <ul className="absolute z-10 bg-white border border-zinc-200 rounded-xl mt-1 w-full max-h-56 overflow-y-auto shadow-lg">
                    {cityResults.map((city, idx) => (
                      <li
                        key={city.codigo}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-sm"
                        onClick={() => {
                          setForm(f => ({ ...f, lugarResidencia: `${city.nombre}, ${city.departamento}` }));
                          setCityQuery(`${city.nombre}, ${city.departamento}`);
                          setShowCityDropdown(false);
                          cityInputRef.current?.blur();
                        }}
                      >
                        <span className="font-medium">{city.nombre}</span>
                        <span className="text-zinc-500">, {city.departamento}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {fieldErrors.lugarResidencia && <p className="text-xs text-red-600 mt-1">{fieldErrors.lugarResidencia}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-1">Dirección</label>
                  <input 
                    name="direccion" 
                    type="text" 
                    placeholder="Digite su dirección aquí"
                    className={`w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 ${fieldErrors.direccion ? 'border-red-500' : 'border-zinc-200'}`}
                    value={form.direccion} 
                    onChange={handleChange} 
                  />
                  {fieldErrors.direccion && <p className="text-xs text-red-600 mt-1">{fieldErrors.direccion}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-1">Teléfono</label>
                  <input 
                    name="telefono" 
                    type="text" 
                    placeholder="Digite su número aquí"
                    className={`w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 ${fieldErrors.telefono ? 'border-red-500' : 'border-zinc-200'}`}
                    value={form.telefono} 
                    onChange={handleChange} 
                  />
                  {fieldErrors.telefono && <p className="text-xs text-red-600 mt-1">{fieldErrors.telefono}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-1">e-Mail</label>
                <input 
                  name="email" 
                  type="email" 
                  placeholder="Digite su correo aquí"
                  className={`w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 ${fieldErrors.email ? 'border-red-500' : 'border-zinc-200'}`}
                  value={form.email} 
                  onChange={handleChange} 
                  required 
                />
                {fieldErrors.email && <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>}
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              {success && (
                <p className="text-sm text-green-600 text-center">¡Registro exitoso! Redirigiendo...</p>
              )}

              <button
                type="submit"
                disabled={loading || success}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white font-semibold shadow-lg hover:opacity-95 transition-opacity disabled:opacity-60"
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link href="/" className="text-[var(--brand-blue)] font-semibold hover:underline text-base">
                ¿Ya tienes cuenta? <span className="underline">Inicia sesión</span>
              </Link>
            </div>

            <p className="mt-6 text-sm text-center text-zinc-600">
              Al hacer clic en registrarse está aceptando nuestros
              {" "}
              <Link href="/legal/terminos-y-condiciones" className="text-blue-600 hover:underline">Términos y Condiciones del servicio</Link>
              {" "}y está aceptando nuestra{" "}
              <Link href="/legal/politica-de-datos" className="text-blue-600 hover:underline">Política de tratamiento de datos</Link>.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
