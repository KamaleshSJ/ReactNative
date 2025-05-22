import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image,Dimensions, SafeAreaView ,ImageBackground} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import { rS, rV } from '@/styles/responsive';


const WhatsInTheBagScreen = () => {

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

           <ScrollView  contentContainerStyle={{}}>
           
      {/* Profile Circle */}
      <View style={styles.header}>
        <View style={styles.profileCircle}>
          <Image
            source={require('@/assets/images/bagicon.png')} // Replace with your icon
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.headerTitle}>What's in the Bag</Text>
      </View>

      {/* Section Cards */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Menstrual Products</Text>
        <Text style={styles.bullet}>• 2–4 Sanitary pads</Text>
        <Text style={styles.bullet}>• 1–2 Panty liners</Text>
        <Text style={styles.bullet}>• 1 Menstrual cup (if used)</Text>
        <Text style={styles.bullet}>• 1–2 Tampons</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Hygiene Items</Text>
        <Text style={styles.bullet}>• Hand sanitizer</Text>
        <Text style={styles.bullet}>• Tissue or toilet paper</Text>
        <Text style={styles.bullet}>• Feminine wipes (unscented, gentle)</Text>
        <Text style={styles.bullet}>• Extra underwear</Text>
        <Text style={styles.bullet}>• Zip-lock or disposable bag (for used/stained items)</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Backup Clothing</Text>
        <Text style={styles.bullet}>• Spare leggings, pants, or shorts</Text>
        <Text style={styles.bullet}>• Spare underwear or period panties</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Optional but Helpful</Text>
        <Text style={styles.bullet}>• Small period guide (for younger girls)</Text>
        <Text style={styles.bullet}>• Essential oil roller (lavender or peppermint for relaxation)</Text>
        <Text style={styles.bullet}>• Mini pouch to organize items inside the bag</Text>
        <Text style={styles.bullet}>• Reusable Pad or Cloth Pad (as backup)</Text>
      </View>
           </ScrollView>
   
    </LinearGradient> 
   </SafeAreaView>
    
    
    
  );
};

export default WhatsInTheBagScreen;


const styles = StyleSheet.create({
  
  
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
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
  icon: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8E2DAE',
  },
  card: {
    backgroundColor: '#F2D5FB',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#8E2DAE',
  },
  bullet: {
    fontSize: 14,
    color: '#3E3E3E',
    marginBottom: 4,
  },
});
