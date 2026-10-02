import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '../../components/DondeEstoy';
import { useComedor } from '../../context/ComedorContext';

const MINUTOS_POR_PEDIDO = 3; 

export default function TurnoPantalla() {
  const { numero } = useLocalSearchParams<{ numero: string }>(); 
  const router = useRouter();
  const { personasAdelante, atendidos } = useComedor();

  const valido = numero !== undefined && /^\d+$/.test(numero);
  const n = valido ? Number(numero) : NaN;
  const adelante = valido ? personasAdelante(n) : null; 
  const yaAtendido = valido && atendidos.some((p) => p.numero === n);

  const volverAlInicio = () => router.dismissTo('/');

  let contenido;
  if (yaAtendido) {
    contenido = <Text style={estilos.mensaje}>Tu pedido ya fue atendido. ¡Buen provecho!</Text>;
  } else if (adelante === null) {
    contenido = <Text style={estilos.error}>No existe el turno "{numero}".</Text>;
  } else {
    contenido = (
      <>
        <Text style={estilos.etiqueta}>Tu turno</Text>
        <Text style={estilos.numero}>{n}</Text>
        <Text style={estilos.mensaje}>
          {adelante === 0
            ? '¡Sos el próximo!'
            : `Hay ${adelante} ${adelante === 1 ? 'pedido' : 'pedidos'} adelante.`}
        </Text>
        <Text style={estilos.estimado}>
          Espera estimada: {adelante * MINUTOS_POR_PEDIDO} min
        </Text>
      </>
    );
  }

  return (
    <View style={estilos.contenedor}>
      <Stack.Screen options={{ title: valido ? `Turno ${n}` : 'Turno' }} />
      {contenido}
      <Pressable style={estilos.boton} onPress={volverAlInicio}>
        <Text style={estilos.textoBoton}>Volver al inicio</Text>
      </Pressable>
      <DondeEstoy />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, gap: 8 },
  etiqueta: { fontSize: 16, color: '#6b7280' },
  numero: { fontSize: 72, fontWeight: '800', color: '#111827' },
  mensaje: { fontSize: 18, textAlign: 'center', color: '#111827' },
  estimado: { color: '#4b5563' },
  error: { fontSize: 16, color: '#b91c1c' },
  boton: { marginTop: 16, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, backgroundColor: '#e5e7eb' },
  textoBoton: { fontWeight: '600', color: '#111827' },
});