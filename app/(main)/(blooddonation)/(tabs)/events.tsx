import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Header } from "@/components";
import { Feather, Ionicons } from "@expo/vector-icons";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";
import { rMS, rS, rV } from "@/styles/responsive";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const { width: screenWidth } = Dimensions.get("window");

// Sample event data with images
const upcomingEvents = [
  {
    id: "1",
    title: "Annual Event",
    subtitle: "Blood Drive",
    year: "2024",
    image: require("@/assets/images/eventsimages/image.jpg"),
  },
  {
    id: "2",
    title: "City Event",
    subtitle: "Blood Drive",
    year: "2024",
    image: require("@/assets/images/eventsimages/image.jpg"),
  },
  {
    id: "3",
    title: "Summer Drive",
    subtitle: "Community Center",
    year: "2024",
    image: require("@/assets/images/eventsimages/image.jpg"),
  },
];

const featuredEvents = [
  {
    id: "4",
    title: "RedRibbon Rally",
    subtitle: "Stand Up",
    year: "2024",
    image: require("@/assets/images/eventsimages/image.jpg"),
  },
  {
    id: "5",
    title: "Drop of Hope",
    subtitle: "Single Drop Miracle",
    year: "2024",
    image: require("@/assets/images/eventsimages/image.jpg"),
  },
  {
    id: "6",
    title: "Heroes Campaign",
    subtitle: "Be Someone's Hero",
    year: "2024",
    image: require("@/assets/images/eventsimages/image.jpg"),
  },
];

export default function DonationEvents() {
  return (
    <View className="flex-1 bg-white" style={{ paddingHorizontal: rMS(20) }}>
      <Header title="Donation Events" menu={true} />

      {/* Search Bar */}
      <View
        className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mx-auto mb-6"
        style={{
          width: "100%",
          marginTop: rMS(16),
        }}
      >
        <MagnifyingGlassIcon size={rMS(20)} color="gray" />
        <TextInput
          placeholder="Search"
          className="ml-2 flex-1"
          style={{ fontSize: rMS(14) }}
        />
        <Feather name="calendar" size={24} color="black" />
      </View>

      {/* Find Nearby Events */}
      <TouchableOpacity
        className="flex-row items-center gap-2 justify-between bg-lightrose p-5 rounded-2xl mx-auto mb-8"
        style={{
          width: "100%",
          paddingVertical: rMS(16),
          paddingHorizontal: rMS(20),
        }}
      >
        <MapPinIcon size={rMS(25)} color="red" />
        <View style={{ flex: 1, marginLeft: rMS(8) }}>
          <Text
            style={{ fontSize: rMS(16), color: "#840000", fontWeight: "500" }}
          >
            Find Nearby Events
          </Text>
          <Text style={{ fontSize: rMS(12), color: "#840000" }}>
            Location Nearby Blood Donation
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={rMS(20)} color="#840000" />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: rMS(20) }}
      >
        {/* Upcoming Events Section */}
        <Text
          style={{
            fontSize: rMS(18),
            fontWeight: "bold",
            marginBottom: rMS(16),
            color: "#840000",
          }}
        >
          Upcoming Events
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: rMS(10) }}
          style={{ marginBottom: rMS(24) }}
        >
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              subtitle={event.subtitle}
              year={event.year}
              image={event.image}
              // style={{ width: screenWidth * 0.8, marginRight: rMS(16) }}
            />
          ))}
        </ScrollView>

        {/* Featured Events Section */}
        <Text
          style={{
            fontSize: rMS(18),
            fontWeight: "bold",
            marginBottom: rMS(16),
            color: "#840000",
          }}
        >
          Featured Events
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: rMS(10) }}
          style={{ marginBottom: rMS(24) }}
        >
          {featuredEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              subtitle={event.subtitle}
              year={event.year}
              image={event.image}
              // style={{ width: screenWidth * 0.8, marginRight: rMS(16) }}
            />
          ))}
        </ScrollView>
      </ScrollView>
      <Text className="text-center text-4xl mb-4" onPress={()=>router.push('/eventsDetails')}>events</Text>
      
    </View>
  );
}

function EventCard({
  title,
  subtitle,
  year,
  image,
  style,
}: {
  title: string;
  subtitle: string;
  year: string;
  image: any;
  style?: any;
}) {
  return (
    <TouchableOpacity
      style={[
        {
          borderRadius: rMS(16),
          overflow: "hidden",
          position: "relative",
          height: rV(150),
          width: rS(180),
          marginRight: rMS(14),
          padding: 0,
        },
      ]}
      className="bg-blue-200"
    >
      {/* Full-size Image */}
      <Image
        source={image}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          resizeMode: "cover",
        }}
      />

      {/* Overlay Content */}
      <BlurView
        intensity={40}
        style={{
          height: "100%",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "transparent",
        }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.8)", "transparent"]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={{
            padding: rMS(12),
            marginTop:'auto'
          }}
        >
          <Text
            style={{
              fontSize: rMS(16),
              fontWeight: "600",
              color: "white",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: rMS(14),
              color: "white",
              marginTop: rMS(2),
            }}
          >
            {subtitle}
          </Text>
          <Text
            style={{
              fontSize: rMS(12),
              color: "rgba(255,255,255,0.8)",
              marginTop: rMS(2),
            }}
            className="font-semibold"
          >
            {year}
          </Text>
        </LinearGradient>
      </BlurView>
    </TouchableOpacity>
  );
}
