import { periodCalendarStyles as styles } from '@/src/styles/periodcalenderstyle';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, ScrollView, Switch, Text, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');
const BOTTOM_NAV_HEIGHT = 60;

const DATA = {
  period: ['2023-07-27', '2023-07-28', '2023-07-29', '2023-07-30', '2023-07-31'],
  fertile: ['2023-07-04', '2023-07-05', '2023-07-06', '2023-07-07', '2023-07-08'],
  ovulation: ['2023-07-30'],
  predicted: ['2023-07-29']
};

export default function PeriodCalendarScreen() {
  const [selected, setSelected] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);
  const route = useRoute();

  const getColorForDay = (date: string, selectedDate: string) => {
    const diff = Math.abs(new Date(date).getTime() - new Date(selectedDate).getTime());
    const dayDiff = diff / (1000 * 3600 * 24);
    if (dayDiff === 0) return '#FF4D4D';
    if (dayDiff === 1) return '#FF6666';
    if (dayDiff === 2) return '#FF8080';
    if (dayDiff === 3) return '#FF9999';
    if (dayDiff === 4) return '#FFB0B0';
    if (dayDiff === 5) return '#FFD7D7';
    return '';
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
      for (let i = 0; i <= 5; i++) {
        const date = new Date(selected);
        date.setDate(date.getDate() + i);
        const dateString = date.toISOString().split('T')[0];
        const color = getColorForDay(dateString, selected);
        if (color) {
          marks[dateString] = {
            customStyles: {
              container: { backgroundColor: color },
              text: { color: '#000', fontWeight: 'bold' }
            }
          };
        }
      }
    }
    return marks;
  };

  return (
    <View style={{ flex: 1 }}>
       <ScrollView contentContainerStyle={[styles.container, { paddingBottom: BOTTOM_NAV_HEIGHT + 20 }]}>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>{isEnabled ? 'YEAR' : 'MONTH'}</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <Calendar
          markingType={'custom'}
          markedDates={buildMarkedDates()}
          onDayPress={(day: DateData) => {
            setSelected(day.dateString);
          }}
          theme={{
            arrowColor: '#333',
            monthTextColor: '#000',
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 14
          }}
          style={{ width: width - 40, alignSelf: 'center' }}
        />

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
      <BottomNav activeTab={route.name as 'Calendar'} />
    </View>
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