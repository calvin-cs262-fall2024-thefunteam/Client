/**
 * Login component allows users to log in, sign up, or continue as a guest.
 * It handles user authentication by verifying account credentials against
 * the server and storing the user’s information in context.
 * 
 * @component
 * @example
 * return <Login />;
 */

// Import React and necessary modules from React Native
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
import * as Crypto from 'expo-crypto';

/**
 * The Login component for the EventSphere app.
 * 
 * This component includes the functionality to log in, sign up, or continue as a guest.
 * It uses `Crypto` to hash the password before making an API request for authentication.
 * It navigates between the login, signup, and home screens based on user actions.
 * 
 * @component
 * @example
 * return <Login />;
 */
export default function Login() {
  const [accountName, setAccountName] = useState(""); // The state for the account name
  const [password, setPassword] = useState(""); // The state for the password
  const router = useRouter(); // Used for navigation between screens
  const { userID, setUserID, username, setUsername } = useUser(); // Access user context for state management

  /**
   * Handles the login process by sending the hashed password and account name to the server.
   * If login is successful, the user is redirected to the home screen and their user data is saved.
   * 
   * @async
   * @param {string} hashedPassword - The SHA256 hashed password to authenticate the user.
   * @returns {Promise<void>} Resolves when the login is complete.
   */
  const handleLogin = async (hashedPassword: string) => {
    const response = await fetch(`https://eventsphere-web.azurewebsites.net/users/${accountName}/${hashedPassword}`);
    if (!response.ok) {
      Alert.alert("Error", "Invalid credentials");
    }
    const userData = await response.json();
    console.log(userData);
    console.log(userData.accountname);
    if (userData && userData.accountname === accountName && userData.password === hashedPassword) {
      console.log("Logged in successfully");
      setUserID(userData.id); // Set the user ID in the context
      setUsername(userData.accountname); // Set the username in the context
      router.replace("/(tabs)/home"); // Navigate to the home screen
    }
  };

  /**
   * Navigates the user to the sign-up screen.
   * 
   * @returns {void}
   */
  const handleSignUp = () => {
    router.replace("/signup"); // Navigate to the signup screen
  };

  /**
   * Allows the user to continue as a guest and navigates to the home screen.
   * 
   * @returns {void}
   */
  const handleContinueAsGuest = () => {
    router.replace("/(tabs)/home"); // Navigate to the home screen without login
  };

  /**
   * Hashes the entered password using SHA256 before sending it for login.
   * The password will be hashed with Crypto.digestStringAsync.
   * 
   * @async
   * @returns {Promise<void>} Resolves when the password is hashed and login is attempted.
   */
  const hashpassword = async() => {  // add salt in future
    console.log("hashing password");
    const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
    console.log(digest);
    handleLogin(digest); // Pass the hashed password to handleLogin
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
      <TouchableOpacity style={styles.loginButton} onPress={hashpassword}>
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
