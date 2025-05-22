import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// import Banner from '@/assets/tabicons/dropped.svg';
import images from '@/constants/images';

import { Header } from '@/components';
import { rMS, rS, rV } from '@/styles/responsive';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function DonorListScreen() {
  const router = useRouter();
  return (
    <ScrollView className="bg-lightrose">
      <Header title="Donor List" menu={true} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View
          className="flex-1 pt-10 items-center justify-center"
          style={{ width }}
        >
          {/* Banner */}
          <View className="w-full px-5 mb-6">
            <View className="items-center">
              <images.Banner width={rS(320)} height={rV(150)} />
            </View>
          </View>

          {/* Form Title */}
          <Text
            className="text-center font-semibold text-red mb-4"
            style={{ fontSize: 22 }}
          >
            Fill This Form for List
          </Text>

          {/* Form Container */}
          <View
            className="bg-white rounded-3xl items-center justify-center "
            style={{ width: '80%', padding: rMS(20), marginTop: rMS(10) }}
          >
            {/* Blood Group */}
            <View className="w-full">
              <Text
                className="text-red font-rubik-medium"
                style={{ marginBottom: rMS(6) }}
              >
                Blood Group
              </Text>
              <TextInput
                placeholder="AB- (AB Negative-)"
                className="bg-white rounded-lg border border-gray-100"
                style={{ padding: rMS(10), fontSize: rMS(14) }}
                placeholderTextColor="#555"
              />
            </View>

            {/* City */}
            <View className="w-full" style={{ marginTop: rMS(10) }}>
              <Text
                className="text-red font-medium"
                style={{ marginBottom: rMS(6) }}
              >
                City
              </Text>
              <TextInput
                placeholder="Karaikudi, Sivagangai"
                className="bg-white rounded-lg  border border-gray-100"
                style={{ padding: rMS(10), fontSize: rMS(14) }}
                placeholderTextColor="#555"
              />
            </View>

            {/* Search Button */}
            <Pressable
              className="bg-bright-red rounded-xl flex items-center justify-center"
              style={{ marginTop: rMS(26), width: rS(90), height: rV(30) }}
              onPress={() => router.push('/(main)/(blooddonation)/donerList')}
            >
              <Text className="text-white text-center font-bold">Search</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
