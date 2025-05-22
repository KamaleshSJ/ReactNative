import { Header } from '@/components';
import Images from '@/constants/images';
import { rMS } from '@/styles/responsive';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const urgentRequests = [
  { name: 'Ajay Kumar', bloodGroup: 'AB-', location: 'Turaipakkam, Chennai' },
  { name: 'Ravi Chandran', bloodGroup: 'O+', location: 'Anna Nagar, Chennai' },
  { name: 'Pradeep', bloodGroup: 'A+', location: 'Thiruvanmiyur, Chennai' },
  { name: 'Harish Kumar', bloodGroup: 'B-', location: 'Guindy, Chennai' },
  { name: 'Ajay Kumar', bloodGroup: 'A+', location: 'Turaipakkam, Chennai' },
];

const allRequests = [
  { name: 'Pradeep', bloodGroup: 'A+', location: 'Thiruvanmiyur, Chennai' },
  { name: 'Ajay Kumar', bloodGroup: 'A+', location: 'Turaipakkam, Chennai' },
  { name: 'Harish Kumar', bloodGroup: 'B-', location: 'Guindy, Chennai' },
  { name: 'Ajay Kumar', bloodGroup: 'AB-', location: 'Turaipakkam, Chennai' },
  { name: 'Ravi Chandran', bloodGroup: 'O+', location: 'Anna Nagar, Chennai' },
];

const DonateBlood = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<'All' | 'Urgent'>('Urgent');
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    // Simulate API delay or use actual fetch here
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, [selectedTab]);

  const displayedRequests =
    selectedTab === 'All' ? allRequests : urgentRequests;

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-background">
        <Header title="Blood Donation" menu={true} />

        {/* Top Search Bar */}
        <View
          className="flex-row items-center"
          style={{ marginHorizontal: rMS(12) }}
        >
          <View
            className="flex-1 flex-row items-center bg-white rounded-xl"
            style={{ paddingHorizontal: rMS(16), paddingVertical: rMS(8) }}
          >
            <Ionicons name="search" size={rMS(20)} color="#888" />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#868484"
              value={searchValue}
              onChangeText={setSearchValue}
              className="flex-1 text-gray-800"
              style={{
                marginLeft: rMS(8),
                fontSize: rMS(14),
              }}
            />
          </View>
        </View>

        {/* Title and Request Button */}
        <View
          className="flex-row items-center justify-between"
          style={{
            marginHorizontal: rMS(16),
            marginVertical: rMS(24),
          }}
        >
          <Text
            className="font-semibold text-gray-800"
            style={{ fontSize: rMS(18) }}
          >
            Urgent Blood Needed?
          </Text>
          <Pressable
            onPress={() =>
              router.push('/(main)/(blooddonation)/(tabs)/requestBlood')
            }
            className="border-[2px] border-red bg-rose rounded-xl"
            style={{
              paddingHorizontal: rMS(18),
              paddingVertical: rMS(8),
            }}
          >
            <Text
              className="text-black font-semibold"
              style={{ fontSize: rMS(14) }}
            >
              Request
            </Text>
          </Pressable>
        </View>

        {/* Tabs */}
        <View className="flex-row" style={{ marginHorizontal: rMS(16) }}>
          {['All', 'Urgent'].map((tab) => (
            <Pressable
              key={tab}
              className={`flex-1 items-center pb-2 border-b-4 ${
                selectedTab === tab ? 'border-[#970000]' : 'border-gray-400'
              }`}
              onPress={() => setSelectedTab(tab as 'All' | 'Urgent')}
            >
              <Text
                className={`font-semibold ${
                  selectedTab === tab ? 'text-[#970000]' : 'text-gray-500'
                }`}
                style={{ fontSize: rMS(12) }}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Blood Request List */}
        {loading ? (
          <View
            className="flex-1 items-center justify-center"
            style={{ marginTop: rMS(40) }}
          >
            <ActivityIndicator size="large" color="#840000" />
            <Text className="text-red mt-2">Loading...</Text>
          </View>
        ) : (
          <ScrollView
            style={{ paddingHorizontal: rMS(16), paddingTop: rMS(20) }}
          >
            {displayedRequests.map((item, index) => (
              <View
                key={index}
                className="flex-row bg-white rounded-2xl  mb-6"
                style={{ padding: rMS(20) }}
              >
                {/* Left Side */}
                <View className="flex-1">
                  <Text
                    className="text-gray-800 font-medium"
                    style={{ fontSize: rMS(18) }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    className="text-lightgray mt-1"
                    style={{ fontSize: rMS(12) }}
                  >
                    Requires {item.bloodGroup} blood for an Emergency heart
                    surgery
                  </Text>
                  <View
                    className="my-3 bg-gray-200 self-start rounded-md"
                    style={{
                      paddingHorizontal: rMS(10),
                      paddingVertical: rMS(3),
                    }}
                  >
                    <Text
                      className="text-gray-500"
                      style={{ fontSize: rMS(10) }}
                    >
                      1 hr ago
                    </Text>
                  </View>

                  <View className="flex-row items-center ">
                    <Ionicons
                      name="location-sharp"
                      size={rMS(18)}
                      color="#970000"
                    />
                    <Text
                      className="ml-1 text-lightgray"
                      style={{ fontSize: rMS(12) }}
                    >
                      {item.location}
                    </Text>
                  </View>
                </View>

                {/* Right Side */}
                <View className="items-end justify-between ml-4">
                  <View
                    className="bg-rose rounded-full items-center justify-center mb-4 relative"
                    style={{
                      width: rMS(56),
                      height: rMS(56),
                    }}
                  >
                    <Text
                      className="text-red font-bold"
                      style={{
                        fontSize: rMS(12),
                        marginBottom: rMS(12),
                      }}
                    >
                      {item.bloodGroup}
                    </Text>
                    <View className="absolute inset-0 items-center justify-center">
                      <Images.BloodPack width="60%" height="60%" />
                    </View>
                  </View>

                  <Pressable
                    onPress={() =>
                      router.push('/(main)/(blooddonation)/donateBloodForm')
                    }
                    className="bg-bright-red rounded-xl"
                    style={{
                      paddingVertical: rMS(7),
                      paddingHorizontal: rMS(24),
                    }}
                  >
                    <Text
                      className="text-white font-medium"
                      style={{ fontSize: rMS(14) }}
                    >
                      Donate
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaProvider>
  );
};

export default DonateBlood;
