import images from '@/constants/images';
import { RootStackParamList } from '@/constants/interface';

import { rMS, rS, rV } from '@/styles/responsive';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  const screenHeight= Dimensions.get('window').height;
   const screenWidth = Dimensions.get('window').width;

  const router = useRouter();
  return (
    <LinearGradient
      colors={[
        '#d2b4e4',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
      ]}
      style={{ flex: 1 }}
    >
      <View className='items-center justify-center' style={{height:screenHeight ,width:screenWidth}}>
        <Image
          source={images.WelcomeBanner}
          style={{ 
            width: rS(300), 
            height: rS(300),
            resizeMode: 'contain'
          }}
        />

        <TouchableOpacity
          style={{
            width:rS(215),
            marginTop:rMS(70)
          }}
          onPress={() => router.push('/(main)/(periodtracking)/namescreen')}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#ba67c7', '#8c2353']}
            style={{
              borderRadius:12,
              paddingVertical:(15)
            }}
          >
            <Text className='' style={{
              color: 'white',
              fontSize: rMS(14),
              fontWeight: 'bold',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: 1
            }}>
              Get Started
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}