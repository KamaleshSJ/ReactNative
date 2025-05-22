import React from 'react';
import { ScrollView, StyleSheet, Text,Dimensions,View,Image,ImageBackground, SafeAreaView } from 'react-native';
import InfoCard from '@/components/infocard';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { rS, rV } from '@/styles/responsive';

const SelfCareTipScreen = () => {

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
                                                 source={require('@/assets/images/selfcare.png')} // Replace with your icon
                                                 style={styles.icon}
                                                 resizeMode="contain"
                                               />
                                             </View>
       
       <Text style={styles.header}> Self-Care Tip</Text>

       <InfoCard title="Take a Warm Bath or Shower" items={[
         'A warm bath helps relax cramps, ease tension, and improve your mood.',
         'Add a few drops of lavender or eucalyptus oil for a calming effect.'
       ]} />

       <InfoCard title="Practice Gentle Yoga or Stretching" items={[
         'Light movement improves blood flow and reduces discomfort.',
         'Try poses like Child’s Pose, Cat-Cow, or Reclining Twist.'
       ]} />

       <InfoCard title="Breathe & Meditate" items={[
         'Deep breathing or a short guided meditation can ease anxiety and emotional swings.',
         'Just 5–10 minutes can help you feel centered and calmer.'
       ]} />

       <InfoCard title="Get Plenty of Rest" items={[
       'Your body uses more energy during your period — listen to it and rest when needed.',
         'Take short naps or go to bed earlier.'
       ]} />
     </ScrollView>
                  </LinearGradient>
        
       </SafeAreaView>

    // 
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

export default SelfCareTipScreen;