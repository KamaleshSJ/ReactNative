import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View ,Dimensions, SafeAreaView, Platform ,ImageBackground} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import images from '@/constants/images';

//import { Button } from '@react-navigation/elements';




 function ReliefsScreen() {
  const router = useRouter();
    const screenHeight= Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

const cards = [
  { title: "What's in the Bag", icon: images.InsideBag, route: '/(main)/(periodtracking)/insidethebag' },
  { title: 'Food & Nutrition', icon: images.FoodNutrition, route: '/(main)/(periodtracking)/foodnutritionscreen' },
  { title: 'Daily Routine', icon: images.DailyRoutine, route: '/(main)/(periodtracking)/dailyroutinescreen' },
  { title: 'Self-Care Tip', icon: images.SelfCare, route: '/(main)/(periodtracking)/selfcaretipscreen' },
  { title: 'Safety Notes', icon: images.SafetyNote, route: '/(main)/(periodtracking)/safetynotescreen' },
  { title: 'To Avoid', icon: images.ToAvoid, route: '/(main)/(periodtracking)/toavoidscreen' },
];


  return (
   <SafeAreaView>
    <View>
     <LinearGradient style={{width:screenWidth,height:screenHeight}} colors={['#d2b4e4','#ffffff','#ffffff','#ffffff','#ffffff']} >
          <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.push('/(main)/(periodtracking)/(tabs)')}
          className='pl-4 pt-20 font-bold'
        />
         <View  className='pl-5 pr-5'>
       

        <View className='bg-transparent' style={styles.cardContainer}>
          {cards.map((card, index) => (
            
              <ImageBackground 
              key={index}
              style={styles.card}
              source={require ('@/assets/images/curve-rectangle.png')}
              >
                       <Image source={card.icon} className='-mt-8 '   style={styles.icon} />
              <Text className='items-start' style={styles.cardTitle}>{card.title}</Text>
              <TouchableOpacity onPress={() => router.push(card.route as any)} className='bg-fuchsia-700' style={styles.viewButton}>
                <Text style={styles.viewText}>view</Text>
              </TouchableOpacity>
              </ImageBackground>
             
            
          ))}
        </View>
      </View>

      <View style={styles.bottomBar}>
        <Icon name="calendar" size={rf(3)} color="#000" />
        <Icon name="chart-bar" size={rf(3)} color="#000" />
        <TouchableOpacity style={styles.centerButton}>
          <Icon name="plus" size={rf(3)} color="#fff" />
        </TouchableOpacity>
        <Icon name="spa" size={rf(3)} color="#000" />
        <Icon name="account" size={rf(3)} color="#000" />
      </View>

       
    
    </LinearGradient>
   </View>
   </SafeAreaView>
  );
}



export default ReliefsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
  backButton: {
    marginTop: rh(2),
    marginBottom: rh(1),
    alignSelf: 'flex-start',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    
  },
  card: {
    width: rw(42),
    height:rh(20),
   
    
   
    padding: rw(2),
    marginVertical: rh(3),
    alignItems: 'center',
    
    
  },
  icon: {
    marginBottom: rh(1),
    color:'purple'
    
    
  },
  cardTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: rf(2),
    textAlign: 'center',
    marginTop:rh(1),
    marginBottom: rh(2),
  },
  viewButton: {
   
    borderRadius: rw(2),
    paddingHorizontal: rw(4),
    paddingVertical: rh(0.6),
  },
  viewText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: rf(1.6),
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    height: rh(8),
    backgroundColor: '#f5f5f5',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  centerButton: {
    backgroundColor: '#b452d9',
    padding: rw(4),
    borderRadius: 50,
    marginTop: Platform.OS === 'ios' ? -rh(3) : -rh(4),
  },




});
