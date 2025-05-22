import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { RootStackParamList } from '@/constants/interface';


const { width } = Dimensions.get('window');
import { useRouter } from 'expo-router';
const BOTTOM_NAV_HEIGHT = 60;

const DATA = {
  period: ['2023-07-27', '2023-07-28', '2023-07-29', '2023-07-30', '2023-07-31'],
  fertile: ['2023-07-04', '2023-07-05', '2023-07-06', '2023-07-07', '2023-07-08'],
  ovulation: ['2023-07-30'],
  predicted: ['2023-07-29'],
};

type PeriodCalendarScreenNavigationProp = NavigationProp<RootStackParamList, 'Calendar'>;

export default function PeriodCalendarScreen() {
  const [selected, setSelected] = useState<string>('');
  const router = useRouter();
 const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const getColorForDay = (date: string, selectedDate: string) => {
    const diff = Math.abs(new Date(date).getTime() - new Date(selectedDate).getTime());
    const dayDiff = diff / (1000 * 3600 * 24);
    return ['#FF4D4D', '#FF6666', '#FF8080', '#FF9999', '#FFB0B0', '#FFD7D7', '#FFEAEA'][dayDiff] || '';
  };

  const buildMarkedDates = () => {
    const marks: Record<string, any> = {};
    DATA.period.forEach((d) => {
      marks[d] = { customStyles: { container: { backgroundColor: '#FFD7D7' }, text: { color: '#000' } } };
    });
    DATA.fertile.forEach((d) => {
      marks[d] = { customStyles: { container: { backgroundColor: '#CFAEFF' }, text: { color: '#000' } } };
    });
    DATA.ovulation.forEach((d) => {
      marks[d] = { customStyles: { container: { borderColor: '#FF6B6B', borderWidth: 2 }, text: { color: '#000' } } };
    });
    DATA.predicted.forEach((d) => {
      marks[d] = { customStyles: { container: { backgroundColor: '#A24D4D' }, text: { color: '#fff' } } };
    });

    if (selected) {
      for (let i = 0; i <= 6; i++) {
        const date = new Date(selected);
        date.setDate(date.getDate() + i);
        const dateString = date.toISOString().split('T')[0];
        const color = getColorForDay(dateString, selected);
        if (color) {
          marks[dateString] = {
            customStyles: {
              container: { backgroundColor: color },
              text: { color: '#000', fontWeight: 'bold' },
            },
          };
        }
      }
    }
    return marks;
  };

   const screenHeight= Dimensions.get('window').height;
          const screenWidth = Dimensions.get('window').width;
  

  return (
    <SafeAreaView style={styles.container}>
      <Ionicons name="arrow-back" size={24} color="black" className='pl-6 pt-10' onPress={() => router.back()}  />
      <ScrollView contentContainerStyle={{ paddingBottom: BOTTOM_NAV_HEIGHT + 20 }}>
        <View className='pt-20 ' style={{}}>
          
          <View style={styles.toggleWrapper}>
            <TouchableOpacity onPress={() => router.push('/(main)/(periodtracking)/(tabs)/periodcalendar')} style={styles.inactiveToggle}>
              <Text style={styles.toggleText}>MONTH</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.activeToggle}
              className=''
              onPress={() => router.push('/(main)/(periodtracking)/yearcalendar')}  
            >
              <Text style={styles.activeToggleText}>YEAR</Text>
            </TouchableOpacity>
          </View>
         
        </View>

       <View className=''>
         <Calendar 
          
          markingType={'custom'}
          markedDates={buildMarkedDates()}
          onDayPress={(day: DateData) => setSelected(day.dateString)}
          theme={{ arrowColor: '#333', monthTextColor: '#000', textDayFontSize: 16, textMonthFontSize: 20, textDayHeaderFontSize: 14 }}
          style={{ width: width - 40, alignSelf: 'center' }}
        />
       </View>

        <View style={styles.legendContainer}>
          <View>
            <Legend color="#FFD7D7" label="Period / Selected" />
            <Legend color="#FF6B6B" label="Ovulation" />
          </View>
          <View>
            <Legend color="#CFAEFF" label="Fertile Window" />
            <Legend color="#A24D4D" label="Predicted Period" />
          </View>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingVertical: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 12,
    color: '#333',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   
    
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
});