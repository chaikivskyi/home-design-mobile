import { Redirect, Tabs } from 'expo-router';
import { Text, Pressable, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PencilRuler } from 'lucide-react-native';
import { MenuItemLogOut } from '@/features/auth/components/MenuItemLogOut';
import { useAuthContext } from '@/features/auth/contexts/AuthContext';

export default function TabsLayout() {
  const { authenticated } = useAuthContext();

  if (authenticated === false) {
    return <Redirect href="/auth" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: false,
        tabBarStyle: [{}, Platform.OS === 'web' ? { position: 'relative' as const } : null],
      }}
      tabBar={(props) => <BottomBar {...props} />}
    >
      <Tabs.Screen
        name="design"
        options={{
          title: 'Design',
          tabBarIcon: ({ color, size }) => <PencilRuler color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

function BottomBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: insets.bottom || 8,
        paddingTop: 8,
        paddingHorizontal: 12,
        borderTopWidth: 0.5,
        borderTopColor: '#E5E7EB',
        backgroundColor: 'white',
        gap: 12,
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel ??
          options.title ??
          route.name.charAt(0).toUpperCase() + route.name.slice(1);

        const isFocused = state.index === index;

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => navigation.navigate(route.name)}
            style={({ pressed }) => ({
              flex: 1,
              opacity: pressed ? 0.7 : 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              borderRadius: 12,
              backgroundColor: isFocused ? '#F3F4F6' : 'transparent',
            })}
          >
            {options.tabBarIcon
              ? options.tabBarIcon({
                  color: isFocused ? '#111827' : '#6B7280',
                  size: 22,
                  focused: isFocused,
                })
              : null}
            <Text style={{ fontSize: 12, color: isFocused ? '#111827' : '#6B7280', marginTop: 2 }}>
              {label}
            </Text>
          </Pressable>
        );
      })}

      <MenuItemLogOut />
    </View>
  );
}
