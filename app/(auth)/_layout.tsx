import { Stack } from 'expo-router';
const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="Login" options={{ headerShown: false }} />
    </Stack>
  );
};
export default AuthLayout;
