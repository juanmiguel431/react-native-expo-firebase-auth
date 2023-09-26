import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getReactNativePersistence,
  signOut,
  AuthError, User
} from 'firebase/auth';
import type { Auth } from 'firebase/auth';

import ReactNativeAsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';

import { Header } from './components/common';
import LoginForm from './components/LoginForm';
import { Button, Text } from '@rneui/themed';
import { User as LocalUser } from './models/user';

const App: React.FC = () => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const app = initializeApp({
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
    });

    // const auth = getAuth(app);

    //https://stackoverflow.com/questions/76914913/cannot-import-getreactnativepersistence-in-firebase10-1-0
    const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });

    auth.onAuthStateChanged((user) => {
      const isLoggedIn = !!user;
      setUser(user);
      setLoggedIn(isLoggedIn);
    });

    setAuth(auth);

  }, []);

  const onSubmit = useCallback(async (user: LocalUser) => {
    if (!auth) return false;

    try {
      setLoading(true);
      setErrorMessage('');

      const userCredential = await signInWithEmailAndPassword(auth, user.username, user.password);
      const loggedUser = userCredential.user;
      return true;
    } catch (loginErr) {
      const authLoginError = loginErr as AuthError;

      try {
        const newUserCredential = await createUserWithEmailAndPassword(auth, user.username, user.password);
        const newUser = newUserCredential.user;
        return true;
      } catch (createErr) {
        if (createErr instanceof Error) {
          const authCreateError = createErr as AuthError;

          if (authCreateError.code === 'auth/email-already-in-use') {
            setErrorMessage(authLoginError.message);
          } else {
            setErrorMessage(createErr.message);
          }
        }

        return false;
      }
    } finally {
      setLoading(false);
    }
  }, [auth]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>
        <Header title="Authentication"/>
        {loggedIn ? (
          <View>
            <Text h4>Hello {user?.email}</Text>
            <Button title="Logout" onPress={async () => {
              if (!auth) return;

              try {
                setLoading(true);
                await signOut(auth);
                setUser(null);
                setLoggedIn(false);
              } catch (e) {
              } finally {
                setLoading(false);
              }

            }}/>
          </View>
        ) : (
          <>
            <LoginForm
              isLoading={loading}
              onSubmit={onSubmit}
            />
            {errorMessage &&
              <Text style={styles.error}>{errorMessage}</Text>
            }
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  error: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 20
  }
});

export default App;
