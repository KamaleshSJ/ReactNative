import { generateDatesAroundToday } from '@/utils/dateUtlis';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'; // Added NavigationProp import
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { rS, rV ,rMS} from '@/styles/responsive';
import { RootStackParamList } from '@/constants/interface'; // Import your RootStackParamList type
import CircularDatePicker from '@/components/circle';
import { BlurView } from 'expo-blur';

import MoodSlider from '@/components/mood';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const itemWidth = 60;
const BOTTOM_NAV_HEIGHT = 60; // Note: Your BottomNav style uses 70, consider aligning this

export const PeriodTrackerScreen = () => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(3);
  const scrollRef = useRef<ScrollView>(null);
  const dates = generateDatesAroundToday();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Typed the navigation hook
  const router = useRouter();

  useEffect(() => {
    
    const todayIndex = dates.findIndex(d => d.fullDate === selectedDate);
    if (todayIndex !== -1 && scrollRef.current) {
      const scrollX = todayIndex * itemWidth - screenWidth / 2 + itemWidth / 2;
      setTimeout(() => {
        scrollRef.current?.scrollTo({ x: scrollX, animated: true });
      }, 100);
    }
  }, [selectedDate]);

  const screenHeight= Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  return (
    <View >
      <LinearGradient className='h-full' colors={['#ffffff','#ffffff','#d2b4e4']} style={{width:screenWidth,height:screenHeight}}>
        <View style={[ ]}>
          <View className='flex-row pl-6 pt-6 ' style={{}}>
            
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  source={
                    profileImageUri ? { uri: profileImageUri } : require('@/assets/images/sam.webp')
                  }
                  style={{
                    width:rS(60),
                    height:rV(55),
                    borderRadius:rMS(50),
                  }}
                />
              </TouchableOpacity >
              <View className='pl-4 pt-4' style={{}}>
                <Text className='font-bold' style={{}}>Samantha K</Text>
                <Text style={{}}>
                  Status: <Text className='font-bold text-fuchsia-800' style={{}}>Period</Text>
                </Text>
              </View>
            
            <TouchableOpacity onPress={() => router.push('/(main)/(periodtracking)/notificationscreen')}>
              <MaterialCommunityIcons className='pl-44 pt-6' name="bell" size={24} color={styles.bellIcon?.color || 'black'} />
            </TouchableOpacity>
          </View>

          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableWithoutFeedback  onPress={() => setModalVisible(false)}>
              <View className='w-full h-full ' style={{
                width:screenWidth ,
                 height:screenHeight,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                 }}>
                <TouchableWithoutFeedback>
                  <View className='items-center justify-center' style={{width:screenWidth,height:screenHeight}}>
                    <Image
                      source={
                        profileImageUri
                          ? { uri: profileImageUri }
                          : require('@/assets/images/sam.webp')
                      }
                      className='w-96 h-96 rounded-full '
                      style={{
                        width:screenWidth*.82
                      }}
                      resizeMode="cover"
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <ScrollView
            className='pt-4'
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            contentContainerStyle={{ paddingHorizontal: (screenWidth - itemWidth) / 2 }}
          >
            {dates.map(({ day, date, fullDate }) => (
              <TouchableOpacity
                key={fullDate}
                onPress={() => setSelectedDate(fullDate)}
                
                style={[
                  styles.dateItem,
                  selectedDate === fullDate ? styles.dateItemSelected : styles.dateItemDefault,
                ]}
              >
                <Text style={styles.dateItemDayText}>{day}</Text>
                <Text style={styles.dateItemDateText}>{date}</Text>
                <View
                  style={[
                    styles.dateItemDot,
                    selectedDate === fullDate ? styles.dateItemDotSelected : null,
                  ]}
                    />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View className=' pt-36 w-full items-center ' style={{
            width:screenWidth
          }}>
            <CircularDatePicker initialDay={selectedDay} />
          </View>

          <View className='mt-36  ' style={{
               width: '85%',
               height: rV(130),
               backgroundColor: 'rgba(143, 116, 183,1)' ,
               alignSelf:'center',
               borderRadius:rMS(15),
               paddingLeft:rS(10),
               paddingTop:rV(15)
          }}>
              
                  
                      <Text style={styles.opiniontext}>Normalize Periods {'\n'}Celebrate {'\n'}Strength.</Text>
                       <TouchableOpacity onPress={() => alert('Will Create This Page Soon')}>
                           <LinearGradient className='pt-3 pb-3' start={{x:0,y:0}} end={{x:1,y:1}} colors={['#8c2353','#ba67c7']} style={styles.opinionbutton} >
                               <Text style={styles.opinionbuttontext}>Write Something</Text>
                           </LinearGradient>
                       </TouchableOpacity>
                  
                  <Image source={require('../../../../assets/images/purplegirl1.avif')} style={styles.purplegirlimage}></Image>
              
          </View>

          <View style={styles.twoCardsContainer}>

            <LinearGradient colors={['rgba(140, 35, 83, 0.75)','rgba(186, 103, 199, 0.25)']} 
            className='items-center justify-center'
            style={{width: '48%',
    
               borderRadius:rMS(15)}} >
              <View className='pl-5 ' style={{}}>
                 <Text className='' style={styles.feelingText}>How are you {'\n'}Feeling today?</Text>
                 <TouchableOpacity  onPress={() => alert('Will Create This Page Soon')}>
                    <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={['#8c2353','#ba67c7']} className='mt-2' style={styles.symptomsButton} >
                      <Text className='' style={styles.symptomstext}>Symptoms</Text>
                    </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>

            <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} className='items-center justify-center' colors={['rgba(186, 103, 199, 0.75)','rgba(140, 35, 83, 0.75)']} style={{ width: '48%',
    
              borderRadius:rMS(15),}} >
              <View style={{}}>
                <MoodSlider/>
              </View>
            </LinearGradient>
          </View>
        </View>

       
      </LinearGradient>
    </View>
  );
};

export default PeriodTrackerScreen;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: BOTTOM_NAV_HEIGHT + 10,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
  },
  modalRoundedImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  ptcontainer:{
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  profileTextContainer: {
    justifyContent: 'center',
  },
  profileNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileStatusText: {
    fontSize: 14,
    color: '#555',
  },
  profileStatusPeriodText: {
    color: '#a855f7',
    fontWeight: 'bold',
  },
  bellIcon: {
    fontSize: 24,
    color: '#a855f7',
  },
  dateItem: {
    width: itemWidth,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom:8,
    borderColor:'#7c2687',
  },
  dateItemDefault: {
    backgroundColor: 'white',
    borderColor: '#eee',
  },
  dateItemSelected: {
    backgroundColor: '#e9d5ff',
    borderColor: '#a855f7',
  },
  dateItemDayText: {
    fontSize: rMS(12),
    color: '#555',
  },
  dateItemDateText: {
    fontSize: rMS(24),
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  dateItemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d1d5db',
    marginTop: 4,
  },
  dateItemDotSelected: {
    backgroundColor: '#a855f7',
  },
  circularDatePickerContainer: {
    height: 280,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 70,
    marginVertical: 15,
  },
  twoCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'85%',
    height:rV(110),
    alignSelf:'center',
    paddingTop:rV(10)
  },
  opinioncard:{
    width: '92%',
    minHeight: 150,
    backgroundColor: 'rgba(143, 116, 183, 0.75)' ,
    alignSelf:'center',
    borderRadius:15,
    marginTop: -70,
    marginBottom: 30,
    overflow: 'hidden',
  },
  opinionCardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
  },
  opinionTextButtonContainer: {
      flex: 1,
      marginRight: 10,
  },
  opiniontext:{
    color:'white',
    fontSize: 18,
    fontWeight:'bold',
    marginBottom: 8,
  },
  opinionbutton:{
    width: rS(150),
    
    
    borderRadius:rMS(12),
    alignItems: 'center',
  },
  opinionbuttontext:{
    fontSize:rMS(14),
    color:'white',
    fontWeight:'bold',
    alignItems:'center',
  },
  purplegirlimage:{
    width:100,
    height:100,
    borderRadius:15,
  },
  
  
  feelingText: {
    fontSize: rMS(17),
    fontWeight: 'bold',
    color: 'white',
    
    
  },
  symptomsButton: {
    width: 90,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius:15,
    alignItems: 'center',
  },
  symptomstext:{
    color:'white',
    fontWeight:'bold',
    fontSize:12,
  },
 
  
}); 