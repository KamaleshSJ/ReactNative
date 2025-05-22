import TestComponent from '@/components/TestComponent';
import { onboarding } from '@/constants/data';
import images from '@/constants/images';
import { Redirect, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import Feather from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

export default function index() {
  const router = useRouter();

  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  const imageAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const descAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reset animations when index changes
    const resetAndAnimate = () => {
      // Set initial positions
      imageAnim.setValue(width);
      titleAnim.setValue(width);
      descAnim.setValue(width);

      // Animate with staggered timing
      Animated.stagger(100, [
        Animated.spring(imageAnim, {
          toValue: 0,
          useNativeDriver: true,
          speed: 10,
          bounciness: 3,
        }),
        Animated.spring(titleAnim, {
          toValue: 0,
          useNativeDriver: true,
          speed: 10,
          bounciness: 3,
        }),
        Animated.spring(descAnim, {
          toValue: 0,
          useNativeDriver: true,
          speed: 10,
          bounciness: 3,
        }),
      ]).start();
    };

    resetAndAnimate();
  }, [activeIndex]);

  const handleIndexChanged = (index: number) => {
    // First set the index, which will trigger the animation
    setActiveIndex(index);
  };

  return (
    <SafeAreaView className="flex-1 bg-white text-white">
      {/* Header Row with Skip */}
      <View className="flex-row justify-end items-center mt-4">
        <TouchableOpacity
          onPress={() => router.replace('/(auth)/Login')}
          className="px-8"
        >
          <Text className="text-black text-base ">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <View
        style={{
          width,
          height: height * 0.09,
        }}
        className="items-center mt-6 "
      >
        <Image
          source={images.Logo}
          style={{
            width: ' 100%',
            height: '100%',
          }}
          contentFit="contain"
        />
      </View>

      {/* Swiper */}
      <View className="flex-1 justify-center ">
        <Swiper
          ref={swiperRef}
          loop={false}
          onIndexChanged={handleIndexChanged}
          showsPagination={true}
          dot={<View className="w-4 h-4 mx-1 bg-gray-200 rounded-full" />}
          activeDot={
            <View className="w-10 h-4 mx-1 bg-[#F28CAB] rounded-full" />
          }
          removeClippedSubviews={false} // This can help with rendering issues
        >
          {onboarding.map((item) => (
            <View
              key={item.id}
              className="flex-1 items-center justify-center px-5"
            >
              <Animated.Text
                style={{
                  transform: [{ translateX: titleAnim }],
                  fontSize: 26,
                  fontWeight: 'bold',
                  color: '#000',
                  textAlign: 'center',
                  marginBottom: 32,
                }}
              >
                {item.title}
              </Animated.Text>
              <Animated.View
                style={{
                  transform: [{ translateX: imageAnim }],
                  marginBottom: height * 0.04,
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: width * 0.9,
                    height: height * 0.4,
                  }}
                  contentFit="contain"
                  autoplay={true}
                />
              </Animated.View>

              <Animated.Text
                style={{
                  transform: [{ translateX: descAnim }],
                  fontSize: 16,
                  textAlign: 'center',
                  color: '#858585',
                }}
              >
                {item.description}
              </Animated.Text>
            </View>
          ))}
        </Swiper>
      </View>

      {/* Button */}
      <View className="px-5 pb-16 flex items-center justify-center ">
        <Pressable
          onPress={() =>
            isLastSlide
              ? router.replace('/(auth)/Login')
              : swiperRef.current?.scrollBy(1)
          }
          className="w-[60px] h-[60px] rounded-full items-center justify-center bg-[#BB4748]"
        >
          <Feather
            name={isLastSlide ? 'check' : 'arrow-right'}
            size={24}
            color="white"
          />
        </Pressable>
      </View>
    </SafeAreaView>
    // <TestComponent />
    // <Redirect href={'/(main)/(tabs)'} />
  );
}
