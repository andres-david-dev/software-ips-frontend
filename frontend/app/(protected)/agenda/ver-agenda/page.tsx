import { especialistas } from "@/lib/agendaData";

export default function VerAgendaPage() {
  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-rose-200 bg-rose-500 text-white shadow-sm">
        <div className="px-4 py-3 text-sm font-medium text-center">
          El éxito es la suma de pequeños esfuerzos repetidos día tras día.
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="px-5 py-4 border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-white">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-semibold text-zinc-900">Agenda</h1>
            <span className="text-zinc-300">·</span>
            <span className="text-sm font-medium text-zinc-600">Ver Agenda</span>
          </div>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="especialista" className="text-sm font-semibold text-zinc-900">
                Especialista <span className="text-rose-600">*</span>
              </label>
              <div className="mt-2 relative">
                <select
                  id="especialista"
                  className="w-full h-11 rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm outline-none appearance-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Elija...
                  </option>
                  {especialistas.length === 0 ? null :
                    especialistas.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              {especialistas.length === 0 && (
                <p className="mt-2 text-xs text-zinc-500">No hay especialistas configurados.</p>
              )}
            </div>

            <div>
              <label htmlFor="fechaAgenda" className="text-sm font-semibold text-zinc-900">
                Fecha <span className="text-rose-600">*</span>
              </label>
              <input
                id="fechaAgenda"
                type="date"
                className="mt-2 w-full h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              className="h-10 px-4 rounded-xl text-sm font-semibold text-white bg-[var(--brand-blue)] hover:opacity-95"
            >
              Ver Agenda
            </button>
            <button
              type="button"
              className="h-10 px-4 rounded-xl text-sm font-semibold text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
            >
              Otra búsqueda
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
