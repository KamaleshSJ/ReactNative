import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Images from '@/constants/images';
import images from '@/constants/images';
import { rMS, rS, rV } from '@/styles/responsive';

const DonationBookingDetails = () => {
  return (
    <SafeAreaView className="flex-1  bg-[#FBEDED] items-center justify-center">
      {/* Header */}
      <View className="mt-6 items-center justify-center">
        <Text className="text-xl font-semibold text-[#5B0000]">
          Booking Details
        </Text>
        <View className="mt-4">
          <Images.Tick size={rMS(300)} />
        </View>
      </View>

      {/* Card */}
      <View
        className="justify-center items-center rounded-3xl overflow-hidden bg-black"
        style={{ marginHorizontal: rMS(20), marginVertical: rMS(40) }}
      >
        <LinearGradient
          colors={['#942742', '#9E0000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="w-full items-center"
          style={{ paddingHorizontal: rMS(20), paddingVertical: rMS(30) }}
        >
          {/* Profile Image */}
          <View>
            <Image
              source={images.Icon}
              className="rounded-full"
              style={{ width: rS(100), height: rV(100), marginBottom: rMS(10) }}
              resizeMode="cover"
            />
          </View>

          {/* User Details */}
          <Text
            className="text-white font-rubik-bold"
            style={{ fontSize: rMS(24) }}
          >
            Kishore PS
          </Text>
          <Text className="text-white text-sm">Karaikudi, Sivagangai</Text>
          <Text className="text-white text-sm mb-4">1234677894</Text>

          {/* Date and Place */}
          <View
            className="flex-row justify-between w-full px-2"
            style={{ marginTop: rMS(10) }}
          >
            <Text className="text-white text-sm">Date : 19.03.2089</Text>
            <Text className="text-white text-sm">Place : Salem</Text>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};
export default DonationBookingDetails;
