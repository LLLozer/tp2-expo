import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import type { Plato } from '../data/platos';

export default function TarjetaPlato({ plato }: { plato: Plato }) {
  return (
    <Link href={{ pathname: '/menu/[id]', params: { id: String(plato.id) } }} asChild>
      <Pressable style={estilos.tarjeta}>
        <Text style={estilos.nombre}>{plato.nombre}</Text>
        <Text style={estilos.precio}>$ {plato.precio.toLocaleString('es-AR')}</Text>
      </Pressable>
    </Link>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  nombre: { fontSize: 16, fontWeight: '600', color: '#111827' },
  precio: { marginTop: 4, color: '#4b5563' },
});