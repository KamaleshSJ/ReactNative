import { RootStackParamList } from '@/app/App';
import { periodTrackerStyles as styles } from '@/src/styles/periodtrackerStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = NativeStackScreenProps<RootStackParamList, 'LastPeriod'>;

export default function LastPeriodScreen({ navigation }: Props) {
  const [date, setDate] = useState<Date | null>(null);
  const [isPickerVisible, setPickerVisible] = useState(false);

  return (
    <LinearGradient  colors={['#E9C3F1','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff']} ><View style={styles.lastperiodcontainer}>
      <Text style={styles.label}>Almost done. When did your last period start?</Text>
      <Text style={styles.notsure}>If you're irregular or not sure , tap 'Not Sure'</Text>
      <View style={{ flex: 1, padding: 16 }}>
      <Calendar
  markedDates={{
    '2025-05-10': { startingDay: true, color: '#E9C3F1', textColor: 'white' },
    '2025-05-11': { color: '#E9C3F1', textColor: 'white' },
    '2025-05-12': { endingDay: true, color: '#E9C3F1', textColor: 'white' },
  }}
  markingType={'period'}
/>
    </View>
      <View style={styles.lpbuttonContainer}>
         <TouchableOpacity  onPress={() => navigation.navigate('Home')}>
              <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={['#ba67c7','#8c2353'] } style={styles.notsurebutton} >
              <Text style={styles.notsuretext}>Not Sure</Text>
              </LinearGradient>
            </TouchableOpacity>
         <TouchableOpacity style={styles.confirmbutton} onPress={() => navigation.navigate('Home')}>
              <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={['#ba67c7','#8c2353']} style={styles.confirmbutton}>
              <Text style={styles.confirmtext}>Confirm</Text>
              </LinearGradient>
            </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        onConfirm={(selectedDate: Date) => {
            setDate(selectedDate);
            setPickerVisible(false);
          }}
        onCancel={() => setPickerVisible(false)}
      />
    </View>
    </LinearGradient>
  );
}