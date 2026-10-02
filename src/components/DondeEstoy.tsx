import { useLocalSearchParams, usePathname, useSegments } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const DEBUG = false;

export default function DondeEstoy() {
  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  if (!DEBUG) return null;

  return (
    <View style={estilos.caja}>
      <Text style={estilos.titulo}>¿Dónde estoy?</Text>
      <Text style={estilos.linea}>pathname: {pathname}</Text>
      <Text style={estilos.linea}>segments: {JSON.stringify(segments)}</Text>
      <Text style={estilos.linea}>params: {JSON.stringify(params)}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  caja: { margin: 16, padding: 12, borderRadius: 8, backgroundColor: '#eef2ff' },
  titulo: { fontWeight: '700', marginBottom: 4, color: '#1e1b4b' },
  linea: { fontFamily: 'monospace', fontSize: 12, color: '#1e1b4b' },
});