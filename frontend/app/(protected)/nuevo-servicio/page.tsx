import Link from "next/link";

export default function NuevoServicioHome() {
  return (
    <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
      <h1 className="text-2xl font-semibold text-zinc-900">Nuevo Servicio</h1>
      <p className="mt-2 text-zinc-600">
        Selecciona una modalidad para iniciar el registro.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link
          href="/nuevo-servicio/intramural"
          className="rounded-xl border border-zinc-200 p-4 hover:bg-zinc-50 transition-colors"
        >
          <div className="font-medium text-zinc-900">Modalidad Intramural</div>
          <div className="text-sm text-zinc-600 mt-1">Atención en sede</div>
        </Link>
        <Link
          href="/nuevo-servicio/extramural"
          className="rounded-xl border border-zinc-200 p-4 hover:bg-zinc-50 transition-colors"
        >
          <div className="font-medium text-zinc-900">Modalidad Extramural</div>
          <div className="text-sm text-zinc-600 mt-1">Atención fuera de sede</div>
        </Link>
        <Link
          href="/nuevo-servicio/telesalud"
          className="rounded-xl border border-zinc-200 p-4 hover:bg-zinc-50 transition-colors"
        >
          <div className="font-medium text-zinc-900">Modalidad Telesalud</div>
          <div className="text-sm text-zinc-600 mt-1">Atención remota</div>
        </Link>
      </div>
    </section>
  );
}
