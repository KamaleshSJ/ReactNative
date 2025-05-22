import {
  View,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const HelpAndSupport = () => {
  const router = useRouter();

  const openEmail = () => Linking.openURL("mailto:praveenm7047@gmail.com");
  const openPhone = () => Linking.openURL("tel: +91 7826008626");
  const openWhatsApp = () => {
    const message = "Hello, I need help with the Blood Donation App.";
    const phone = "+91 7826008626";
    const url =
      Platform.OS === "ios"
        ? `whatsapp://send?phone=${phone}&text=${message}`
        : `https://wa.me/${phone}?text=${message}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-red px-5 pt-12 pb-6 rounded-b-3xl">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold mt-4">
          Help & Support
        </Text>
        <Text className="text-white text-base mt-1">
          We're here to assist you anytime
        </Text>
      </View>

      {/* Contact Options */}
      <View className="mt-6 px-5 space-y-4">
        <Text className="text-lg font-bold text-gray-800 mb-2 ">
          Contact Us
        </Text>
        <View className="flex-col gap-3">
          {/* Email */}
          <TouchableOpacity
            onPress={openEmail}
            className="flex-row items-center bg-gray-100 p-4 rounded-xl "
          >
            <MaterialIcons name="email" size={24} color="#DC2626" />
            <View className="ml-4">
              <Text className="text-gray-800 font-semibold">Email Support</Text>
              <Text className="text-red-500">praveenm7047@gmail.com</Text>
            </View>
          </TouchableOpacity>

          {/* Phone */}
          <TouchableOpacity
            onPress={openPhone}
            className="flex-row items-center bg-gray-100 p-4 rounded-xl"
          >
            <Ionicons name="call" size={24} color="#DC2626" />
            <View className="ml-4">
              <Text className="text-gray-800 font-semibold">Call Support</Text>
              <Text className="text-red-500"> +91 7826008626</Text>
            </View>
          </TouchableOpacity>

          {/* WhatsApp */}
          <TouchableOpacity
            onPress={openWhatsApp}
            className="flex-row items-center bg-gray-100 p-4 rounded-xl"
          >
            <FontAwesome name="whatsapp" size={24} color="green" />
            <View className="ml-4">
              <Text className="text-gray-800 font-semibold">WhatsApp Chat</Text>
              <Text className="text-green-600">Tap to chat with support</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Emergency */}
      <View className="mt-8 px-5">
        <Text className="text-lg font-bold text-gray-800 mb-2">
          Emergency Help
        </Text>
        <View className="bg-red/10 p-4 rounded-xl">
          <Text className="text-red-700 font-semibold">
            🚨 In case of medical emergency, immediately contact your local
            hospital or emergency number (e.g., 108 in India).
          </Text>
        </View>
      </View>

      {/* FAQs */}
      <View className="mt-8 px-5 mb-10">
        <Text className="text-lg font-bold text-gray-800 mb-3">FAQs</Text>

        {[
          {
            q: "How do I request blood?",
            a: 'Go to the home screen, tap "Request Blood", and fill out the form with patient details.',
          },
          {
            q: "How can I donate blood?",
            a: 'Tap on "Donate Blood", register as a donor, and we will notify you for a match.',
          },
          {
            q: "Is my data safe?",
            a: "Yes. We use industry-standard encryption to keep your information private and secure.",
          },
          {
            q: "Can I donate if I have a medical condition?",
            a: "Some conditions may restrict donation. Please consult your doctor and refer to national guidelines.",
          },
        ].map((faq, i) => (
          <View
            key={i}
            className="bg-gray-50 p-4 rounded-xl mb-3 border border-gray-200"
          >
            <Text className="font-semibold text-gray-800">{faq.q}</Text>
            <Text className="text-gray-600 mt-1">{faq.a}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HelpAndSupport;
