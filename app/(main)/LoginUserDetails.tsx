import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import { Calendar } from 'react-native-calendars';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import { moderateScale as rMS, scale as rS } from 'react-native-size-matters';
import { TextInput } from 'react-native';
import { Platform } from 'react-native';

const { width } = Dimensions.get('window');

interface FormValues {
  bloodGroup: string;
  gender: string;
  dob: string;
  phoneNumber: string;
}

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  bloodGroup: Yup.string().required('Blood group is required'),
  gender: Yup.string().required('Gender is required'),
  dob: Yup.string().required('Date of birth is required'),
});

const LoginUserDetails: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Fetch user location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  const handleFormSubmit = (values: FormValues) => {
    const formDataWithLocation = {
      ...values,
      location,
    };

    console.log('Submitted Data:', formDataWithLocation);
    // API call logic here
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <Formik
        initialValues={{ phoneNumber: '', bloodGroup: '', gender: '', dob: '' }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View className="mx-4 mt-10 space-y-4">
            <Text className="text-2xl font-rubik-bold text-center text-burgundy">
              Let’s Get to Know You
            </Text>
            <Text className=" font-rubik  text-center text-burgundy mb-8">
              Fill in the information below to complete your profile.
            </Text>

            <View>
              <Text className="text-burgundy mb-1">Phone Number</Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-5 py-4 bg-gray-100 mb-5"
                keyboardType="phone-pad"
                placeholder="Enter 10-digit number"
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                maxLength={10}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text className="text-red-600 mt-1">{errors.phoneNumber}</Text>
              )}
            </View>

            {/* Blood Group */}
            <View className="mb-5">
              <Text className="text-burgundy mb-1">Blood Group</Text>
              <RNPickerSelect
                placeholder={{ label: 'Select Blood Group', value: null }}
                items={[
                  { label: 'A+', value: 'A+' },
                  { label: 'A-', value: 'A-' },
                  { label: 'B+', value: 'B+' },
                  { label: 'B-', value: 'B-' },
                  { label: 'AB+', value: 'AB+' },
                  { label: 'AB-', value: 'AB-' },
                  { label: 'O+', value: 'O+' },
                  { label: 'O-', value: 'O-' },
                ]}
                onValueChange={(val) => setFieldValue('bloodGroup', val)}
                value={values.bloodGroup}
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
              {touched.bloodGroup && errors.bloodGroup && (
                <Text className="text-red-600 mt-1">{errors.bloodGroup}</Text>
              )}
            </View>

            {/* Gender */}
            <View>
              <Text className="text-burgundy mb-1">Gender</Text>
              <RNPickerSelect
                placeholder={{ label: 'Select Gender', value: null }}
                items={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },
                ]}
                onValueChange={(val) => setFieldValue('gender', val)}
                value={values.gender}
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
              {touched.gender && errors.gender && (
                <Text className="text-red-600 mt-1">{errors.gender}</Text>
              )}
            </View>

            {/* DOB */}
            <View>
              <Text className="text-burgundy mb-1 mt-5 ">Date of Birth</Text>
              <Pressable
                onPress={() => setShowCalendar(true)}
                className="border border-gray-300 px-5 py-4 rounded-xl mb-3"
              >
                <Text>{values.dob || 'Select Date of Birth'}</Text>
              </Pressable>
              {touched.dob && errors.dob && (
                <Text className="text-red-600">{errors.dob}</Text>
              )}
            </View>

            {/* Calendar Modal */}
            <Modal visible={showCalendar} animationType="slide" transparent>
              <View className="flex-1 justify-center items-center bg-black/10">
                <View className="bg-white rounded-lg px-5 py-5 w-11/12">
                  <Calendar
                    onDayPress={(day) => {
                      setFieldValue('dob', day.dateString);
                      setShowCalendar(false);
                    }}
                    maxDate={new Date().toISOString().split('T')[0]}
                    markedDates={{
                      [values.dob]: {
                        selected: true,
                        selectedColor: 'red',
                      },
                    }}
                    theme={{
                      selectedDayBackgroundColor: '#840000',
                      arrowColor: '#840000',
                      todayTextColor: '#b30000',
                      textDayFontWeight: '500',
                      textMonthFontWeight: 'bold',
                      textDayFontSize: 14,
                      textMonthFontSize: 16,
                    }}
                  />
                  <Pressable
                    className="mt-4 bg-red-700 py-2 rounded-md items-center"
                    onPress={() => setShowCalendar(false)}
                  >
                    <Text className="text-white px-3 py-2">Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            {/* Submit Button */}
            <Pressable
              onPress={() => handleSubmit()}
              className="bg-red mt-4 py-3 rounded-2xl items-center"
            >
              <Text className="text-white font-semibold text-lg">Submit</Text>
            </Pressable>

            <Text
              className="mt-10 text-center text-2xl"
              onPress={() => router.push('/(main)/Home')}
            >
              Home
            </Text>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default LoginUserDetails;
