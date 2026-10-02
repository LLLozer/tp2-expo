import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router/js-tabs';

import { useComedor } from '../../context/ComedorContext';

export default function LayoutTabs() {
  const { cantidad } = useComedor();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          headerShown: false, // idem
          tabBarBadge: cantidad > 0 ? cantidad : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}