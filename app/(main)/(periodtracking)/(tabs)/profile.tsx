import React, { useState, useRef } from "react";
import { rS, rV, rMS } from "@/styles/responsive";
import { DateInfo } from "@/utils/dateUtlis";
const dates1 = generateDatesAroundToday();

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
} from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import { format } from "date-fns";

import { generateDatesAroundToday } from "@/utils/dateUtlis";

// Define main colors
const primaryColor = "#e9b8e9"; // Light purplish-pink
const darkPrimaryColor = "#a052a0"; // Darker purple
const greyColor = "#aaaaaa";
const lightGreyColor = "#f8f8f8";

// Helper component for icon + label items (Symptoms, Moods, Sexual Activity)
type IconLabelItemProps = {
  iconFamily: "Feather" | "MaterialCommunityIcons" | "FontAwesome" | "Ionicons";
  iconName: string;
  label: string;
  color?: string;
};

const IconLabelItem: React.FC<IconLabelItemProps> = ({
  iconFamily,
  iconName,
  label,
  color = darkPrimaryColor,
}) => {
  let IconComponent;
  switch (iconFamily) {
    case "Feather":
      IconComponent = Feather;
      break;
    case "MaterialCommunityIcons":
      IconComponent = MaterialCommunityIcons;
      break;
    case "FontAwesome":
      IconComponent = FontAwesome;
      break;
    case "Ionicons":
      IconComponent = Ionicons;
      break;
    default:
      IconComponent = Feather;
  }

  return (
    <View className="w-1/4 items-center p-2 my-2">
      <View
        className="w-12 h-12 rounded-full justify-center items-center mb-2"
        style={{ backgroundColor: primaryColor }}
      >
        <IconComponent name={iconName as any} size={24} color={color} />
      </View>
      <Text className="text-xs text-gray-500 text-center mt-1">{label}</Text>
    </View>
  );
};

const UnifiedTrackerScreen = () => {
  // State to manage which view is currently visible: 'main', 'picker', or 'notes'
  const [currentView, setCurrentView] = useState("main");
  const { height } = Dimensions.get("window"); // Used for picker item height calculation if needed

  // Data for the main screen
  const dates = [
    { dayOfWeek: "Mon", day: "7", hasDot: true },
    { dayOfWeek: "Tue", day: "8", isSelected: true, hasDot: true },
    { dayOfWeek: "Wed", day: "9", hasDot: true },
    { dayOfWeek: "Thu", day: "10", hasDot: true },
    { dayOfWeek: "Fri", day: "11", hasDot: true },
    { dayOfWeek: "Sat", day: "12", hasDot: true },
    { dayOfWeek: "Sun", day: "13", hasDot: true },
  ];

  const sexualActivities: {
    iconFamily:
      | "Feather"
      | "MaterialCommunityIcons"
      | "FontAwesome"
      | "Ionicons";
    iconName: string;
    label: string;
  }[] = [
    {
      iconFamily: "FontAwesome",
      iconName: "venus-mars",
      label: "Unprotected sex",
    },
    { iconFamily: "FontAwesome", iconName: "lock", label: "Protected sex" },
    {
      iconFamily: "Ionicons",
      iconName: "happy-outline",
      label: "Mastrubation",
    },
    { iconFamily: "FontAwesome", iconName: "heart", label: "Kisses" },
  ];

  const symptoms: {
    iconFamily:
      | "Feather"
      | "MaterialCommunityIcons"
      | "FontAwesome"
      | "Ionicons";
    iconName: string;
    label: string;
  }[] = [
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "stomach",
      label: "Abdominal cramps",
    },
    { iconFamily: "FontAwesome", iconName: "tint", label: "Spotting" },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "emoticon-sad-outline",
      label: "Fatigue",
    },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "weather-windy",
      label: "Bloating",
    },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "human",
      label: "Backache",
    },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "human-male-height",
      label: "Cramps",
    },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "head-outline",
      label: "Headache",
    },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "weather-windy",
      label: "Flatulence",
    },
  ];

  const moods: {
    iconFamily:
      | "Feather"
      | "MaterialCommunityIcons"
      | "FontAwesome"
      | "Ionicons";
    iconName: string;
    label: string;
  }[] = [
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "emoticon-neutral-outline",
      label: "Emotional",
    },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "emoticon-sad-outline",
      label: "Depressed",
    },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "sleep",
      label: "Sleepy",
    },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "emoticon-happy-outline",
      label: "Normal",
    },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "emoticon-angry-outline",
      label: "Tense",
    },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "emoticon-sad",
      label: "Stressed",
    },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "emoticon-dead-outline",
      label: "Exhausted",
    },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "emoticon-frown-outline",
      label: "Sad",
    },
  ];

  const flowIcons: {
    iconFamily:
      | "Feather"
      | "MaterialCommunityIcons"
      | "FontAwesome"
      | "Ionicons";
    iconName: string;
    label: string;
  }[] = [
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "tint",
      label: "blood",
    },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "tint",
      label: "",
    },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "tint",
      label: "",
    },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "tint",
      label: "",
    },
    {
      iconFamily: "MaterialCommunityIcons",
      iconName: "tint",
      label: "",
    },
    // { name: "water-outline", filled: false },
    // { name: "water-outline", filled: false },
    // { name: "water-outline", filled: false },
    // { name: "water-outline", filled: false },
  ];

  // Data for the picker screen
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 10 }, (_, i) => (2020 + i).toString()); // Example years
  const pickerItemHeight = 40; // Height for each row in the picker
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  // const dates = generateDatesAroundToday();
  const itemWidth = 60;
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const scrollRef = useRef<ScrollView>(null);
  // Render Main Tracker View
  const renderMainView = () => (
    <LinearGradient
      className=""
      style={{ width: screenWidth, height: screenHeight }}
      colors={[
        "#d2b4e4",
        "#ffffff",
        "#ffffff",
        "#ffffff",
        "#ffffff",
        "#ffffff",
      ]}
    >
      <View
        style={{}}
        className="flex-row justify-evenly gap-24  mt-20 pr-40  py-4 mb"
      >
        <View className=" " style={{}}>
          <Feather
            className="mt-1  "
            name="x"
            size={24}
            style={{}}
            color={darkPrimaryColor}
            onPress={() => {
              router.push("/(main)/(periodtracking)/(tabs)");
            }}
          />
        </View>
        <View className="" style={{}}>
          <TouchableOpacity
            className="flex-row items-center h-10   ml-3 "
            onPress={() => setCurrentView("picker")} // Open picker on month click
          >
            <Text
              className="text-2xl  font-bold"
              style={{
                color: "#8E2DAE",
              }}
            >
              May
            </Text>
            <Feather
              name="chevron-down"
              size={16}
              color={darkPrimaryColor}
              className="ml-1 mt-2"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        className="pt-4 "
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        contentContainerStyle={{
          paddingHorizontal: (screenWidth - itemWidth) / 2,
        }}
      >
        {dates1.map(({ day, date, fullDate }) => (
          <TouchableOpacity
            key={fullDate}
            onPress={() => setSelectedDate(fullDate)}
            style={[
              styles.dateItem,
              selectedDate === fullDate
                ? styles.dateItemSelected
                : styles.dateItemDefault,
            ]}
          >
            <Text style={styles.dateItemDayText}>{day}</Text>
            <Text style={styles.dateItemDateText}>{date}</Text>
            <View
              style={[
                styles.dateItemDot,
                selectedDate === fullDate ? styles.dateItemDotSelected : null,
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView className="  bg-['#f8f8f8']" style={{}}>
        <View className="p-5 bg-white mb-2.5">
          <Text className="text-lg font-bold text-black">My Cycle</Text>
          <View className="flex-row justify-between items-center mt-4">
            <View>
              <Text className="text-base font-semibold text-black">
                Period ends today
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                Tap here if periods ends Today!
              </Text>
            </View>
            <View className="w-6 h-6 rounded-full border-2 border-gray-400" />
          </View>
        </View>

        <View className="bg-white  p-5 mb-2.5">
          <Text
            style={{ width: screenWidth }}
            className="text-lg  font-bold  text-black"
          >
            My Flow
          </Text>
          <View className="flex-row justify-around py-2.5">
            {flowIcons.map((flow, index) => (
              <FontAwesome
                key={index}
                name={flow.iconName as any}
                size={24}
                color={flow.label ? darkPrimaryColor : greyColor}
                className="opacity-90"
              />
            ))}
          </View>
        </View>

        <View className="bg-white p-5 mb-2.5">
          <Text className="text-lg font-bold text-black">Ovulation</Text>
          <View className="flex-row justify-between items-center mb-4 mt-4">
            <Text className="text-base text-black">Predicted</Text>
            <Feather
              name="check"
              size={20}
              color={darkPrimaryColor}
              className="bg-[#e9b8e9] rounded-md p-0.5"
            />
          </View>
          <View className="flex-row items-start">
            <View
              className="w-1 mr-4 rounded-sm"
              style={{ backgroundColor: darkPrimaryColor, height: 80 }}
            />
            <View>
              <Text className="text-sm text-gray-500 mb-1">
                6th day of Periods
              </Text>
              <Text className="text-sm text-gray-500 mb-1">Ovulation day</Text>
              <Text className="text-sm text-gray-500 mb-1">
                High chance of pregnancy
              </Text>
              <Text className="text-sm text-gray-500 mb-1">
                6th day of Cycle
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-white p-5 mb-2.5">
          <Text className="text-lg font-bold text-black">Sexual Activity</Text>
          <View className="flex-row flex-wrap -mx-2">
            {sexualActivities.map((activity, index) => (
              <IconLabelItem
                key={index}
                iconFamily={activity.iconFamily}
                iconName={activity.iconName}
                label={activity.label}
                color={darkPrimaryColor}
              />
            ))}
          </View>
        </View>

        <View className="bg-white p-5 mb-2.5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-black">Symptoms</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-sm" style={{ color: darkPrimaryColor }}>
                Show all
              </Text>
              <Feather
                name="chevron-right"
                size={12}
                color={darkPrimaryColor}
                className="ml-0.5"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap -mx-2">
            {symptoms.map((symptom, index) => (
              <IconLabelItem
                key={index}
                iconFamily={symptom.iconFamily}
                iconName={symptom.iconName}
                label={symptom.label}
                color={darkPrimaryColor}
              />
            ))}
          </View>
        </View>

        <View className="bg-white p-5 mb-2.5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-black">Moods</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-sm" style={{ color: darkPrimaryColor }}>
                Show all
              </Text>
              <Feather
                name="chevron-right"
                size={12}
                color={darkPrimaryColor}
                className="ml-0.5"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap -mx-2">
            {moods.map((mood, index) => (
              <IconLabelItem
                key={index}
                iconFamily={mood.iconFamily}
                iconName={mood.iconName}
                label={mood.label}
                color={darkPrimaryColor}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity
          className="bg-white flex-row justify-between items-center p-5 mb-2.5"
          onPress={() => setCurrentView("notes")} // Open notes view on notes click
        >
          <Text className="text-base font-semibold text-black">Notes</Text>
          <Feather name="chevron-right" size={20} color={greyColor} />
        </TouchableOpacity>

        <TouchableOpacity className="bg-white flex-row justify-between items-center p-5  mb-8">
          <Text className="text-base font-semibold text-black">Medicine</Text>
          <Feather name="chevron-right" size={20} color={greyColor} />
        </TouchableOpacity>

        <View className="h-12" />
      </ScrollView>
    </LinearGradient>
  );

  // Render Month/Year Picker View
  const renderPickerView = () => (
    <View className="flex-1 bg-white">
      {/* Picker Header */}
      <View className="flex-row justify-between items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => setCurrentView("main")}
          className="flex-row items-center"
        >
          <Feather name="chevron-left" size={24} color={darkPrimaryColor} />
          <Text
            className="text-lg font-semibold ml-1"
            style={{ color: darkPrimaryColor }}
          >
            Back
          </Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold text-black">Select Date</Text>
        <View className="w-6" />
      </View>

      {/* The Picker Container - simulates the look */}
      <View className="flex-1 justify-center items-center">
        <View className="flex-row justify-center items-center h-48 bg-[#e9b8e9] rounded-lg p-4 w-11/12">
          {/* Month Picker */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 mx-1"
            snapToInterval={pickerItemHeight}
            decelerationRate="fast"
          >
            {months.map((month, index) => (
              <View
                key={month}
                style={{
                  height: pickerItemHeight,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Example highlight for 'Dec' - needs actual state/scroll tracking for real selection */}
                <Text
                  className={`text-lg ${
                    month === "Dec" ? "font-bold text-black" : "text-gray-600"
                  }`}
                >
                  {month}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Day Picker */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 mx-1"
            snapToInterval={pickerItemHeight}
            decelerationRate="fast"
          >
            {days.map((day, index) => (
              <View
                key={day}
                style={{
                  height: pickerItemHeight,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Example highlight for '13' */}
                <Text
                  className={`text-lg ${
                    day === "13" ? "font-bold text-black" : "text-gray-600"
                  }`}
                >
                  {day}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Year Picker */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 mx-1"
            snapToInterval={pickerItemHeight}
            decelerationRate="fast"
          >
            {years.map((year, index) => (
              <View
                key={year}
                style={{
                  height: pickerItemHeight,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Example highlight for '2024' */}
                <Text
                  className={`text-lg ${
                    year === "2024" ? "font-bold text-black" : "text-gray-600"
                  }`}
                >
                  {year}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Highlight Overlay */}
          <View
            className="absolute inset-x-0 top-1/2 -mt-5 border-t-2 border-b-2 h-10 pointer-events-none"
            style={{ borderColor: darkPrimaryColor }}
          />
        </View>
      </View>

      {/* Action Buttons */}
      <View className="p-5 flex-row justify-around bg-white border-t border-gray-200">
        <TouchableOpacity
          className="flex-1 py-3 mr-2 rounded-full items-center"
          style={{ backgroundColor: primaryColor }}
          onPress={() => setCurrentView("main")} // Go back to main view
        >
          <Text
            className="text-base font-semibold"
            style={{ color: darkPrimaryColor }}
          >
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 py-3 ml-2 rounded-full items-center"
          style={{ backgroundColor: darkPrimaryColor }}
          onPress={() => {
            // Implement save logic here if needed
            setCurrentView("main"); // Go back to main view
          }}
        >
          <Text className="text-base font-semibold text-white">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render Notes View
  const renderNotesView = () => (
    <View className="flex-1 bg-white">
      {/* Notes Header */}
      <View className="flex-row justify-between items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => setCurrentView("main")}
          className="flex-row items-center"
        >
          <Feather name="chevron-left" size={24} color={darkPrimaryColor} />
          <Text
            className="text-lg font-semibold ml-1"
            style={{ color: darkPrimaryColor }}
          >
            Notes
          </Text>
        </TouchableOpacity>
        <Entypo name="dots-three-vertical" size={20} color={darkPrimaryColor} />
      </View>

      {/* Main Content Area (ScrollView to handle keyboard pushing content) */}
      <ScrollView className="flex-1 p-5">
        <View
          className="border rounded-lg p-3"
          style={{ borderColor: primaryColor }}
        >
          <TextInput
            className="text-base text-black h-40"
            placeholder="... Add a Note"
            placeholderTextColor={greyColor}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Enable Reminder Button/Area */}
        <TouchableOpacity
          className="mt-6 p-4 rounded-md items-center"
          style={{ backgroundColor: primaryColor }}
        >
          <Text
            className="text-base font-semibold"
            style={{ color: darkPrimaryColor }}
          >
            Enable Reminder!
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Action Buttons */}
      <View className="p-5 flex-row justify-around bg-white border-t border-gray-200">
        <TouchableOpacity
          className="flex-1 py-3 mr-2 rounded-full items-center"
          style={{ backgroundColor: primaryColor }}
          onPress={() => setCurrentView("main")} // Go back to main view
        >
          <Text
            className="text-base font-semibold"
            style={{ color: darkPrimaryColor }}
          >
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 py-3 ml-2 rounded-full items-center"
          style={{ backgroundColor: darkPrimaryColor }}
          onPress={() => {
            // Implement save note logic here if needed
            setCurrentView("main"); // Go back to main view
          }}
        >
          <Text className="text-base font-semibold text-white">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Conditionally render the active view */}
      {currentView === "main" && renderMainView()}
      {currentView === "picker" && renderPickerView()}
      {currentView === "notes" && renderNotesView()}
    </SafeAreaView>
  );
};

export default UnifiedTrackerScreen;

const styles = StyleSheet.create({
  dateItem: {
    height: 80,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 8,
    borderColor: "#7c2687",
  },
  dateItemDefault: {
    backgroundColor: "white",
    borderColor: "#eee",
  },
  dateItemSelected: {
    backgroundColor: "#e9d5ff",
    borderColor: "#a855f7",
  },
  dateItemDayText: {
    fontSize: rMS(12),
    color: "#555",
  },
  dateItemDateText: {
    fontSize: rMS(24),
    fontWeight: "bold",
    color: "#333",
    marginTop: 2,
  },
  dateItemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#d1d5db",
    marginTop: 4,
  },
  dateItemDotSelected: {
    backgroundColor: "#a855f7",
  },
});
