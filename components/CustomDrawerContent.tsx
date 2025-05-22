import images from '@/constants/images';
import { rMS, rS, rV } from '@/styles/responsive';
import { Ionicons } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomDrawerContent = (props: any) => {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View className="flex-1  bg-red">
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{
          backgroundColor: '#9E0000',
        }}
      >
        <View
          className="flex flex-row items-center gap-4"
          style={{ marginBottom: rMS(30) }}
        >
          <TouchableOpacity
            style={{ width: rS(70), height: rV(70) }}
            onPress={() => {
              router.push('/(main)/profile');
              console.log('Profile Pressed');
            }}
          >
            <Image
              source={require('@/assets/tabicons/rohit-sharma.webp')}
              style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              className="rounded-full"
            />
          </TouchableOpacity>
          <View className="flex-1" style={{ marginLeft: rMS(7) }}>
            <Text
              className="text-white font-bold"
              style={{ fontSize: rMS(22) }}
            >
              User name
            </Text>
            <View className="flex flex-row items-center justify-between mt-1">
              <Text className="text-white text-xs">40% completed</Text>
              <TouchableOpacity
                className="flex flex-row items-center"
                onPress={() => {
                  router.push('/(main)/editProfile');
                }}
              >
                <Ionicons name="pencil" size={18} color="#fff" />
                <Text className="text-white font-bold ml-2">Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <DrawerItem
          label="Profile"
          onPress={() => router.push('/(main)/profile')}
          icon={({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={'#fff'} />
          )}
          labelStyle={{ color: 'white' }}
          style={{ backgroundColor: 'transparent' }}
        />

        <DrawerItemList
          {...props}
          contentContainerStyle={{
            paddingTop: 10, // add some padding to push list down
          }}
        />

        <DrawerItem
          label="Help and Support"
          onPress={() => router.push('/(main)/helpAndSupport')}
          icon={({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={'#fff'} />
          )}
          labelStyle={{ color: 'white' }}
          style={{ backgroundColor: 'transparent' }}
        />
      </DrawerContentScrollView>
      <View
        className="border-t border-gray-300 px-5"
        style={{ paddingBottom: 20 + bottom }}
      >
        <DrawerItem
          label="Logout"
          onPress={() => router.push('/(auth)/login')}
          icon={({ color, size }) => (
            <Ionicons name="log-out-outline" color={'#fff'} size={size} />
          )}
          labelStyle={{ color: 'white' }}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    </View>
  );
};
export default CustomDrawerContent;
