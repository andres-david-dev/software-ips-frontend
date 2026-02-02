"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type WizardData = {
  tipoDocumento: string;
  numeroIdentificacion: string;
  // Puedes agregar más campos aquí en el futuro
};

export type WizardContextType = {
  wizardData: WizardData;
  setWizardData: React.Dispatch<React.SetStateAction<WizardData>>;
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard debe usarse dentro de WizardProvider");
  return ctx;
}

export function WizardProvider({ children }: { children: ReactNode }) {
  const [wizardData, setWizardData] = useState<WizardData>({
    tipoDocumento: "",
    numeroIdentificacion: "",
  });
  return (
    <WizardContext.Provider value={{ wizardData, setWizardData }}>
      {children}
    </WizardContext.Provider>
  );
}
