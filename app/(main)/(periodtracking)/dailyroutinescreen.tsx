import React from 'react';
import { ScrollView,View,Image, StyleSheet, Text,Dimensions, SafeAreaView ,ImageBackground} from 'react-native';
import InfoCard from '@/components/infocard';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { rS, rV } from '@/styles/responsive';

const DailyRoutineScreen = () => {


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

<ScrollView className='pt-4' contentContainerStyle={styles.container}>
       <View className='items-center pr-1 pt-1 justify-center' style={styles.profileCircle}>
                 <Image
                   source={require('@/assets/images/routine.png')} // Replace with your icon
                   style={styles.icon}
                   resizeMode="contain"
                 />
               </View>
      <Text style={styles.header}> Daily Routine</Text>

      <InfoCard title="Morning Routine" items={[
        'Wake Up Slowly',
        'Warm Water or Herbal Tea',
        'Nutritious Breakfast',
        'Warm Shower'
      ]} />

      <InfoCard title="Daytime Routine" items={[
        'Light Movement or Exercise',
        'Stay Prepared',
        'Stay Hydrated',
        'Balanced Meals & Snacks'
      ]} />

      <InfoCard title="Evening Routine" items={[
        'Rest and Relaxation',
        'Light Dinner',
        'Good Sleep Hygiene'
      ]} />

      <InfoCard title="Extra Tips" items={[
        'Track your symptoms in a period tracker',
        'Listen to your body: rest when needed, don’t push too hard.',
        'Keep a small journal for your mood, flow, and self-care wins.'
      ]} />
    </ScrollView>

          </LinearGradient>
      
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
      
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#8E2DAE',
    alignSelf: 'center'
  },
   profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: 'white',
    
    alignSelf:'center',
    marginBottom: 10,
    elevation: 4,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default DailyRoutineScreen;
