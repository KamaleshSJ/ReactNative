import React from 'react';
import { ScrollView, StyleSheet, Text,Dimensions,View,Image, SafeAreaView,ImageBackground } from 'react-native';
import InfoCard from '@/components/infocard';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { rS, rV } from '@/styles/responsive';

 


const FoodNutritionScreen = () => {
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

<ScrollView contentContainerStyle={styles.container}>

   <View style={styles.profileCircle}>
            <Image
              source={require('@/assets/images/Cutlery.png')} // Replace with your icon
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
       
      <Text style={styles.header}> Food & Nutrition</Text>

      <InfoCard title="Fruits" items={[
        'Bananas – reduce bloating & cramps (high in potassium)',
        'Berries – rich in antioxidants, help with mood',
        'Watermelon, cucumber – keep you hydrated'
      ]} />

      <InfoCard title="Vegetables" items={[
        'Spinach, kale, broccoli – full of iron & magnesium (helps fight fatigue)',
        'Sweet potatoes – great for energy and digestion'
      ]} />

      <InfoCard title="Nuts & Seeds" items={[
        'Almonds, walnuts, pumpkin seeds – reduce pain and support hormone balance',
        'Flaxseeds – anti-inflammatory and good for digestion'
      ]} />

      <InfoCard title="Healthy Proteins" items={[
        'Eggs, chicken, tofu, or fish (like salmon) – help repair body cells and balance blood sugar',
        'Lentils & beans – rich in iron and protein for vegetarians'
      ]} />

      <InfoCard title="Herbal Teas" items={[
        'Chamomile – calms the body and reduces cramps',
        'Ginger tea – helps with nausea and inflammation'
      ]} />

      <InfoCard title="Bonus Tips" items={[
        'Eat small, frequent meals to keep energy stable.',
        'Focus on iron-rich foods to replace lost blood.'
      ]} />
    </ScrollView>
          </LinearGradient>
      
    </SafeAreaView>

    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop:25
   
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
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginBottom: 10,
    elevation: 4,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default FoodNutritionScreen;