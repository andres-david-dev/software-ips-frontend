"use client";

export default function RegistrarFirmaFotoPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-semibold text-[var(--brand-blue)]">Ordenes de Servicio</p>
        <h1 className="text-2xl font-bold text-zinc-900">Registrar firma / foto del usuario</h1>
        <p className="text-sm text-zinc-500">Captura la evidencia de firma y fotografía asociada a la orden.</p>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-800" htmlFor="numeroOrden">Número de orden</label>
            <input id="numeroOrden" name="numeroOrden" type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[var(--brand-blue)] focus:outline-none" placeholder="OS-000123" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-800" htmlFor="documento">Documento del usuario</label>
            <input id="documento" name="documento" type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[var(--brand-blue)] focus:outline-none" placeholder="123456789" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-800" htmlFor="firma">Cargar firma</label>
            <input id="firma" name="firma" type="file" accept="image/*" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[var(--brand-blue)] focus:outline-none" />
            <p className="text-xs text-zinc-500">Formatos permitidos: JPG, PNG. Máx. 5MB.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-800" htmlFor="foto">Cargar foto</label>
            <input id="foto" name="foto" type="file" accept="image/*" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[var(--brand-blue)] focus:outline-none" />
            <p className="text-xs text-zinc-500">Formatos permitidos: JPG, PNG. Máx. 5MB.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-end">
          <button className="rounded-xl bg-gradient-to-br from-zinc-600 to-zinc-700 px-8 py-2.5 text-sm font-semibold text-white hover:opacity-90 shadow-md transition-all" type="button">
            Limpiar
          </button>
          <button className="rounded-xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] px-8 py-2.5 text-sm font-semibold text-white hover:opacity-90 shadow-md transition-all" type="button">
            Guardar evidencia
          </button>
        </div>
      </section>
    </div>
  );
}
