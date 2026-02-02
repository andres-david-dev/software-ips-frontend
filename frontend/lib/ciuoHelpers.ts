// Helpers para normalizar y búsqueda CIUO

export function normalizar(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function prepararBusqueda(arr: any[]): any[] {
  return arr.map((item) => ({
    ...item,
    search: normalizar(item.nombre || "")
  }));
}

export function aplanarCIUO(data: any[]): any[] {
  // Si data es jerárquica, aplanar a lista simple
  const out: any[] = [];
  function rec(items: any[]) {
    for (const item of items) {
      out.push(item);
      if (item.hijos) rec(item.hijos);
    }
  }
  rec(data);
  return out;
}

export function agregarSinonimos(item: any): any {
  // Aquí puedes agregar lógica de sinonimias si lo deseas
  return item;
}
