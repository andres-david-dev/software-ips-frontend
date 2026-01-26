import { NextRequest, NextResponse } from "next/server";

// Este endpoint ya no maneja lógica de base de datos. Usa el backend Express para registrar usuarios.
export async function POST(req: NextRequest) {
  return NextResponse.json({ error: "Este endpoint está deshabilitado. Usa el backend para registrar usuarios." }, { status: 501 });
}
