import { rV } from "@/styles/responsive";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Dimensions,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedView = Animated.createAnimatedComponent(View);

type CircularDatePickerProps = {
  initialDay?: number;
  totalDays?: number;
  onDayChange?: (day: number) => void;
  size?: number;
  strokeWidth?: number;
  backgroundColor?: string;
  gradientColors?: string[];
  thumbIcon?: any;
};

const polarToCartesian = (
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
) => {
  "worklet";
  const rad = ((angleDeg - 90) * Math.PI) / 180.0;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const dayToAngle = (day: number, totalDays: number): number => {
  "worklet";
  const clampedDay = Math.max(1, Math.min(totalDays, day));
  return ((clampedDay - 1) / (totalDays - 1)) * 360;
};

const angleToDay = (angle: number, totalDays: number): number => {
  "worklet";
  let normalizedAngle = angle % 360;
  if (normalizedAngle < 0) normalizedAngle += 360;
  const dayIndex = Math.round((normalizedAngle / 360) * (totalDays - 1));
  return Math.max(1, Math.min(totalDays, dayIndex + 1));
};

const getFertilityStatus = (day: number): string => {
  if (day >= 12 && day <= 16) return "High";
  if ((day >= 8 && day <= 11) || (day >= 17 && day <= 20)) return "Medium";
  return "Low";
};

const CircularDatePicker: React.FC<CircularDatePickerProps> = ({
  initialDay = 1,
  totalDays = 31,
  onDayChange,
  size: propSize,
  strokeWidth = 14,
  backgroundColor = "transparent",
  gradientColors = ["#72147E", "#E31975", "#F1B0AA"],
  thumbIcon,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const size = propSize || Math.min(screenWidth - 40, 200);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const [displayDay, setDisplayDay] = useState(initialDay);
  const [editMode, setEditMode] = useState(false);

  const animatedAngle = useSharedValue(dayToAngle(initialDay, totalDays));
  const animatedEditMode = useSharedValue(false);
  const thumbOpacity = useSharedValue(0.8);

  useEffect(() => {
    animatedAngle.value = withTiming(dayToAngle(initialDay, totalDays), {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    runOnJS(setDisplayDay)(initialDay);
  }, [initialDay, totalDays]);

  useEffect(() => {
    animatedEditMode.value = editMode;
    thumbOpacity.value = withTiming(editMode ? 1 : 0.8, { duration: 200 });
  }, [editMode]);

  const fertilityStatus = getFertilityStatus(displayDay);

  const progress = useDerivedValue(() => {
    return (animatedAngle.value % 360) / 360;
  });

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference - progress.value * circumference,
  }));

  const thumbSize = { width: 30, height: 30 };
  const animatedThumbStyle = useAnimatedStyle(() => {
    const { x, y } = polarToCartesian(
      center,
      center,
      radius,
      animatedAngle.value
    );
    return {
      position: "absolute",
      width: thumbSize.width,
      height: thumbSize.height,
      transform: [
        { translateX: x - thumbSize.width / 2 },
        { translateY: y - thumbSize.height / 2 },
        { scale: thumbOpacity.value * (animatedEditMode.value ? 1.1 : 1) },
      ],
      opacity: thumbOpacity.value,
    };
  });

  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: () => {
        if (!animatedEditMode.value) return;
        thumbOpacity.value = withTiming(1.1, { duration: 10 });
      },
      onActive: (event) => {
        if (!animatedEditMode.value) return;
        const dx = event.x - center;
        const dy = event.y - center;
        let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        if (angle < 0) angle += 360;

        animatedAngle.value = angle;
        const newDay = angleToDay(angle, totalDays);
        runOnJS(setDisplayDay)(newDay);
      },
      onEnd: () => {
        if (!animatedEditMode.value) return;
        thumbOpacity.value = withTiming(1, { duration: 200 });

        const currentAngle = animatedAngle.value;
        const snappedDay = angleToDay(currentAngle, totalDays);
        const snappedAngle = dayToAngle(snappedDay, totalDays);

        animatedAngle.value = withTiming(
          snappedAngle,
          { duration: 150, easing: Easing.bezier(0.25, 0.1, 0.25, 1) },
          (isFinished) => {
            if (isFinished) {
              runOnJS(setDisplayDay)(snappedDay);
              if (onDayChange) runOnJS(onDayChange)(snappedDay);
            }
          }
        );
      },
    });

  const screenHeight = Dimensions.get("window").height;

  return (
    <View className="flex-1 items-center justify-center">
      <ImageBackground
        source={require("../assets/images/back.png")}
        resizeMode="cover"
        imageStyle={{
          width: "100%",
          marginTop: rV(40),
        }}
        style={{ width: screenWidth, height: rV(260) }}
        className="w-full h-full items-center justify-center "
      >
        <View
          className="relative items-center justify-center"
          style={{ width: size, height: size }}
        >
          <PanGestureHandler onGestureEvent={onGestureEvent} enabled={editMode}>
            <AnimatedView
              style={{ width: size, height: size, backgroundColor }}
            >
              <Svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="absolute inset-0"
              >
                <Defs>
                  <LinearGradient
                    id="backgroundGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <Stop offset="10%" stopColor={gradientColors[0]} />
                    <Stop offset="50%" stopColor={gradientColors[1]} />
                    <Stop offset="100%" stopColor={gradientColors[2]} />
                  </LinearGradient>

                  <LinearGradient
                    id="progressGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <Stop offset="0%" stopColor={gradientColors[2]} />
                    <Stop offset="50%" stopColor={gradientColors[1]} />
                    <Stop offset="100%" stopColor={gradientColors[0]} />
                  </LinearGradient>

                  <LinearGradient
                    id="innerGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <Stop offset="0%" stopColor="#E9C3F1" />
                    <Stop offset="100%" stopColor="#72147E" />
                  </LinearGradient>
                </Defs>

                <Circle
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke="url(#backgroundGradient)"
                  strokeWidth={strokeWidth}
                  fill="none"
                  opacity={0.5}
                />
                <AnimatedCircle
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke="url(#progressGradient)"
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={`${circumference}, ${circumference}`}
                  animatedProps={animatedCircleProps}
                  strokeLinecap="round"
                  rotation="-90"
                  originX={center}
                  originY={center}
                />
                <Circle
                  cx={center}
                  cy={center}
                  r={radius - strokeWidth - 1}
                  fill="url(#innerGradient)"
                />
              </Svg>

              <AnimatedView
                className="rounded-full justify-center items-center shadow-md"
                style={animatedThumbStyle}
              >
                <Image
                  source={
                    thumbIcon || require("../assets/images/Sanitary_pad.png")
                  }
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </AnimatedView>

              <View className="absolute inset-0 items-center justify-center px-4">
                <Text className="text-white font-bold text-xl text-center">
                  DAY {displayDay}
                </Text>
                <Text className="text-white text-sm font-semibold mb-1 text-center">
                  Chance for Pregnancy
                </Text>
                <Text className="text-white text-base font-bold text-center">
                  Status:{" "}
                  <Text
                    className={
                      fertilityStatus === "High"
                        ? "text-bright-red"
                        : fertilityStatus === "Medium"
                        ? "text-yellow-300"
                        : "text-green-300"
                    }
                  >
                    {fertilityStatus}
                  </Text>
                </Text>
                <TouchableOpacity
                  onPress={() => setEditMode(!editMode)}
                  activeOpacity={0.8}
                  className="mt-2 px-4 py-1 bg-[#E91E63] rounded-lg border border-red-400"
                >
                  <Text className="text-white text-xs font-bold ">
                    {editMode ? "Done" : "Edit"}
                  </Text>
                </TouchableOpacity>
              </View>
            </AnimatedView>
          </PanGestureHandler>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CircularDatePicker;
