import { CustomDrawerContent } from '@/components';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

const MainLayout = () => {
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
        name="donerList"
        options={{
          drawerLabel: 'Donor List',
          title: 'Donor List',
          headerShown: false,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="settingsScreen"
        options={{
          drawerLabel: 'Settings',
          title: 'Settings',
          headerShown: false,
          drawerIcon: ({ size, color }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="donateBloodForm"
        options={{
          drawerLabel: 'DonateBloodForm',
          title: 'DonateBloodForm',
          headerShown: false,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="donate"
        options={{
          drawerLabel: 'Donate',
          title: 'Donate',
          headerShown: false,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="scheduleDonation"
        options={{
          drawerLabel: 'ScheduleDonation',
          title: 'ScheduleDonation',
          headerShown: false,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="donationBookingDetails"
        options={{
          drawerLabel: 'DonationBookingDetails',
          title: 'DonationBookingDetails',
          headerShown: false,
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer>
  );
};

export default MainLayout;
