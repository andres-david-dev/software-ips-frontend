"use client";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [logoError, setLogoError] = useState(false);
  const [logoIndex, setLogoIndex] = useState(0);

  const logoCandidates = [
    "/images/logo.jpeg",

  ];

  const handleLogoError = () => {
    if (logoIndex < logoCandidates.length - 1) {
      setLogoIndex((i) => i + 1);
    } else {
      setLogoError(true);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-white overflow-hidden">
      <header className="flex-none h-16 bg-white border-b border-zinc-200 shadow-sm">
        <div className="h-full px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {!logoError ? (
              <Image
                src={logoCandidates[logoIndex]}
                alt="Somedi IPS"
                width={180}
                height={60}
                priority
                onError={handleLogoError}
                className="object-contain h-12"
              />
            ) : (
              <span className="text-xl font-semibold text-zinc-900">Somedi IPS</span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] text-white font-semibold flex items-center justify-center text-sm">
                U
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-zinc-900">Usuario</p>
                <p className="text-xs text-zinc-500">Activo</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-6 overflow-auto bg-[#f7fafc]">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
