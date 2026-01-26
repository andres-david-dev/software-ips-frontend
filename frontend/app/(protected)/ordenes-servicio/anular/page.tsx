"use client";

export default function AnularOrdenPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-zinc-900">Ordenes de Servicio</h1>
          <span className="text-zinc-200">·</span>
          <span className="text-2xl font-semibold text-[var(--brand-blue)]">Anular - Orden de Servicio</span>
        </div>
      </header>

      <section className="bg-[#f7fafc] rounded-2xl border border-zinc-200 shadow-sm p-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <label htmlFor="numeroOrden" className="text-sm font-semibold text-zinc-900">
            No. Orden <span className="text-rose-600">*</span>
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id="numeroOrden"
              name="numeroOrden"
              type="text"
              className="flex-1 h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
              placeholder="Ingresa el número de orden"
              required
            />
            <button
              className="h-11 px-6 rounded-xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] text-sm font-semibold text-white hover:opacity-90 shadow-md transition-all"
              type="submit"
            >
              Buscar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
