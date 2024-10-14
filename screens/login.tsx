import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Add your login logic here
    Alert.alert('Login', `Username: ${username}, Password: ${password}`);
  };

  const handleContinueAsGuest = () => {
    router.replace('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EventSphere Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <TouchableOpacity onPress={() => Alert.alert('Sign Up', 'Sign up button pressed')}>
        <Text style={styles.signhUpButton}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Forgot password button pressed')}>
        <Text style={styles.customButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleContinueAsGuest}>
        <Text style={styles.customButtonText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    marginBottom: 20,
  },
  customButtonText: {
    color: 'grey',
    textAlign: 'center',
    paddingVertical: 10,
  },
  signhUpButton: {
    color: 'black',
    textAlign: 'center',
    paddingVertical: 10,  
  },
});