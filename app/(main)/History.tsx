import React, { useCallback, useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import Img from "@/assets/images/Home.png";
import Images from "@/constants/images";
import { Header } from "@/components";
import { rMS } from "@/styles/responsive";

const donationList = [
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
];

const requestList = [
  {
    name: "Ashok kumar",
    Icon: Img,
    location: "Thuraipakkam",
    date: "11/12/2023",
  },
  {
    name: "Ram Kumar",
    Icon: Img,
    location: "Solinganallur",
    date: "11/12/2023",
  },
];

export default function DonationStatusScreen() {
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
        setProgress(percentage);
      }, 50);
    }, [percentage])
  );

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All");
  const [active, setActive] = useState("Request");
  const options = ["All", "Recents"];

  return (
    <View className="flex-1 bg-white">
      <Header title="History" menu={true} />

      {/* Top UI */}
      <View className="items-center mt-4">
        {active === "Request" ? (
          <>
            <View
              className="flex-row gap-2 justify-center items-center border bg-[#F1B0AA80]"
              style={{ paddingHorizontal: rMS(10), paddingVertical: rMS(4) }}
            >
              <Images.Not width={rMS(15)} height={rMS(15)} />
              <Text style={{ fontSize: rMS(12) }}>
                Not available to donate blood
              </Text>
            </View>
            <View style={{ alignItems: "center", paddingTop: rMS(15) }}>
              <AnimatedCircularProgress
                ref={circularProgressRef}
                size={rMS(210)}
                width={rMS(20)}
                fill={progress}
                tintColor="#840000"
                backgroundColor="#F1B0AA80"
                rotation={0}
                lineCap="round"
              >
                {(fill) => (
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: rMS(16),
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      {Math.round(fill)}%
                    </Text>
                    <Text style={{ fontSize: rMS(12), color: "#000" }}>
                      {remainingDays} days remaining
                    </Text>
                  </View>
                )}
              </AnimatedCircularProgress>
            </View>
          </>
        ) : (
          <>
            <View style={{ paddingVertical: rMS(6) }}>
              <Images.Heart name="heart" size={rMS(24)} />
            </View>
            <View>
              <Images.Circle />
            </View>
          </>
        )}
      </View>

      {/* Dropdown & Toggle */}
      <View style={{ paddingHorizontal: rMS(20), paddingTop: rMS(24) }}>
        <View className="flex-row justify-between">
          {/* Dropdown */}
          <View style={{ width: rMS(96), position: "relative" }}>
            <TouchableOpacity
              onPress={() => setOpen(!open)}
              className="bg-[#F1B0AA80] border px-2 py-2 flex-row items-center justify-between"
              style={{
                borderRadius: rMS(8),
                paddingHorizontal: rMS(8),
                paddingVertical: rMS(6),
              }}
            >
              <Text
                className="text-black font-medium"
                style={{ fontSize: rMS(12) }}
              >
                {selected}
              </Text>
              <Icon name="chevron-down" size={rMS(18)} color="black" />
            </TouchableOpacity>

            {open && (
              <View
                style={{
                  position: "absolute",
                  top: rMS(48),
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
            style={{ width: rMS(160), height: rMS(40) }}
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

      {/* Conditional List Rendering */}
      <ScrollView
        style={{
          paddingHorizontal: rMS(20),
          marginTop: rMS(24),
          marginBottom: rMS(16),
        }}
      >
        {active === "Donate"
          ? donationList.map((item, index) => (
              <View
                key={index}
                className="flex-row rounded-xl items-start gap-2"
                style={{
                  backgroundColor: "#DAAEAEB6",
                  padding: rMS(10),
                  marginBottom: rMS(12),
                }}
              >
                <View
                  className="items-center justify-center"
                  style={{
                    width: rMS(56),
                    height: rMS(56),
                    backgroundColor: "#840000B2",
                    borderRadius: rMS(12),
                    marginTop: rMS(4),
                  }}
                >
                  <Text
                    className="font-bold text-[#F1B0AA]"
                    style={{ fontSize: rMS(20) }}
                  >
                    {item.blood}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text
                        className="text-red font-semibold"
                        style={{ fontSize: rMS(16) }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        className="text-red"
                        style={{ fontSize: rMS(10), marginTop: rMS(2) }}
                      >
                        {item.unit}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text style={{ fontSize: rMS(12), marginRight: rMS(4) }}>
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
                    style={{ marginTop: rMS(6) }}
                  >
                    <Text className="text-red" style={{ fontSize: rMS(12) }}>
                      {item.location}
                    </Text>
                    <Text style={{ fontSize: rMS(12) }}>{item.date}</Text>
                  </View>
                </View>
              </View>
            ))
          : requestList.map((item, index) => (
              <View
                key={index}
                className="flex-row rounded-xl items-start gap-2"
                style={{
                  backgroundColor: "#DAAEAEB6",
                  padding: rMS(12),
                  marginBottom: rMS(12),
                }}
              >
                <Image
                  source={item.Icon}
                  style={{
                    width: rMS(50),
                    height: rMS(50),
                    borderRadius: rMS(8),
                  }}
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text
                        className="text-red font-semibold"
                        style={{ fontSize: rMS(16) }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        className="text-red mt-1"
                        style={{ fontSize: rMS(12) }}
                      >
                        {item.location}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: rMS(12) }}>{item.date}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
      </ScrollView>
    </View>
  );
}
