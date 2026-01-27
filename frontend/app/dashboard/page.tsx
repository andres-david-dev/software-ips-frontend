"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [logoError, setLogoError] = useState(false);
  const logoCandidates = [
    "/images/logo.jpeg",
    "/images/logo.png",
    "/images/logo.jpg",
    "/images/logo.webp",
    "/images/logo.svg",
  ];
  const [logoIndex, setLogoIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [active, setActive] = useState("Solicitudes de Servicio");
  const [empresasOpen, setEmpresasOpen] = useState(true);
  const empresasActions = ["Agregar", "Modificar", "Eliminar", "Consultar", "Certificaciones"];

  const handleLogoError = () => {
    if (logoIndex < logoCandidates.length - 1) {
      setLogoIndex((i) => i + 1);
    } else {
      setLogoError(true);
    }
  };

  const handleLogout = () => {
    router.push("/");
  };

  const menuItems = [
    {
      id: 1,
      title: "Solicitudes de Servicio",
      tone: "text-blue-50",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5" y="3" width="14" height="18" rx="2" ry="2" />
          <path d="M9 9h6M9 13h6M9 17h4" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Nuevo Servicio",
      tone: "text-green-50",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Agenda",
      tone: "text-blue-50",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M8 3v4M16 3v4M4 10h16" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Informes y Reportes",
      tone: "text-green-50",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19V6a2 2 0 0 1 2-2h7l5 5v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
          <path d="M13 4v4h4" />
          <path d="M9 13h6M9 17h3" />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Formatos",
      tone: "text-blue-50",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6M9 17h6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf6fb] to-[#e6f7ef] flex">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-gradient-to-b from-[var(--brand-blue)] to-[var(--brand-green)] text-white transition-all duration-300 shadow-xl ${
          sidebarOpen ? "w-72" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            {sidebarOpen && (
              <div>
                <p className="text-sm uppercase tracking-widest text-white/80">Somedi</p>
                <p className="text-lg font-semibold leading-tight">Panel IPS</p>
              </div>
            )}
          </div>
          <button
            className="text-white/80 hover:text-white transition-colors"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Alternar menú"
          >
            {sidebarOpen ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <nav className="flex-1 py-6 space-y-1">
          {menuItems.map((item) => {
            const isActive = active === item.title;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.title)}
                className={`w-full px-4 h-12 flex items-center gap-3 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-white/15 text-white shadow-inner"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-lg text-white/90">{item.icon}</span>
                {sidebarOpen && <span className={item.tone}>{item.title}</span>}
              </button>
            );
          })}
        </nav>

        <div className="px-4 pb-6 pt-2 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full h-11 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/15 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main area */}
      <section className="flex-1 flex flex-col">
        <header className="h-16 px-6 border-b border-gray-200 bg-white/80 backdrop-blur flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Panel</p>
            <h1 className="text-xl font-semibold text-gray-800">Dashboard operativo</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] text-white flex items-center justify-center font-semibold">
              SA
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-800">Somedi IPS</p>
              <p className="text-xs text-gray-500">salud ocupacional</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-8 bg-gradient-to-br from-white via-white to-blue-50/30">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-gray-500">Seleccionaste</p>
              <h2 className="text-2xl font-bold text-gray-800">{active}</h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="h-2 w-2 rounded-full bg-[var(--brand-green)]"></span>
              Disponible
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-dashed border-[var(--brand-blue)]/30 bg-[var(--brand-blue)]/5 p-5">
                <p className="text-sm text-gray-500 mb-1">Acceso rápido</p>
                <p className="text-lg font-semibold text-gray-800">{active}</p>
                <p className="text-sm text-gray-500 mt-2">Próximamente configuraremos la vista interna.</p>
              </div>
              <div className="rounded-xl border border-dashed border-[var(--brand-green)]/30 bg-[var(--brand-green)]/5 p-5">
                <p className="text-sm text-gray-500 mb-1">Estado</p>
                <p className="text-lg font-semibold text-gray-800">Panel listo</p>
                <p className="text-sm text-gray-500 mt-2">Navega con el menú lateral desplegable.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between bg-[var(--brand-blue)] text-white px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-md bg-white/15 flex items-center justify-center">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="7" width="18" height="13" rx="2" />
                    <path d="M7 7V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2" />
                    <path d="M10 12h4M9 16h6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/80">Maestro</p>
                  <p className="text-lg font-semibold">Empresas</p>
                </div>
              </div>
              <button
                className="text-white/85 hover:text-white transition-colors"
                onClick={() => setEmpresasOpen((v) => !v)}
                aria-label="Alternar sección de empresas"
              >
                {empresasOpen ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 14l6-6 6 6" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 10l6 6 6-6" />
                  </svg>
                )}
              </button>
            </div>
            {empresasOpen && (
              <div className="bg-gray-100 px-5 py-4 text-gray-800">
                <ul className="space-y-2">
                  {empresasActions.map((action) => (
                    <li
                      key={action}
                      className="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-sm border border-gray-200/70 hover:border-[var(--brand-blue)]/40 hover:shadow transition-all"
                    >
                      <span className="text-sm font-semibold">{action}</span>
                      <svg
                        className="h-4 w-4 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>
      </section>
    </div>
  );
}
