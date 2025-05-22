import {
  View,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";

// Import SVGs as components
import Images from "@/constants/images";
import { useRouter } from "expo-router";
import { Header } from "@/components";
import { rMS, rS, rV } from "@/styles/responsive";
import images from "@/constants/images";

// Get screen width
const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth > 768;
const itemWidth = isTablet ? screenWidth / 3.4 : screenWidth / 2.2;

export default function App() {
  const router = useRouter();
  const gridMenu = [
    {
      label: "Donate Blood",
      Icon: Images.BloodBag,
      route: "/(main)/(blooddonation)/requestBlood",
    },
    {
      label: "Request Blood",
      Icon: Images.FirstAid,
      route: "/(main)/(blooddonation)/requestBlood",
    },
    {
      label: "Hospital",
      Icon: Images.Hospital,
      route: "/(main)/(blooddonation)/requestBlood",
    },
    {
      label: "Inbox",
      Icon: Images.MailBox,
      route: "/(main)/(blooddonation)/requestBlood",
    },
  ];

  const requests = [
    {
      name: "Marimuthu",
      units: "9 Units (Blood)",
      hospital: "Ganga Hospitals - Multi specialist and sdfgtyujio",
      date: "Friday, July 7",
      bloodType: "O+",
    },
    {
      name: "Manonmani",
      units: "2 Units (Plasma)",
      hospital: "Apollo Hospitals",
      date: "Monday, July 10",
      bloodType: "B+",
    },
    {
      name: "Prem Kumar",
      units: "1 Unit (Platelet)",
      hospital: "KMCH Emergency Care",
      date: "Tuesday, July 11",
      bloodType: "A+",
    },
    {
      name: "Chetta KL",
      units: "3 Units (Blood)",
      hospital: "PSG Medical Center",
      date: "Wednesday, July 12",
      bloodType: "O+",
    },
  ];

  return (
    <View className="flex-1 bg-red">
      {/* Header */}
      <View>
        <Header title="Home" color="white" menu={true} />

        <View
          className="flex-row justify-center items-center gap-5"
          style={{ marginTop: rV(10), marginBottom: rV(24) }}
        >
          <View
            style={{
              width: rS(100),
              height: rV(95),
              borderWidth: 5,
              borderRightWidth: 0,
              padding: rMS(7),
              borderColor: "#FFBFBF",
              borderRadius: "100%",
              overflow: "hidden",
            }}
          >
            <Image
              source={require("../../../../assets/tabicons/rohit-sharma.webp")}
              style={{ width: "100%", height: "100%", borderRadius: 999 }}
              contentFit="cover"
            />
          </View>

          <View>
            <Text
              className="text-white font-rubik-medium"
              style={{ fontSize: rMS(20) }}
            >
              ROHIT SHARMA
            </Text>
            <View className="flex-row items-center gap-2 ">
              <Images.Medal width={40} height={40} />
              <View>
                <Text
                  className="text-yellow-300 font-semibold"
                  style={{ fontSize: rMS(14) }}
                >
                  Life Saver
                </Text>
                <Text className="text-white text-sm">11 People’s</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* bgwhite card */}
      <ScrollView
        className="bg-white h-full rounded-t-[34px] overflow-hidden"
        style={{ paddingHorizontal: rV(20), paddingVertical: rV(30) }}
      >
        {/* Critical Alert Card */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 "
        >
          {requests.map((req, index) => (
            <View
              key={index}
              style={{
                width: rS(290),
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                paddingVertical: rMS(14),
                paddingRight: rMS(14),
                marginRight: rMS(10),
              }}
              className="bg-lightrose rounded-3xl overflow-hidden"
            >
              {/* Top row with DropIcon and Text */}
              <View className="font-rubik ">
                <View className="items-end ">
                  {/* Critical Label */}
                  <Text
                    className="text-red font-rubik-semibold text-center"
                    style={{ fontSize: rMS(16) }}
                  >
                    Critical
                  </Text>
                </View>
                <View className="flex-row -mt-4">
                  <View className="relative ">
                    <Image
                      source={images.DropIcon}
                      contentFit="contain"
                      style={{
                        width: rS(80),
                        height: rV(75),
                      }}
                    />
                    <Text
                      className="absolute bottom-7 left-1/2 text-white font-rubik-semibold"
                      style={{
                        fontSize: rMS(16),
                        transform: [{ translateX: -rS(11) }],
                      }}
                    >
                      {req.bloodType}
                    </Text>
                  </View>

                  <View className="justify-center ">
                    <Text className="font-rubik" style={{ fontSize: rMS(18) }}>
                      {req.name}
                    </Text>
                    <Text style={{ fontSize: rMS(12) }}>9 Units (Blood)</Text>
                    <Text
                      className=" text-gray-500  "
                      style={{ fontSize: rMS(12), width: rS(190) }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {req.hospital}
                    </Text>
                    <Text
                      className="font-rubik-semibold"
                      style={{ fontSize: rMS(12) }}
                    >
                      {req.date}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Accept Button */}
              <Pressable className="bg-red self-end px-4 py-2 rounded-3xl w-28 ">
                <Text className="text-white text-center font-semibold">
                  Accept
                </Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>

        {/* Responsive Grid Menu */}
        <View
          className="flex-row flex-wrap justify-center gap-4 "
          style={{ marginTop: rV(20) }}
        >
          {gridMenu.map(({ label, Icon, route }, index) => (
            <TouchableOpacity key={index} onPress={() => router.push(route)}>
              <View
                style={{
                  width: rS(140),
                  height: rV(70),
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                className=" bg-lightrose rounded-xl flex  flex-row  items-center justify-center gap-4"
              >
                <Icon width={40} height={40} />
                <Text
                  className="font-semibold mt-1 w-20"
                  style={{ fontSize: rMS(14) }}
                >
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
