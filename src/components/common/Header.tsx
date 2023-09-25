import React, { PropsWithChildren } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HeaderPros = PropsWithChildren & { title: string; };

export const Header: React.FC<HeaderPros> = ({ title }) => {
  const insets = useSafeAreaInsets();

  const safeArea = {
    marginTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right
  };

  return (
    <View
      style={StyleSheet.flatten([styles.container])}
    >
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    elevation: 40,
    height: 60,
    justifyContent: 'center',
    // paddingTop: 15,

    position: 'relative',
    shadowColor: '#0e0d0d',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,

    // ...Platform.select({
    //   ios: {
    //     shadowColor: '#0e0d0d',
    //     shadowOffset: { width: 0, height: 10 },
    //     shadowOpacity: 0.1,
    //     paddingTop: 15
    //   },
    //   android: {
    //     elevation: 2
    //   }
    // })

  },
  text: {
    fontSize: 20
  }
});

export default Header;
