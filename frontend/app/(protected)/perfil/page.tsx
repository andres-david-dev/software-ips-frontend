"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type SuccessModalProps = {
  open: boolean;
  onClose: () => void;
};

function SuccessModal({ open, onClose }: SuccessModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-xl shadow-xl">
        <p className="text-green-700 font-bold mb-4">¡Operación exitosa!</p>
        <button onClick={onClose} className="bg-green-600 text-white px-4 py-2 rounded">Cerrar</button>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full flex flex-col p-0">
        <div className="rounded-t-2xl h-12 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] flex items-center justify-between px-6">
          <h2 className="text-lg font-bold text-white">Eliminar Cuenta</h2>
          <button onClick={onClose} className="text-white text-2xl font-bold focus:outline-none">×</button>
        </div>
        <div className="p-6">
          <p className="mb-2 text-zinc-900">¿Estás seguro de eliminar tu cuenta?</p>
          <div className="mb-2 text-sm text-zinc-700">
            <b>Nombre:</b> {nombre || "-"} <br />
            <b>Email:</b> {email || "-"}
          </div>
          <p className="mb-2 text-zinc-700">Esta acción es irreversible.</p>
          <label className="font-semibold mb-1 block">Escribe "ELIMINAR" para confirmar</label>
          <input value={input} onChange={e => setInput(e.target.value)} className="border rounded px-3 py-2 mb-4 w-full" />
          <div className="flex gap-4 mt-4 justify-end">
            <button onClick={onClose} className="bg-zinc-200 text-zinc-700 px-6 py-2 rounded font-semibold">Cancelar</button>
            <button onClick={() => onConfirm(input)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold" disabled={loading || input !== "ELIMINAR"}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PerfilPage() {
  // Guardar datos del usuario en window para el modal (hack rápido, idealmente usar contexto o prop drilling)
  useEffect(() => { window.perfilFormData = form; }, [form]);
  // Cargar datos del usuario desde Supabase al montar el componente
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
      } else {
        setError("No se pudo obtener los datos del usuario");
      }
    };
    fetchUserData();
  }, []);

  const [form, setForm] = useState({
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
  // Guardar datos originales para restaurar si se cancela
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
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);


  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleCancel() {
    setEdit(false);
    setError("");
    setForm(originalForm); // Restaurar datos originales
  }

  function handleDeleteAccount() {
    setDeleteLoading(true);
    setTimeout(() => {
      setDeleteLoading(false);
      setShowDeleteModal(false);
      setShowSuccessModal(true);
    }, 1500);
  }

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
                <input type="text" name="nombre" placeholder="Digite su nombre completo aquí" value={form.nombre} onChange={handleChange} disabled={!edit} className="w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 border-zinc-200 bg-white" />
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Número de Identificación</label>
                <input type="text" name="numero_identificacion" placeholder="Digite su cédula o documento" value={form.numero_identificacion} onChange={handleChange} disabled={!edit} className="w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 border-zinc-200 bg-white" />
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Sexo</label>
                <select name="sexo" value={form.sexo} onChange={handleChange} disabled={!edit} className="w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none border-zinc-200 bg-white">
                  <option value="">Selecciona</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Tipo de Usuario</label>
                <select name="tipo_usuario" value={form.tipo_usuario} onChange={handleChange} disabled={!edit} className="w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none border-zinc-200 bg-white">
                  <option value="">Selecciona</option>
                  <option value="paciente">Paciente</option>
                  <option value="medico">Médico</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Fecha Nacimiento</label>
                <input type="date" name="fecha_nacimiento" placeholder="dd/mm/aaaa" value={form.fecha_nacimiento} onChange={handleChange} disabled={!edit} className="w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 border-zinc-200 bg-white" />
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Lugar Residencia</label>
                <input type="text" name="lugar_residencia" placeholder="Digite ciudad o departamento" value={form.lugar_residencia} onChange={handleChange} disabled={!edit} className="w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 border-zinc-200 bg-white" />
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Dirección</label>
                <input type="text" name="direccion" placeholder="Digite su dirección aquí" value={form.direccion} onChange={handleChange} disabled={!edit} className="w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 border-zinc-200 bg-white" />
              </div>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Teléfono</label>
                <input type="text" name="telefono" placeholder="Digite su número aquí" value={form.telefono} onChange={handleChange} disabled={!edit} className="w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 border-zinc-200 bg-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-zinc-700 font-semibold mb-1">e-Mail</label>
                <input type="email" name="email" placeholder="Digite su correo aquí" value={form.email} onChange={handleChange} disabled={!edit} className="w-full h-12 pl-3 pr-4 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent placeholder-zinc-400 border-zinc-200 bg-white" />
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
              if (!currentPassword || !newPassword || !confirmPassword) {
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
              setTimeout(() => {
                setPasswordLoading(false);
                setPasswordSuccess(true);
                setShowSuccessModal(true);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
              }, 1200);
            }}>
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Contraseña actual</label>
                <div className="relative">
                  <input type={showCurrent ? "text" : "password"} placeholder="Ingresa tu contraseña actual" className="w-full h-12 pl-3 pr-12 rounded-xl border text-sm outline-none border-zinc-200 bg-white" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600" tabIndex={-1} onClick={() => setShowCurrent(v => !v)} aria-label="Mostrar/Ocultar contraseña">
                    {showCurrent ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C2.73 7.61 7.09 4 12 4C16.91 4 21.27 7.61 23 12C21.27 16.39 16.91 20 12 20C7.09 20 2.73 16.39 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
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
                  <input type={showNew ? "text" : "password"} placeholder="Ingresa tu nueva contraseña" className="w-full h-12 pl-3 pr-12 rounded-xl border text-sm outline-none border-zinc-200 bg-white" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600" tabIndex={-1} onClick={() => setShowNew(v => !v)} aria-label="Mostrar/Ocultar contraseña">
                    {showNew ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C2.73 7.61 7.09 4 12 4C16.91 4 21.27 7.61 23 12C21.27 16.39 16.91 20 12 20C7.09 20 2.73 16.39 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
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
                  <input type={showConfirm ? "text" : "password"} placeholder="Confirma tu nueva contraseña" className="w-full h-12 pl-3 pr-12 rounded-xl border text-sm outline-none border-zinc-200 bg-white" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600" tabIndex={-1} onClick={() => setShowConfirm(v => !v)} aria-label="Mostrar/Ocultar contraseña">
                    {showConfirm ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C2.73 7.61 7.09 4 12 4C16.91 4 21.27 7.61 23 12C21.27 16.39 16.91 20 12 20C7.09 20 2.73 16.39 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.94 17.94C16.13 19.25 14.13 20 12 20C7.09 20 2.73 16.39 1 12C1.73 10.19 2.91 8.6 4.44 7.35M9.53 9.53C10.07 9.19 10.78 9 12 9C14.21 9 16 10.79 16 13C16 14.22 15.81 14.93 15.47 15.47M9.53 9.53L4.44 4.44M9.53 9.53L15.47 15.47M15.47 15.47L19.56 19.56M15.47 15.47C15.81 14.93 16 14.22 16 13C16 10.79 14.21 9 12 9C10.78 9 10.07 9.19 9.53 9.53Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {passwordError && <div className="text-red-600 font-semibold mt-2">{passwordError}</div>}
              <div className="flex justify-end mt-6">
                <button type="submit" className="bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white px-6 py-2 rounded-xl font-semibold shadow" disabled={passwordLoading}>Actualizar contraseña</button>
              </div>
            </form>
          </div>
          {/* Panel blanco de zona de peligro */}
          <div className="rounded-2xl border border-red-200 bg-white p-6 mt-8">
            <header className="mb-4">
              <h2 className="text-lg font-bold text-zinc-800">Zona de peligro</h2>
              <p className="text-zinc-500 text-base mt-1">Acciones irreversibles que afectarán permanentemente tu cuenta.</p>
            </header>
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-red-700 mb-1">Eliminar cuenta</h3>
              <p className="text-red-600 mb-4">Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate de que esto es lo que deseas.</p>
              <div className="flex justify-end mt-2">
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-xl shadow" onClick={() => setShowDeleteModal(true)}>Eliminar cuenta</button>
              </div>
            </div>
          </div>
        </section>
        {showDeleteModal && (
          <DeleteAccountModal open={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDeleteAccount} loading={deleteLoading} nombre={form.nombre} email={form.email} />
        )}
      </div>
    </div>
  );
}
