import React from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '@/components';
import { ms, vs, s } from 'react-native-size-matters';

export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Native Gradient Header */}
      <LinearGradient
        colors={['#840000', '#B60D22']}
        style={{
          height: vs(140),
          borderBottomLeftRadius: ms(24),
          borderBottomRightRadius: ms(24),
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <View className="w-full">
          <Header title="Profile" color="white" menu={true} />
        </View>

        {/* Profile Image */}
        <View
          style={{
            position: 'absolute',
            left: '35%',
            bottom: -vs(40),
            width: ms(102),
            height: ms(102),
            borderRadius: 9999,
            borderWidth: 4,
            borderColor: '#818181',
            overflow: 'hidden',
            zIndex: 10,
          }}
        >
          <Image
            source={require('@/assets/tabicons/rohit-sharma.webp')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>
      </LinearGradient>

      {/* User Info */}
      <View className="mt-16 items-center">
        <Text style={{ fontSize: ms(18) }} className="font-semibold text-black">
          Rohit Sharma
        </Text>
        <Text style={{ fontSize: ms(14) }} className="text-gray-500">
          Mumbai, India
        </Text>
      </View>

      {/* Options */}
      <View className="mt-6 px-6">
        <Option
          icon={<Feather name="user" size={ms(25)} color="black" />}
          label="Account Information"
        />
        <Option
          icon={<Feather name="calendar" size={ms(25)} color="black" />}
          label="Update Period Data"
        />
        <Option
          icon={<Feather name="heart" size={ms(25)} color="black" />}
          label="Update Blood Donation"
        />
        <Option
          icon={<MaterialIcons name="logout" size={ms(25)} color="black" />}
          label="Logout"
        />
      </View>
    </ScrollView>
  );
}

function Option({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Pressable className="flex-row items-center justify-between py-4 border-b border-gray-200">
      <View className="flex-row items-center gap-6">
        {icon}
        <Text style={{ fontSize: ms(15) }} className="text-black">
          {label}
        </Text>
      </View>
      <Feather name="chevron-right" size={ms(20)} color="#999" />
    </Pressable>
  );
}
