import { Stack } from 'expo-router';
const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="Home" options={{ headerShown: false }} />
      <Stack.Screen name="LoginUserDetails" options={{ headerShown: false }} />
      <Stack.Screen name="Notification" options={{ headerShown: false }} />
      <Stack.Screen
        name="(blooddonation)"
        options={{ headerShown: false, animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="(periodtracking)"
        options={{ headerShown: false, animation: 'slide_from_bottom' }}
      />
    </Stack>
  );
};
export default _layout;
