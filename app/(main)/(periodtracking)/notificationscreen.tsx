import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '@/constants/interface';


const { width, height } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

type NotificationEntry = {
  id: string;
  type: 'period_start' | 'symptoms_log' | 'upcoming' | 'ovulation_predicted' | 'health_tip';
  title: string;
  subtitle: string;
  date: string;
  isHighlighted?: boolean;
};

const notificationsData: NotificationEntry[] = [
   // Add your actual notification data here
   // Example data based on the image:
  { id: '1', type: 'period_start', title: 'Your periods has started', subtitle: 'Stay hydrated and take it easy today stay well', date: '11/12/2023', isHighlighted: false },
  { id: '2', type: 'symptoms_log', title: 'Log your symptoms', subtitle: 'Help us track your cycle better by logging hoe to feel', date: '11/12/2023', isHighlighted: false },
  { id: '3', type: 'upcoming', title: 'Upcoming', subtitle: 'Your next period is expected in 3 days!', date: '11/12/2023', isHighlighted: true },
  { id: '4', type: 'ovulation_predicted', title: 'Ovulation predicted :Tommorow', subtitle: 'Best time for conception if you\'re planning.', date: '11/12/2023', isHighlighted: true },
  { id: '5', type: 'health_tip', title: 'Health Tips Tip of the day', subtitle: 'Eating iron-rich foods like spinach and lentils can help with energy during your...', date: '11/12/2023', isHighlighted: true },
  { id: '6', type: 'period_start', title: 'Your periods has started', subtitle: 'Stay hydrated and take it easy today stay well', date: '11/12/2023', isHighlighted: false },
  { id: '7', type: 'upcoming', title: 'Upcoming', subtitle: 'Your next period start in 5 days!', date: '11/12/2025', isHighlighted: true },
  { id: '8', type: 'health_tip', title: 'Health Tip', subtitle: ': Ongoing', date: '11/12/2023', isHighlighted: false },
];

const getIconName = (type: NotificationEntry['type']) => {
  switch (type) {
    case 'period_start':
      return 'magnify';
    case 'symptoms_log':
      return 'clipboard-outline';
    case 'upcoming':
      return 'clock-outline';
    case 'ovulation_predicted':
      return 'egg-outline';
    case 'health_tip':
      return 'heart-outline';
    default:
      return 'information-outline';
  }
};

type NotificationCardProps = {
  entry: NotificationEntry;
};

const NotificationCard = ({ entry }: NotificationCardProps) => {
  const iconName = getIconName(entry.type);

  return (
    <View style={styles.notificationCard}>
      <View style={styles.notificationIconContainer}>
        <MaterialCommunityIcons name={iconName} size={24} color="#6C2EB9" />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{entry.title}</Text>
        <Text style={styles.notificationSubtitle}>{entry.subtitle}</Text>
      </View>
      <Text style={styles.notificationDate}>{entry.date}</Text>
    </View>
  );
};

export default function NotificationScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState<'All' | 'Unread'>('All');

  const notifications = notificationsData; // Use the sample data, replace with your actual data source

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <MaterialIcons name="more-vert" size={24} color="black" />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'All' && styles.activeTabButton]}
          onPress={() => setActiveTab('All')}
        >
          <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Unread' && styles.activeTabButton]}
          onPress={() => setActiveTab('Unread')}
        >
          <Text style={[styles.tabText, activeTab === 'Unread' && styles.activeTabText]}>Unread</Text>
        </TouchableOpacity>
      </View>

      {notifications.length === 0 ? (
        <View style={styles.noNotificationsContainer}>
          <Image
           
            style={styles.noNotificationsImage}
            resizeMode="contain"
          />
          <Text style={styles.noNotificationsText}>You have no notification!</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          {notifications.map(notification => (
            <NotificationCard key={notification.id} entry={notification} />
          ))}
          
                  
        </ScrollView>
      )}


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6C2EB9',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#eee',
    marginHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: '#6C2EB9',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollViewContent: {

  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0e6f6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e2d0f3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    marginRight: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationSubtitle: {
    fontSize: 12,
    color: '#555',
  },
  notificationDate: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-start',
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  noNotificationsImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  noNotificationsText: {
    fontSize: 18,
    color: '#6C2EB9',
    fontWeight: 'bold',
  },
});