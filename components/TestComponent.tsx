import { View, Text } from 'react-native';
import LOGO from '@/assets/images/image1.svg';
import GifImage from '@/assets/images/image.gif';
import { Image } from 'expo-image';
import LOGOGIF from '@/assets/images/image1.svg';

const TestComponent = () => {
  return (
    <View>
      <Text>TestComponent</Text>
      {/* <Image source={IMG} width={200} height={200} /> */}
      <View>
        <LOGO width={500} height={500} />
      </View>

      <Image
        source={GifImage}
        style={{ width: 400, height: 400 }}
        contentFit="contain"
        priority="high"
        transition={1000}
      />
    </View>
  );
};
export default TestComponent;
