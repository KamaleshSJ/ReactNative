// import React from 'react';
// import { Pressable, StyleProp, ViewStyle, PressableProps } from 'react-native';
// // import Config from '../Config';

// interface Props extends PressableProps {
//   style?: StyleProp<ViewStyle>;
//   touchOpacity?: number;
// }

// const MyPressable: React.FC<Props> = ({
//   style,
//   android_ripple = { color: 'lightgrey' },
//   touchOpacity = 0.4,
//   children,
//   ...restOfProps
// }) => {
//   return (
//     <Pressable
//       // style={({ pressed }) => [
//       //   style,
//       //   { opacity: !Config.isAndroid && pressed ? touchOpacity : 1 },
//       // ]}
//       android_ripple={android_ripple}
//       {...restOfProps}
//     >
//       {children}
//     </Pressable>
//   );
// };

// export default MyPressable;

import React from 'react';
import {
  Pressable,
  StyleProp,
  ViewStyle,
  PressableProps,
  GestureResponderEvent,
} from 'react-native';

interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
  touchOpacity?: number;
}

const MyPressable: React.FC<Props> = ({
  style,
  android_ripple = { color: 'lightgrey' },
  touchOpacity = 0.4,
  children,
  ...restOfProps
}) => {
  return (
    <Pressable
      android_ripple={android_ripple}
      {...restOfProps}
      style={({ pressed }) => [
        style,
        {
          opacity: pressed ? touchOpacity : 1,
        },
      ]}
    >
      {children}
    </Pressable>
  );
};

export default MyPressable;
