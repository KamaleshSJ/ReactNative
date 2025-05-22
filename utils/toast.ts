import Toast from 'react-native-toast-message';

export const showToast = (type: string, msg1: string, msg2: string) => {
  Toast.show({
    type: type,
    text1: msg1,
    text2: msg2,
    text1Style: { fontSize: 18 },
    text2Style: { fontSize: 16 },
  });
};
