import { RootStackParamList } from '@/app/App';
import { periodTrackerStyles as styles } from '@/src/styles/periodtrackerStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
   <LinearGradient colors={['#E9C3F1','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff']} >
     <View style={styles.welcomecontainer} >
      <Image source={require('../../assets/images/welcome_flower.png')} style={styles.welcomeimage} /> {/* Corrected path */}
       <TouchableOpacity  onPress={() => navigation.navigate('Name')}>
            <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={['#ba67c7','#8c2353']} style={styles.welcomebutton}>
            <Text style={styles.welcometext}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
    </View>
   </LinearGradient>
  );
}