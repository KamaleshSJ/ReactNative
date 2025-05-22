import { RootStackParamList } from '@/app/App';
import '@/app/global.css';
import { periodTrackerStyles as styles } from '@/src/styles/periodtrackerStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Name'>;

export default function NameScreen({ navigation }: Props) {
  const [name, setName] = useState('');

  return (
    <LinearGradient  colors={['#E9C3F1','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff']} >
         <View style={styles.namecontainer}>
      <Text style={styles.label} className='name'>What's your Name?</Text>
      <TextInput  style={styles.input}  placeholder="Enter Your Name" placeholderTextColor='#d6d6d6' value={name} onChangeText={setName} />
      <View style={styles.buttonContainer}>
      <TouchableOpacity  onPress={() => navigation.navigate('CycleLength')}>
      <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={['#ba67c7','#8c2353']} style={styles.skipbutton}>
      <Text style={styles.skiptext}>Skip</Text>
      </LinearGradient>
    </TouchableOpacity>
        <TouchableOpacity  onPress={() => navigation.navigate('CycleLength')}>
      <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={['#ba67c7','#8c2353']} style={styles.confirmbutton} >
      <Text style={styles.confirmtext}>Confirm</Text>
      </LinearGradient>
    </TouchableOpacity>
      </View>
    </View>
    </LinearGradient>
  );
}