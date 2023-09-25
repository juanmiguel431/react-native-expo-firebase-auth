import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getReactNativePersistence } from 'firebase/auth';
import type { Auth } from 'firebase/auth';

import ReactNativeAsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';

import { Header } from './components/common';
import LoginForm from './components/LoginForm';
import { Text } from '@rneui/themed';

const App: React.FC = () => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

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
    setAuth(auth);

  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>
        <Header title="Authentication"/>
        <LoginForm
          onSubmit={(user) => {
            if (!auth) return;

            signInWithEmailAndPassword(auth, user.username, user.password).then((userCredential) => {
              const user = userCredential.user;
              console.log('JMPC1', userCredential);
            }).catch((error) => {
              console.log(error);
              setErrorMessage(error.message)
            });

            // createUserWithEmailAndPassword(auth, user.username, user.password).then((userCredential) => {
            //   const user = userCredential.user;
            //
            // }).catch((error) => {
            //   const errorCode = error.code;
            //   const errorMessage = error.message;
            // });
          }}
        />
        {errorMessage &&
          <Text>{errorMessage}</Text>
        }
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
});

export default App;
