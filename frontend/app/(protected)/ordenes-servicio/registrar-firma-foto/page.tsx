"use client";

import { useState, useRef } from "react";

const MOCK_ORDEN = {
  numeroOrden: "92748",
  fechaSolicitud: "2025-07-28 14:00:00",
  realizadoEn: "Datos desde la BD",
  atendidoPor: "Datos desde la BD",
  tipoEvaluacion: "Datos desde la BD",
  enfasisEvaluacion: "Datos desde la BD"
};


export default function RegistrarFirmaFotoPage() {
  const [numeroOrden, setNumeroOrden] = useState("");
  const [ordenEncontrada, setOrdenEncontrada] = useState(false);
  const [error, setError] = useState("");
  // Firma
  const [firmaDataUrl, setFirmaDataUrl] = useState<string>("");
  const [showFirmaModal, setShowFirmaModal] = useState(false);
  const [noSabeFirmar, setNoSabeFirmar] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);
  // Foto
  const [fotoDataUrl, setFotoDataUrl] = useState<string>("");
  const [showFotoModal, setShowFotoModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleNumeroOrdenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Solo permitir números
    const value = e.target.value.replace(/\D/g, "");
    setNumeroOrden(value);
  };

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!numeroOrden) {
      setError("Debes ingresar un número de orden");
      setOrdenEncontrada(false);
      return;
    }
    setOrdenEncontrada(true);
  };


  // Firma: lógica canvas
  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    setDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setLastPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing || !canvasRef.current || !lastPoint) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    setLastPoint({ x, y });
  };
  const endDraw = () => {
    setDrawing(false);
    setLastPoint(null);
  };
  const clearFirma = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };
  const saveFirma = () => {
    if (canvasRef.current) {
      setFirmaDataUrl(canvasRef.current.toDataURL("image/png"));
      setShowFirmaModal(false);
    }
  };

  // Foto: lógica webcam
  // Estado para saber si la cámara está activa
  const [camaraActiva, setCamaraActiva] = useState(false);

  const openFotoModal = () => {
    setShowFotoModal(true);
    setTimeout(() => {
      if (videoRef.current) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
          .then((stream) => {
            if (videoRef.current) videoRef.current.srcObject = stream;
            setCamaraActiva(true);
          })
          .catch(() => { setCamaraActiva(false); });
      }
    }, 200);
  };
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setCamaraActiva(false);
  };
  const captureFoto = () => {
    if (videoRef.current && videoRef.current.srcObject && camaraActiva) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setFotoDataUrl(canvas.toDataURL("image/jpeg"));
        stopCamera();
      }
    }
  };
  const closeFotoModal = () => {
    stopCamera();
    setFotoDataUrl(""); // Opcional: limpiar foto al cerrar modal
    setShowFotoModal(false);
  };
  const clearFoto = () => {
    setFotoDataUrl("");
    // Siempre detener y reactivar la cámara
    if (videoRef.current) {
      if (videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
        .then((stream) => {
          if (videoRef.current) videoRef.current.srcObject = stream;
          setCamaraActiva(true);
        })
        .catch(() => { setCamaraActiva(false); });
    }
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-zinc-900">Ordenes de Servicio</h1>
          <span className="text-zinc-200">·</span>
          <span className="text-2xl font-semibold text-[var(--brand-blue)]">Registrar firma / foto del usuario</span>
        </div>
      </header>

      <section className="bg-[#f7fafc] rounded-2xl border border-zinc-200 shadow-sm p-6">
        <form onSubmit={handleBuscar}>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <label htmlFor="numeroOrden" className="text-sm font-semibold text-zinc-900">
              No. Orden <span className="text-rose-600">*</span>
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="numeroOrden"
                name="numeroOrden"
                type="text"
                className="flex-1 h-11 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent"
                placeholder="Ingresa el número de orden"
                value={numeroOrden}
                onChange={handleNumeroOrdenChange}
                required
              />
              <button
                className="h-11 px-6 rounded-xl bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-green)] text-sm font-semibold text-white hover:opacity-90 shadow-md transition-all"
                type="submit"
              >
                Buscar
              </button>
            </div>
            {error && (
              <div className="mt-2 text-sm text-rose-600">{error}</div>
            )}
          </div>
        </form>

        {ordenEncontrada && (
          <>
            {/* Datos de la orden - estilo propio */}
            <div className="mt-6 space-y-6">
              {/* Primera tarjeta */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="font-bold mb-1">Orden Servicio No.</div>
                  <div className="text-zinc-700"><span className="font-bold">--</span> - --</div>
                  <div className="font-bold mt-4 mb-1">Tipo de Evaluación</div>
                  <div className="text-zinc-700">--</div>
                  <div className="font-bold mt-4 mb-1">Énfasis Evaluación</div>
                  <div className="text-zinc-700">--</div>
                  <div className="font-bold mt-4 mb-1">Realizado en</div>
                  <div className="text-zinc-700">--</div>
                </div>
                <div>
                  <div className="font-bold mb-1">Fecha Solicitud</div>
                  <div className="text-zinc-700">--</div>
                  <div className="font-bold mt-4 mb-1">Atendido por</div>
                  <div className="text-zinc-700">--</div>
                </div>
              </div>
              {/* Segunda tarjeta */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="font-bold mb-1">Trabajador</div>
                  <div className="text-zinc-700">--</div>
                  <div className="font-bold mt-4 mb-1">Sexo</div>
                  <div className="text-zinc-700">--</div>
                  <div className="font-bold mt-4 mb-1">Teléfono</div>
                  <div className="text-zinc-700">--</div>
                </div>
                <div>
                  <div className="font-bold mb-1">Edad</div>
                  <div className="text-zinc-700">--</div>
                  <div className="font-bold mt-4 mb-1">Dirección</div>
                  <div className="text-zinc-700">--</div>
                  <div className="font-bold mt-4 mb-1">e-Mail</div>
                  <div className="text-zinc-700 text-blue-700">--</div>
                </div>
              </div>
              {/* Tercera tarjeta */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="font-bold mb-1">Empresa/Convenio</div>
                  <div className="text-zinc-700">--</div>
                </div>
                <div>
                  <div className="font-bold mb-1">Empresa Usuaria</div>
                  <div className="text-zinc-700">--</div>
                  <div className="font-bold mt-4 mb-1">Cargo a Desempeñar</div>
                  <div className="text-zinc-700">--</div>
                </div>
              </div>
              {/* Tabla de exámenes */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                <div className="font-bold mb-3">Exámenes a Realizar</div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-zinc-200">
                    <thead>
                      <tr className="bg-zinc-200 text-zinc-700">
                        <th className="px-3 py-2 text-left font-bold">No.</th>
                        <th className="px-3 py-2 text-left font-bold">Exámenes a Realizar</th>
                        <th className="px-3 py-2 text-left font-bold">Fecha Atención</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-100">
                        <td className="px-3 py-2">1</td>
                        <td className="px-3 py-2">--</td>
                        <td className="px-3 py-2">--</td>
                      </tr>
                      <tr className="border-b border-zinc-100">
                        <td className="px-3 py-2">2</td>
                        <td className="px-3 py-2">--</td>
                        <td className="px-3 py-2">--</td>
                      </tr>
                      <tr className="border-b border-zinc-100">
                        <td className="px-3 py-2">3</td>
                        <td className="px-3 py-2">--</td>
                        <td className="px-3 py-2">--</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">4</td>
                        <td className="px-3 py-2">--</td>
                        <td className="px-3 py-2">--</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Sección firma y foto - funcionalidad completa */}
            <div className="mt-6 border border-zinc-200 bg-white rounded-2xl">
              <div className="px-6 pt-5 pb-2 text-xl font-semibold text-[#2186eb]">Registro de Firma y Foto</div>
              <div className="border-t border-zinc-200 px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Firma */}
                <div className="border border-zinc-200 rounded-xl bg-[#fcfdfe] flex flex-col p-4">
                  <div className="font-semibold text-zinc-700 text-sm border-b border-zinc-100 pb-2 mb-4">FIRMA USUARIO</div>
                  <div className="flex-1 flex items-center justify-center min-h-[120px] border border-dashed border-zinc-200 rounded-lg bg-zinc-50 mb-4">
                    {firmaDataUrl ? (
                      <img src={firmaDataUrl} alt="Firma registrada" className="max-h-28 w-full object-contain" />
                    ) : (
                      <span className="text-zinc-400 text-base">Sin firma registrada</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowFirmaModal(true)}
                      className="bg-[#2186eb] hover:bg-[#1766c1] text-white font-bold rounded-lg px-6 py-2 text-base shadow-md transition-all"
                    >
                      Registrar Firma
                    </button>
                    <label className="flex items-center gap-2 text-sm text-zinc-700">
                      <input type="checkbox" className="accent-[#2186eb]" checked={noSabeFirmar} onChange={e => setNoSabeFirmar(e.target.checked)} />
                      Manifiesta NO saber firmar
                    </label>
                  </div>
                </div>
                {/* Foto */}
                <div className="border border-zinc-200 rounded-xl bg-[#fcfdfe] flex flex-col p-4">
                  <div className="font-semibold text-zinc-700 text-sm border-b border-zinc-100 pb-2 mb-4">FOTO USUARIO</div>
                  <div className="flex-1 flex items-center justify-center min-h-[120px] border border-dashed border-zinc-200 rounded-lg bg-zinc-50 mb-4">
                    {fotoDataUrl ? (
                      <img src={fotoDataUrl} alt="Foto registrada" className="max-h-28 w-full object-contain" />
                    ) : (
                      <span className="text-zinc-400 text-base">Sin foto registrada</span>
                    )}
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={openFotoModal}
                      className="bg-[#10b981] hover:bg-[#059669] text-white font-bold rounded-lg px-6 py-2 text-base shadow-md transition-all"
                    >
                      Registrar Foto
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal de firma */}
            {showFirmaModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-zinc-200">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white rounded-t-2xl">
                    <div className="font-semibold">Registrar Firma</div>
                    <button type="button" onClick={() => setShowFirmaModal(false)} className="h-8 w-8 rounded-full hover:bg-white/20" aria-label="Cerrar">×</button>
                  </div>
                  <div className="p-5">
                    <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-3">
                      <canvas
                        ref={canvasRef}
                        width={720}
                        height={220}
                        onPointerDown={startDraw}
                        onPointerMove={draw}
                        onPointerUp={endDraw}
                        onPointerLeave={endDraw}
                        className="w-full h-48 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                  <div className="px-5 py-4 border-t border-zinc-200 flex justify-between gap-3">
                    <button type="button" onClick={clearFirma} className="h-10 px-4 rounded-xl text-sm font-semibold text-zinc-700 border border-zinc-200 hover:bg-zinc-50">Borrar firma</button>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setShowFirmaModal(false)} className="h-10 px-4 rounded-xl text-sm font-semibold text-zinc-700 border border-zinc-200 hover:bg-zinc-50">Cancelar</button>
                      <button type="button" onClick={saveFirma} className="h-10 px-5 rounded-xl text-sm font-semibold text-white bg-[var(--brand-blue)]">Registrar Firma</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal de foto */}
            {showFotoModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-zinc-200">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-green)] text-white rounded-t-2xl">
                    <div className="font-semibold">Capturar Foto</div>
                    <button type="button" onClick={closeFotoModal} className="h-8 w-8 rounded-full hover:bg-white/20" aria-label="Cerrar">×</button>
                  </div>
                  <div className="p-5">
                    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 flex flex-col items-center gap-3">
                      {fotoDataUrl ? (
                        <img src={fotoDataUrl} alt="Foto capturada" className="h-96 w-64 rounded-lg object-cover" />
                      ) : (
                        <video ref={videoRef} autoPlay playsInline className="h-96 w-64 rounded-lg object-cover bg-black" />
                      )}
                    </div>
                  </div>
                  <div className="px-5 py-4 border-t border-zinc-200 flex flex-col gap-3">
                    <div className="flex gap-3">
                      <button type="button" onClick={closeFotoModal} className="flex-1 h-10 rounded-xl text-sm font-semibold text-zinc-700 border border-zinc-200 hover:bg-zinc-50">Cancelar</button>
                      <button type="button" onClick={captureFoto} disabled={!camaraActiva || !!fotoDataUrl} className="flex-1 h-10 rounded-xl text-sm font-semibold text-white bg-[var(--brand-blue)] hover:opacity-95 disabled:opacity-50">Capturar</button>
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={clearFoto} disabled={!fotoDataUrl} className="flex-1 h-10 rounded-xl text-sm font-semibold text-zinc-700 border border-zinc-200 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed">Limpiar</button>
                      <button type="button" onClick={closeFotoModal} disabled={!fotoDataUrl} className="flex-1 h-10 rounded-xl text-sm font-semibold text-white bg-[var(--brand-green)] hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed">Guardar</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
