"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [cargo, setCargo] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const nextPath = useMemo(() => {
    const next = searchParams.get("next");
    return next && next.startsWith("/") ? next : "/nuevo-servicio";
  }, [searchParams]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const hasSession = document.cookie
      .split(";")
      .some((c) => c.trim().startsWith("somedi_session=1"));
    if (hasSession) router.replace("/nuevo-servicio");
  }, [router]);
  const logoCandidates = [
    "/images/logo.jpeg",
  ];
  const [logoIndex, setLogoIndex] = useState(0);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#eaf6fb] to-[#e6f7ef] overflow-hidden">
      <div className="w-full flex h-screen overflow-hidden">
        {/* Columna Izquierda - Imagen */}
        <div className="hidden lg:flex w-1/2 bg-white items-center justify-center p-0 overflow-hidden">
          <Image 
            src="/images/imagen1.jpeg" 
            alt="Imagen Login" 
            width={600} 
            height={900} 
            className="w-full h-full object-cover" 
            style={{ objectPosition: "center bottom" }}
            priority
          />
        </div>

        {/* Columna Derecha - Formulario Centrado */}
        <main className="w-full lg:w-1/2 bg-[#f0fdf4] flex flex-col items-center justify-center p-8 overflow-hidden">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
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
              <h2 className="text-2xl font-bold text-zinc-900">Iniciar Sesión</h2>
              <p className="text-[var(--brand-blue)] text-center">Software para Seguridad y Salud Laboral</p>
            </div>

            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                if (submitting) return;
                if (!usuario.trim() || !contrasena.trim() || !cargo) {
                  setError("Completa usuario, contraseña y cargo.");
                  return;
                }

                setError("");
                setSubmitting(true);

                try {
                  // Enviar las credenciales al backend para autenticar
                  const res = await fetch("http://localhost:4000/api/usuarios/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      usuario: usuario.trim(),
                      contrasena: contrasena.trim(),
                      cargo: cargo
                    }),
                  });

                  if (!res.ok) {
                    const data = await res.json();
                    setError(data.error || "Usuario o contraseña incorrectos");
                    setSubmitting(false);
                    return;
                  }

                  // Si la autenticación es exitosa
                  const data = await res.json();
                  
                  // Guardar sesión
                  document.cookie = `somedi_session=1; Path=/; SameSite=Lax;`;
                  document.cookie = `usuario_id=${data.id}; Path=/; SameSite=Lax;`;
                  document.cookie = `tipo_usuario=${data.tipo_usuario}; Path=/; SameSite=Lax;`;
                  
                  // Redirecionar según el tipo de usuario
                  const redirectPath = data.tipo_usuario === "Médico" ? "/medico" : "/nuevo-servicio";
                  router.push(redirectPath);
                  router.refresh();
                } catch (err) {
                  setError("Error de conexión con el servidor");
                  setSubmitting(false);
                }
              }}
            >
          <div className="relative">
            <label htmlFor="usuario" className="sr-only">Usuario</label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.761-3.582-5-8-5Z" fill="#9ca3af" />
              </svg>
            </span>
            <input
              id="usuario"
              name="usuario"
              type="text"
              placeholder="Usuario"
              autoComplete="username"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
            />
          </div>

          <div className="relative">
            <label htmlFor="contrasena" className="sr-only">Contraseña</label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 10a4 4 0 1 1 8 0v2h1a1 1 0 0 1 1 1v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a1 1 0 0 1 1-1h1v-2Zm2 2h4v-2a2 2 0 1 0-4 0v2Z" fill="#9ca3af" />
              </svg>
            </span>
            <input
              id="contrasena"
              name="contrasena"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              autoComplete="current-password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="w-full h-12 pl-10 pr-10 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
            />
            <button
              type="button"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.15 3.15a1 1 0 0 1 1.41 0l16.3 16.3a1 1 0 0 1-1.41 1.41l-2.28-2.28A12 12 0 0 1 12 20C6 20 1.73 15.64.37 12.94a2.2 2.2 0 0 1 0-1.88 14.3 14.3 0 0 1 5.3-5.59L3.15 4.56a1 1 0 0 1 0-1.41ZM12 6a6 6 0 0 1 6 6c0 .87-.16 1.7-.47 2.47l-2.01-2.01A3.99 3.99 0 0 0 12 8c-.37 0-.73.05-1.07.14L9.43 6.64A5.9 5.9 0 0 1 12 6Z" fill="#9ca3af" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4C6 4 1.73 8.36.37 11.06a2.2 2.2 0 0 0 0 1.88C1.73 15.64 6 20 12 20s10.27-4.36 11.63-7.06a2.2 2.2 0 0 0 0-1.88C22.27 8.36 18 4 12 4Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" fill="#9ca3af" />
                </svg>
              )}
            </button>
          </div>

          <div className="relative">
            <label htmlFor="cargo" className="sr-only">Cargo</label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 4h14v2H5zM5 18h14v2H5zM9 9h10v2H9zM9 13h10v2H9zM5 9h2v2H5zM5 13h2v2H5z" fill="#9ca3af" />
              </svg>
            </span>
            <select
              id="cargo"
              name="cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-zinc-200 bg-white text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
            >
              <option value="">Selecciona tu cargo</option>
              <option value="medico">Médico</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white font-semibold shadow-lg hover:opacity-95 transition-opacity"
          >
            {submitting ? "Ingresando..." : "Ingresar"}
          </button>
            </form>

            <div className="mt-4 text-center">
              <Link href="/registrarse" className="text-[var(--brand-blue)] font-semibold hover:underline text-base">
                ¿No tienes cuenta? <span className="underline">Registrarse</span>
              </Link>
            </div>

            <p className="mt-6 text-sm text-center text-zinc-600">
              Al hacer clic en ingresar está aceptando nuestros
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
