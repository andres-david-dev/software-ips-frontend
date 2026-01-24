export type Especialista = {
  id: string;
  nombre: string;
};

export type AgendaItem = {
  id: string;
  asunto: string;
  trabajador: string;
  especialista: string;
  fechaCita: string;
  estado: "Asignada" | "Cumplida" | "Cancelada" | "Pendiente";
};

// Datos cargados dinámicamente desde la sección de configuración de agenda.
// Aquí se dejan vacíos para evitar datos quemados.
export const especialistas: Especialista[] = [];
export const reasignarResultados: AgendaItem[] = [];
