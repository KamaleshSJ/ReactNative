import { RootStackParamList } from '@/app/App';
import { periodTrackerStyles as styles } from '@/src/styles/periodtrackerStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'PeriodLength'>;

const days = [1, 2, 3, 4, 5, 6, 7];

export default function PeriodLengthScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <LinearGradient colors={['#d2b4e4','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff']} >
    <View style={styles.periodlengthcontainer}>
      <Text style={styles.label}>Your average Period Length?</Text>
      <FlatList
        data={days}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelected(item)} style={[styles.item, selected === item && styles.selected]}>
            <Text style={styles.cycletext}>{item} days</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.plbuttonContainer}>
        <TouchableOpacity  onPress={() => navigation.navigate('LastPeriod')}>
              <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={['#ba67c7','#8c2353']} style={styles.plconfirmbutton} >
              <Text style={styles.confirmtext}>Not Sure</Text>
              </LinearGradient>
            </TouchableOpacity>
        <TouchableOpacity  onPress={() => navigation.navigate('LastPeriod')}>
              <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={['#ba67c7','#8c2353']} style={styles.plconfirmbutton}>
              <Text style={styles.confirmtext}>Confirm</Text>
              </LinearGradient>
            </TouchableOpacity>
      </View>
    </View>
    </LinearGradient>
  );
}