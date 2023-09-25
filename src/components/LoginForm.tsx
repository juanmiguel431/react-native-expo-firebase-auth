import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { User } from '../models/user';

type LoginFormProps = {
  onSubmit: (user: User) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <Text h1>Login Form</Text>
      <Input
        label="Username"
        placeholder="email@domain.com"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        label="Password"
        textContentType="password"
        placeholder="******"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Login"
        onPress={() => onSubmit({ username, password })}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;
