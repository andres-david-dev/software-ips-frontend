"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function PoliticaDatos() {
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
              Política de Tratamiento de Datos Personales
            </h1>
            <p className="text-zinc-600">SOMEDI IPS</p>
          </div>

          <div className="prose prose-zinc max-w-none">
            <p className="text-lg mb-8 text-zinc-700">
              En cumplimiento de la Ley 1581 de 2012, el Decreto 1377 de 2013, y demás normas concordantes, SOMEDI IPS adopta la presente Política de Tratamiento de Datos Personales.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">1. Identificación del responsable</h2>
              <div className="bg-zinc-50 rounded-lg p-6 space-y-2">
                <p className="text-zinc-700"><strong>Razón social:</strong> SOMEDI IPS</p>
                <p className="text-zinc-700"><strong>NIT:</strong> [NIT de la IPS]</p>
                <p className="text-zinc-700"><strong>Domicilio:</strong> [Ciudad – Departamento]</p>
                <p className="text-zinc-700"><strong>Dirección:</strong> [Dirección física]</p>
                <p className="text-zinc-700"><strong>Correo electrónico:</strong> [correo institucional]</p>
                <p className="text-zinc-700"><strong>Teléfono:</strong> [teléfono]</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">2. Marco legal</h2>
              <p className="text-zinc-700 mb-3">Esta política se rige por:</p>
              <ul className="list-disc list-inside space-y-2 text-zinc-700">
                <li>Ley 1581 de 2012</li>
                <li>Decreto 1377 de 2013</li>
                <li>Ley 23 de 1981</li>
                <li>Resolución 1995 de 1999</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">3. Definiciones</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold text-zinc-900">Dato personal:</dt>
                  <dd className="text-zinc-700 ml-4">Información que identifica a una persona natural.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-zinc-900">Dato sensible:</dt>
                  <dd className="text-zinc-700 ml-4">Información que afecta la intimidad del titular, incluyendo datos de salud.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-zinc-900">Titular:</dt>
                  <dd className="text-zinc-700 ml-4">Persona natural a quien pertenecen los datos.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-zinc-900">Tratamiento:</dt>
                  <dd className="text-zinc-700 ml-4">Recolección, almacenamiento, uso, circulación o supresión.</dd>
                </div>
              </dl>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">4. Datos objeto de tratamiento</h2>
              <p className="text-zinc-700 mb-3">LA IPS podrá tratar, entre otros:</p>
              <ul className="list-disc list-inside space-y-2 text-zinc-700">
                <li>Datos de identificación</li>
                <li>Datos de contacto</li>
                <li>Datos laborales</li>
                <li>Datos clínicos y de salud (datos sensibles)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">5. Finalidades del tratamiento</h2>
              <p className="text-zinc-700 mb-3">Los datos serán tratados para:</p>
              <ul className="list-disc list-inside space-y-2 text-zinc-700">
                <li>Prestación de servicios de salud</li>
                <li>Gestión de historias clínicas</li>
                <li>Gestión administrativa y contable</li>
                <li>Cumplimiento de obligaciones legales</li>
                <li>Auditorías y control interno</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">6. Tratamiento de datos sensibles</h2>
              <p className="text-zinc-700">
                El tratamiento de datos sensibles se realizará conforme al artículo 6 de la Ley 1581, garantizando su confidencialidad y restringiendo el acceso solo a personal autorizado.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">7. Derechos del titular</h2>
              <p className="text-zinc-700 mb-3">El titular podrá:</p>
              <ul className="list-disc list-inside space-y-2 text-zinc-700">
                <li>Conocer, actualizar y rectificar sus datos</li>
                <li>Solicitar prueba de autorización</li>
                <li>Ser informado del uso de sus datos</li>
                <li>Presentar quejas ante la SIC</li>
                <li>Revocar la autorización cuando sea procedente</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">8. Procedimiento para ejercer derechos</h2>
              <p className="text-zinc-700 mb-3">Las solicitudes deberán enviarse a:</p>
              <div className="bg-blue-50 rounded-lg p-6 space-y-2">
                <p className="text-zinc-700"><strong>Correo:</strong> [correo institucional]</p>
                <p className="text-zinc-700"><strong>Asunto:</strong> Protección de datos personales</p>
              </div>
              <p className="text-zinc-700 mt-4">El término de respuesta será el establecido por la ley.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">9. Seguridad de la información</h2>
              <p className="text-zinc-700">
                LA IPS adopta medidas técnicas, humanas y administrativas para proteger los datos personales y evitar accesos no autorizados.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">10. Vigencia</h2>
              <p className="text-zinc-700">
                Esta política rige a partir de su publicación y permanecerá vigente mientras se realice el tratamiento de datos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">11. Aceptación</h2>
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="text-green-900 font-semibold">
                  Al acceder y utilizar el sistema, el usuario autoriza de manera previa, expresa e informada el tratamiento de sus datos personales conforme a esta política.
                </p>
              </div>
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
