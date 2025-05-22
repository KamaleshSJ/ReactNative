import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image,Dimensions,ImageBackground, } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import { rS, rV } from '@/styles/responsive';
import { SafeAreaView } from 'react-native-safe-area-context';

 

const safetyData = [
  {
    title: 'Maintain Personal Hygiene',
    content: [
      'Change your pad, tampon, or cup every 4–6 hours (sooner if needed).',
      'Always wash hands before and after changing period products.'
    ]
  },
  {
    title: 'Dispose of Products Properly',
    content: [
      'Wrap used pads/tampons in paper or a disposal bag.',
      'Never flush them — it can clog toilets.'
    ]
  },
  {
    title: 'Wear Breathable Underwear',
    content: [
      'Use clean, cotton underwear to prevent moisture buildup and rashes.',
      'Change your underwear daily (or twice if needed).'
    ]
  },
  {
    title: 'Stay Hydrated',
    content: [
      'Drink plenty of water to reduce bloating and fatigue.',
      'Helps your body flush toxins and manage mood swings.'
    ]
  }
];

const SafetyNotesScreen = () => {

     const router = useRouter();
                    const screenHeight= Dimensions.get('window').height;
                    const screenWidth = Dimensions.get('window').width;
                    
  return (
    <SafeAreaView>
             <LinearGradient style={{width:screenWidth,height:screenHeight}} colors={['#d2b4e4','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff']} >
               <ImageBackground
                               source={require('@/assets/images/back.png')}
                               resizeMode="contain"
                               imageStyle={{ width:screenWidth,
                                 height:rV(360),
                                 opacity:0.5,
                                }}
                       />
               
                       <Ionicons
                            
                         name="arrow-back"
                         size={24}
                         color="black"
                         onPress={() => router.push('/(main)/(periodtracking)/(tabs)/reliefs')}
                         className='pl-4 pt-20 font-bold'
                       /> 
<ScrollView style={styles.container}>
        
     <View className='pt-4' style={styles.header}>
            <View className='' style={styles.profileCircle}>
              <Image
                source={require('@/assets/images/safetynote.png')} // Replace with your icon
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
   
      <View style={styles.header}>
        {/* <Image source={require('../assets/heart_icon.png')} style={styles.icon} /> */}
        <Text style={styles.title}>Safety Notes</Text>
      </View>

      {safetyData.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          {item.content.map((line, i) => (
            <Text key={i} style={styles.cardText}>• {line}</Text>
          ))}
        </View>
      ))}
      </View>
    </ScrollView>
             </LinearGradient>
         
    </SafeAreaView>
    
  );
};

export default SafetyNotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingHorizontal: wp('5%'),
  },
  backButton: {
    marginTop: hp('5%'),
  },
  header: {
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  icon: {
    width: wp('15%'),
    height: wp('15%'),
    resizeMode: 'contain',
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: '600',
    marginTop: 8,
    color: '#8E2DAE',
  },
  card: {
    backgroundColor: '#F2D5FB',
    borderRadius: 12,
    padding: wp('4%'),
    marginBottom: hp('2%'),
    elevation: 3,
  },
  cardTitle: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#8E2DAE',
    marginBottom: 5,
  },
  cardText: {
    fontSize: RFValue(12),
    color: '#333',
    lineHeight: 22,
  },
    profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 4,
  },
  // icon: {
  //   width: 40,
  //   height: 40,
  // },
});
