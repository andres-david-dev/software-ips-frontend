"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function IconPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconChevron(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLogout(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10 7V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 12H4m0 0 3-3M4 12l3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type NavItem = {
  label: string;
  href: string;
};

const modalidades: NavItem[] = [
  { label: "Modalidad Intramural", href: "/nuevo-servicio/intramural" },
  { label: "Modalidad Extramural", href: "/nuevo-servicio/extramural" },
  { label: "Modalidad Telesalud", href: "/nuevo-servicio/telesalud" },
];

const agendaItems: NavItem[] = [
  { label: "Ver Agenda", href: "/agenda/ver-agenda" },
  { label: "Reasignar", href: "/agenda/reasignar" },
  { label: "Reservar", href: "/agenda/reservar" },
  { label: "Bloquear Agenda", href: "/agenda/bloquear" },
];

const borrarItems: NavItem[] = [
  { label: "Temporales", href: "/agenda/borrar-citas/temporales" },
  { label: "Reservas", href: "/agenda/borrar-citas/reservas" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isNuevoServicio = pathname.startsWith("/nuevo-servicio");
  const isAgenda = pathname.startsWith("/agenda");
  const [menuOpen, setMenuOpen] = useState(isNuevoServicio);
  const [agendaOpen, setAgendaOpen] = useState(isAgenda);
  const [borrarOpen, setBorrarOpen] = useState(isAgenda);

  useEffect(() => {
    if (isNuevoServicio) {
      setMenuOpen(true);
    }
  }, [isNuevoServicio]);

  useEffect(() => {
    if (isAgenda) {
      setAgendaOpen(true);
    }
  }, [isAgenda]);

  return (
    <aside className="w-[280px] shrink-0 border-r border-zinc-200 bg-gradient-to-b from-[var(--brand-blue)] to-[var(--brand-green)] flex flex-col h-full shadow-lg">
      <nav className="p-3 flex-1 overflow-y-auto">
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className={cn(
              "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-base font-bold transition-colors",
              isNuevoServicio
                ? "bg-white/25 text-white"
                : "text-white/95 hover:bg-white/15 hover:text-white",
            )}
            aria-expanded={menuOpen}
            aria-controls="menu-nuevo-servicio"
          >
            <IconPlus className="h-5 w-5 text-white" />
            <span className="flex-1 text-left">Nuevo Servicio</span>
            <IconChevron
              className={cn(
                "h-5 w-5 text-white/90 transition-transform",
                menuOpen && "rotate-90",
              )}
            />
          </button>

          {menuOpen && (
            <div className="mt-1 ml-2 border-l-2 border-white/40 pl-2 space-y-1 bg-white/15 py-2 rounded-r-lg">
              {modalidades.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                      active
                        ? "bg-white text-[var(--brand-blue)] font-bold"
                        : "text-white/95 hover:bg-white/20 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-1 mt-2">
          <button
            type="button"
            onClick={() => setAgendaOpen((prev) => !prev)}
            className={cn(
              "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isAgenda
                ? "bg-zinc-100 text-zinc-900"
                : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
            )}
            aria-expanded={agendaOpen}
            aria-controls="menu-agenda"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center text-zinc-700">⏱</span>
            <span className="flex-1 text-left">Agenda</span>
            <IconChevron
              className={cn(
                "h-4 w-4 text-zinc-500 transition-transform",
                agendaOpen && "rotate-90",
              )}
            />
          </button>

          {agendaOpen && (
            <div className="mt-1 ml-2 border-l border-zinc-200 pl-2 space-y-1" id="menu-agenda">
              {agendaItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-zinc-100 text-zinc-900"
                        : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={() => setBorrarOpen((prev) => !prev)}
                className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
              >
                <span>Borrar Citas</span>
                <IconChevron
                  className={cn(
                    "h-3.5 w-3.5 text-zinc-500 transition-transform",
                    borrarOpen && "rotate-90",
                  )}
                />
              </button>

              {borrarOpen && (
                <div className="ml-2 border-l border-zinc-200 pl-2 space-y-1">
                  {borrarItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm transition-colors",
                          active
                            ? "bg-zinc-100 text-zinc-900"
                            : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="p-3 border-t border-white/20">
        <button
          type="button"
          onClick={() => {
            document.cookie = "somedi_session=; Max-Age=0; Path=/; SameSite=Lax";
            router.push("/");
            router.refresh();
          }}
          className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white/95 hover:bg-white/15 hover:text-white transition-colors"
        >
          <IconLogout className="h-4 w-4" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
