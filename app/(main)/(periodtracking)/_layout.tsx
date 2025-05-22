import Drawer from 'expo-router/drawer';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { CustomDrawerContent } from '@/components';

const _layout = () => {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#DAAEAE',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
          headerShown: false,
          drawerIcon: ({ size, color }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="namescreen"
        options={{
          drawerLabel: 'NameScreen',
          title: 'NameScreen',
          headerShown: false,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="welcomescreen"
        options={{
          drawerLabel: 'WelcomeScreen',
          title: 'WelcomeScreen',
          headerShown: false,
          drawerItemStyle: { display: 'none' },
        }}
      />

      <Drawer.Screen
        name="lastperiodscreen"
        options={{
          drawerLabel: 'LastPeriodScreen',
          title: 'LastPeriodScreen',
          headerShown: false,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="cyclelengthscreen"
        options={{
          drawerLabel: 'CycleLengthScreen',
          title: 'CycleLengthScreen',
          headerShown: false,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="periodlengthscreen"
        options={{
          drawerLabel: 'PeriodLengthScreen',
          title: 'PeriodLengthScreen',
          headerShown: false,
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer>
  );
};
export default _layout;
