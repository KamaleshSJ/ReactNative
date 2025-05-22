import {
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Images from '@/constants/images';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useRouter } from 'expo-router';
import { rMS, rS, rV } from '@/styles/responsive';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Home = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      {/* Header with profile and notification icon */}
      <View
        className="flex-row items-center justify-between"
        style={{ paddingHorizontal: rMS(10), marginTop: rMS(10) }}
      >
        <TouchableOpacity
          onPress={() => router.push('/(main)/profile')}
          className="flex flex-row justify-between items-center"
        >
          <View
            style={{ width: rMS(40), height: rMS(40) }}
            className="overflow-hidden rounded-full  border-[3px] border-gray-500"
          >
            <Image
              source={require('../../assets/tabicons/rohit-sharma.webp')}
              className="w-full h-full "
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/(main)/Notification')}
          className="items-center justify-center"
        >
          <Images.NotificationIcon width={rS(23)} height={rV(18)} />
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View className="flex-1  ">
        {/* Content container */}
        <View
          className="z-10 relative items-center"
          style={{ height: screenHeight * 0.45 }}
        >
          <View
            className="flex flex-row "
            style={{ paddingTop: rMS(20), paddingHorizontal: rMS(20) }}
          >
            <View className="flex justify-center items-start ml-2 mt-4">
              <Image
                source={Images.group}
                style={{ width: 150, height: 140 }}
                resizeMode="contain"
              />
            </View>
            <View
              className="items-center justify-center"
              style={{ marginLeft: rMS(40), marginTop: rMS(20) }}
            >
              <Text
                className="font-rubik-extrabold text-red"
                style={{ fontSize: rMS(30) }}
              >
                Aayul +
              </Text>
              <MaskedView
                maskElement={
                  <Text
                    className="font-rubik-semibold"
                    style={{ fontSize: rMS(20) }}
                  >
                    Track Your Cycle,
                  </Text>
                }
              >
                <LinearGradient
                  colors={['#840000', '#9D3D99']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0.6, y: 0 }}
                  style={{ height: rV(20), width: rS(155) }} // Approximate width
                >
                  <Text style={{ opacity: 0, fontSize: rMS(20) }}>
                    Track Your Cycle,
                  </Text>
                </LinearGradient>
              </MaskedView>

              <MaskedView
                maskElement={
                  <Text
                    className="font-rubik-semibold"
                    style={{ fontSize: rMS(20) }}
                  >
                    Save a Life,
                  </Text>
                }
              >
                <LinearGradient
                  colors={['#840000', '#9D3D99']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0.6, y: 0 }}
                  style={{ height: rV(20) }} // Approximate width
                >
                  <Text
                    style={{ opacity: 0, fontSize: rMS(20) }}
                    className="font-rubik-semibold"
                  >
                    Save a Life,
                  </Text>
                </LinearGradient>
              </MaskedView>
              <Text
                className="text-sm font-rubik text-red"
                style={{ marginTop: rMS(7) }}
              >
                Take. care. Give
              </Text>
            </View>
          </View>
          <View
            className="absolute bottom-0 left-0 right-0"
            style={{ height: '60%' }}
          >
            <Image
              source={Images.Bgwave}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
          {/* Doctors image container */}
          <View className="z-30 absolute bottom-0 left-0 ">
            <Images.Doctors width={rS(200)} height={rV(185)} />
          </View>

          <View
            className="bg-[#ECCBCB] flex flex-row items-center justify-around  mb-0 mx-auto rounded-2xl absolute  z-50 "
            style={{
              width: screenWidth * 0.85,
              bottom: rMS(-40),
              padding: rMS(10),
            }}
          >
            <View className="flex items-center justify-center">
              <Images.Star width={rS(20)} height={rV(20)} />
              <Text
                className="font-rubik-semibold mt-1 text-center"
                style={{ fontSize: rMS(10) }}
              >
                Blood Bridge
              </Text>
              <Text
                className="  text-center "
                style={{ fontSize: rMS(8), width: rS(70) }}
              >
                Instantly donate or request blood with verified donors
              </Text>
            </View>

            <View className="flex items-center">
              <Images.Verified width={rS(20)} height={rV(20)} />
              <Text
                className="font-rubik-semibold mt-1 text-center"
                style={{ fontSize: rMS(10) }}
              >
                Spread Hope
              </Text>
              <Text
                className="text-center"
                style={{ fontSize: rMS(8), width: rS(70) }}
              >
                Find and connect with nearby blood donation camps and
                recipients.
              </Text>
            </View>

            <View className="flex items-center">
              <Images.DoubleTick width={rS(20)} height={rV(20)} />
              <Text
                className="font-rubik-semibold mt-1 text-center"
                style={{ fontSize: rMS(10) }}
              >
                Wellness Guide
              </Text>
              <Text
                className=" text-center "
                style={{ fontSize: rMS(8), width: rS(70) }}
              >
                Log moods, symptoms, and flow for better hormonal awareness.
              </Text>
            </View>
          </View>
        </View>

        {/*bottom cards */}
        <ScrollView style={{ marginTop: rMS(64) }}>
          <TouchableOpacity
            onPress={() => router.push('/(main)/(blooddonation)/(tabs)')}
          >
            <View
              className="bg-[#F4E4CB]  flex flex-row items-center mt-0 justify-center mx-auto rounded-2xl "
              style={{ width: screenWidth * 0.85, height: rV(120) }}
            >
              <Images.BloodDropH width={rS(165)} height={rV(120)} />
              <View className="flex-1">
                <Text
                  className="font-rubik-bold text-red"
                  style={{ fontSize: rMS(26) }}
                >
                  Blood{'\n'}Donation
                </Text>

                <Text className="text-xs font-rubik-bold text-red">
                  Life. Generosity. Hope
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* card2 */}
          <TouchableOpacity
            onPress={() =>
              router.push('/(main)/(periodtracking)/welcomescreen')
            }
            className="bg-[#FCE3E9]  flex flex-row items-center mt-5 justify-center mx-auto rounded-2xl "
            style={{ width: screenWidth * 0.85, height: rV(120) }}
          >
            <Images.WomenCard width={rS(165)} height={rV(110)} />
            <View className="flex-1">
              <View style={{ flexDirection: 'column' }}>
                <MaskedView
                  maskElement={
                    <Text
                      className="font-rubik-bold"
                      style={{ fontSize: rMS(26) }}
                    >
                      Periods
                    </Text>
                  }
                >
                  <LinearGradient
                    colors={['#BA68C8', '#8B2252']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1.5, y: 0 }}
                    style={{ height: rV(26), width: rS(90) }} // Approximate width
                  >
                    <Text style={{ fontSize: rMS(26), opacity: 0 }}>
                      Periods
                    </Text>
                  </LinearGradient>
                </MaskedView>

                <MaskedView
                  maskElement={
                    <Text
                      className="font-rubik-bold"
                      style={{ fontSize: rMS(26) }}
                    >
                      Tracker
                    </Text>
                  }
                >
                  <LinearGradient
                    colors={['#BA68C8', '#8B2252']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1.5, y: 0 }}
                    style={{ height: rV(25), width: rS(110) }} // Approximate width
                  >
                    <Text style={{ fontSize: rMS(26), opacity: 0 }}>
                      Tracker
                    </Text>
                  </LinearGradient>
                </MaskedView>
              </View>
              <Text
                className="text-xs font-rubik-bold text-[#BA68C8]"
                style={{ marginTop: rMS(10) }}
              >
                Cycle. Balance. Wellness
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
