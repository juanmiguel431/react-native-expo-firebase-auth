import { StyleSheet, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import React from 'react';

type ButtonProps = {
  onClick: () => void;
  title: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, title }) => {
  return (
    <TouchableOpacity onPress={onClick} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderColor: '#007aff',
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 5
  },
  text: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 10
  }
})

export default Button;
