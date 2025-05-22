import React from 'react';
import { View, Text, Image } from 'react-native';
import { Header } from '@/components';
import images from '@/constants/images';
import { rMS, rS, rV } from '@/styles/responsive';

const NoNotification = () => {
  return (
    <View className="flex-1 bg-white">
      <Header title="No Notification" menu={true} />

      <View
        className="items-center justify-center"
        style={{ marginTop: rV(50), paddingHorizontal: rMS(20) }}
      >
        {/* Main Image */}
        <images.Group1 width={rS(250)} height={rV(250)} />

        {/* Message Text */}
        <Text
          style={{
            fontSize: rMS(20),
            color: '#B91C1C',
            marginVertical: rMS(24),
            textAlign: 'center',
          }}
        >
          You have no notification!
        </Text>

        {/* Wave Image at Bottom */}
        <View style={{ marginTop: rV(100) }}>
          <images.waveimage width={rS(550)} height={rV(300)} />
        </View>
      </View>
    </View>
  );
};

export default NoNotification;
