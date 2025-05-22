import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

WebBrowser.maybeCompleteAuthSession();

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    photo?: string;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

export const useGoogleAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID',
    webClientId: 'YOUR_WEB_CLIENT_ID', // From Google Cloud Console
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        handleGoogleSignIn(authentication.accessToken);
      }
    }
  }, [response]);

  const handleGoogleSignIn = async (accessToken: string) => {
    setLoading(true);
    setError(null);

    try {
      // Send the access token to your backend
      const { data } = await axios.get<AuthResponse>(
        `${process.env.EXPO_PUBLIC_API_URL}/google/callback`,
        {
          params: { access_token: accessToken },
          // or use headers: { Authorization: `Bearer ${accessToken}` }
        }
      );

      // Store the JWT token securely
      await SecureStore.setItemAsync('jwt', data.token);

      // Set user data
      setUser(data.user);

      return data.user;
    } catch (err) {
      console.error('Google auth error:', err);
      setError('Failed to authenticate with Google');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync('jwt');
      setUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
      setError('Failed to sign out');
    }
  };

  const checkAuthStatus = async () => {
    try {
      const token = await SecureStore.getItemAsync('jwt');
      if (token) {
        // Verify token with backend if needed
        const { data } = await axios.get<User>(
          `${process.env.EXPO_PUBLIC_API_URL}/auth/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(data);
      }
    } catch (err) {
      console.error('Auth check error:', err);
      await SecureStore.deleteItemAsync('jwt');
    }
  };

  return {
    user,
    error,
    loading,
    promptAsync,
    signOut,
    checkAuthStatus,
    isReady: request !== null,
  };
};
