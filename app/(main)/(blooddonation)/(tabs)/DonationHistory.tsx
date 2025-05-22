import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Images from "@/constants/images";
import { Header } from "@/components";
import { rMS, rS, rV } from "@/styles/responsive";
import { useFocusEffect } from "@react-navigation/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const donateHistory = [
  {
    name: "Ashok kumar",
    blood: "A+",
    unit: "3 Unit",
    location: "Thuraipakkam",
    status: "Completed",
    date: "11/12/2023",
  },
  {
    name: "Ram Kumar",
    blood: "B+",
    unit: "2 Unit",
    location: "Solinganallur",
    status: "Failed",
    date: "11/12/2023",
  },
  {
    name: "Deepika",
    blood: "O-",
    unit: "4 Unit",
    location: "OMR",
    status: "Completed",
    date: "11/12/2023",
  },
  {
    name: "kayal",
    blood: "O+",
    unit: "1 Unit",
    location: "Guindy",
    status: "Failed",
    date: "11/12/2023",
  },
];

const requestHistory = [
  {
    name: "Deepika",
    blood: "O-",
    unit: "4 Unit",
    location: "OMR",
    status: "Completed",
    date: "11/12/2023",
  },
  {
    name: "Ram Kumar",
    blood: "B+",
    unit: "2 Unit",
    location: "Solinganallur",
    status: "Failed",
    date: "11/12/2023",
  },
  {
    name: "Ashok kumar",
    blood: "A+",
    unit: "3 Unit",
    location: "Thuraipakkam",
    status: "Completed",
    date: "11/12/2023",
  },
  {
    name: "kayal",
    blood: "O+",
    unit: "1 Unit",
    location: "Guindy",
    status: "Failed",
    date: "11/12/2023",
  },
];

export default function DonationHistory() {
  const totalDays = 90;
  const lastDonationDate = new Date("2025-03-09");
  const currentDate = new Date();
  const diffTime = Math.max(currentDate - lastDonationDate, 0);
  const completedDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const remainingDays = Math.max(totalDays - completedDays, 0);
  const percentage = Math.min((completedDays / totalDays) * 100, 100);

  const [progress, setProgress] = useState(0);
  const circularProgressRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      setProgress(0);
      setTimeout(() => {
        setProgress(percentage > 0 ? percentage : 1); // Ensure visibility
      }, 50);
    }, [percentage])
  );

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All");
  const [active, setActive] = useState("Request");
  const options = ["All", "Recents"];
  const [loading, setLoading] = useState(true);
  const [availableToDonate, setAvailableToDonate] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selected, active]);

  const getFilteredHistory = () => {
    const data = active === "Request" ? requestHistory : donateHistory;
    return selected === "Recents" ? data.slice(0, 5) : data;
  };

  const History = getFilteredHistory();

  return (
    <View className="flex-1 bg-white">
      <Header title="History" menu={true} />

      {/* Circle Progress or Heart */}
      {availableToDonate ? (
        <View className="items-center mt-4">
          <View style={{ paddingVertical: rMS(16) }}>
            <Images.Heart name="heart" size={rMS(32)} />
          </View>
          <View>
            <Images.Circle width={rMS(182)} height={rMS(182)} />
          </View>
        </View>
      ) : (
        <View className="items-center mt-4 ">
          <View
            className="flex-row gap-2 justify-center items-center border bg-[#F1B0AA80]"
            style={{ paddingHorizontal: rMS(10), paddingVertical: rMS(4) }}
          >
            <Images.Not width={rMS(15)} height={rMS(15)} />
            <Text style={{ fontSize: rMS(12) }}>
              Not available to donate blood
            </Text>
          </View>
          <View className=" items-center" style={{ paddingTop: 16, }}>
            <AnimatedCircularProgress
              ref={circularProgressRef}
              size={200}
              width={20}
              fill={progress}
              tintColor="#840000"
              backgroundColor="#F1B0AA80"
              rotation={0}
              lineCap="round"
            >
              {(fill) => (
                <View className="flex mb-5 items-center">
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}
                  >
                    {remainingDays}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#000" }}>
                    Days remaining
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </View>
        </View>
      )}

      <TouchableOpacity
        onPress={() => setAvailableToDonate(!availableToDonate)}
        style={{
          marginTop: rMS(10),
          paddingVertical: rMS(12),
          paddingHorizontal: rMS(24),
          borderRadius: rMS(8),
          alignItems: "center",
        }}
      >
        <Text style={{ color: "blue", fontWeight: "bold", fontSize: rMS(14) }}>
          Set Availability (This Button Will Be Removed)
        </Text>
      </TouchableOpacity>

      {/* Filter Section */}
      <View style={{ paddingHorizontal: rMS(20) }}>
        <View
          className="flex-row justify-between"
          style={{ paddingTop: rMS(32) }}
        >
          {/* Dropdown */}
          <View style={{ width: rMS(96), position: "relative" }}>
            <TouchableOpacity
              onPress={() => setOpen(!open)}
              className="bg-[#F1B0AA80] border px-2 py-1.5 flex-row items-center justify-between"
              style={{
                borderRadius: rMS(6),
                paddingHorizontal: rMS(8),
                paddingVertical: rMS(6),
              }}
            >
              <Text
                className="text-red font-medium"
                style={{ fontSize: rMS(12) }}
              >
                {selected}
              </Text>
              <Icon name="chevron-down" size={rMS(18)} color="#840000" />
            </TouchableOpacity>
            {open && (
              <View
                style={{
                  position: "absolute",
                  top: rMS(40),
                  width: "100%",
                  borderRadius: rMS(8),
                }}
                className="bg-white rounded-md shadow-lg z-50"
              >
                {options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      setSelected(option);
                      setOpen(false);
                    }}
                    style={{
                      paddingVertical: rMS(8),
                      paddingHorizontal: rMS(12),
                    }}
                  >
                    <Text
                      className="text-red-800 font-medium"
                      style={{ fontSize: rMS(12) }}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Toggle Button */}
          <View
            className="flex-row bg-gray-100 rounded-full"
            style={{ width: rMS(160), height: rMS(32) }}
          >
            {["Request", "Donate"].map((label) => (
              <TouchableOpacity
                key={label}
                className={`flex-1 items-center justify-center rounded-full ${
                  active === label ? "bg-red" : ""
                }`}
                onPress={() => setActive(label)}
              >
                <Text
                  className={`text-xs ${
                    active === label ? "text-white" : "text-red-900"
                  }`}
                  style={{ fontSize: rMS(12) }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Donation List */}
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
          style={{
            paddingHorizontal: rMS(20),
            marginTop: rMS(24),
            marginBottom: rMS(16),
          }}
        >
          {History.map((item, index) => (
            <View
              key={index}
              className="flex-row rounded-xl gap-4 items-center justify-center"
              style={{
                backgroundColor: "#DAAEAEB6",
                padding: rMS(8),
                marginBottom: rMS(12),
              }}
            >
              <View
                className="items-center justify-center"
                style={{
                  width: rS(52),
                  height: rV(52),
                  backgroundColor: "#840000B2",
                  borderRadius: rMS(8),
                  marginTop: rMS(4),
                }}
              >
                <Text
                  className="font-bold text-[#F1B0AA] text-center"
                  style={{ fontSize: rMS(24) }}
                >
                  {item.blood}
                </Text>
              </View>
              <View className="flex-1 justify-center">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text
                      className="text-red font-semibold"
                      style={{ fontSize: rMS(16) }}
                    >
                      {item.name}
                    </Text>
                    <Text className="text-red" style={{ fontSize: rMS(12) }}>
                      {item.unit}
                    </Text>
                  </View>
                  <View
                    className="flex-row items-center gap-1"
                    style={{ marginTop: rMS(4), marginRight: rMS(4) }}
                  >
                    <Text
                      style={{ fontSize: rMS(12) }}
                      className="font-rubik-semibold text-red"
                    >
                      {item.status}
                    </Text>
                    {item.status === "Completed" ? (
                      <Images.Tick width={rMS(14)} height={rMS(14)} />
                    ) : (
                      <Images.Not width={rMS(14)} height={rMS(14)} />
                    )}
                  </View>
                </View>
                <View
                  className="flex-row justify-between"
                  style={{ marginRight: rMS(4) }}
                >
                  <Text
                    className="text-red font-rubik-semibold"
                    style={{ fontSize: rMS(12) }}
                  >
                    {item.location}
                  </Text>
                  <Text style={{ fontSize: rMS(12) }} className="text-red">
                    {item.date}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
