import { SectionList, StyleSheet, Text } from 'react-native';

import DondeEstoy from '../../../components/DondeEstoy';
import TarjetaPlato from '../../../components/TarjetaPlato';
import { CATEGORIAS, platosDeCategoria } from '../../../data/platos';

const secciones = CATEGORIAS.map((categoria) => ({
  title: categoria.charAt(0).toUpperCase() + categoria.slice(1),
  data: platosDeCategoria(categoria),
}));

export default function MenuPantalla() {
  return (
    <SectionList
      sections={secciones}
      keyExtractor={(plato) => String(plato.id)}
      renderItem={({ item }) => <TarjetaPlato plato={item} />}
      renderSectionHeader={({ section }) => (
        <Text style={estilos.seccion}>{section.title}</Text>
      )}
      ListFooterComponent={DondeEstoy}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}

const estilos = StyleSheet.create({
  seccion: {
    padding: 16,
    paddingBottom: 8,
    fontSize: 18,
    fontWeight: '700',
    backgroundColor: '#f3f4f6',
    color: '#111827',
  },
});