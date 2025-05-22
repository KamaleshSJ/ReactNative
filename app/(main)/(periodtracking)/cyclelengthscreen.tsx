import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View,Dimensions } from 'react-native';
import { RootStackParamList } from '@/constants/interface';
import { useRouter } from 'expo-router';
import MaskedView from '@react-native-masked-view/masked-view';
import { rMS, rS, rV } from '@/styles/responsive';
import { Ionicons } from '@expo/vector-icons';



type Props = NativeStackScreenProps<RootStackParamList, 'CycleLength'>;

const days = [21,22,23,24,25,26, 27, 28, 29, 30,31];

export default function CycleLengthScreen() {
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();
  const screenHeight= Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
  
  return (

    <LinearGradient className='' colors={['#d2b4e4','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff']} style={{width:screenWidth,height:screenHeight}}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.push('/(main)/(periodtracking)/namescreen')}
          className='pl-4 pt-20 font-bold'
        />
          <View className='items-start pt-32 pl-10 ' >
               <MaskedView
                 className=''
                  maskElement={
                    <Text className="text-2xl font-bold ">
                      Your average Cycle Length?
                    </Text>
                  }
                >
                  <LinearGradient
                    colors={['#ba67c7', '#7928ca']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className=''
                    
                  >
                    <Text className="opacity-0 text-4xl font-bold ">
                      Your average Cycle Length?
                    </Text>
                  </LinearGradient>
                </MaskedView>
      
      <FlatList
      
       data={days}
  
       keyExtractor={(item) => item.toString()}
       
       renderItem={({ item }) => (
    <TouchableOpacity
      className="w-full items-center  justify-center"
      onPress={() => setSelected(item)}
      style={[
        selected === item && {
          backgroundColor: '#d2b4e4',
          borderRadius: 10,
        
        },
      ]}
    >
      <Text className="text-2xl p-1 font-semibold">{item} days</Text>
    </TouchableOpacity>
  )}
  className="mt-10 "
  style={{ maxHeight: rV(200) ,
    
    width:rS(290)
   }} // OR use a fixed height like 300
  contentContainerStyle={{ paddingBottom: 50 }}
  showsVerticalScrollIndicator={false}
/>

          <View className='flex flex-row justify-center items-center pt-28 ' style={{
            width:screenWidth*0.82
          }}>
               <TouchableOpacity  onPress={() => router.push('/(main)/(periodtracking)/periodlengthscreen')}>
               <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={['#ba67c7','#8c2353']}  className='w-40 items-center skip  pt-4 pb-4 mr-12 ' style={{
              borderRadius:20,
            }} >
               <Text className=' text-white text-lg'>Skip</Text>
               </LinearGradient>
             </TouchableOpacity>

                 <TouchableOpacity  onPress={() => router.push('/(main)/(periodtracking)/periodlengthscreen')}>
               <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={['#ba67c7','#8c2353']} className='w-40 items-center  skip pt-4 pb-4 ' style={{borderRadius:20}} >
               <Text className=' text-white text-lg'>Confirm</Text>
               </LinearGradient>
             </TouchableOpacity>

               </View>
    </View>
       </LinearGradient>
  );
}


// const styles = StyleSheet.create({
//   cyclelengthcontainer:{ height:900, },
//   label:{
//     fontSize:30,
//     paddingLeft:50,
//     marginTop:150,
//     marginBottom:50,
//     fontWeight:'bold',
//   },
//   item: {
//     padding: 15, borderRadius: 10, marginVertical: 1 , alignItems:'center',
//   },
//   cycletext:{
//     fontSize:20, fontWeight:'bold',
//   },
//   selected: {
//     backgroundColor: '#E9C3F1', width:300, marginLeft:45,
//   },
//   cyclebuttonContainer : {
//     display:'flex', flexDirection:'row', justifyContent:'space-around', marginBottom:270,
//   },
//   cycleskipbutton:{ borderRadius: 15, },
//   cycleskiptext:{
//     paddingLeft:60, paddingRight:60, paddingTop:15, paddingBottom:15,
//     color:'white', fontWeight:'bold', fontSize:20
//   },
//   cycleconfirmbutton:{ borderRadius: 15, },
//   cycleconfirmtext:{
//     paddingLeft:50, paddingRight:50, paddingTop:15, paddingBottom:15,
//     color:'white', fontWeight:'bold', fontSize:20
//   },
// });