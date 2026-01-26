"use client";

export default function AnularOrdenPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-semibold text-[var(--brand-blue)]">Ordenes de Servicio</p>
        <h1 className="text-2xl font-bold text-zinc-900">Anular orden</h1>
        <p className="text-sm text-zinc-500">Registra la anulación de una orden con su motivo y observaciones.</p>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-800" htmlFor="numeroOrden">Número de orden</label>
            <input id="numeroOrden" name="numeroOrden" type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[var(--brand-blue)] focus:outline-none" placeholder="OS-000123" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-800" htmlFor="motivo">Motivo</label>
            <select id="motivo" name="motivo" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[var(--brand-blue)] focus:outline-none">
              <option value="">Seleccione</option>
              <option value="solicitud-usuario">Solicitud del usuario</option>
              <option value="ajuste-agenda">Ajuste de agenda</option>
              <option value="duplicado">Orden duplicada</option>
              <option value="otros">Otros</option>
            </select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-zinc-800" htmlFor="detalle">Detalle</label>
            <textarea id="detalle" name="detalle" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[var(--brand-blue)] focus:outline-none" rows={4} placeholder="Describe por qué se anula la orden" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-end">
          <button className="rounded-xl bg-gradient-to-br from-zinc-600 to-zinc-700 px-8 py-2.5 text-sm font-semibold text-white hover:opacity-90 shadow-md transition-all" type="button">
            Limpiar
          </button>
          <button className="rounded-xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] px-8 py-2.5 text-sm font-semibold text-white hover:opacity-90 shadow-md transition-all" type="button">
            Anular orden
          </button>
        </div>
      </section>
    </div>
  );
}
