import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View ,Dimensions} from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RootStackParamList } from '@/constants/interface';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';

type Props = NativeStackScreenProps<RootStackParamList, 'LastPeriod'>;

export default function LastPeriodScreen({ navigation }: Props) {
  const [date, setDate] = useState<Date | null>(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
    const router = useRouter();
    const screenHeight= Dimensions.get('window').height;
          const screenWidth = Dimensions.get('window').width;

  return (
    <LinearGradient className='h-full' colors={['#d2b4e4','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff']} style={{}}>
       <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.push('/(main)/(periodtracking)/periodlengthscreen')}
          className='pl-4 pt-20 font-bold'
        />
      <View className='pl-10 pt-10' style={{}}>
        <View style={{}}>
           <MaskedView
                                 className=''
                                  maskElement={
                                    <Text className="text-2xl font-bold ">
                                      Almost done. When did your last period start?
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
                                      Almost done. When did your last period start?
                                    </Text>
                                    
                                  </LinearGradient>
                                </MaskedView>
        
          <Text style={{}}>If you're irregular or not sure , tap 'Not Sure'</Text>
          <View className='pt-8 mr-6' style={{}}>
            <Calendar
              markedDates={{
                '2025-05-10': { startingDay: true, color: '#E9C3F1', textColor: 'white' },
                '2025-05-11': { color: '#E9C3F1', textColor: 'white' },
                '2025-05-12': { endingDay: true, color: '#E9C3F1', textColor: 'white' },
              }}
              markingType={'period'}
            />
          </View>
        </View>
        <View className='flex flex-row justify-center items-center pt-20' style={{
          width:screenWidth*.82
        }}>
          <TouchableOpacity onPress={() => router.push('/(main)/(periodtracking)/(tabs)')}>
            <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={['#ba67c7','#8c2353'] } className='w-40 items-center skip  pt-4 pb-4 mr-12' style={{
              borderRadius:20,
            }} >
              <Text className='text-white text-lg' style={{}}>Not Sure</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={{}} onPress={() => router.push('/(main)/(periodtracking)/(tabs)')}>
            <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={['#ba67c7','#8c2353']} className='w-40 items-center  skip pt-4 pb-4 ' style={{borderRadius:20}}>
              <Text className='text-white text-lg' style={{}}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isPickerVisible}
          mode="date"
          onConfirm={(selectedDate: Date) => {
              setDate(selectedDate);
              setPickerVisible(false);
            }}
          onCancel={() => setPickerVisible(false)}
        />
      </View>
    </LinearGradient>
  );
}


// const styles = StyleSheet.create({
//   gradientContainer: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'space-between',
//     paddingBottom: 20,
//   },
//   contentArea: {

//   },
//   label:{
//     fontSize:30,
//     paddingLeft:50,
//     marginTop:150,
//     marginBottom:10,
//     fontWeight:'bold',
//   },
//   notsure:{
//     paddingLeft:50,
//     marginTop:0,
//     fontSize:18,
//     marginBottom: 30,
//   },
//   calendarContainer: {
//      paddingHorizontal: 16,
//   },
//   lpbuttonContainer : {
//     display:'flex',
//     flexDirection:'row',
//     justifyContent:'space-around',
//     marginTop: 30,
//   },
//   notsurebutton:{
//     borderRadius:15,
//   },
//   notsuretext:{
//     paddingLeft:50,
//     paddingRight:50,
//     paddingTop:15,
//     paddingBottom:15,
//     color:'white',
//     fontWeight:'bold',
//     fontSize:20
//   },
//   confirmbutton:{
//     borderRadius: 15,
//   },
//   confirmtext:{
//     paddingLeft:50,
//     paddingRight:50,
//     paddingTop:15,
//     paddingBottom:15,
//     color:'white',
//     fontWeight:'bold',
//     fontSize:20
//   },
// });