import { TabIcon } from '@/components';
import images from '@/constants/images';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { rMS } from '@/styles/responsive';

const _layout = () => {
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
        name="periodcalendar"
        options={{
          tabBarIcon: () => (
            <TabIcon Icon={images.CalenderTabIcon} name="Calender" />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        initialParams={{ initialTab: 'Log' }}
        options={{
          tabBarIcon: () => (
            <TabIcon Icon={images.StatusTabIcon} name="Stats" />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => (
            <TabIcon
              Icon={images.HomeTabIcon}
              name=""
              style={{ marginBottom: rMS(40) }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reliefs"
        options={{
          tabBarIcon: () => (
            <TabIcon Icon={images.MortarTabIcon} name="Reliefs" />
          ),
        }}
      />
      <Tabs.Screen
        name="logs"
        options={{
          tabBarIcon: () => (
            <TabIcon
              Icon={
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={28}
                  color={'black'}
                />
              }
              name="Logs"
            />
          ),
        }}
      />
    </Tabs>
  );
};
export default _layout;
