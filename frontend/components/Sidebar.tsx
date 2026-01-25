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

function IconClock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isNuevoServicio = pathname.startsWith("/nuevo-servicio");
  const [menuOpen, setMenuOpen] = useState(false);

  const isAgenda = pathname.startsWith("/agenda");
  const [agendaOpen, setAgendaOpen] = useState(false);
  const [agendaBorrarOpen, setAgendaBorrarOpen] = useState(pathname.startsWith("/agenda/borrar-citas"));

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

          {/* Agenda */}
          <button
            type="button"
            onClick={() => setAgendaOpen((prev) => !prev)}
            className={cn(
              "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-base font-bold transition-colors",
              isAgenda ? "bg-white/25 text-white" : "text-white/95 hover:bg-white/15 hover:text-white",
            )}
            aria-expanded={agendaOpen}
            aria-controls="menu-agenda"
          >
            <IconClock className="h-5 w-5 text-white" />
            <span className="flex-1 text-left">Agenda</span>
            <IconChevron
              className={cn(
                "h-5 w-5 text-white/90 transition-transform",
                agendaOpen && "rotate-90",
              )}
            />
          </button>

          {agendaOpen && (
            <div id="menu-agenda" className="mt-1 ml-2 border-l-2 border-white/40 pl-2 space-y-1 bg-white/15 py-2 rounded-r-lg">
              {/* Ver Agenda */}
              <Link
                href="/agenda/ver-agenda"
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                  pathname.startsWith("/agenda/ver-agenda")
                    ? "bg-white text-[var(--brand-blue)] font-bold"
                    : "text-white/95 hover:bg-white/20 hover:text-white",
                )}
              >
                Ver Agenda
              </Link>

              {/* Reasignar */}
              <Link
                href="/agenda/reasignar"
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                  pathname.startsWith("/agenda/reasignar")
                    ? "bg-white text-[var(--brand-blue)] font-bold"
                    : "text-white/95 hover:bg-white/20 hover:text-white",
                )}
              >
                Reasignar
              </Link>

              {/* Borrar Citas (expandible) */}
              <button
                type="button"
                onClick={() => setAgendaBorrarOpen((prev) => !prev)}
                className={cn(
                  "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                  pathname.startsWith("/agenda/borrar-citas")
                    ? "bg-white text-[var(--brand-blue)] font-bold"
                    : "text-white/95 hover:bg-white/20 hover:text-white",
                )}
                aria-expanded={agendaBorrarOpen}
                aria-controls="submenu-borrar-citas"
              >
                <span className="flex-1 text-left">Borrar Citas</span>
                <IconChevron
                  className={cn(
                    "h-4 w-4 text-white/90 transition-transform",
                    agendaBorrarOpen && "rotate-90",
                  )}
                />
              </button>

              {agendaBorrarOpen && (
                <div id="submenu-borrar-citas" className="ml-2 border-l border-white/40 pl-2 space-y-1">
                  <Link
                    href="/agenda/borrar-citas/temporales"
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                      pathname.startsWith("/agenda/borrar-citas/temporales")
                        ? "bg-white text-[var(--brand-blue)] font-bold"
                        : "text-white/95 hover:bg-white/20 hover:text-white",
                    )}
                  >
                    Temporales
                  </Link>
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
