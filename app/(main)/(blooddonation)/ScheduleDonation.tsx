import { Header } from '@/components';
import Images from '@/constants/images';
import images from '@/constants/images';
import { rMS, rS, rV } from '@/styles/responsive';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can use Ionicons, FontAwesome, etc.
import { router } from 'expo-router';

const { height } = Dimensions.get('window');

const ScheduleDonation = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View
        className="relative h-full w-full"
        style={{ paddingVertical: rMS(16), paddingHorizontal: rMS(8) }}
      >
        {/* Header */}
        <Header title={'Schedule your Donation'} menu={false} />

        {/* Card */}
        <View
          className="bg-[#f6eaea] rounded-2xl items-center"
          style={{
            paddingHorizontal: rMS(14),
            paddingVertical: rMS(32),
            marginHorizontal: rMS(20),
          }}
        >
          <Image
            source={images.ScheduleDonationImg} // Replace with your image path
            style={{ width: rS(200), height: rV(150), marginBottom: rMS(10) }}
            resizeMode="contain"
          />

          <View className="w-full">
            <Text
              className=" text-red font-rubik-medium"
              style={{ marginBottom: rMS(4), fontSize: rMS(16) }}
            >
              Date
            </Text>
            <TextInput
              className="bg-white p-3 rounded-md border border-gray-200 mb-4"
              placeholder="AB- (AB Negative-)"
              placeholderTextColor="#999"
            />

            <Text
              className="text-red font-rubik-medium"
              style={{ marginBottom: rMS(4), fontSize: rMS(16) }}
            >
              Select Time
            </Text>
            <TextInput
              className="bg-white p-3 rounded-md border border-gray-200"
              placeholder="Karaikudi, Sivagangai"
              placeholderTextColor="#999"
            />
          </View>

          {/* Button */}

          <TouchableOpacity
            className="rounded-xl overflow-hidden"
            style={{
              marginTop: rMS(30),
            }}
            onPress={() => setModalVisible(true)}
          >
            <LinearGradient
              colors={['rgb(158, 0, 0)', 'rgb(148, 39, 66)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }} // ← Left to Right
              style={{
                paddingVertical: rMS(10),
                paddingHorizontal: rMS(26),
              }}
            >
              <Text className="text-white text-center font-semibold">
                Schedule
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View className="absolute -bottom-10 -left-36 ">
          <Images.waveimage resizeMode="stretch" />
        </View>
      </View>

      <Modal
        isVisible={modalVisible}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        backdropColor="transparent"
        backdropOpacity={100}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View
          className="bg-[#f1e3e3] px-6 pt-12"
          style={{
            height: height * 0.75,
            borderTopLeftRadius: 70,
            borderTopRightRadius: 70,
          }}
        >
          {/* Close Icon */}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ position: 'absolute', top: 20, right: 40, zIndex: 1 }}
          >
            <Feather name="x" size={28} color="#800000" />
          </TouchableOpacity>

          {/* Badge */}
          <View className="mb-6 mt-4">
            <View className="h-20 rounded-full flex justify-center items-center">
              <Images.ScheduleTick />
            </View>
          </View>

          {/* Title */}
          <Text className="text-xl font-bold text-red text-center mb-4">
            Schedule Confirmed!
          </Text>

          {/* Message Box */}
          <View className="bg-lightrose rounded-xl px-2 py-4 w-full mb-8 border-2 border-gray-500/10 flex-row items-start">
            <Feather
              name="info"
              size={18}
              color="#999"
              style={{ marginTop: 2, marginRight: 3 }}
            />
            <Text className="text-gray-700 text-sm leading-relaxed px-2">
              Your donation request has been sent to the recipient's hospital.
              They will contact you soon for further steps.
            </Text>
          </View>

          {/* Close Button */}
          <LinearGradient
            colors={['#800000', '#b30000']}
            className="w-full rounded-xl"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 10, width: '60%', alignSelf: 'center' }}
          >
            <TouchableOpacity
              className="py-4 items-center rounded-lg"
              onPress={() => {
                setModalVisible(false);
                router.push('/(main)/donationBookingDetails');
              }}
            >
              <Text className="text-white font-bold text-base">
                View Details
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default ScheduleDonation;
