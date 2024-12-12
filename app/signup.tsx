import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    // Validate if all fields are filled and if passwords match
    if (username && password && confirmPassword) {
      if (password === confirmPassword && password.length >= 8) {
        try {
          const response = await axios.post("https://eventsphere-web.azurewebsites.net/users", {
            Accountname: username,
            password: password,
            name: name,
          });
          if (response.status === 201) {
            Alert.alert("Success", "User created successfully");
            router.replace("/loginForm"); // Navigate to the login form page
          }
        } catch (error) {
          console.error("Error creating user:", error);
          Alert.alert("Error", "Failed to create user");
        }
        router.replace("/loginForm"); // Redirect to home screen after sign-up
      } else {
        Alert.alert("Error", "Passwords do not match or are less than 8 characters.");
      }
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  const handleBackToLogin = () => {
    router.replace("/loginForm"); // Redirect to the login page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        textContentType="username"
        autoComplete="username"
        
      />

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
        textContentType="none"
        autoComplete="off"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        textContentType="none"
        autoComplete="off"
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Back to Login Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
        <Text style={styles.backButtonText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8, // Rounded corners
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9", // Subtle input background
    fontSize: 16,
    color: "#333",
  },
  signUpButton: {
    backgroundColor: "#4A6DF7",
    borderRadius: 25,  // Make the button more round
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
    alignItems: "center",
  },
  signUpButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
    alignItems: "center",
  },
  backButtonText: {
    color: "#4A6DF7",
    fontSize: 16,
    fontWeight: "bold",
  },
});
