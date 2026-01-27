"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MedicoPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<string>("");

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const sessionCookie = cookies.find((c) => c.trim().startsWith("somedi_session="));
    if (!sessionCookie) {
      router.push("/");
      return;
    }
    const usuarioIdCookie = cookies.find((c) => c.trim().startsWith("usuario_id="));
    if (usuarioIdCookie) {
      setUsuario(usuarioIdCookie.split("=")[1]);
    }
  }, [router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#eaf6fb] to-[#e6f7ef]">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-zinc-900">Página en Construcción</h1>
          <p className="text-2xl text-zinc-600">Portal de Médicos</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center space-y-4">
          <p className="text-zinc-600">
            Estamos preparando tu área de trabajo personalizada.
          </p>
          <p className="text-sm text-zinc-500">
            Esta sección estará disponible próximamente.
          </p>
          <button
            onClick={() => {
              document.cookie = "somedi_session=; Path=/; Max-Age=0";
              document.cookie = "usuario_id=; Path=/; Max-Age=0";
              router.push("/");
            }}
            className="mt-6 w-full bg-[var(--brand-blue)] text-white font-semibold py-3 rounded-xl hover:bg-blue-600 transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
