import { RootStackParamList } from '@/app/App';
import { periodTrackerStyles as styles } from '@/src/styles/periodtrackerStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'CycleLength'>;

const days = [21,22,23,24,25,26, 27, 28, 29, 30];

export default function CycleLengthScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <LinearGradient colors={['#d2b4e4','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff']} style={styles.cyclelengthcontainer}>
          <View style={styles.cyclelengthcontainer}>
      <Text style={styles.label}>Your average Cycle Length?</Text>
      <FlatList
        data={days}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelected(item)} style={[styles.item, selected === item && styles.selected]}>
            <Text style={styles.cycletext}>{item} days</Text>
          </TouchableOpacity>
        )}
      />
          <View style={styles.cyclebuttonContainer}>
               <TouchableOpacity  onPress={() => navigation.navigate('PeriodLength')}>
               <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={['#ba67c7','#8c2353']} style={styles.cycleskipbutton} >
               <Text style={styles.cycleskiptext}>Skip</Text>
               </LinearGradient>
             </TouchableOpacity>
                 <TouchableOpacity  onPress={() => navigation.navigate('PeriodLength')}>
               <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={['#ba67c7','#8c2353']} style={styles.cycleconfirmbutton} >
               <Text style={styles.cycleconfirmtext}>Confirm</Text>
               </LinearGradient>
             </TouchableOpacity>
               </View>
    </View>
       </LinearGradient>
  );
}