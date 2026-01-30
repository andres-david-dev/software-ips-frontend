"use client";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [logoError, setLogoError] = useState(false);
  const [logoIndex, setLogoIndex] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");
  const [userError, setUserError] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) setUserError(error.message);
        setUser(data?.user);
        // Si hay usuario, buscar el nombre real en la tabla usuarios
        if (data?.user?.email) {
          const { data: userData, error: userDbError } = await supabase
            .from('usuarios')
            .select('nombre')
            .eq('email', data.user.email)
            .single();
          if (!userDbError && userData?.nombre) {
            setUserName(userData.nombre);
          } else {
            setUserName("");
          }
        }
      } catch (err: any) {
        setUserError(err?.message || "Error desconocido");
      }
    };
    fetchUser();
  }, []);

  const getInitials = (name: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

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
          {user && (
            <Link href="/perfil" className="flex items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl transition-shadow group-hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #22c55e 100%)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                {getInitials(userName || user.user_metadata?.nombre || user.user_metadata?.full_name || user.email)}
              </div>
              <span className="font-semibold text-zinc-900 group-hover:text-[var(--brand-blue)]">
                {userName || user.user_metadata?.nombre || user.user_metadata?.full_name || user.email}
              </span>
            </Link>
          )}
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
