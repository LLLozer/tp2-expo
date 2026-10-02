import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '../../../components/DondeEstoy';
import { useComedor } from '../../../context/ComedorContext';

export default function CarritoPantalla() {
  const { carrito, cantidad, total, nota, puedeDeshacer, deshacer } = useComedor();

  return (
    <FlatList
      data={carrito}
      keyExtractor={(item) => String(item.uid)} 
      ListEmptyComponent={<Text style={estilos.vacio}>Todavía no agregaste nada.</Text>}
      renderItem={({ item }) => (
        <View style={estilos.fila}>
          <Text style={estilos.nombre}>{item.plato.nombre}</Text>
          <Text style={estilos.precio}>$ {item.plato.precio.toLocaleString('es-AR')}</Text>
        </View>
      )}
      ListFooterComponent={
        <View style={estilos.pie}>
          <Text style={estilos.total}>Total: $ {total.toLocaleString('es-AR')}</Text>

          {nota !== '' && <Text style={estilos.nota}>Nota: {nota}</Text>}

          <Pressable
            style={[estilos.boton, estilos.secundario, !puedeDeshacer && estilos.deshabilitado]}
            disabled={!puedeDeshacer}
            onPress={deshacer}
          >
            <Text style={estilos.textoSecundario}>Deshacer último</Text>
          </Pressable>

          <Link href="/carrito/nota" asChild>
            <Pressable style={[estilos.boton, estilos.secundario]}>
              <Text style={estilos.textoSecundario}>
                {nota === '' ? 'Agregar nota para la cocina' : 'Editar nota'}
              </Text>
            </Pressable>
          </Link>

          {cantidad > 0 ? (
            <Link href="/confirmar" asChild>
              <Pressable style={estilos.confirmar}>
                <Text style={estilos.textoConfirmar}>Confirmar pedido</Text>
              </Pressable>
            </Link>
          ) : (
            <View style={estilos.confirmarOff}>
              <Text style={estilos.textoConfirmar}>Confirmar pedido</Text>
            </View>
          )}

          <DondeEstoy />
        </View>
      }
    />
  );
}

const estilos = StyleSheet.create({
  vacio: { padding: 24, textAlign: 'center', color: '#6b7280' },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  nombre: { flex: 1, fontWeight: '600', color: '#111827' },
  precio: { color: '#4b5563' },
  pie: { padding: 16, gap: 10 },
  total: { fontSize: 20, fontWeight: '700', color: '#111827' },
  nota: { color: '#4b5563', fontStyle: 'italic' },
  boton: { padding: 12, borderRadius: 10, alignItems: 'center' },
  secundario: { backgroundColor: '#e5e7eb' },
  deshabilitado: { opacity: 0.4 },
  textoSecundario: { fontWeight: '600', color: '#111827' },
  confirmar: { padding: 14, borderRadius: 10, alignItems: 'center', backgroundColor: '#2563eb' },
  confirmarOff: { padding: 14, borderRadius: 10, alignItems: 'center', backgroundColor: '#9ca3af' },
  textoConfirmar: { color: '#ffffff', fontWeight: '700', fontSize: 16 },
});