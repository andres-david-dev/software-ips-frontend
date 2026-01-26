"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegistrarsePage() {
  const [form, setForm] = useState({
    nombre: "",
    sexo: "",
    fechaNacimiento: "",
    lugarResidencia: "",
    direccion: "",
    telefono: "",
    email: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      // Cambia la URL al endpoint real del backend Express
      const res = await fetch("http://localhost:4000/api/usuarios/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error en el registro");
      } else {
        setSuccess(true);
        setForm({
          nombre: "",
          sexo: "",
          fechaNacimiento: "",
          lugarResidencia: "",
          direccion: "",
          telefono: "",
          email: ""
        });
      }
    } catch (err) {
      setError("Error de red o servidor");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eaf6fb] to-[#e6f7ef] py-8 px-2">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <Image src="/images/logo.jpeg" alt="Logo Somedi IPS" width={180} height={80} className="mb-2" />
          <h1 className="text-2xl font-bold text-[var(--brand-blue)]">Registro de Usuario</h1>
          <p className="text-zinc-500 text-center text-sm">Completa tus datos para crear tu cuenta</p>
        </div>
        <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-1">Nombre Usuario</label>
            <input name="nombre" type="text" className="w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.nombre} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-zinc-900 mb-1">Sexo *</label>
              <div className="flex flex-col gap-2 mt-1">
                <label className="flex items-center gap-2 text-sm"><input type="radio" name="sexo" value="Femenino" checked={form.sexo === "Femenino"} onChange={handleChange} required />Femenino</label>
                <label className="flex items-center gap-2 text-sm"><input type="radio" name="sexo" value="Indeterminado/Intersexual" checked={form.sexo === "Indeterminado/Intersexual"} onChange={handleChange} />Indeterminado/Intersexual</label>
                <label className="flex items-center gap-2 text-sm"><input type="radio" name="sexo" value="Masculino" checked={form.sexo === "Masculino"} onChange={handleChange} />Masculino</label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-900 mb-1">Fecha Nacimiento</label>
              <input name="fechaNacimiento" type="date" className="w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.fechaNacimiento} onChange={handleChange} required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-zinc-900 mb-1">Lugar Residencia *</label>
              <input name="lugarResidencia" type="text" className="w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.lugarResidencia} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-900 mb-1">Dirección</label>
              <input name="direccion" type="text" className="w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.direccion} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-900 mb-1">Teléfono</label>
              <input name="telefono" type="text" className="w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.telefono} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-900 mb-1">e-Mail *</label>
              <input name="email" type="email" className="w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.email} onChange={handleChange} required />
            </div>
          </div>
          {error && <div className="text-red-600 text-sm text-center font-semibold mt-2">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center font-semibold mt-2">¡Registro exitoso! Ahora puedes iniciar sesión.</div>}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] text-base font-semibold text-white hover:opacity-90 shadow-md transition-all disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </div>
          <div className="text-center mt-2">
            <Link href="/" className="text-[var(--brand-blue)] hover:underline text-sm">¿Ya tienes cuenta? Inicia sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
