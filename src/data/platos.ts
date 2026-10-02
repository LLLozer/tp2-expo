export const CATEGORIAS = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export type Plato = {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
};

export const platos: Plato[] = [
  { id: 1, nombre: 'Chocolatada y pan', precio: 2800, descripcion: 'Una taza de chocolatada con un pan', categoria: 'desayuno' },
  { id: 2, nombre: 'Matecocido con pan', precio: 3200, descripcion: 'Una taza de matecocido con leche y un pan', categoria: 'desayuno' },
  { id: 3, nombre: 'Café con pan', precio: 2200, descripcion: 'Una taza de café sin leche con un pan', categoria: 'desayuno' },
  { id: 4, nombre: 'Guiso de arroz con pollo', precio: 6500, descripcion: 'Un plato de guiso de arroz con pollo', categoria: 'almuerzo' },
  { id: 5, nombre: 'Polenta con estofado de ternera', precio: 5200, descripcion: 'Un plato de polenta con estofado de ternera', categoria: 'almuerzo' },
  { id: 6, nombre: 'Pollo a la mostaza con arroz cremoso', precio: 6200, descripcion: 'Un plato de pollo a la mostaza con arroz cremoso', categoria: 'almuerzo' },
  { id: 7, nombre: 'Hamburguesa con puré', precio: 4800, descripcion: 'Una hamburguesa (solo la carne) con puré de papas', categoria: 'almuerzo' },
  { id: 8, nombre: 'Agua mineral', precio: 1200, descripcion: 'Botella de 600 ml, sin gas', categoria: 'bebidas' },
  { id: 9, nombre: '(Outdated) Manaos de Pomelo', precio: 1800, descripcion: 'Botella de 600 ml de manaos de pomelo', categoria: 'bebidas' },
  { id: 10, nombre: '(Outdated) Manaos de Naranja', precio: 2000, descripcion: 'Botella de 600 ml de manaos de naranja', categoria: 'bebidas' },
  { id: 11, nombre: '(Outdated) Manaos de Ananá', precio: 2600, descripcion: 'Botella de 600 ml de manaos de ananá', categoria: 'bebidas' },
  { id: 12, nombre: 'Alfajor', precio: 1300, descripcion: 'Alfajor de chocolate relleno con dulce de leche.', categoria: 'kiosco' },
  { id: 13, nombre: 'Papas fritas', precio: 1900, descripcion: 'Paquete individual de papas fritas.', categoria: 'kiosco' },
  { id: 14, nombre: 'Barra de cereal', precio: 1000, descripcion: 'Barra de cereal con frutos secos.', categoria: 'kiosco' },
];

export function esCategoria(valor: string | undefined): valor is Categoria {
  return CATEGORIAS.some((c) => c === valor);
}

export function obtenerPlato(id: string | undefined): Plato | undefined {
  if (id === undefined || !/^\d+$/.test(id)) return undefined;
  const numero = Number(id);
  return platos.find((p) => p.id === numero);
}

export function platosDeCategoria(categoria: Categoria): Plato[] {
  return platos.filter((p) => p.categoria === categoria);
}

export function buscarPlatos(texto?: string, categoria?: Categoria): Plato[] {
  const q = (texto ?? '').trim().toLowerCase();
  return platos.filter(
    (p) =>
      (!categoria || p.categoria === categoria) &&
      (q === '' || p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q)),
  );
}