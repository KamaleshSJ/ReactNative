import { rMS, rS, rV } from '@/styles/responsive';
import { Text, View } from 'react-native';

type TabIcon = {
  Icon: any;
  name?: string;
  style?: any;
};

const TabIcon = ({ Icon, name, style }: TabIcon) => {
  const isJSXIcon = typeof Icon === 'object' && Icon?.type;

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        },
        style,
      ]}
    >
      {isJSXIcon ? (
        Icon // Render JSX icon like <Ionicons />
      ) : (
        <Icon
          style={{ width: rS(30), height: rV(30), tintColor: '#888' }}
          resizeMode="contain"
        />
      )}
      {name && (
        <Text
          style={{
            fontSize: rMS(8),
            marginTop: rMS(4),
            color: '#000',
            textAlign: 'center', // Center text
            width: '100%', // Take full width
          }}
          numberOfLines={1} // Prevent text from wrapping
          // ellipsizeMode="tail" // Add ellipsis if text is too long
        >
          {name}
        </Text>
      )}
    </View>
  );
};

export default TabIcon;
