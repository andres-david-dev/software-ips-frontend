import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#eaf6fb] to-[#e6f7ef]">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-zinc-900 mb-4">¡Bienvenido a Somedi IPS!</h1>
        <p className="text-zinc-600 mb-8 text-center">Software para Seguridad y Salud Laboral</p>
        <div className="flex flex-col gap-4 w-full">
          <Link href="/login">
            <button className="w-full h-12 rounded-xl bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white font-semibold shadow-lg hover:opacity-95 transition-opacity">
              Iniciar Sesión
            </button>
          </Link>
          <Link href="/registrarse">
            <button className="w-full h-12 rounded-xl border border-[var(--brand-blue)] text-[var(--brand-blue)] font-semibold shadow-lg hover:bg-[var(--brand-blue)] hover:text-white transition-colors">
              Registrarse
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
