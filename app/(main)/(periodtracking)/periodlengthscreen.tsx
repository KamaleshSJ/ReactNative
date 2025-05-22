import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View ,Dimensions} from 'react-native';
import { RootStackParamList } from '@/constants/interface';
import { useRouter } from 'expo-router';
import { rS, rV } from '@/styles/responsive';
import { Ionicons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';



type Props = NativeStackScreenProps<RootStackParamList, 'PeriodLength'>;

const days = [1, 2, 3, 4, 5, 6, 7,8,9,10]; 

export default function PeriodLengthScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();
  
   const screenHeight= Dimensions.get('window').height;
      const screenWidth = Dimensions.get('window').width;
    

  return (
    <LinearGradient colors={['#d2b4e4','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff']} >
       <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.push('/(main)/(periodtracking)/cyclelengthscreen')}
          className='pl-4 pt-20 font-bold'
        />
    <View className='h-full pl-10 pt-32' style={{}}>
       <MaskedView
                       className=''
                        maskElement={
                          <Text className="text-2xl font-bold ">
                            Your average Period Length?
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
                            Your average Period Length?
                          </Text>
                          
                        </LinearGradient>
                      </MaskedView>
                      <Text className='-mt-10 pb-6'>If you're irregular or not sure ,tap "Not Sure"</Text>
     <FlatList
     
       data={days}
       keyExtractor={(item) => item.toString()}
       renderItem={({ item }) => (
         <TouchableOpacity
           className="w-full items-center justify-center"
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
       className="mt-10" 
       style={{ maxHeight: rV(200) , 
         
         width:rS(300)
        }} // OR use a fixed height like 300
       contentContainerStyle={{ paddingBottom: 30 }}
       showsVerticalScrollIndicator={false}
     />
      <View className='flex flex-row items-center justify-center pt-28' style={{
        width:screenWidth*0.82
      }}>
        <TouchableOpacity  onPress={() => router.push('/(main)/(periodtracking)/lastperiodscreen')}>
              <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={['#ba67c7','#8c2353']}  className='w-40 items-center skip  pt-4 pb-4 mr-12' style={{
              borderRadius:20,
            }} >
              <Text className='text-white text-lg' style={{}}>Not Sure</Text>
              </LinearGradient>
            </TouchableOpacity>
        <TouchableOpacity  onPress={() => router.push('/(main)/(periodtracking)/lastperiodscreen')}>
              <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={['#ba67c7','#8c2353']} className='w-40 items-center  skip pt-4 pb-4 ' style={{borderRadius:20}}>
              <Text className='text-white text-lg' style={{}}>Confirm</Text>
              </LinearGradient>
            </TouchableOpacity>
      </View>
    </View>
    </LinearGradient>
  );
}


// const styles = StyleSheet.create({
//   periodlengthcontainer:{ height:900, },
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
//   plbuttonContainer : {
//     display:'flex', flexDirection:'row', justifyContent:'space-around', marginBottom:200,
//   },
//   plconfirmbutton:{ borderRadius: 15, },
//   confirmtext:{
//     paddingLeft:50, paddingRight:50, paddingTop:15, paddingBottom:15,
//     color:'white', fontWeight:'bold', fontSize:20
//   },
// });