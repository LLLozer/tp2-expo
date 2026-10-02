import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '../components/DondeEstoy';
import { useComedor } from '../context/ComedorContext';

export default function ConfirmarPantalla() {
  const router = useRouter();
  const { carrito, total, nota, confirmarPedido } = useComedor();

  const confirmar = () => {
    const numero = confirmarPedido(); 
    if (numero === null) return;

    router.replace({ pathname: '/turno/[numero]', params: { numero: String(numero) } });
  };

  const cancelar = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/carrito'); 
  };

  if (carrito.length === 0) {
    return (
      <View style={estilos.centro}>
        <Text style={estilos.vacio}>No hay nada para confirmar.</Text>
        <Pressable style={[estilos.boton, estilos.secundario]} onPress={cancelar}>
          <Text style={estilos.textoSecundario}>Volver</Text>
        </Pressable>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={estilos.contenedor}>
      <Text style={estilos.titulo}>Resumen del pedido</Text>

      {carrito.map((item) => (
        <View key={item.uid} style={estilos.fila}>
          <Text style={estilos.nombre}>{item.plato.nombre}</Text>
          <Text>$ {item.plato.precio.toLocaleString('es-AR')}</Text>
        </View>
      ))}

      <Text style={estilos.total}>Total: $ {total.toLocaleString('es-AR')}</Text>
      {nota !== '' && <Text style={estilos.nota}>Nota: {nota}</Text>}

      <Pressable style={[estilos.boton, estilos.primario]} onPress={confirmar}>
        <Text style={estilos.textoPrimario}>Confirmar</Text>
      </Pressable>
      <Pressable style={[estilos.boton, estilos.secundario]} onPress={cancelar}>
        <Text style={estilos.textoSecundario}>Cancelar</Text>
      </Pressable>

      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { padding: 16, gap: 10 },
  centro: { flex: 1, justifyContent: 'center', padding: 16, gap: 10 },
  vacio: { textAlign: 'center', color: '#6b7280' },
  titulo: { fontSize: 20, fontWeight: '700', color: '#111827' },
  fila: { flexDirection: 'row', justifyContent: 'space-between' },
  nombre: { flex: 1, fontWeight: '600', color: '#111827' },
  total: { marginTop: 8, fontSize: 18, fontWeight: '700', color: '#111827' },
  nota: { fontStyle: 'italic', color: '#4b5563' },
  boton: { padding: 14, borderRadius: 10, alignItems: 'center' },
  primario: { backgroundColor: '#2563eb' },
  secundario: { backgroundColor: '#e5e7eb' },
  textoPrimario: { color: '#ffffff', fontWeight: '700' },
  textoSecundario: { color: '#111827', fontWeight: '600' },
});