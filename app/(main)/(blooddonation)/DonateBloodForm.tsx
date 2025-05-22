import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Header } from '@/components';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { Formik } from 'formik';
import { useRouter } from 'expo-router';

const DonateBloodForm = () => {
  const router = useRouter();

  const [bloodType, setBloodType] = useState('');
  const [showBloodTypeModal, setShowBloodTypeModal] = useState(false);
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [checked, setChecked] = useState(false);
  const [dateError, setDateError] = useState('');

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const isDonationTooRecent = (dateStr) => {
    const lastDate = new Date(dateStr);
    const today = new Date();
    const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
    return diffDays < 90;
  };

  return (
    <ScrollView className="bg-rose pt-2">
      <Header title="Donation" menu={true} />
      <ScrollView className="flex-1 px-5">
        <Formik
          initialValues={{
            name: '',
            phone: '',
            address: '',
            healthStatus: '',
            weight: '',
            age: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) errors.name = '*Name is required';
            if (!values.phone) errors.phone = '*Phone number is required';
            if (!values.address) errors.address = '*Address is required';
            if (!values.weight) errors.weight = '*Weight is required';
            if (!values.age) errors.age = '*Age is required';
            return errors;
          }}
          onSubmit={(values) => {
            if (!checked) {
              alert('Please confirm the checkbox before proceeding.');
              return;
            }

            if (!lastDonationDate) {
              setDateError('Please select your last donation date.');
              return;
            }

            if (isDonationTooRecent(lastDonationDate)) {
              alert(
                'You are not eligible to donate blood. Wait 90 days between donations.'
              );
              return;
            }

            const data = {
              ...values,
              bloodType,
              lastDonationDate,
            };

            console.log('Submitted Form:', data);
            // alert('Form submitted successfully!');
            router.push('/(main)/(blooddonation)/scheduleDonation');
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <View className="mb-4">
                <Text className="font-rubik text-red font-semibold mb-1">
                  Write Your Full Name
                </Text>
                <TextInput
                  placeholder="Your name here"
                  className="bg-gray-100 font-rubik rounded-xl px-4 py-3"
                  placeholderTextColor="#555"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {errors.name && (
                  <Text className="font-rubik text-red text-sm">
                    {errors.name}
                  </Text>
                )}
              </View>

              <View className="mb-4">
                <Text className="font-rubik text-red font-semibold mb-1">
                  Phone Number
                </Text>
                <TextInput
                  placeholder="Your phone number"
                  keyboardType="phone-pad"
                  className="bg-gray-100 font-rubik  rounded-xl px-4 py-3"
                  placeholderTextColor="#555"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
                {errors.phone && (
                  <Text className="font-rubik text-red text-sm">
                    {errors.phone}
                  </Text>
                )}
              </View>

              <View className="mb-4">
                <Text className="font-rubik text-red font-semibold mb-1">
                  Address
                </Text>
                <TextInput
                  placeholder="Your address"
                  className="bg-gray-100 font-rubik  rounded-xl px-4 py-3"
                  placeholderTextColor="#555"
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                />
                {errors.address && (
                  <Text className="font-rubik text-red text-sm">
                    {errors.address}
                  </Text>
                )}
              </View>

              <View className="mb-4">
                <Text className="font-rubik text-red font-semibold mb-1">
                  Blood Type
                </Text>
                <TouchableOpacity
                  className="bg-gray-100 rounded-xl px-4 py-3 flex-row justify-between items-center"
                  onPress={() => setShowBloodTypeModal(true)}
                >
                  <Text
                    className={` font-rubik ${
                      bloodType ? 'text-gray-700' : 'text-gray-600'
                    }`}
                  >
                    {bloodType || 'Select Your Blood Type'}
                  </Text>
                  <Feather name="chevron-down" size={20} color="gray" />
                </TouchableOpacity>
              </View>

              <View className="mb-4">
                <Text className="font-rubik text-red font-semibold mb-1">
                  Health Status
                </Text>
                <TextInput
                  placeholder="Recent surgery, allergy, vaccine or taking medicine"
                  className="bg-gray-100 rounded-xl  font-rubik px-4 py-3 text-gray-700"
                  placeholderTextColor="#555"
                  multiline
                  onChangeText={handleChange('healthStatus')}
                  onBlur={handleBlur('healthStatus')}
                  value={values.healthStatus}
                />
              </View>

              <View className="mb-4">
                <Text className="font-rubik text-red font-semibold mb-1">
                  Last Donation Date
                </Text>
                <TouchableOpacity
                  className="bg-gray-100 rounded-xl px-4 py-3  flex-row justify-between items-center"
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text
                    className={` font-rubik ${
                      lastDonationDate ? 'text-gray-700' : 'text-gray-600'
                    }`}
                  >
                    {lastDonationDate || 'Select Date'}
                  </Text>
                  <Feather name="chevron-down" size={20} color="gray" />
                </TouchableOpacity>
                {dateError ? (
                  <Text className="font-rubik text-red text-sm mt-1">
                    {dateError}
                  </Text>
                ) : null}
              </View>

              <View className="flex-row justify-between mb-4">
                <View className="w-[48%]">
                  <Text className="font-rubik text-red font-semibold mb-1">
                    Weight
                  </Text>
                  <TextInput
                    placeholder="Enter Your Weight (kg)"
                    className="bg-gray-100   font-rubik rounded-xl px-4 py-3 text-gray-700"
                    placeholderTextColor="#555"
                    keyboardType="numeric"
                    onChangeText={handleChange('weight')}
                    onBlur={handleBlur('weight')}
                    value={values.weight}
                  />
                  {errors.weight && (
                    <Text className="font-rubik text-red text-sm">
                      {errors.weight}
                    </Text>
                  )}
                </View>
                <View className="w-[48%]">
                  <Text className="font-rubik text-red font-semibold mb-1">
                    Age
                  </Text>
                  <TextInput
                    placeholder="Enter Your Age"
                    className="bg-gray-100 font-rubik  rounded-xl px-4 py-3 text-gray-700"
                    placeholderTextColor="#555"
                    keyboardType="numeric"
                    onChangeText={handleChange('age')}
                    onBlur={handleBlur('age')}
                    value={values.age}
                  />
                  {errors.age && (
                    <Text className="font-rubik text-red text-sm">
                      {errors.age}
                    </Text>
                  )}
                </View>
              </View>

              <View className="flex-row items-center mb-6">
                <TouchableOpacity
                  className="w-5 h-5 rounded-sm border-2 border-red mr-2 bg-white justify-center items-center"
                  onPress={() => setChecked(!checked)}
                >
                  {checked && <View className="w-3 h-3 bg-red" />}
                </TouchableOpacity>
                <Text className="font-rubik text-xs text-red">
                  Your donation request has been sent to the recipient's
                  hospital. They will contact you soon for further steps.
                </Text>
              </View>

              <Pressable
                className="bg-red p-4 rounded-xl mb-10"
                onPress={handleSubmit}
              >
                <Text className="font-rubik text-white text-center font-bold text-base">
                  NEXT
                </Text>
              </Pressable>
            </>
          )}
        </Formik>
      </ScrollView>

      {/* Blood Type Modal */}
      <Modal
        isVisible={showBloodTypeModal}
        onBackdropPress={() => setShowBloodTypeModal(false)}
        onBackButtonPress={() => setShowBloodTypeModal(false)}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View className="bg-white p-4 rounded-t-3xl">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-rubik text-lg font-semibold text-red">
              Select Blood Type
            </Text>
            <Pressable onPress={() => setShowBloodTypeModal(false)}>
              <Feather name="x" size={24} color="#600000" />
            </Pressable>
          </View>
          {bloodTypes.map((type) => (
            <TouchableOpacity
              key={type}
              className="py-3 border-b border-gray-200"
              onPress={() => {
                setBloodType(type);
                setShowBloodTypeModal(false);
              }}
            >
              <Text className="font-rubik text-gray-700">{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* Calendar Modal */}
      <Modal
        isVisible={showDatePicker}
        swipeDirection="down"
        onSwipeComplete={() => setShowDatePicker(false)}
        onBackdropPress={() => setShowDatePicker(false)}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View className="bg-white p-4 rounded-t-3xl">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-rubik text-lg font-semibold text-red">
              Select Date
            </Text>
            <Pressable onPress={() => setShowDatePicker(false)}>
              <Feather name="x" size={24} color="#600000" />
            </Pressable>
          </View>

          <Calendar
            onDayPress={(day) => {
              setLastDonationDate(day.dateString);
              setDateError('');
              setShowDatePicker(false);
            }}
            markedDates={{
              [lastDonationDate]: {
                selected: true,
                selectedColor: '#840000',
              },
            }}
            maxDate={new Date().toISOString().split('T')[0]}
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
        </View>
      </Modal>
    </ScrollView>
  );
};

export default DonateBloodForm;
