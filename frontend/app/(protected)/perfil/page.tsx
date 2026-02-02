"use client";
// Extiende el tipo Window para evitar error de TS con window.perfilFormData
declare global {
  interface Window {
    perfilFormData?: any;
  }
}
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type SuccessModalProps = {
  open: boolean;
  onClose: () => void;
};

function SuccessModal({ open, onClose }: SuccessModalProps) {
  if (!open) return null;
  return (
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
            Tu cuenta ha sido eliminada exitosamente.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] px-6 py-3 text-base font-semibold text-white hover:opacity-90 shadow-md transition-all"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

type DeleteAccountModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (input: string) => void;
  loading: boolean;
  nombre: string;
  email: string;
};

function DeleteAccountModal({ open, onClose, onConfirm, loading, nombre, email }: DeleteAccountModalProps) {
  const [input, setInput] = useState("");
  useEffect(() => { if (!open) setInput(""); }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full mx-4 overflow-hidden">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Eliminar Cuenta</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-white/80 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-4 space-y-3">
          <p className="text-sm text-zinc-800">
            ¿Estás seguro de eliminar tu cuenta?
          </p>
          <p className="text-sm text-zinc-700 font-semibold">{nombre || "-"}</p>
          <p className="text-sm text-zinc-700">
            <strong>Email:</strong> {email || "-"}
          </p>
          <p className="text-sm text-zinc-700">Esta acción es irreversible.</p>
          <div className="border-t border-zinc-200 pt-3">
            <label htmlFor="confirm" className="text-sm font-semibold text-zinc-900">
              Escribe "ELIMINAR" para confirmar
            </label>
            <input
              id="confirm"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              placeholder="ELIMINAR"
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-zinc-200 flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-6 rounded-xl border border-zinc-300 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onConfirm(input)}
            className="h-10 px-6 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-rose-500 to-rose-600 hover:shadow-lg transition-all"
            disabled={loading || input !== "ELIMINAR"}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PerfilPage() {
  // 1. Declarar todos los hooks de estado al inicio
  const [form, setForm] = useState({
    nombre: "",
      // Eliminado: estados de eliminar cuenta
    fecha_nacimiento: "",
    lugar_residencia: "",
    direccion: "",
    telefono: "",
    email: ""
  });
  const [originalForm, setOriginalForm] = useState({
    nombre: "",
    numero_identificacion: "",
    sexo: "",
    tipo_usuario: "",
    fecha_nacimiento: "",
    lugar_residencia: "",
    direccion: "",
    telefono: "",
    email: ""
  });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordValid, setCurrentPasswordValid] = useState(false);
  const [checkingCurrent, setCheckingCurrent] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // 2. Efectos después de los hooks
  useEffect(() => { window.perfilFormData = form; }, [form]);
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setError("No se pudo identificar el usuario");
        return;
      }
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', user.email)
        .single();
      if (!error && data) {
        setForm({
          nombre: data.nombre || "",
          numero_identificacion: data.numero_identificacion || "",
          sexo: data.sexo || "",
          tipo_usuario: data.tipo_usuario || "",
          fecha_nacimiento: data.fecha_nacimiento ? data.fecha_nacimiento.slice(0, 10) : "",
          lugar_residencia: data.lugar_residencia || "",
          direccion: data.direccion || "",
          telefono: data.telefono || "",
          email: data.email || ""
        });
        setOriginalForm({
          nombre: data.nombre || "",
          numero_identificacion: data.numero_identificacion || "",
          sexo: data.sexo || "",
          tipo_usuario: data.tipo_usuario || "",
          fecha_nacimiento: data.fecha_nacimiento ? data.fecha_nacimiento.slice(0, 10) : "",
          lugar_residencia: data.lugar_residencia || "",
          direccion: data.direccion || "",
          telefono: data.telefono || "",
          email: data.email || ""
        });
        setError("");
      } else {
        setError("No se pudo obtener los datos del usuario");
      }
    };
    fetchUserData();
  }, []);

  // 3. Funciones del componente
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleCancel() {
    setEdit(false);
    setError("");
    setForm(originalForm); // Restaurar datos originales
  }

  async function handleDeleteAccount(confirmInput: string) {
    if (confirmInput !== "ELIMINAR") return;
    setDeleteLoading(true);
    try {
      // 1. Obtener usuario actual
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setError("No se pudo identificar el usuario");
        setDeleteLoading(false);
        return;
      }
      // 2. Eliminar de la tabla 'usuarios'
      const { error: dbError } = await supabase
        .from('usuarios')
        .delete()
        .eq('email', user.email);
      if (dbError) {
        setError("Error al eliminar datos del usuario en la base de datos");
        setDeleteLoading(false);
        return;
      }
      // 3. Eliminar de Supabase Auth
      const { error: authError } = await supabase.auth.admin.deleteUser(user.id);
      if (authError) {
        setError("Error al eliminar usuario de autenticación");
        setDeleteLoading(false);
        return;
      }
      // 4. Cerrar sesión
      await supabase.auth.signOut();
      setDeleteLoading(false);
      setShowDeleteModal(false);
      setShowSuccessModal(true);
      // 5. Redirigir a /bienvenida tras breve confirmación
      setTimeout(() => {
        window.location.href = "/bienvenida";
      }, 1200);
    } catch (e) {
      setError("Error inesperado al eliminar la cuenta");
      setDeleteLoading(false);
    }
  }

  // 4. Renderizado
  return (
    <div className="space-y-8">
      <header className="space-y-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-zinc-900">Perfil de Usuario</h1>
          <span className="text-zinc-200">·</span>
          <span className="text-2xl font-semibold text-[var(--brand-blue)]">Actualización de datos personales</span>
        </div>
      </header>
      <div>
        <section className="bg-[#f7fafc] rounded-2xl border border-zinc-200 shadow-sm p-6 mb-8">
          {/* Panel blanco de datos personales */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 mb-8">
            <header className="mb-6">
              <h2 className="text-base font-semibold text-[var(--brand-blue)]">Datos personales</h2>
              <p className="text-zinc-500 text-base mt-1">Consulta y edita tu información personal registrada.</p>
            </header>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={async e => {
              e.preventDefault();
              setLoading(true);
              setError("");
              setLoading(true);
              setError("");
              const { data: { user }, error: userError } = await supabase.auth.getUser();
              if (userError || !user) {
                setError("No se pudo identificar el usuario");
                setLoading(false);
                return;
              }
              const { error } = await supabase
                .from('usuarios')
                .update({
                  nombre: form.nombre,
                  numero_identificacion: form.numero_identificacion,
                  sexo: form.sexo,
                  tipo_usuario: form.tipo_usuario,
                  fecha_nacimiento: form.fecha_nacimiento,
                  lugar_residencia: form.lugar_residencia,
                  direccion: form.direccion,
                  telefono: form.telefono,
                  email: form.email
                })
                .eq('email', user.email);
              if (!error) {
                setEdit(false);
                setShowSuccessModal(true);
                setOriginalForm(form);
              } else {
                setError("Error al guardar cambios");
              }
              setLoading(false);
            }}>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Nombre Usuario</label>
                <input type="text" name="nombre" placeholder="Digite su nombre completo aquí" value={form.nombre} onChange={handleChange} disabled={!edit} className={`w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 bg-white ${error && !form.nombre ? 'border-red-500 bg-red-50' : 'border-zinc-200'}`} />
                {error && !form.nombre && (
                  <div className="flex items-center mt-1 text-xs text-red-600">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                    Ingresa el nombre.
                  </div>
                )}
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Número de Identificación</label>
                <input type="text" name="numero_identificacion" placeholder="Digite su cédula o documento" value={form.numero_identificacion} onChange={handleChange} disabled={!edit} className={`w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 bg-white ${error && !form.numero_identificacion ? 'border-red-500 bg-red-50' : 'border-zinc-200'}`} />
                {error && !form.numero_identificacion && (
                  <div className="flex items-center mt-1 text-xs text-red-600">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                    Ingresa el número de identificación.
                  </div>
                )}
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Sexo</label>
                <select name="sexo" value={form.sexo} onChange={handleChange} disabled={!edit} className={`w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none bg-white ${error && !form.sexo ? 'border-red-500 bg-red-50' : 'border-zinc-200'}`}> 
                                    <option value="">Selecciona</option>
                  <option value="">Selecciona</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otro</option>
                </select>
                {error && !form.sexo && (
                  <div className="flex items-center mt-1 text-xs text-red-600">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                    Selecciona el sexo.
                  </div>
                )}
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Tipo de Usuario</label>
                <select name="tipo_usuario" value={form.tipo_usuario} onChange={handleChange} disabled={!edit} className={`w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none bg-white ${error && !form.tipo_usuario ? 'border-red-500 bg-red-50' : 'border-zinc-200'}`}> 
                                    <option value="">Selecciona</option>
                  <option value="">Selecciona</option>
                  <option value="paciente">Paciente</option>
                  <option value="medico">Médico</option>
                  <option value="admin">Administrador</option>
                </select>
                {error && !form.tipo_usuario && (
                  <div className="flex items-center mt-1 text-xs text-red-600">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                    Selecciona el tipo de usuario.
                  </div>
                )}
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Fecha Nacimiento</label>
                <input type="date" name="fecha_nacimiento" placeholder="dd/mm/aaaa" value={form.fecha_nacimiento || ""} onChange={handleChange} disabled={!edit} className={`w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 bg-white ${error && !form.fecha_nacimiento ? 'border-red-500 bg-red-50' : 'border-zinc-200'}`} />
                {error && !form.fecha_nacimiento && (
                  <div className="flex items-center mt-1 text-xs text-red-600">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                    Selecciona la fecha de nacimiento.
                  </div>
                )}
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Lugar Residencia</label>
                <input type="text" name="lugar_residencia" placeholder="Digite ciudad o departamento" value={form.lugar_residencia || ""} onChange={handleChange} disabled={!edit} className="w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 border-zinc-200 bg-white" />
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Dirección</label>
                <input type="text" name="direccion" placeholder="Digite su dirección aquí" value={form.direccion || ""} onChange={handleChange} disabled={!edit} className="w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 border-zinc-200 bg-white" />
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Teléfono</label>
                <input type="text" name="telefono" placeholder="Digite su número aquí" value={form.telefono || ""} onChange={handleChange} disabled={!edit} className="w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 border-zinc-200 bg-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-zinc-700 font-semibold mb-1">e-Mail</label>
                <input type="email" name="email" placeholder="Digite su correo aquí" value={form.email || ""} onChange={handleChange} disabled={!edit} className="w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 border-zinc-200 bg-white" />
              </div>
              <div className="md:col-span-2 flex justify-end gap-4 mt-8">
                {!edit ? (
                  <button type="button" className="bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white px-6 py-2 rounded-xl font-semibold shadow" onClick={() => setEdit(true)}>Modificar</button>
                ) : (
                  <>
                    <button type="button" className="bg-zinc-300 text-zinc-700 px-6 py-2 rounded-xl font-semibold" onClick={handleCancel} disabled={loading}>Cancelar</button>
                    <button type="submit" className="bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white px-6 py-2 rounded-xl font-semibold shadow" disabled={loading}>Guardar</button>
                  </>
                )}
              </div>
              {error && <div className="md:col-span-2 text-red-600 font-semibold mt-2">{error}</div>}
              <SuccessModal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
            </form>
          </div>
          {/* Panel blanco de seguridad */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 mb-8">
            <header className="mb-6">
              <h2 className="text-base font-semibold text-[var(--brand-blue)]">Seguridad</h2>
              <p className="text-zinc-500 text-base mt-1">Administra tu contraseña y la seguridad de tu cuenta.</p>
            </header>
            <form className="space-y-4" onSubmit={async e => {
              e.preventDefault();
              setPasswordError("");
              setPasswordSuccess(false);
              if (!currentPasswordValid) {
                setPasswordError("Debes ingresar la contraseña actual correcta");
                return;
              }
              if (!newPassword || !confirmPassword) {
                setPasswordError("Todos los campos son obligatorios");
                return;
              }
              if (newPassword !== confirmPassword) {
                setPasswordError("Las contraseñas no coinciden");
                return;
              }
              if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword) || !/[!@#$%^&*]/.test(newPassword)) {
                setPasswordError("La nueva contraseña no cumple los requisitos de seguridad");
                return;
              }
              setPasswordLoading(true);
              // Obtener email del usuario autenticado
              const { data: { user } } = await supabase.auth.getUser();
              if (!user) {
                setPasswordError("No se pudo identificar el usuario");
                setPasswordLoading(false);
                return;
              }
              // Cambiar contraseña en Supabase
              const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
              setPasswordLoading(false);
              if (updateError) {
                setPasswordError("Error actualizando la contraseña: " + updateError.message);
                return;
              }
              setPasswordSuccess(true);
              setShowSuccessModal(true);
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setCurrentPasswordValid(false);
            }}>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Contraseña actual</label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    placeholder="Ingresa tu contraseña actual"
                    className={`w-full h-12 pl-3 pr-12 rounded-xl border text-sm outline-none bg-white ${passwordError && !currentPasswordValid ? 'border-red-500 bg-red-50' : 'border-zinc-200'}`}
                    value={currentPassword || ""}
                    onChange={async e => {
                      setCurrentPassword(e.target.value);
                      setCurrentPasswordValid(false);
                      setPasswordError("");
                    }}
                    onBlur={async () => {
                      if (!currentPassword) return;
                      setCheckingCurrent(true);
                      setPasswordError("");
                      // Obtener email del usuario autenticado
                      const { data: { user } } = await supabase.auth.getUser();
                      if (!user) {
                        setPasswordError("No se pudo identificar el usuario");
                        setCheckingCurrent(false);
                        return;
                      }
                      // Intentar login con email y contraseña actual
                      const { error: loginError } = await supabase.auth.signInWithPassword({
                        email: user.email,
                        password: currentPassword
                      });
                      setCheckingCurrent(false);
                      if (loginError) {
                        setCurrentPasswordValid(false);
                        setPasswordError("Contraseña actual incorrecta");
                      } else {
                        setCurrentPasswordValid(true);
                        setPasswordError("");
                      }
                    }}
                  />
                  {passwordError && !currentPasswordValid && (
                    <div className="flex items-center mt-1 text-xs text-red-600">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                      {passwordError}
                    </div>
                  )}
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600" tabIndex={-1} onClick={() => setShowCurrent(v => !v)} aria-label="Mostrar/Ocultar contraseña">
                    {!showCurrent ? (
                      // Ojo abierto (contraseña oculta)
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C2.73 7.61 7.09 4 12 4C16.91 4 21.27 7.61 23 12C21.27 16.39 16.91 20 12 20C7.09 20 2.73 16.39 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      // Ojo cerrado (contraseña visible)
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.94 17.94C16.13 19.25 14.13 20 12 20C7.09 20 2.73 16.39 1 12C1.73 10.19 2.91 8.6 4.44 7.35M9.53 9.53C10.07 9.19 10.78 9 12 9C14.21 9 16 10.79 16 13C16 14.22 15.81 14.93 15.47 15.47M9.53 9.53L4.44 4.44M9.53 9.53L15.47 15.47M15.47 15.47L19.56 19.56M15.47 15.47C15.81 14.93 16 14.22 16 13C16 10.79 14.21 9 12 9C10.78 9 10.07 9.19 9.53 9.53Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Nueva contraseña</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="Ingresa tu nueva contraseña"
                    className={`w-full h-12 pl-3 pr-12 rounded-xl border text-sm outline-none bg-white ${passwordError && newPassword ? 'border-red-500 bg-red-50' : 'border-zinc-200'}`}
                    value={newPassword || ""}
                    onChange={e => setNewPassword(e.target.value)}
                    disabled={!currentPasswordValid}
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600" tabIndex={-1} onClick={() => setShowNew(v => !v)} aria-label="Mostrar/Ocultar contraseña">
                    {!showNew ? (
                      // Ojo abierto (contraseña oculta)
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C2.73 7.61 7.09 4 12 4C16.91 4 21.27 7.61 23 12C21.27 16.39 16.91 20 12 20C7.09 20 2.73 16.39 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      // Ojo cerrado (contraseña visible)
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.94 17.94C16.13 19.25 14.13 20 12 20C7.09 20 2.73 16.39 1 12C1.73 10.19 2.91 8.6 4.44 7.35M9.53 9.53C10.07 9.19 10.78 9 12 9C14.21 9 16 10.79 16 13C16 14.22 15.81 14.93 15.47 15.47M9.53 9.53L4.44 4.44M9.53 9.53L15.47 15.47M15.47 15.47L19.56 19.56M15.47 15.47C15.81 14.93 16 14.22 16 13C16 10.79 14.21 9 12 9C10.78 9 10.07 9.19 9.53 9.53Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
                <ul className="mt-2 space-y-1 text-xs">
                  <li className={newPassword.length >= 8 ? "text-green-600 flex items-center" : "text-red-500 flex items-center"}>Mínimo 8 caracteres</li>
                  <li className={/[A-Z]/.test(newPassword) ? "text-green-600 flex items-center" : "text-red-500 flex items-center"}>Al menos una mayúscula</li>
                  <li className={/[0-9]/.test(newPassword) ? "text-green-600 flex items-center" : "text-red-500 flex items-center"}>Al menos un número</li>
                  <li className={/[!@#$%^&*]/.test(newPassword) ? "text-green-600 flex items-center" : "text-red-500 flex items-center"}>Al menos un carácter especial (!@#$%^&*)</li>
                </ul>
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Confirmar nueva contraseña</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirma tu nueva contraseña"
                    className={`w-full h-12 pl-3 pr-12 rounded-xl border text-sm outline-none bg-white ${passwordError && confirmPassword ? 'border-red-500 bg-red-50' : 'border-zinc-200'}`}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    disabled={!currentPasswordValid}
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600" tabIndex={-1} onClick={() => setShowConfirm(v => !v)} aria-label="Mostrar/Ocultar contraseña">
                    {!showConfirm ? (
                      // Ojo abierto (contraseña oculta)
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C2.73 7.61 7.09 4 12 4C16.91 4 21.27 7.61 23 12C21.27 16.39 16.91 20 12 20C7.09 20 2.73 16.39 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      // Ojo cerrado (contraseña visible)
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.94 17.94C16.13 19.25 14.13 20 12 20C7.09 20 2.73 16.39 1 12C1.73 10.19 2.91 8.6 4.44 7.35M9.53 9.53C10.07 9.19 10.78 9 12 9C14.21 9 16 10.79 16 13C16 14.22 15.81 14.93 15.47 15.47M9.53 9.53L4.44 4.44M9.53 9.53L15.47 15.47M15.47 15.47L19.56 19.56M15.47 15.47C15.81 14.93 16 14.22 16 13C16 10.79 14.21 9 12 9C10.78 9 10.07 9.19 9.53 9.53Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {passwordError && currentPasswordValid && (
                <div className="flex items-center mt-1 text-xs text-red-600">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                  {passwordError}
                </div>
              )}
              <div className="flex justify-end mt-6">
                <button type="submit" className="bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white px-6 py-2 rounded-xl font-semibold shadow" disabled={passwordLoading}>Actualizar contraseña</button>
              </div>
            </form>
          </div>
          {/* Fin zona de peligro eliminada */}
        </section>
      </div>
    </div>
  );
}
