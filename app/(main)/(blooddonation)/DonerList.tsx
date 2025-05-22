import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Header } from '@/components';
import { rMS } from '@/styles/responsive';

const donors = [
  {
    name: 'Ashok kumar',
    phone: '7891 555-7891',
    location: 'Thuraipakkam',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    name: 'Ram kumar',
    phone: '6387 467-812',
    location: 'Selaiyur',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    name: 'Deepika',
    phone: '1981 556-3245',
    location: 'OMR',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    name: 'Kayal',
    phone: '1581 443-6751',
    location: 'Guindy',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    name: 'Ajay',
    phone: '7891 657-1634',
    location: 'Nandhanam',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    name: 'Ravi',
    phone: '1781 555-7891',
    location: 'Thuraipakkam',
    image: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
  {
    name: 'Ajay',
    phone: '7891 657-1634',
    location: 'Nandhanam',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    name: 'Ajay',
    phone: '7891 657-1634',
    location: 'Nandhanam',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
];

export default function DonorList() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Donor List" />
      <ScrollView>
        <ScrollView className="flex-1  px-4 pt-2">
          {donors.map((donor, index) => (
            <TouchableOpacity
              key={index}
              className="bg-[#DAAEAE] flex-row items-center justify-between rounded-2xl p-3 mb-3 "
            >
              <View className="flex-row items-center space-x-3 gap-2">
                <Image
                  source={{ uri: donor.image }}
                  className="w-12 h-12 rounded-lg"
                />
                <View>
                  <Text className="font-semibold text-[rgb(73,0,8)]">
                    {donor.name}
                  </Text>
                  <Text className="text-sm text-red">{donor.phone}</Text>
                  <Text className="text-sm text-red">{donor.location}</Text>
                </View>
              </View>
              <Feather name="chevron-right" color="black" size={20} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
