import { RootStackParamList } from '../../../constants/interface';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const markedDays = {
  '2025-01-03': 'period',
  '2025-01-04': 'fertile',
  '2025-01-05': 'ovulation',
  '2025-03-10': 'predicted',
  '2025-05-22': 'period',
  '2025-07-17': 'ovulation',
  '2025-09-01': 'fertile',
  '2025-12-29': 'period',
};

const COLOR_MAP = {
  period: '#D04C84',
  ovulation: '#FA9E9E',
  fertile: '#D7B5F9',
  predicted: '#9B59B6',
};

type YearCalendarScreenNavigationProp = NavigationProp<
  RootStackParamList,
  'YearCalendar'
>;

export default function YearCalendarScreen() {
  const year = 2025;
  const navigation = useNavigation<YearCalendarScreenNavigationProp>();

  const renderMonth = (monthIndex: number) => {
    const firstDay = moment([year, monthIndex]);
    const daysInMonth = firstDay.daysInMonth();
    const startDay = firstDay.day();

    const blanks = Array(startDay).fill(null);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const fullArray = [...blanks, ...daysArray];

    return (
      <View className='' key={monthIndex} style={styles.monthContainer}>
        <Text style={styles.monthTitle}>{firstDay.format('MMM')}</Text>
        <View style={styles.weekRow}>
          {days.map((d, idx) => (
            <Text key={idx} style={styles.weekDay}>
              {d}
            </Text>
          ))}
        </View>
        <View style={styles.daysGrid}>
          {fullArray.map((day, idx) => {
            const dateStr = day
              ? moment([year, monthIndex, day]).format('YYYY-MM-DD')
              : null;
            const mark =
              dateStr && (markedDays as Record<string, string>)[dateStr];

            return (
              <View key={idx} style={styles.dayCell}>
                {day ? (
                  <View
                    style={[
                      styles.circle,
                      mark && {
                        backgroundColor:
                          COLOR_MAP[mark as keyof typeof COLOR_MAP],
                      },
                    ]}
                  >
                    <Text style={styles.dayText}>{day}</Text>
                  </View>
                ) : (
                  <View style={{ width: 24, height: 24 }} />
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  };
   
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
       <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
          className='pl-6 pt-10'
        />
      <View  style={{}}>
       
        <View className='pt-10' style={styles.toggleWrapper}>
          <TouchableOpacity
            style={styles.inactiveToggle}
            onPress={() => router.push('/(main)/(periodtracking)/(tabs)/periodcalendar')}
          >
            <Text style={styles.toggleText}>MONTH</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activeToggle}>
            <Text style={styles.activeToggleText}>YEAR</Text>
          </TouchableOpacity>
        </View>
       
      </View>

      <Text style={styles.yearText}>2025</Text>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View className='ml-2 mr-2' style={styles.yearGrid}>
          {Array.from({ length: 12 }, (_, i) => renderMonth(i))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  yearText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 8,
    marginBottom: 12,
    marginLeft: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  toggleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  inactiveToggle: {
    backgroundColor: '#BA68C8',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  activeToggle: {
    backgroundColor: '#800080',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  toggleText: { color: '#444', fontWeight: '600' },
  activeToggleText: { color: '#fff', fontWeight: '600' },

  scrollView: {
    paddingBottom: 100,
    paddingHorizontal: 6,
  },
  yearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  monthContainer: {
    width: screenWidth / 3 - 10,
    marginVertical: 8,
    alignItems: 'flex-start',
  },
  monthTitle: { fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  weekDay: {
    fontSize: 10,
    color: '#888',
    width: 14,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  dayCell: {
    width: 28,
    height: 28,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 10,
    color: '#000',
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#eee',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5e9f7',
  },
  footerLeft: {
    fontWeight: 'bold',
    color: '#555',
    paddingLeft: 10,
  },
  footerRight: {
    color: '#800080',
    fontWeight: 'bold',
    paddingRight: 10,
  },
});
