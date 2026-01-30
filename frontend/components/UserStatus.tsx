"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UserStatus() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user));
  }, []);

  return (
    <div style={{position: 'fixed', top: 10, right: 10, background: '#fff', padding: '8px 16px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', zIndex: 1000}}>
      {user ? (
        <span>Usuario logueado: <b>{user.email}</b></span>
      ) : (
        <span>No hay sesión activa</span>
      )}
    </div>
  );
}
