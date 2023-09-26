import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type SpinnerProps = {
  isLoading?: boolean;
  size?: 'large' | 'small' | number;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'large', isLoading }) => {

  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});
