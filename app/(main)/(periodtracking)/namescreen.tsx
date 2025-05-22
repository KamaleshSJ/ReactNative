import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {  StyleSheet,Text, TextInput, TouchableOpacity, View ,Dimensions } from 'react-native';
import { RootStackParamList } from '@/constants/interface';
import { useRouter } from 'expo-router';
import { rS, rV,rMS } from '@/styles/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'Name'>;

export default function NameScreen() {
  const [name, setName] = useState('');
  const router = useRouter();
  const screenHeight= Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  return (
    <LinearGradient className='h-full' colors={['#d2b4e4', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']} style={''}>
       <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.push('/(main)/(periodtracking)/welcomescreen')}
          className='pl-4 pt-20 font-bold'
        />
      <View  className='items-start pt-32 pl-10 '  style={{height:screenHeight , width:screenWidth}}>
         <MaskedView
      maskElement={
        <Text className="text-3xl font-bold ">
          What's your Name?
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
          What's your Name?
        </Text>
      </LinearGradient>
    </MaskedView>
        <TextInput
          className=' mt-20  border rounded-md pr-52 pt-3 pb-3 opacity-15'
          style={{
          }}
          placeholder="    Enter Your Name"
          placeholderTextColor="black"
          
          value={name}
          onChangeText={setName}
        />
        <View className='flex flex-row items-center justify-center pt-80 ' style={{
         width:screenWidth*0.82
        }}>
          
          <TouchableOpacity className='' onPress={() => router.push('/(main)/(periodtracking)/cyclelengthscreen')}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#ba67c7', '#8c2353']} className='w-40 items-center skip  pt-4 pb-4 mr-12 ' style={{
              borderRadius:20,
            }}>
              <Text className=' text-white text-lg' style={''}>Skip</Text>

            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity  onPress={() => router.push('/(main)/(periodtracking)/cyclelengthscreen')}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#ba67c7', '#8c2353']} className='w-40 items-center  skip pt-4 pb-4 ' style={{borderRadius:20}}>
              <Text className=' text-white text-lg' style={''}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}



