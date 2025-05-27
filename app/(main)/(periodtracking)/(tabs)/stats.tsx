import { rS, rV } from "@/styles/responsive";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import { Icon } from "react-native-vector-icons/Icon";

type TimelineEntry = {
  date: string;
  icon: "gender-female" | "plus-circle";
  details: string[];
  flow?: number;
  isPeriod?: boolean;
  isFertile?: boolean;
};

const statusColors = {
  Period: "#F8AFA6",
  Ovulation: "#FF7F50",
  Fertile: "#BA68C8",
};

const timelineData: TimelineEntry[] = [
  {
    date: "May 13 - 2023",
    icon: "gender-female",
    details: ["14th day of periods", "14th day of cycle"],
    flow: 3,
    isPeriod: true,
  },
  {
    date: "Apr 25 - 2023",
    icon: "gender-female",
    details: [
      "1st day of period",
      "Fertility window",
      "Medium to high chance of pregnancy",
      "5 days until ovulation",
      "1st day of cycle",
    ],
    flow: 0,
    isFertile: true,
  },
  {
    date: "Apr 15 - 2023",
    icon: "gender-female",
    details: [
      "5th day of period",
      "Medium to high chance of pregnancy",
      "1 days until ovulation",
      "3rd day of cycle",
    ],
    flow: 4,
    isPeriod: true,
    isFertile: true,
  },
];

const FlowIndicators = ({ flow }: { flow?: number }) => {
  const totalDrops = 5;
  const filledDrops = flow !== undefined ? flow : 0;

  return (
    <View style={styles.flowIndicatorsContainer}>
      {Array.from({ length: totalDrops }).map((_, index) => (
        <MaterialCommunityIcons
          key={index}
          name="water"
          size={16}
          color={index < filledDrops ? "#89223B" : "#D88BA8"}
          style={styles.flowDropIcon}
        />
      ))}
    </View>
  );
};

type TimelineEntryCardProps = {
  entry: TimelineEntry;
};

const TimelineEntryCard = ({ entry }: TimelineEntryCardProps) => (
  <View style={styles.timelineEntryContainer}>
    <View style={styles.timelineEntryHeader}>
      <Text style={styles.timelineEntryDate}>{entry.date}</Text>
    </View>

    <View style={styles.timelineEntryContent}>
      <View style={styles.timelineEntryIconContainer}>
        <MaterialCommunityIcons name={entry.icon} size={24} color="#843750" />
      </View>

      <View style={styles.timelineEntryDetailsContainer}>
        {entry.details.map((detail, index) => (
          <Text
            key={index}
            style={[
              styles.timelineEntryDetailText,
              detail.includes("chance of pregnancy") &&
                styles.timelineEntryHighlightDetail,
            ]}
          >
            {detail}
          </Text>
        ))}

        {entry.flow !== undefined && entry.flow > 0 && (
          <FlowIndicators flow={entry.flow} />
        )}
        {entry.flow !== undefined &&
          entry.flow === 0 &&
          entry.details.some((d) => d.toLowerCase().includes("flow")) && (
            <Text style={styles.timelineEntryFlowNoneText}>flow: None</Text>
          )}
      </View>
    </View>
  </View>
);

type InfoCardProps = {
  title: string;
  label: string;
  color: string;
};

const InfoCard = ({ title, label, color }: InfoCardProps) => (
  <View style={styles.infoCardContainer}>
    <Text style={styles.infoCardTitle}>{title}</Text>
    <View style={styles.infoCardLabelContainer}>
      <View style={[styles.infoCardLabelDot, { backgroundColor: color }]} />
      <Text style={styles.infoCardLabelText}>{label.toUpperCase()}</Text>
    </View>
  </View>
);

type InfoBarProps = {
  title: string;
  value: string;
};

const InfoBar = ({ title, value }: InfoBarProps) => (
  <View style={styles.infoBarContainer}>
    <View style={styles.infoBarHeader}>
      <Text style={styles.infoBarTitle}>{title}</Text>
      <Text style={styles.infoBarValue}>{value}</Text>
    </View>
    <View style={styles.infoBarDivider} />
    <Text style={styles.infoBarSmallValue}>{value}</Text>
  </View>
);

const Legend = () => (
  <View style={styles.legendContainer}>
    {Object.entries(statusColors).map(([key, color]) => (
      <View key={key} style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: color }]} />
        <Text style={styles.legendText}>{key}</Text>
      </View>
    ))}
  </View>
);

type CycleEntryProps = {
  date: string;
};

const CycleEntry = ({ date }: CycleEntryProps) => (
  <View style={styles.cycleEntryContainer}>
    <View style={styles.cycleEntryBarContainer}>
      {Array.from({ length: 14 }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.cycleEntryBarSegment,
            { backgroundColor: i < 8 ? "#89223B" : "#D88BA8" },
          ]}
        />
      ))}
    </View>
    <Text style={styles.cycleEntryDate}>{date}</Text>
  </View>
);

export default function CycleScreen() {
  const route = useRoute();
  const [activeLocalTab, setActiveLocalTab] = useState("Cycle");
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const renderCycleContent = () => (
    <>
      <View style={styles.cycleContentInfoCards}>
        <InfoCard title="19 Days" label="Abnormal" color="#FFA500" />
        <InfoCard title="5 Days" label="Normal" color="#90EE90" />
      </View>
      <InfoBar title="Cycle Length" value="19 days" />
      <InfoBar title="Period Length" value="11 days" />
      <>
        <View style={styles.cycleHistoryCard}>
          <View style={styles.cycleHistoryHeader}>
            <Text style={styles.cycleHistoryTitle}>Cycle History</Text>
            <TouchableOpacity>
              <Text style={styles.cycleHistoryEditButton}>Edit ▸</Text>
            </TouchableOpacity>
          </View>
          <Legend />
          <CycleEntry date="Apr 30" />
          <CycleEntry date="May 20" />
        </View>
      </>
    </>
  );

  const renderLogContent = () => (
    <View
      className=" justify-center"
      style={{
        width: screenWidth * 0.9,
        height: screenHeight * 0.65,
      }}
    >
      <View
        className="w-96 h-96 rounded-xl items-center"
        style={{
          alignSelf: "center",
          backgroundColor: "#E8CAED",
          justifyContent: "space-evenly",
        }}
      >
        <Image source={require("@/assets/images/rafiki.png")}></Image>
        <View
          className=" w-80 h-16 flex-row bg-transparent rounded-xl   "
          style={{
            borderColor: "	rgba(114, 20, 126, 0.2)",
            borderWidth: rS(2),
            justifyContent: "space-around",
          }}
        >
          <View className="justify-center">
            <MaterialIcons name="info-outline" size={24} color="#72147E" />
          </View>
          <View className="justify-center -ml-10">
            <Text className="text-sm">
              Start logging Wellbeing Information {"\n"} to View is as a chart
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="w-52  items-center skip pt-4 pb-4 "
          style={{
            backgroundColor: "#8B2252",
            borderRadius: 15,
          }}
          onPress={() => alert("will create this page soon")}
        >
          <Text className=" text-white text-lg" style={""}>
            Log
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTimelineContent = () => (
    <View style={styles.timelineContentContainer}>
      {timelineData.map((entry, index) => (
        <TimelineEntryCard key={index} entry={entry} />
      ))}
    </View>
  );

  const renderContent = () => {
    switch (activeLocalTab) {
      case "Cycle":
        return renderCycleContent();
      case "Log":
        return renderLogContent();
      case "Timeline":
        return renderTimelineContent();
      default:
        return renderCycleContent();
    }
  };

  const tabs = ["Cycle", "Log", "Timeline"];

  return (
    <LinearGradient
      colors={["#E9C3F1", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
      style={styles.gradientBackground}
    >
      <MaterialIcons
        name="arrow-back"
        size={24}
        style={styles.backButtonIcon}
        onPress={() => router.push("/(main)/(periodtracking)/(tabs)")}
      />

      <View style={styles.tabsContainer}>
        <View style={styles.tabsInnerContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveLocalTab(tab)}
              style={styles.tabButton}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeLocalTab === tab && styles.tabButtonTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
        style={styles.scrollView}
      >
        {renderContent()}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  backButtonIcon: {
    position: "absolute",
    left: 20,
    top: 40,
    zIndex: 10,
    color: "#525252",
  },
  tabsContainer: {
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(132, 55, 80, 0.5)",
  },
  tabsInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 10,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  tabButtonText: {
    fontSize: 18,
    color: "#843750",
  },
  tabButtonTextActive: {
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#843750",
  },
  scrollView: {
    paddingBottom: 80,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  // Cycle Content Styles
  cycleContentInfoCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 8,
  },
  infoCardContainer: {
    backgroundColor: "#EBCDF1",
    borderRadius: 8,
    padding: 16,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#262626",
  },
  infoCardLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  infoCardLabelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  infoCardLabelText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#525252",
  },
  infoBarContainer: {
    backgroundColor: "#EBCDF1",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  infoBarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "flex-end",
  },
  infoBarTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#262626",
  },
  infoBarValue: {
    fontSize: 16,
    color: "#262626",
  },
  infoBarDivider: {
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderColor: "#B985C1",
    marginVertical: 4,
  },
  infoBarSmallValue: {
    textAlign: "right",
    fontSize: 12,
    color: "#525252",
    marginTop: 4,
  },
  cycleHistoryCard: {
    backgroundColor: "#EBCDF1",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cycleHistoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cycleHistoryTitle: {
    fontWeight: "600",
    fontSize: 16,
    color: "#404040",
  },
  cycleHistoryEditButton: {
    color: "#843750",
    fontWeight: "600",
    fontSize: 14,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
    paddingHorizontal: 6,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    marginLeft: 2,
    fontSize: 12,
    color: "#525252",
  },
  cycleEntryContainer: {
    marginBottom: 12,
  },
  cycleEntryBarContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  cycleEntryBarSegment: {
    width: 6,
    height: 14,
    borderRadius: 2,
    marginHorizontal: 1,
  },
  cycleEntryDate: {
    fontSize: 12,
    color: "#525252",
  },

  // Log Content Styles
  logContentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  logContentText: {
    fontSize: 16,
    color: "#525252",
  },

  // Timeline Content Styles
  timelineContentContainer: {
    paddingVertical: 8,
  },
  timelineEntryContainer: {
    marginBottom: 16,
  },
  timelineEntryHeader: {
    backgroundColor: "#E9C3F1",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  timelineEntryDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#404040",
  },
  timelineEntryContent: {
    backgroundColor: "white",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timelineEntryIconContainer: {
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: "#D1D5DB",
    marginRight: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 4,
  },
  timelineEntryDetailsContainer: {
    flex: 1,
  },
  timelineEntryDetailText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#404040",
  },
  timelineEntryHighlightDetail: {
    color: "#DC2626",
    fontWeight: "500",
  },
  flowIndicatorsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  flowDropIcon: {
    marginHorizontal: 1,
  },
  timelineEntryFlowNoneText: {
    fontSize: 12,
    color: "#525252",
    marginTop: 4,
  },
});
