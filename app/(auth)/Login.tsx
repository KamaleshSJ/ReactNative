import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

import images from '@/constants/images';
import Images from '@/constants/images';
import { router } from 'expo-router';
import { googleAuth } from '@/api/bloodDonation';

import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import Constants from 'expo-constants';
import * as AuthSession from 'expo-auth-session';

const BACKEND_URL = 'http://192.168.1.2:7003';
const redirectUri = 'myapp://Home';
// const redirectUri = Linking.createURL('/');

// const BACKEND_URL = Constants.expoConfig?.extra?.backendUrl;

import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';

// Helper function to send user data to backend
const sendToBackend = async (provider, token, userInfo) => {
  try {
    const res = await fetch(
      `https://your-backend-api.com/api/auth/${provider}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, userInfo }),
      }
    );

    const data = await res.json();
    if (data.success) {
      router.replace('/(main)/LoginUserDetails');
    } else {
      alert(`${provider} login failed`);
    }
  } catch (err) {
    console.error(`${provider} Auth Error:`, err);
  }
};

const LoginPage = () => {
  const [googlePressed, setGooglePressed] = useState(false);
  const [facebookPressed, setFacebookPressed] = useState(false);

  const [userInfo, setUserInfo] = useState<any>(null);

  const handleGoogleLogin = async () => {
    const authUrl = `${BACKEND_URL}/api/auth/google?redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;
    // Open the backend Google login route
    const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
    console.log(result);
    if (result.type === 'success') {
      // Extract token from URL
      const params = new URLSearchParams(result.url.split('?')[1]);
      const token = params.get('token');
      const userJson = params.get('user');
      const user = userJson ? JSON.parse(decodeURIComponent(userJson)) : null;
      // Optional: parse returned URL or query params if needed
      console.log('Login success:', result.url);
      // You could also extract token if appended in URL
    } else {
      console.log('Login cancelled or failed:', result.type);
    }

    // const redirectUri = Linking.createURL('');
    // const authUrl = `${BACKEND_URL}/auth/google?redirect_uri=${encodeURIComponent(
    //   redirectUri
    // )}`;
    // const result = await AuthSession.startAsync({ authUrl });
    // if (result.type === 'success' && result.url) {
    //   // Extract the token from the URL
    //   const url = new URL(result.url);
    //   const token = url.searchParams.get('token');
    //   if (token) {
    //     Alert.alert('JWT Token Received!', token);
    //     // ✅ Save token securely using SecureStore or AsyncStorage
    //   } else {
    //     Alert.alert('Login failed', 'No token returned');
    //   }
    // } else {
    //   Alert.alert('Login cancelled or failed');
    // }
  };
  // Google Auth setup
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   iosClientId: "819826505341-633p5set9oqtp15k21nuadokngph3hun.apps.googleusercontent.com",
  //   androidClientId: "819826505341-633p5set9oqtp15k21nuadokngph3hun.apps.googleusercontent.com",
  //   webClientId:"819826505341-633p5set9oqtp15k21nuadokngph3hun.apps.googleusercontent.com",
  // });

  // Facebook Auth setup
  const [requestFB, responseFB, promptAsyncFB] = Facebook.useAuthRequest({
    clientId: '609735675448187',
  });

  // Handle Google login
  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { authentication } = response;
  //     fetchGoogleUserInfo(authentication?.accessToken);
  //   }
  // }, [response]);

  // const fetchGoogleUserInfo = async (token) => {
  //   try {
  //     const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const userInfo = await res.json();
  //     sendToBackend("google", token, userInfo);
  //   } catch (err) {
  //     console.error("Google Auth Error:", err);
  //   }
  // };

  // Handle Facebook login
  useEffect(() => {
    if (responseFB?.type === 'success') {
      const { authentication } = responseFB;
      fetchFacebookUserInfo(authentication?.accessToken);
    }
  }, [responseFB]);

  const fetchFacebookUserInfo = async (token: string) => {
    try {
      const res = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`
      );
      const userInfo = await res.json();
      sendToBackend('facebook', token, userInfo);
    } catch (err) {
      console.error('Facebook Auth Error:', err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center items-center px-6 py-2">
          {/* Logo and Welcome */}
          <View className="items-center mb-12">
            <Image
              source={images.loginlogo}
              className="w-[140px] h-[160px]"
              resizeMode="contain"
            />
            <Text className="text-3xl co font-bold text-red-700 mt-6">
              Welcome to Aayul
            </Text>
            <Text className="text-gray-600 mt-2">Sign in to continue</Text>
          </View>

          {/* Social Login Buttons */}
          <View className="w-full">
            {/* Google Button with Gradient Border */}
            <View
              className="w-full mb-4 rounded-lg overflow-hidden p-[2px]"
              style={{
                backgroundColor: 'transparent',
                backgroundImage: 'linear-gradient(to right, red, red2)',
              }}
            >
              <TouchableOpacity
                className={`flex-row items-center justify-center py-3 px-5 rounded-[14px]  border-red ${
                  googlePressed ? 'bg-red ' : 'bg-white border '
                }`}
                activeOpacity={1}
                onPress={handleGoogleLogin}
                // onPressIn={() => setGooglePressed(true)}
                // onPressOut={() => setGooglePressed(false)}
              >
                <View
                  className={`p-1 rounded-full ${
                    googlePressed ? 'bg-red ' : 'bg-white '
                  }`}
                >
                  {/* image */}
                  <Images.googleicon />
                </View>
                <Text
                  className={`font-semibold text-base ml-4 ${
                    googlePressed ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  Continue with Google
                </Text>
              </TouchableOpacity>
            </View>

            {/* Facebook Button */}
            <View className="w-full rounded-lg overflow-hidden p-[2px]">
              <TouchableOpacity
                className={`flex-row items-center justify-center py-3 px-5 rounded-[14px] border ${
                  facebookPressed ? 'bg-red' : 'bg-white border-red-500'
                }`}
                activeOpacity={1}
                onPressIn={() => setFacebookPressed(true)}
                onPressOut={() => setFacebookPressed(false)}
                onPress={() => promptAsyncFB()}
              >
                <View
                  className={`p-1 rounded-full ${
                    facebookPressed ? 'bg-red' : 'bg-white'
                  }`}
                >
                  <images.fbicon />
                </View>
                <Text
                  className={`font-semibold text-base ml-4 ${
                    facebookPressed ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  Continue with Facebook
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms */}
          <View className="mt-2 px-4">
            <Text className="text-gray-500 text-xs text-center">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </Text>

            <Text onPress={()=>router.replace('/(main)/LoginUserDetails')} className="text-gray-500 text-4xl text-center mt-2">Details</Text>
          </View>
        </View>
        <View className="relative right-36 top-16 ">
          <Images.waveimage resizeMode="stretch" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;
