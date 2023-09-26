import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { User } from '../models/user';
import { Spinner } from './common';

type LoginFormProps = {
  onSubmit: (user: User) => Promise<boolean>;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <Text h1>Login Form</Text>
      <Input
        label="Username"
        disabled={isLoading}
        placeholder="email@domain.com"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        label="Password"
        disabled={isLoading}
        textContentType="password"
        placeholder="******"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {!isLoading &&
        <Button
          title="Login"
          onPress={async () => {
            const onSuccess = await onSubmit({ username, password })
            if (onSuccess) {
              setUsername('');
              setPassword('');
            }
          }}
        />
      }
      <Spinner isLoading={isLoading}/>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;
