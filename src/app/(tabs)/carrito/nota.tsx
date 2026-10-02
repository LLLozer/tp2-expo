import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import DondeEstoy from '../../../components/DondeEstoy';
import { useComedor } from '../../../context/ComedorContext';

export default function NotaPantalla() {
  const router = useRouter();
  const { nota, guardarNota } = useComedor();
  const [texto, setTexto] = useState(nota); 

  const guardar = () => {
    guardarNota(texto.trim());
    router.back(); 
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.etiqueta}>Aclaración para la cocina</Text>
      <TextInput
        style={estilos.input}
        value={texto}
        onChangeText={setTexto}
        placeholder="Ej.: sin sal"
        multiline
      />
      <Pressable style={estilos.boton} onPress={guardar}>
        <Text style={estilos.textoBoton}>Guardar nota</Text>
      </Pressable>
      <DondeEstoy />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, padding: 16, gap: 12 },
  etiqueta: { fontWeight: '600', color: '#111827' },
  input: {
    minHeight: 90,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    textAlignVertical: 'top',
  },
  boton: { padding: 14, borderRadius: 10, alignItems: 'center', backgroundColor: '#2563eb' },
  textoBoton: { color: '#ffffff', fontWeight: '700' },
});