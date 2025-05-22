import { rMS } from '@/styles/responsive';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

interface Header {
  title: string;
  menu?: boolean;
  color?: string;
}

const Header = ({ title, menu, color }: Header) => {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <View
      className="flex-row justify-between items-center"
      style={{ paddingVertical: rMS(14), paddingHorizontal: rMS(7) }}
    >
      <View className="flex-row items-center">
        <TouchableOpacity
          style={{ marginHorizontal: rMS(3) }}
          onPress={() => router.back()}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={
              color === 'white'
                ? '#fff'
                : color === 'lavender'
                ? '#BA68C8'
                : '#840000'
            }
          />
        </TouchableOpacity>
        <Text
          className={`${
            color === 'white'
              ? 'text-white'
              : color === 'lavender'
              ? 'text-[#BA68C8]'
              : 'text-red'
          }  font-semibold text-2xl`}
        >
          {title}
        </Text>
      </View>
      {menu && (
        <View style={{ padding: 0 }}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())} // Opens the drawer
            style={{ padding: 10 }}
          >
            <Ionicons
              name="menu"
              size={28}
              color={
                color === 'white'
                  ? '#fff'
                  : color === 'lavender'
                  ? '#BA68C8'
                  : '#840000'
              }
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default Header;
