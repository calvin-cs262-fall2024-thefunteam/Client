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
import { useUser } from "../components/UserContext";

export default function Login() {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { userID, setUserID, username, setUsername } = useUser();

  const handleLogin = async () => {
    try {
      const response = await fetch(`https://eventsphere-web.azurewebsites.net/users/${accountName}/${password}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const userData = await response.json();
      console.log(userData);

      console.log(userData.accountname);
      if (userData && userData.accountname === accountName && userData.password === password) {
        console.log("Logged in successfully");
        setUserID(userData.id); // Set the user ID in the context
        setUsername(userData.accountname);
        router.replace("/home"); // Navigate to the home screen
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Error", "Failed to log in");
    }
  };

  const handleSignUp = () => {
    router.replace("/signup"); // Navigate to the signup screen
  };

  const handleContinueAsGuest = () => {
    router.replace("/home"); // Navigate to the home screen without login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EventSphere Login</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={accountName}
        onChangeText={setAccountName}
        
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="none"
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Section */}
      <View style={styles.signUpSection}>
        <Text style={styles.firstTimeText}>First time user?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity
        onPress={() =>
          Alert.alert("Forgot Password", "Forgot password button pressed")
        }
      >
        <Text style={styles.customButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign in as Guest */}
      <TouchableOpacity onPress={handleContinueAsGuest}>
        <Text style={styles.customButtonText}>Sign in as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "white", // Consistent background
  },
  title: {
    fontSize: 28,
    marginBottom: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333", // Darker text for better readability
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
  loginButton: {
    backgroundColor: "#4A6DF7", // Vibrant blue
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  firstTimeText: {
    fontSize: 14,
    color: "#666",
    marginRight: 5,
  },
  signUpButton: {
    color: "#4A6DF7",
    textAlign: "center",
    fontWeight: "bold",
  },
  customButtonText: {
    color: "#999",
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 14,
  },
});
