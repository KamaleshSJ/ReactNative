import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import { Header } from '@/components';
import { rMS, rS, rV } from '@/styles/responsive';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const bloodGroups = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
const quantityOptions = [
  { label: '1 Unit', value: '1' },
  { label: '2 Units', value: '2' },
  { label: '3 Units', value: '3' },
  { label: '4 Units', value: '4' },
  { label: '5 Units', value: '5' },
  { label: '10 Units', value: '10' },
] as const;

// Reusable Toggle Component
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isActive, onToggle }) => {
  const toggleAnimation = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  const toggleHandle = () => {
    Animated.timing(toggleAnimation, {
      toValue: isActive ? 0 : 1,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
    onToggle();
  };

  const translateX = toggleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const bgColor = toggleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e5e7eb', '#800000'],
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={toggleHandle}>
      <Animated.View
        style={{
          width: rS(50),
          height: rV(28),
          borderRadius: rV(14),
          backgroundColor: bgColor,
          justifyContent: 'center',
          paddingHorizontal: rS(2),
        }}
      >
        <Animated.View
          style={{
            width: rS(24),
            height: rS(24),
            borderRadius: rS(12),
            backgroundColor: 'white',
            transform: [{ translateX }],
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const RequestBloodScreen: React.FC = () => {
  const [isCritical, setIsCritical] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <Header title="Request Blood" menu={true} />
        <TouchableOpacity
          className=" bg-green-700 rounded-lg flex-row items-center justify-center "
          style={{
            paddingVertical: rMS(10),
            marginHorizontal: rMS(20),
            marginTop: rMS(10),
            marginBottom: rMS(30),
          }}
          onPress={() => router.push('/(main)/(blooddonation)/donate')}
        >
          <Ionicons
            name="search"
            size={rMS(16)}
            color="white"
            style={{ marginRight: rMS(5) }}
          />
          <Text className="text-white font-formik-semibold">
            Search for Nearby Donors Here
          </Text>
        </TouchableOpacity>
        <ScrollView style={{ paddingHorizontal: rMS(20) }}>
          <Formik
            initialValues={{
              selectedGroup: '',
              quantity: '',
              location: '',
              contactInfo: '',
              patientInfo: '',
              patientName: '',
              patientAge: '',
              critical: false,
            }}
            onSubmit={(values) => {
              values.critical = isCritical;
              console.log('Form Submitted:', values);
            }}
          >
            {({ values, handleChange, handleSubmit, setFieldValue }) => (
              <View className="font-rubik" style={{ paddingBottom: rMS(40) }}>
                {/* Blood Group Selection */}
                <Text
                  className=" text-red font-rubik"
                  style={{ fontSize: rMS(14), marginBottom: rMS(7) }}
                >
                  Choose Your Blood Group
                </Text>
                <View
                  className="flex-row flex-wrap justify-around gap-6"
                  style={{
                    paddingHorizontal: rMS(5),
                    marginBottom: rMS(20),
                  }}
                >
                  {bloodGroups.map((group) => {
                    const selected = values.selectedGroup === group;
                    return (
                      <TouchableOpacity
                        key={group}
                        onPress={() => setFieldValue('selectedGroup', group)}
                        style={{
                          width: rS(50),
                          height: rV(45),
                          backgroundColor: selected ? '#840000' : '#F1E3E3',
                          borderColor: selected ? '#942742' : '#840000',
                          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.)',
                        }}
                        className="items-center justify-center rounded-2xl border-4 "
                      >
                        <Text
                          style={{
                            color: selected ? 'white' : '#800000',
                            fontSize: rMS(18),
                          }}
                          className="font-rubik"
                        >
                          {group}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {/* Quantity Picker */}
                <Text
                  className=" text-red font-rubik"
                  style={{ fontSize: rMS(14), marginBottom: rMS(5) }}
                >
                  Choose Units
                </Text>
                <View className="mb-5">
                  <RNPickerSelect
                    placeholder={{ label: 'Quantity', value: null }}
                    items={quantityOptions}
                    onValueChange={(val) => setFieldValue('quantity', val)}
                    value={values.quantity}
                    useNativeAndroidPickerStyle={false}
                    style={{
                      inputIOS: {
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: rMS(10),
                        paddingVertical: rMS(10),
                        paddingLeft: rMS(20),
                        backgroundColor: '#f2f2f2',
                        fontSize: rMS(14),
                      },
                      inputAndroid: {
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: rMS(10),
                        paddingVertical: rMS(10),
                        paddingLeft: rMS(20),
                        backgroundColor: '#f2f2f2',
                        fontSize: rMS(14),
                      },
                      placeholder: {
                        color: 'gray',
                        fontSize: rMS(14),
                      },
                      iconContainer: {
                        right: rS(0),
                        top: '50%',
                        marginTop: -rMS(12),
                      },
                    }}
                    Icon={() => (
                      <View
                        style={{
                          width: rS(40),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#800000',
                          borderTopRightRadius: rMS(10),
                          borderBottomRightRadius: rMS(10),
                          padding: rMS(7.5),
                          position: 'absolute',
                          right: -rS(0),
                          top: -rS(7),
                        }}
                      >
                        <Icon2
                          name="arrow-drop-down"
                          size={rMS(24)}
                          color="white"
                        />
                      </View>
                    )}
                  />
                </View>
                {/* Patient Name */}
                <Text
                  className=" text-red font-rubik"
                  style={{ fontSize: rMS(14), marginBottom: rMS(5) }}
                >
                  Patient Name
                </Text>
                <TextInput
                  placeholder="Enter Patient Name"
                  value={values.patientName}
                  onChangeText={handleChange('patientName')}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: rMS(10),
                    paddingVertical: rMS(10),
                    paddingLeft: rMS(20),
                    backgroundColor: '#f2f2f2',
                    fontSize: rMS(14),
                    marginBottom: rMS(10),
                  }}
                />

                {/* Patient Age */}
                <Text
                  className=" text-red font-rubik"
                  style={{ fontSize: rMS(14), marginBottom: rMS(5) }}
                >
                  Patient Age
                </Text>
                <TextInput
                  placeholder="Enter Patient Age"
                  value={values.patientAge}
                  onChangeText={handleChange('patientAge')}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: rMS(10),
                    paddingVertical: rMS(10),
                    paddingLeft: rMS(20),
                    backgroundColor: '#f2f2f2',
                    fontSize: rMS(14),
                    marginBottom: rMS(10),
                  }}
                  keyboardType="numeric"
                />

                {/* Location Input */}
                <Text
                  className=" text-red font-rubik"
                  style={{ fontSize: rMS(14), marginBottom: rMS(5) }}
                >
                  Hospital address
                </Text>
                <TextInput
                  placeholder="Select Location"
                  value={values.location}
                  onChangeText={handleChange('location')}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: rMS(10),
                    paddingVertical: rMS(10),
                    paddingLeft: rMS(20),
                    backgroundColor: '#f2f2f2',
                    fontSize: rMS(14),
                    marginBottom: rMS(10),
                  }}
                />
                {/* Contact Info */}
                <Text
                  className=" text-red font-rubik"
                  style={{ fontSize: rMS(14), marginBottom: rMS(5) }}
                >
                  Mobile no.
                </Text>
                <TextInput
                  placeholder="Mobile/Telephone"
                  value={values.contactInfo}
                  onChangeText={handleChange('contactInfo')}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: rMS(10),
                    paddingVertical: rMS(10),
                    paddingLeft: rMS(20),
                    backgroundColor: '#f2f2f2',
                    fontSize: rMS(14),
                    marginBottom: rMS(10),
                  }}
                  keyboardType="phone-pad"
                />
                {/* Patient Info */}
                <Text
                  className=" text-red font-rubik"
                  style={{ fontSize: rMS(14), marginBottom: rMS(5) }}
                >
                  Patient Information
                </Text>
                <TextInput
                  placeholder="Disease/Cause"
                  value={values.patientInfo}
                  onChangeText={handleChange('patientInfo')}
                  multiline
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: rMS(10),
                    paddingVertical: rMS(10),
                    paddingLeft: rMS(20),
                    backgroundColor: '#f2f2f2',
                    fontSize: rMS(14),
                    marginBottom: rMS(10),
                  }}
                />
                {/* Critical Case Toggle */}
                <View className="flex-row items-center justify-between mb-5 p-2 rounded-lg">
                  <Text
                    className="text-red font-bold"
                    style={{ fontSize: rMS(16) }}
                  >
                    Critical Case
                  </Text>
                  <ToggleSwitch
                    isActive={isCritical}
                    onToggle={() => setIsCritical(!isCritical)}
                  />
                </View>
                {/* Buttons */}
                <LinearGradient
                  colors={['#840000', '#942742']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: rMS(12), // match with className rounded-xl
                    paddingVertical: rV(10),
                    marginBottom: rMS(7),
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSubmit}
                    className="items-center"
                  >
                    <Text
                      className="text-white font-bold"
                      style={{ fontSize: rMS(14) }}
                    >
                      Request Now
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
                <TouchableOpacity
                  className="border-2 border-red rounded-xl items-center"
                  style={{ paddingVertical: rV(9) }}
                  onPress={() => console.log('Save for later pressed')}
                >
                  <Text
                    className="text-red font-bold"
                    style={{ fontSize: rMS(14) }}
                  >
                    Save for later
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RequestBloodScreen;
