"use client";

import { useState } from "react";

export default function AgregarEmpresaPage() {
  // Estados para los campos del formulario
  const [form, setForm] = useState({
    nit: "",
    razonSocial: "",
    nombreComercial: "",
    fechaInicio: "",
    asesor: "",
    actividad: "",
    regimenIva: "",
    responsableIva: "",
    ciudad: "",
    direccion: "",
    telefono: "",
    email: "",
    observaciones: "",
    // ...agrega aquí los demás campos necesarios
  });

  // Falta la función handleChange, agrégala si no existe
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  return (
    <div>
      <header className="space-y-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-zinc-900">Empresas</h1>
          <span className="text-zinc-200">·</span>
          <span className="text-2xl font-semibold text-[var(--brand-blue)]">Agregar</span>
        </div>
      </header>
      <section className="bg-[#f7fafc] rounded-2xl border border-zinc-200 shadow-sm p-6">
        <form className="space-y-8">
          {/* Información de la Empresa */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-[var(--brand-blue)] mb-8">Información de la Empresa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="text-sm font-semibold text-zinc-900" htmlFor="nit">NIT <span className="text-red-600">*</span></label>
                <input id="nit" name="nit" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.nit} onChange={handleChange} required />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900" htmlFor="razonSocial">Razón Social <span className="text-red-600">*</span></label>
                <input id="razonSocial" name="razonSocial" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.razonSocial} onChange={handleChange} required />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-zinc-900" htmlFor="nombreComercial">Nombre Comercial <span className="text-red-600">*</span></label>
                <input id="nombreComercial" name="nombreComercial" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.nombreComercial} onChange={handleChange} required />
                <div className="flex items-center mt-2">
                  <input id="igualRazon" name="igualRazon" type="checkbox" className="mr-2" />
                  <label htmlFor="igualRazon" className="text-xs text-zinc-600">El nombre comercial es igual a la razón social</label>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900" htmlFor="fechaInicio">Fecha Inicio Relación Comercial</label>
                <input id="fechaInicio" name="fechaInicio" type="date" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.fechaInicio} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900" htmlFor="asesor">Asesor Comercial Asignado</label>
                <select id="asesor" name="asesor" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.asesor} onChange={handleChange}>
                  <option value="">...</option>
                  <option value="Asesor 1">Asesor 1</option>
                  <option value="Asesor 2">Asesor 2</option>
                  <option value="Asesor 3">Asesor 3</option>
                  <option value="Asesor 4">Asesor 4</option>
                  <option value="Asesor 5">Asesor 5</option>
                  <option value="Asesor 6">Asesor 6</option>
                  <option value="Asesor 7">Asesor 7</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900" htmlFor="actividad">Actividad Económica <span className="text-red-600">*</span></label>
                <input id="actividad" name="actividad" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.actividad} onChange={handleChange} required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-zinc-900 mb-2">Tipo Régimen IVA</label>
                <div className="flex gap-8 items-center mt-2">
                  <label className="flex items-center gap-2 text-xs text-zinc-900 font-normal">
                    <input type="radio" name="regimenIva" value="responsable" checked={form.regimenIva === 'responsable'} onChange={handleChange} className="w-4 h-4 accent-[var(--brand-blue)]" /> Responsable de IVA
                  </label>
                  <label className="flex items-center gap-2 text-xs text-zinc-900 font-normal">
                    <input type="radio" name="regimenIva" value="no_responsable" checked={form.regimenIva === 'no_responsable'} onChange={handleChange} className="w-4 h-4 accent-[var(--brand-blue)]" /> No responsable de IVA
                  </label>
                </div>
              </div>
            </div>
              {/* Responsabilidad Fiscal */}
              <div className="mt-6">
                <label className="text-sm font-semibold text-zinc-900">Responsabilidad Fiscal</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" name="granContribuyente" checked={form.granContribuyente} onChange={handleChange} />Gran contribuyente</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" name="autorretenedor" checked={form.autorretenedor} onChange={handleChange} />Autorretenedor</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" name="agenteRetencion" checked={form.agenteRetencion} onChange={handleChange} />Agente de retención IVA</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" name="simpleTributacion" checked={form.simpleTributacion} onChange={handleChange} />Régimen simple de tributación</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" name="noAplica" checked={form.noAplica} onChange={handleChange} />No aplica - Otros</label>
                </div>
              </div>
              {/* Ciudad, dirección, teléfono, email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="ciudad">Ciudad <span className="text-red-600">*</span></label>
                  <input id="ciudad" name="ciudad" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.ciudad} onChange={handleChange} required />
                </div>
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="direccion">Dirección</label>
                  <input id="direccion" name="direccion" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.direccion} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="telefono">Teléfono</label>
                  <input id="telefono" name="telefono" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.telefono} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="email">e-Mail</label>
                  <input id="email" name="email" type="email" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.email} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Información del Servicio */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-[var(--brand-blue)] mb-4">Información del Servicio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="servicioPersonaContacto">Persona de Contacto</label>
                  <input id="servicioPersonaContacto" name="servicioPersonaContacto" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="servicioCargo">Cargo</label>
                  <input id="servicioCargo" name="servicioCargo" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="servicioTelefono">Teléfono</label>
                  <input id="servicioTelefono" name="servicioTelefono" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="servicioEmail">e-Mail</label>
                  <input id="servicioEmail" name="servicioEmail" type="email" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
                </div>
              </div>
              {/* Línea separadora eliminada */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <span className="block text-zinc-900 font-semibold mb-2">Entrega del certificado</span>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" />Entregar en físico</label>
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" />Enviar x E-mail de la IPS</label>
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" />Tiene acceso a SIMEON</label>
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" />Envío automático</label>
                  </div>
                </div>
                <div>
                  <span className="block text-zinc-900 font-semibold mb-2">Entrega de resultados HC</span>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 text-sm"><input type="radio" name="entregaHC" />Si</label>
                    <label className="flex items-center gap-2 text-sm"><input type="radio" name="entregaHC" />No</label>
                  </div>
                </div>
                <div>
                  <span className="block text-zinc-900 font-semibold mb-2">Cliente entregó Perfil del Cargo</span>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 text-sm"><input type="radio" name="perfilCargo" />Si</label>
                    <label className="flex items-center gap-2 text-sm"><input type="radio" name="perfilCargo" />No</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Información de Facturación */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-[var(--brand-blue)] mb-4">Información de Facturación</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="facturacionPersonaContacto">Persona de Contacto</label>
                  <input id="facturacionPersonaContacto" name="facturacionPersonaContacto" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="facturacionCargo">Cargo</label>
                  <input id="facturacionCargo" name="facturacionCargo" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="facturacionTelefono">Teléfono</label>
                  <input id="facturacionTelefono" name="facturacionTelefono" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="facturacionEmail">e-Mail</label>
                  <input id="facturacionEmail" name="facturacionEmail" type="email" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
                </div>
              </div>
              {/* Línea separadora eliminada */}
            </div>

            {/* Información de Factura Salud */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-[var(--brand-blue)] mb-4">Información Factura Salud</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="tipoOperacionSalud">Tipo de Operación en Salud</label>
                  <select id="tipoOperacionSalud" name="tipoOperacionSalud" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent">
                    <option value="">...</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="modalidadPago">Modalidad de Pago</label>
                  <select id="modalidadPago" name="modalidadPago" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent">
                    <option value="">...</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="coberturaPlan">Cobertura Plan de Beneficios</label>
                  <select id="coberturaPlan" name="coberturaPlan" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent">
                    <option value="">...</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="noContrato">No. Contrato</label>
                  <input id="noContrato" name="noContrato" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="noPoliza">No. Póliza</label>
                  <input id="noPoliza" name="noPoliza" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-zinc-900" htmlFor="tipoUsuarioRips">Tipo Usuario en RIPS</label>
                  <select id="tipoUsuarioRips" name="tipoUsuarioRips" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent">
                    <option value="">...</option>
                  </select>
                </div>
              </div>
            </div>



          {/* Información para Envíos automáticos */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-[var(--brand-blue)] mb-4">Información para Envíos automáticos</h2>
            <div className="flex justify-end mb-4">
              <button type="button" className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold flex items-center gap-2 hover:bg-green-700 transition-all">
                + Agregar e-Mail
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-zinc-200 rounded-xl">
                <thead className="bg-zinc-100">
                  <tr>
                    <th className="px-3 py-2 font-semibold text-zinc-700 border-b">No.</th>
                    <th className="px-3 py-2 font-semibold text-zinc-700 border-b">e-Mail</th>
                    <th className="px-3 py-2 font-semibold text-zinc-700 border-b">Descripción</th>
                    <th className="px-3 py-2 font-semibold text-zinc-700 border-b">Creado por</th>
                    <th className="px-3 py-2 font-semibold text-zinc-700 border-b">Creado en</th>
                    <th className="px-3 py-2 font-semibold text-zinc-700 border-b">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border-b">1</td>
                    <td className="px-3 py-2 border-b">ejemplo@email.com</td>
                    <td className="px-3 py-2 border-b">Descripción ejemplo</td>
                    <td className="px-3 py-2 border-b">Admin</td>
                    <td className="px-3 py-2 border-b">2026-01-26</td>
                    <td className="px-3 py-2 border-b">Editar/Eliminar</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Observaciones */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <label className="text-sm font-semibold text-zinc-900" htmlFor="observaciones">Observaciones</label>
            <textarea id="observaciones" name="observaciones" maxLength={1000} rows={4} className="mt-2 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent resize-none" value={form.observaciones} onChange={handleChange} />
            <div className="text-xs text-zinc-500 text-right">{form.observaciones.length}/1000</div>
          </div>

          {/* Botón guardar */}
          <div className="flex justify-end">
            <button type="submit" className="px-8 py-3 rounded-xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] text-base font-semibold text-white hover:opacity-90 shadow-md transition-all">
              Agregar Empresa
            </button>
          </div>
          </form>
        </section>
      </div>
    
  );
}
