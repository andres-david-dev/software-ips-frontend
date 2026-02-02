import React from "react";

// Wizard principal para los pasos de intramural
export function IntramuralWizard({ defaultStep = 1 }: { defaultStep?: 1 | 2 | 3 }) {
  // Aquí va la lógica real del wizard, por ahora solo placeholder
  return (
    <div>
      <h1>Wizard Intramural (Paso {defaultStep})</h1>
      {/* Aquí renderizar los pasos reales según defaultStep */}
    </div>
  );
}

export default function NuevoServicioIntramural() {
  return <IntramuralWizard defaultStep={1} />;
}
