import { Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '../../../components/DondeEstoy';
import { useComedor } from '../../../context/ComedorContext';
import { obtenerPlato } from '../../../data/platos';

export default function DetallePlato() {
  const { id } = useLocalSearchParams<{ id: string }>(); 
  const { agregarAlCarrito } = useComedor();

  const plato = obtenerPlato(id); 

  if (!plato) {
    return (
      <View style={estilos.centro}>
        <Stack.Screen options={{ title: 'No encontrado' }} />
        <Text style={estilos.mensaje}>No existe el plato "{id}".</Text>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <View style={estilos.contenedor}>
      <Stack.Screen options={{ title: plato.nombre }} />

      <Text style={estilos.nombre}>{plato.nombre}</Text>
      <Text style={estilos.precio}>$ {plato.precio.toLocaleString('es-AR')}</Text>
      <Text style={estilos.descripcion}>{plato.descripcion}</Text>

      <Pressable style={estilos.boton} onPress={() => agregarAlCarrito(plato)}>
        <Text style={estilos.textoBoton}>Agregar al carrito</Text>
      </Pressable>

      <DondeEstoy />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, padding: 16 },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  mensaje: { fontSize: 16, color: '#b91c1c' },
  nombre: { fontSize: 24, fontWeight: '700', color: '#111827' },
  precio: { marginTop: 4, fontSize: 18, color: '#374151' },
  descripcion: { marginTop: 12, fontSize: 15, color: '#4b5563' },
  boton: {
    marginTop: 24,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#2563eb',
  },
  textoBoton: { color: '#ffffff', fontWeight: '700', fontSize: 16 },
});