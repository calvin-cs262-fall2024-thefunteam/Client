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

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const router = useRouter();

  const handleSignUp = () => {
    // Validate if all fields are filled and if passwords match
    if (username && email && password && confirmPassword) {
      if (password === confirmPassword) {
        Alert.alert("Sign Up", `Username: ${username}, Email: ${email}`);
        // You can replace this with actual sign-up functionality (e.g., API call)
        router.replace("/home"); // Redirect to home screen after sign-up
      } else {
        Alert.alert("Error", "Passwords do not match.");
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
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
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
