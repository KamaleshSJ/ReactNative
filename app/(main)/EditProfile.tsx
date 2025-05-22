import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { rS, rV, rMS } from '@/styles/responsive'; // Assuming responsive styles are updated
import Icon2 from 'react-native-vector-icons/MaterialIcons';

import { router } from 'expo-router';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');

  return (
    <ScrollView
      className="flex-1 bg-white px-5"
      contentContainerStyle={{ paddingVertical: rV(20) }}
    >
      <View className="items-center mb-6">
        <TouchableOpacity
          className="bg-gray-200 justify-center items-center"
          style={{
            width: rS(95),
            height: rS(95),
            borderRadius: rS(47),
          }}
        >
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={{
              width: rS(95),
              height: rS(95),
              borderRadius: rS(47),
            }}
          />
        </TouchableOpacity>
        <Text className="text-red text-sm mt-2">Tap to change photo</Text>
      </View>

      <View className="mb-4">
        <Text className="text-base font-semibold text-red mb-1">Full Name</Text>
        <TextInput
          placeholder="Enter your name"
          className="bg-gray-100 rounded-xl px-4 text-gray-700"
          style={{
            paddingVertical: rV(10),
            fontSize: rMS(12),
          }}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View className="mb-4">
        <Text className="text-base font-semibold text-red mb-1">Email</Text>
        <TextInput
          placeholder="Enter your email"
          keyboardType="email-address"
          className="bg-gray-100 rounded-xl px-4 text-gray-700"
          style={{
            paddingVertical: rV(10),
            fontSize: rMS(12),
          }}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View className="mb-4">
        <Text className="text-base font-semibold text-red mb-1">
          Phone Number
        </Text>
        <TextInput
          placeholder="Enter your phone"
          keyboardType="phone-pad"
          className="bg-gray-100 rounded-xl px-4 text-gray-700"
          style={{
            paddingVertical: rV(10),
            fontSize: rMS(12),
          }}
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View className="mb-4">
        <Text className="text-base font-semibold text-red mb-1">
          Blood Group
        </Text>
        <RNPickerSelect
          placeholder={{ label: 'Select Blood Group', value: '' }}
          onValueChange={(value) => setBloodGroup(value)}
          value={bloodGroup}
          items={[
            { label: 'A+', value: 'A+' },
            { label: 'A-', value: 'A-' },
            { label: 'B+', value: 'B+' },
            { label: 'B-', value: 'B-' },
            { label: 'O+', value: 'O+' },
            { label: 'O-', value: 'O-' },
            { label: 'AB+', value: 'AB+' },
            { label: 'AB-', value: 'AB-' },
          ]}
          style={{
            inputIOS: {
              backgroundColor: '#F3F4F6',
              borderRadius: rS(8),
              paddingVertical: rV(10),
              fontSize: rMS(12), // Reduced font size
              height: rV(40), // Reduced height
              color: '#333',
            },
            inputAndroid: {
              backgroundColor: '#F3F4F6',
              borderRadius: rS(8),
              paddingHorizontal: rS(6),
              fontSize: rMS(11),
              color: '#333',
            },
          }}
          Icon={() => (
            <View
              style={{
                backgroundColor: '#800000',
                borderRadius: rMS(6),
                padding: rMS(8),
                position: 'absolute',
                right: rS(3),
                top: rS(4),
              }}
            >
              <Icon2 name="arrow-drop-down" size={rMS(24)} color="white" />
            </View>
          )}
        />
      </View>

      <View className="mb-4">
        <Text className="text-base font-semibold text-red mb-1">Gender</Text>
        <RNPickerSelect
          placeholder={{ label: 'Select Gender', value: '' }}
          onValueChange={(value) => setGender(value)}
          value={gender}
          items={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Other', value: 'Other' },
          ]}
          style={{
            inputIOS: {
              backgroundColor: '#F3F4F6',
              borderRadius: rS(8),
              paddingHorizontal: rS(6),
              fontSize: rMS(11),
              color: '#333',
            },
            inputAndroid: {
              backgroundColor: '#F3F4F6',
              borderRadius: rS(8),
              paddingHorizontal: rS(6),
              fontSize: rMS(11),
              color: '#333',
            },
          }}
          Icon={() => (
            <View
              style={{
                backgroundColor: '#800000',
                borderRadius: rMS(6),
                padding: rMS(8),
                position: 'absolute',
                right: rS(3),
                top: rS(4),
              }}
            >
              <Icon2 name="arrow-drop-down" size={rMS(24)} color="white" />
            </View>
          )}
        />
      </View>

      <View className="mb-4">
        <Text className="text-base font-semibold text-red mb-1">Address</Text>
        <TextInput
          placeholder="Enter your address"
          className="bg-gray-100 rounded-xl px-4 text-gray-700"
          style={{
            paddingVertical: rV(10),
            fontSize: rMS(12),
          }}
          multiline
          numberOfLines={4}
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <TouchableOpacity
        className="bg-red py-4 rounded-xl mt-4"
        onPress={() => {
          router.push('/(main)/Profile');
        }}
      >
        <Text
          className="text-center my-auto text-white font-semibold"
          style={{ fontSize: rMS(14) }}
        >
          Save Changes
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;
