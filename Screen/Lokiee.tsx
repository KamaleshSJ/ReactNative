import React from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function FullProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Profile Header */}
      <Animatable.View animation="fadeInDown" className="bg-white p-6 rounded-b-3xl shadow-md">
        <View className="items-center">
          <Image
            source={{ uri: 'https://i.pravatar.cc/300' }}
            className="w-32 h-32 rounded-full border-4 border-red-500"
          />
          <Text className="text-2xl font-bold text-gray-800 mt-4">Logesh M</Text>
          <Text className="text-sm text-gray-500">@Logesh_M</Text>
        </View>
      </Animatable.View>

      {/* About Section */}
      <Animatable.View animation="fadeInUp" delay={200} className="bg-white mx-4 mt-6 rounded-2xl p-5 shadow-md">
        <Text className="text-lg font-semibold text-gray-800 mb-2">About Me</Text>
        <Text className="text-gray-600 leading-relaxed">
          A passionate blood donor 🩸, traveler ✈️, and food lover 🍔. Dedicated to saving lives and making an impact.
        </Text>
      </Animatable.View>

      {/* Blood and Contact Info */}
      <Animatable.View animation="fadeInUp" delay={400} className="bg-white mx-4 mt-4 rounded-2xl p-5 shadow-md">
        <Text className="text-lg font-semibold text-gray-800 mb-2">Contact Information</Text>
        <View className="space-y-2">
          <Text className="text-gray-700">🩸 Blood Group: <Text className="font-bold text-red-600">A+</Text></Text>
          <Text className="text-gray-700">📍 Location: Chennai, India</Text>
          <Text className="text-gray-700">📞 Phone: +91 9876543210</Text>
          <Text className="text-gray-700">📧 Email: john.doe@example.com</Text>
        </View>
      </Animatable.View>

      {/* Last Donation */}
      <Animatable.View animation="fadeInUp" delay={600} className="bg-white mx-4 mt-4 rounded-2xl p-5 shadow-md">
        <Text className="text-lg font-semibold text-gray-800 mb-2">Last Donation</Text>
        <Text className="text-gray-700">🗓️ 20 March 2025</Text>
      </Animatable.View>

      {/* Total Donations */}
      <Animatable.View animation="fadeInUp" delay={800} className="bg-white mx-4 mt-4 rounded-2xl p-5 shadow-md flex-row justify-between items-center">
        <View>
          <Text className="text-lg font-semibold text-gray-800">Total Donations</Text>
          <Text className="text-gray-700 mt-1">20 Times</Text>
        </View>
        <Pressable className="bg-red-500 px-4 py-2 rounded-full">
          <Text className="text-white font-semibold">View History</Text>
        </Pressable>
      </Animatable.View>

      {/* Achievements */}
      <Animatable.View animation="fadeInUp" delay={1000} className="bg-white mx-4 mt-4 mb-6 rounded-2xl p-5 shadow-md">
        <Text className="text-lg font-semibold text-gray-800 mb-2">Achievements</Text>
        <View className="space-y-2">
          <Text className="text-gray-700">🏆 Super Donor Award - 2024</Text>
          <Text className="text-gray-700">🏆 5 Years Consistent Donor</Text>
        </View>
      </Animatable.View>
    </ScrollView>
  );
}
