"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function TerminosCondiciones() {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            {logoError ? (
              <span className="text-xl font-bold text-zinc-900">Somedi IPS</span>
            ) : (
              <Image
                src="/images/logo.png"
                alt="Somedi IPS"
                width={150}
                height={60}
                onError={() => setLogoError(true)}
              />
            )}
          </Link>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white font-medium hover:opacity-95 transition-opacity"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2">
              Términos y Condiciones de Uso
            </h1>
            <p className="text-zinc-600">Sistema SOMEDI IPS</p>
            <p className="text-sm text-zinc-500 mt-2">Última actualización: Enero 2026</p>
          </div>

          <div className="prose prose-zinc max-w-none">
            <p className="text-lg mb-6 text-zinc-700">
              El presente documento regula el acceso y uso del sistema de información SOMEDI IPS, software para la gestión de procesos de Seguridad y Salud en el Trabajo y atención en salud, propiedad de SOMEDI IPS, en adelante LA IPS.
            </p>

            <p className="font-semibold text-zinc-900 mb-8">
              El acceso al sistema implica la aceptación expresa de estos Términos y Condiciones.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">1. Objeto</h2>
              <p className="text-zinc-700 leading-relaxed">
                El sistema SOMEDI IPS tiene como finalidad apoyar los procesos administrativos, asistenciales y clínicos de LA IPS, permitiendo la gestión segura de información relacionada con usuarios, pacientes, agendas, historias clínicas y demás actividades propias de la prestación de servicios de salud.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">2. Usuarios autorizados</h2>
              <p className="text-zinc-700 mb-3">El sistema es de uso exclusivo para:</p>
              <ul className="list-disc list-inside space-y-2 text-zinc-700 mb-4">
                <li>Personal médico</li>
                <li>Personal asistencial</li>
                <li>Personal administrativo</li>
                <li>Personal directivo</li>
                <li>Usuarios técnicos autorizados por LA IPS</li>
              </ul>
              <p className="text-zinc-700">
                Cada usuario contará con credenciales únicas, personales e intransferibles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">3. Obligaciones del usuario</h2>
              <p className="text-zinc-700 mb-3">El usuario se compromete a:</p>
              <ul className="list-disc list-inside space-y-2 text-zinc-700">
                <li>Custodiar adecuadamente sus credenciales de acceso</li>
                <li>No divulgar información confidencial</li>
                <li>Utilizar el sistema únicamente para fines laborales</li>
                <li>Respetar los niveles de acceso asignados</li>
                <li>Cumplir la normatividad vigente y las políticas internas de LA IPS</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">4. Confidencialidad de la información</h2>
              <p className="text-zinc-700 mb-3">
                Toda la información contenida en el sistema, especialmente la relacionada con datos de salud, es confidencial, conforme a la Ley 23 de 1981 y la Resolución 1995 de 1999.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-4">
                <p className="text-amber-900 font-semibold">
                  El acceso indebido o la divulgación no autorizada constituirá falta grave.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">5. Seguridad y control</h2>
              <p className="text-zinc-700 mb-3">
                LA IPS implementa medidas de seguridad técnicas, administrativas y organizacionales para proteger la información.
              </p>
              <p className="text-zinc-700">
                El sistema cuenta con mecanismos de autenticación, control de accesos y registro de actividades.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">6. Auditoría y trazabilidad</h2>
              <p className="text-zinc-700 mb-3">
                El sistema registra automáticamente los accesos y operaciones realizadas por los usuarios, información que podrá ser utilizada para:
              </p>
              <ul className="list-disc list-inside space-y-2 text-zinc-700">
                <li>Auditorías internas</li>
                <li>Procesos disciplinarios</li>
                <li>Requerimientos legales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">7. Uso indebido</h2>
              <p className="text-zinc-700 mb-3">Se considera uso indebido:</p>
              <ul className="list-disc list-inside space-y-2 text-zinc-700 mb-4">
                <li>Acceso sin autorización</li>
                <li>Alteración de información</li>
                <li>Uso del sistema para fines no permitidos</li>
                <li>Intentos de vulnerar la seguridad</li>
              </ul>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
                <p className="text-red-900 font-semibold">
                  LA IPS podrá suspender o cancelar el acceso sin previo aviso.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">8. Propiedad intelectual</h2>
              <p className="text-zinc-700">
                El sistema SOMEDI IPS es propiedad de LA IPS. El usuario no adquiere derechos sobre el software, bases de datos o diseño.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">9. Modificaciones</h2>
              <p className="text-zinc-700">
                LA IPS podrá modificar estos términos en cualquier momento. Las modificaciones entrarán en vigencia desde su publicación.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">10. Legislación aplicable</h2>
              <p className="text-zinc-700">
                Estos términos se rigen por las leyes de la República de Colombia.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-100 border-t border-zinc-200 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-zinc-600 text-sm mb-2">© 2026 SOMEDI IPS. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-4 text-sm">
            <Link href="/terminos-y-condiciones" className="text-blue-600 hover:underline">
              Términos y Condiciones
            </Link>
            <span className="text-zinc-400">|</span>
            <Link href="/politica-de-datos" className="text-blue-600 hover:underline">
              Política de Datos
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
