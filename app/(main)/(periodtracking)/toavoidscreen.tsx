import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image ,Dimensions, SafeAreaView,ImageBackground} from 'react-native';
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


const avoidData = [
  {
    title: 'Avoid Junk Food & Sugary Snacks',
    content: [
      'Can increase bloating, cramps, and mood swings.',
      'Choose whole, healthy foods instead.'
    ]
  },
  {
    title: 'Avoid Too Much Caffeine',
    content: [
      'Increases anxiety, causes dehydration, and may make cramps worse.',
      'Limit coffee, energy drinks, and strong tea.'
    ]
  },
  {
    title: 'Don’t Ignore Rest',
    content: [
      'Overworking or skipping sleep makes fatigue and cramps worse.',
      'Your body needs extra rest during your period.'
    ]
  },
  {
    title: 'Don’t Take Unprescribed Medicine',
    content: [
      'Avoid painkillers or hormonal pills without proper guidance.',
      'Overuse can cause side effects or hide serious symptoms.'
    ]
  },
  {
    title: 'Avoid Tight Clothing',
    content: [
      'Can increase discomfort, bloating, and even cause rashes.',
      'Wear loose, breathable clothes during your cycle.'
    ]
  }
];

const ToAvoidScreen = () => {

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
                    <View className='pl-1 pt-2' style={styles.profileCircle}>
                      <Image
                        source={require('@/assets/images/toavoid.png')} // Replace with your icon
                        style={styles.icon}
                        resizeMode="contain"
                      />
                    </View>

      <View style={styles.header}>
        {/* <Image source={require('../assets/warning_icon.png')} style={styles.icon} /> */}
        <Text style={styles.title}>To Avoid</Text>
      </View>

      {avoidData.map((item, index) => (
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

export default ToAvoidScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    paddingHorizontal: wp('2%'),
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
    padding: wp('5%'),
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
});
