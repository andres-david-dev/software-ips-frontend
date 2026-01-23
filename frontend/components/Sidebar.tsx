"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isNuevoServicio = pathname.startsWith("/nuevo-servicio");
  const isBase = pathname === "/nuevo-servicio";

  return (
    <aside className="w-[280px] shrink-0 border-r border-zinc-200 bg-white">
      <div className="h-14 px-4 flex items-center border-b border-zinc-200 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)]">
        <span className="text-white font-semibold tracking-wide">SOMEDI S.A.S.</span>
      </div>

      <nav className="p-3">
        <div className="space-y-1">
          <Link
            href="/nuevo-servicio"
            className={cn(
              "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isNuevoServicio
                ? "bg-zinc-100 text-zinc-900"
                : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
            )}
          >
            <IconPlus className="h-4 w-4 text-zinc-700" />
            <span className="flex-1">Nuevo Servicio</span>
            <IconChevron
              className={cn(
                "h-4 w-4 text-zinc-500 transition-transform",
                isNuevoServicio && !isBase && "rotate-90",
              )}
            />
          </Link>

          {isNuevoServicio && (
            <div className="mt-1 ml-2 border-l border-zinc-200 pl-2 space-y-1">
              {modalidades.map((item) => {
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
      </nav>

      <div className="mt-auto p-3">
        <button
          type="button"
          onClick={() => {
            document.cookie = "somedi_session=; Max-Age=0; Path=/; SameSite=Lax";
            router.push("/");
            router.refresh();
          }}
          className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
        >
          <IconLogout className="h-4 w-4" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
