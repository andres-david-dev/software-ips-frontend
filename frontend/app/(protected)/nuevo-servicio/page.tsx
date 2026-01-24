export default function NuevoServicioHome() {
  return (
    <section className="min-h-[calc(100vh-96px)] rounded-3xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
      <div className="h-full w-full bg-gradient-to-br from-[rgb(var(--brand-blue-rgb)/0.08)] via-white to-[rgb(var(--brand-green-rgb)/0.12)]">
        <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-xs font-semibold text-zinc-700">
            ¡Bienvenido(a) a SOMEDI!
          </div>
          <h1 className="mt-5 text-3xl sm:text-4xl font-semibold text-zinc-900">
            Todo listo para crear un nuevo servicio
          </h1>
          <p className="mt-3 text-base text-zinc-600">
            Escoge una modalidad desde el menú lateral y continúa con el registro de manera rápida y ordenada.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            {[
              { title: "Intramural", desc: "Atención en sede" },
              { title: "Extramural", desc: "Atención fuera de sede" },
              { title: "Telesalud", desc: "Atención remota" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-200 bg-white/70 px-4 py-3 text-left shadow-sm"
              >
                <div className="text-sm font-semibold text-zinc-900">Modalidad {item.title}</div>
                <div className="text-xs text-zinc-600 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-zinc-500">
            Si necesitas ayuda, comunícate con soporte y te acompañamos en el proceso.
          </p>
        </div>
      </div>
    </section>
  );
}
