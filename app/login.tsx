// Import necessary modules from React and React Native
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router"; // Import useRouter for navigation

// Define the Login component
export default function Login() {
  // Define state variables to manage input fields
  const [username, setUsername] = useState(""); // Stores the username input
  const [password, setPassword] = useState(""); // Stores the password input

  // useRouter hook for navigation
  const router = useRouter();

  // Function to handle login
  const handleLogin = () => {
    // Show an alert with the entered username and password (placeholder logic)
    Alert.alert("Login", `Username: ${username}, Password: ${password}`);
  };

  // Function to handle "Continue as Guest" action
  const handleContinueAsGuest = () => {
    router.replace(""); // Redirects user to the home screen (empty route path)
  };

  return (
    <View style={styles.container}>
      {/* App Title */}
      <Text style={styles.title}>EventSphere Login</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Hides password input
      />

      {/* Login Button */}
      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin} />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={() => Alert.alert("Sign Up", "Sign up button pressed")}
      >
        <Text style={styles.signUpButton}>Sign Up</Text>
      </TouchableOpacity>

      {/* Forgot Password Button */}
      <TouchableOpacity
        onPress={() =>
          Alert.alert("Forgot Password", "Forgot password button pressed")
        }
      >
        <Text style={styles.customButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Continue as Guest Button */}
      <TouchableOpacity onPress={handleContinueAsGuest}>
        <Text style={styles.customButtonText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

// Define styling for the component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take full screen height
    justifyContent: "center", // Center content vertically
    paddingHorizontal: 20, // Add horizontal padding
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10, // Add padding for input text
  },
  button: {
    marginBottom: 20,
  },
  customButtonText: {
    color: "grey",
    textAlign: "center",
    paddingVertical: 10,
  },
  signUpButton: {
    color: "black",
    textAlign: "center",
    paddingVertical: 10,
  },
});
