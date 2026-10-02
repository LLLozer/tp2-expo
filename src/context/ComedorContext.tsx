import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { Cola } from '../estructuras/Cola';
import { Pila } from '../estructuras/Pila';
import type { Plato } from '../data/platos';

// Tipos

export type ItemCarrito = { uid: number; plato: Plato };

export type Pedido = {
  numero: number;
  items: ItemCarrito[];
  nota: string;
  total: number;
};

type ComedorContextType = {
  usuario: string | null;
  conSesion: boolean;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;

  carrito: ItemCarrito[];
  cantidad: number;
  total: number;
  nota: string;
  puedeDeshacer: boolean;
  agregarAlCarrito: (plato: Plato) => void;
  deshacer: () => void;
  guardarNota: (texto: string) => void;

  enEspera: Pedido[]; 
  frente: Pedido | undefined;
  confirmarPedido: () => number | null;
  atenderSiguiente: () => Pedido | undefined;
  personasAdelante: (numero: number) => number | null;

  atendidos: Pedido[];
};

const USUARIO_COCINA = 'cocina';
const CLAVE_COCINA = '1234';

const ComedorContext = createContext<ComedorContextType | null>(null);

export function ComedorProvider({ children }: { children: ReactNode }) {
  const pilaDeshacer = useRef(new Pila<number>()); 
  const colaPedidos = useRef(new Cola<Pedido>());
  const pilaAtendidos = useRef(new Pila<Pedido>());
  const contadorTurno = useRef(0);
  const contadorUid = useRef(0);

  const [usuario, setUsuario] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [nota, setNota] = useState('');
  const [puedeDeshacer, setPuedeDeshacer] = useState(false);
  const [enEspera, setEnEspera] = useState<Pedido[]>([]);
  const [atendidos, setAtendidos] = useState<Pedido[]>([]);

  const iniciarSesion = useCallback((u: string, clave: string) => {
    if (u.trim() === USUARIO_COCINA && clave === CLAVE_COCINA) {
      setUsuario(u.trim());
      return true;
    }
    return false;
  }, []);

  const cerrarSesion = useCallback(() => setUsuario(null), []);

  const agregarAlCarrito = useCallback((plato: Plato) => {
    const uid = ++contadorUid.current;
    pilaDeshacer.current.push(uid);
    setCarrito((actual) => [...actual, { uid, plato }]);
    setPuedeDeshacer(true);
  }, []);

  const deshacer = useCallback(() => {
    const uid = pilaDeshacer.current.pop();
    if (uid === undefined) return;
    setCarrito((actual) => actual.filter((item) => item.uid !== uid));
    setPuedeDeshacer(!pilaDeshacer.current.vacia);
  }, []);

  const guardarNota = useCallback((texto: string) => setNota(texto), []);

  const confirmarPedido = useCallback((): number | null => {
    if (carrito.length === 0) return null;

    const numero = ++contadorTurno.current;
    const pedido: Pedido = {
      numero,
      items: carrito,
      nota,
      total: carrito.reduce((suma, item) => suma + item.plato.precio, 0),
    };

    colaPedidos.current.encolar(pedido);
    setEnEspera(colaPedidos.current.aArray());

    pilaDeshacer.current = new Pila<number>();
    setCarrito([]);
    setNota('');
    setPuedeDeshacer(false);

    return numero;
  }, [carrito, nota]);

  const atenderSiguiente = useCallback((): Pedido | undefined => {
    const pedido = colaPedidos.current.desencolar();
    if (!pedido) return undefined;

    pilaAtendidos.current.push(pedido);
    setEnEspera(colaPedidos.current.aArray());
    setAtendidos(pilaAtendidos.current.aArray().reverse()); 
    return pedido;
  }, []);

  const personasAdelante = useCallback(
    (numero: number): number | null => {
      const posicion = enEspera.findIndex((p) => p.numero === numero);
      return posicion === -1 ? null : posicion; 
    },
    [enEspera],
  );

  const total = useMemo(
    () => carrito.reduce((suma, item) => suma + item.plato.precio, 0),
    [carrito],
  );

  const value = useMemo<ComedorContextType>(
    () => ({
      usuario,
      conSesion: usuario !== null,
      iniciarSesion,
      cerrarSesion,
      carrito,
      cantidad: carrito.length,
      total,
      nota,
      puedeDeshacer,
      agregarAlCarrito,
      deshacer,
      guardarNota,
      enEspera,
      frente: enEspera[0],
      confirmarPedido,
      atenderSiguiente,
      personasAdelante,
      atendidos,
    }),
    [
      usuario, carrito, total, nota, puedeDeshacer, enEspera, atendidos,
      iniciarSesion, cerrarSesion, agregarAlCarrito, deshacer, guardarNota,
      confirmarPedido, atenderSiguiente, personasAdelante,
    ],
  );

  return <ComedorContext.Provider value={value}>{children}</ComedorContext.Provider>;
}

export function useComedor(): ComedorContextType {
  const ctx = useContext(ComedorContext);
  if (!ctx) throw new Error('useComedor debe usarse dentro de <ComedorProvider>');
  return ctx;
}