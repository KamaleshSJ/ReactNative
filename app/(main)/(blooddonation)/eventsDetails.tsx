import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { rMS } from '@/styles/responsive';
import React, { useState } from 'react';
import images from '@/constants/images';

export default function EventDetailsScreen() {
    const [showFullText, setShowFullText] = useState(false);

    const shortText = "Join us for the Annual Event Blood Drive 2024, a life-saving initiative dedicated to supporting hospitals and patients in need...";
    const fullText = "Join us for the Annual Event Blood Drive 2024, a life-saving initiative dedicated to supporting hospitals and patients in need. This event will bring together passionate individuals, healthcare workers, and community members to donate blood, raise awareness, and make a real difference. Participants will receive certificates and refreshments. Your contribution can help save lives and support medical emergencies. Don't miss this opportunity to make an impact!";

    return (
        <View className="flex-1 bg-white">
            {/* Header Image */}
            <View className="relative">
                <Image
                    source={require('@/assets/images/eventsimages/Rectangle 539.png')}
                    style={{
                        width: '100%',
                        height: rMS(280),
                    }}
                />

                {/* Top Buttons */}
                <View style={{ position: 'absolute', top: rMS(16), left: rMS(16), flexDirection: 'row', gap: rMS(10) }}>
                    <TouchableOpacity className="bg-white rounded-full" onPress={()=>{}}>
                        <View style={{ padding: rMS(12), borderRadius: rMS(50) }} className="bg-lightrose">
                            <Ionicons name="chevron-back" size={rMS(22)} color="#840000" />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ position: 'absolute', top: rMS(16), right: rMS(16), flexDirection: 'row', gap: rMS(10) }}>
                    <TouchableOpacity className="bg-white rounded-full">
                        <View style={{ padding: rMS(12), borderRadius: rMS(50) }} className="bg-lightrose">
                            <Ionicons name="share-social" size={rMS(22)} color="#840000" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-white rounded-full">
                        <View style={{ padding: rMS(12), borderRadius: rMS(50) }} className="bg-lightrose">
                            <Ionicons name="heart" size={rMS(22)} color="#840000" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Title */}
                <View style={{ position: 'absolute', top: rMS(130), left: rMS(20) }}>
                    <Text style={{ fontSize: rMS(28) }} className="text-white font-rubik-bold">Annual Event</Text>
                    <Text style={{ fontSize: rMS(18) }} className="text-white font-rubik">Blood Drive</Text>
                    <Text style={{ fontSize: rMS(18) }} className="text-white font-rubik">2024</Text>
                </View>
            </View>

            {/* Content */}
            <View style={{ flex: 1, marginTop: -rMS(40), borderTopLeftRadius: rMS(50), borderTopRightRadius: rMS(50) }} className="bg-white">
                <View style={{ flex: 1, paddingHorizontal: rMS(20), paddingTop: rMS(50), borderTopLeftRadius: rMS(50), borderTopRightRadius: rMS(50) }} className="bg-lightrose">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={{ fontSize: rMS(20) }} className="text-red font-rubik-semibold  ">
                            Annual Event Blood Drive 2024
                        </Text>
                        <Text style={{ fontSize: rMS(14), marginTop: rMS(-1) }} className="text-gray-600  font-rubik">
                            Organized by: Lifesavers Foundation
                        </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: rMS(1), gap: rMS(8), flexWrap: 'wrap' }}>
                            <Ionicons name="location" size={rMS(16)} color="#840000" />
                            <Text style={{ fontSize: rMS(12) }} className="text-gray-500 font-rubik">New York, USA</Text>
                            <Ionicons name="time" size={rMS(16)} color="#840000" style={{ marginLeft: rMS(12) }} />
                            <Text style={{ fontSize: rMS(12) }} className="text-gray-500 font-rubik">May 28 - 10:00PM</Text>
                        </View>

                        {/* Overview */}
                        {/* <View style={{ marginTop: rMS(24) }}>
              <Text style={{ fontSize: rMS(16) }} className="text-red font-rubik-semibold">Event Overview</Text>
              <Text style={{ fontSize: rMS(13), marginTop: rMS(4), width: '90%' }} className="text-gray-500 font-rubik">
                Join us for the Annual Event Blood Drive 2024, a life-saving initiative dedicated to supporting hospitals and patients in need...{' '}
                <Text className="text-red font-rubik">view more</Text>
              </Text>
            </View> */}
                        <View style={{ marginTop: rMS(24) }}>
                            <Text style={{ fontSize: rMS(16) }} className="text-red font-rubik-semibold">
                                Event Overview
                            </Text>
                            <Text
                                style={{ fontSize: rMS(13), marginTop: rMS(4), width: '90%' }}
                                className="text-gray-500 font-rubik"
                            >
                                {showFullText ? fullText : shortText}{' '}
                                <Text
                                    className="text-red font-rubik"
                                    onPress={() => setShowFullText(!showFullText)}
                                >
                                    {showFullText ? 'view less' : 'view more'}
                                </Text>
                            </Text>
                        </View>
                        {/* Organizer */}
                        <View style={{ marginTop: rMS(24) }}>
                            <Text style={{ fontSize: rMS(16) }} className="text-red font-rubik-semibold">Organizer</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: rMS(12) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={{ uri: 'https://i.pravatar.cc/100?img=10' }}
                                        style={{
                                            width: rMS(50),
                                            height: rMS(50),
                                            borderRadius: rMS(25),
                                            marginRight: rMS(12),
                                        }}
                                    />
                                    <View>
                                        <Text style={{ fontSize: rMS(14) }} className="font-rubik-semibold">Lifesavers Foundation</Text>
                                        <Text style={{ fontSize: rMS(12) }} className="text-gray-700 font-rubik">Saturday, May 28, 2024</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', gap: rMS(12) }}>
                                    <TouchableOpacity style={{ padding: rMS(10), borderRadius: rMS(50) }} className="bg-red">
                                        <Ionicons name="call" size={rMS(20)} color="#E3C2C2" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ padding: rMS(10), borderRadius: rMS(50) }} className="bg-red">
                                        <Ionicons name="chatbubble-ellipses" size={rMS(20)} color="#E3C2C2" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* Address */}
                        <View style={{ marginTop: rMS(24) }} className='flex flex-row'>
                            <View>
                                <Text style={{ fontSize: rMS(16) }} className="text-red font-rubik-semibold">Address</Text>
                                <Text style={{ fontSize: rMS(12), marginTop: rMS(4) }} className="text-gray-500 font-rubik">
                                    Date: Saturday, August 17, 2024
                                </Text>
                                <Text style={{ fontSize: rMS(12) }} className="text-gray-500 font-rubik">
                                    Time: 9:00 AM – 5:00 PM
                                </Text>
                                <Text style={{ fontSize: rMS(12) }} className="text-gray-500 font-rubik">
                                    City Community Hall, 45 Grand Avenue, Springfield
                                </Text>
                            </View>
                            <Text style={{ fontSize: rMS(12), marginTop: rMS(8), right: rMS(10) }} className="text-red font-rubik ">View on map</Text>
                        </View>

                        {/* Footer */}
                        <View style={{
                            borderTopWidth: 3,
                            opacity: 10,
                            
                            borderColor: '#f3cccc',
                            marginTop: rMS(20),
                            paddingVertical: rMS(20),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }} className=''>
                            <Text style={{ fontSize: rMS(13), width: '55%' }} className="text-red font-rubik-medium">
                                Be the reason someone smiles today{' '}
                                <FontAwesome name="smile-o" size={rMS(14)} color="#840000" />
                            </Text>
                            <TouchableOpacity style={{
                                paddingVertical: rMS(10),
                                paddingHorizontal: rMS(20),
                                borderRadius: rMS(10),
                            }} className="bg-red">
                                <Text style={{ fontSize: rMS(14) }} className="text-white font-rubik-semibold">Register Now!</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}
