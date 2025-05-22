import { Tabs } from 'expo-router';
import Images from '@/constants/images';
import { rMS } from '@/styles/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TabIcon } from '@/components';

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70 + insets.bottom,
          backgroundColor: 'white',
          paddingBottom: insets.bottom,
          paddingTop: 17,
        },
      }}
    >
      <Tabs.Screen
        name="events"
        options={{
          tabBarIcon: () => <TabIcon Icon={Images.Eventicon} name="Events" />,
        }}
      />
      {/* Events Screen - Second position */}
      <Tabs.Screen
        name="requestBlood"
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon
              Icon={<Ionicons name="medkit-outline" size={28} color={'#000'} />}
              name={'Request'}
            />
          ),
          tabBarLabel: 'Request',
        }}
      />
      {/* Home Screen - Third position */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => (
            <TabIcon Icon={Images.Homeicon} style={{ marginBottom: rMS(40) }} />
          ),
          // Explicitly hide header for home screen
          headerShown: false,
        }}
      />
      {/* DonateBlood Screen - Fourth position */}
      <Tabs.Screen
        name="donateBlood"
        options={{
          tabBarIcon: () => <TabIcon Icon={Images.Donoricon} name="Donate" />,
        }}
      />
      <Tabs.Screen
        name="donationHistory"
        options={{
          tabBarIcon: () => (
            <TabIcon
              Icon={
                <Ionicons
                  name="document-text-outline"
                  size={28}
                  color={'#000'}
                />
              }
              name={'History'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
