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
    granContribuyente: false,
    autorretenedor: false,
    agenteRetencion: false,
    simpleTributacion: false,
    noAplica: false,
    personaContacto: "",
    cargoContacto: "",
    telefonoContacto: "",
    emailContacto: "",
    personaFacturacion: "",
    cargoFacturacion: "",
    telefonoFacturacion: "",
    emailFacturacion: "",
    observaciones: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-zinc-900">Empresas</h1>
          <span className="text-zinc-200">·</span>
          <span className="text-2xl font-semibold text-[var(--brand-blue)]">Agregar</span>
        </div>
      </header>
      <section className="bg-[#f7fafc] rounded-2xl border border-zinc-200 shadow-sm p-6">
        <form className="space-y-8">
          {/* Datos principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-zinc-900" htmlFor="nit">NIT *</label>
              <input id="nit" name="nit" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.nit} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-sm font-semibold text-zinc-900" htmlFor="razonSocial">Razón Social *</label>
              <input id="razonSocial" name="razonSocial" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.razonSocial} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-sm font-semibold text-zinc-900" htmlFor="nombreComercial">Nombre Comercial *</label>
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
              <input id="asesor" name="asesor" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.asesor} onChange={handleChange} />
            </div>
            <div>
              <label className="text-sm font-semibold text-zinc-900" htmlFor="actividad">Actividad Económica *</label>
              <input id="actividad" name="actividad" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.actividad} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-sm font-semibold text-zinc-900" htmlFor="regimenIva">Tipo Régimen IVA</label>
              <input id="regimenIva" name="regimenIva" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.regimenIva} onChange={handleChange} />
            </div>
            <div>
              <label className="text-sm font-semibold text-zinc-900" htmlFor="responsableIva">Responsable de IVA</label>
              <input id="responsableIva" name="responsableIva" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.responsableIva} onChange={handleChange} />
            </div>
          </div>

          {/* Responsabilidad Fiscal */}
          <div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-zinc-900" htmlFor="ciudad">Ciudad *</label>
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

          {/* Información del Servicio */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-[var(--brand-blue)] mb-4">Información del Servicio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-zinc-900" htmlFor="personaContacto">Persona de Contacto</label>
                <input id="personaContacto" name="personaContacto" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.personaContacto} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900" htmlFor="cargoContacto">Cargo</label>
                <input id="cargoContacto" name="cargoContacto" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.cargoContacto} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900" htmlFor="telefonoContacto">Teléfono</label>
                <input id="telefonoContacto" name="telefonoContacto" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.telefonoContacto} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900" htmlFor="emailContacto">e-Mail</label>
                <input id="emailContacto" name="emailContacto" type="email" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.emailContacto} onChange={handleChange} />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-semibold text-zinc-900">Entrega del certificado</label>
                <div className="flex flex-col gap-2 mt-2">
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" />Entregar en físico</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" />Enviar x E-mail de la IPS</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" />Tiene acceso a SIMEON</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" />Envío automático</label>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900">Entrega de resultados HC</label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 text-xs"><input type="radio" name="entregaHC" />Sí</label>
                  <label className="flex items-center gap-2 text-xs"><input type="radio" name="entregaHC" />No</label>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900">Cliente entregó Perfil del Cargo</label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 text-xs"><input type="radio" name="perfilCargo" />Sí</label>
                  <label className="flex items-center gap-2 text-xs"><input type="radio" name="perfilCargo" />No</label>
                </div>
              </div>
            </div>
          </div>

          {/* Información de Facturación */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-[var(--brand-blue)] mb-4">Información de Facturación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-zinc-900" htmlFor="personaFacturacion">Persona de Contacto</label>
                <input id="personaFacturacion" name="personaFacturacion" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.personaFacturacion} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900" htmlFor="cargoFacturacion">Cargo</label>
                <input id="cargoFacturacion" name="cargoFacturacion" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.cargoFacturacion} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900" htmlFor="telefonoFacturacion">Teléfono</label>
                <input id="telefonoFacturacion" name="telefonoFacturacion" type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.telefonoFacturacion} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900" htmlFor="emailFacturacion">e-Mail</label>
                <input id="emailFacturacion" name="emailFacturacion" type="email" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" value={form.emailFacturacion} onChange={handleChange} />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-zinc-900">Fechas para radicación</label>
                <input type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900">Soportes exigidos por el cliente</label>
                <input type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-zinc-900">Forma de pago</label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" />Crédito</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" />Contado</label>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900">Plazo pago a crédito</label>
                <input type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900">Usar solo tarifarios exclusivos</label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 text-xs"><input type="radio" name="tarifario" />Sí</label>
                  <label className="flex items-center gap-2 text-xs"><input type="radio" name="tarifario" />No</label>
                </div>
              </div>
            </div>
          </div>

          {/* Información Factura Salud */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-[var(--brand-blue)] mb-4">Información Factura Salud</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-semibold text-zinc-900">Tipo de Operación en Salud</label>
                <input type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900">Modalidad de Pago</label>
                <input type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900">Cobertura Plan de Beneficios</label>
                <input type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900">No. Contrato</label>
                <input type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900">No. Póliza</label>
                <input type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
              </div>
              <div>
                <label className="text-sm font-semibold text-zinc-900">Tipo Usuario en RIPS</label>
                <input type="text" className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
              </div>
            </div>
          </div>

          {/* Información para Envíos automáticos */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-[var(--brand-blue)] mb-4">Información para Envíos automáticos</h2>
            <button type="button" className="mb-4 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold flex items-center gap-2 hover:bg-green-700 transition-all">
              + Agregar e-Mail
            </button>
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
