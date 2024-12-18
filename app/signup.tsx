/**
 * SignUp component allows users to create a new account with a username, password, 
 * and confirm password. It validates the input and hashes the password before sending
 * a request to the server to create the user.
 * 
 * @component
 * @example
 * return <SignUp />;
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
import axios from "axios";
import * as Crypto from 'expo-crypto';

/**
 * The SignUp component for the EventSphere app.
 * 
 * This component allows users to sign up by providing their name, username, 
 * password, and confirmation of password. It validates the input fields, hashes the password, 
 * and sends a request to the server to create a new user account.
 * 
 * @component
 * @example
 * return <SignUp />;
 */
export default function SignUp() {
  const [username, setUsername] = useState(""); // The state for the username
  const [password, setPassword] = useState(""); // The state for the password
  const [confirmPassword, setConfirmPassword] = useState(""); // The state for the confirm password
  const [name, setName] = useState(""); // The state for the user's name
  const router = useRouter(); // Used for navigation between screens

  /**
   * Handles the user sign-up process by validating the input fields and 
   * sending the request to the server to create the user.
   * 
   * @async
   * @param {string} hashedPassword - The SHA256 hashed password to store for the new user.
   * @returns {Promise<void>} Resolves when the sign-up request is complete.
   */
  const handleSignUp = async (hashedPassword: string) => {
    // Validate if all fields are filled and if passwords match
    if (username && password && confirmPassword) {
      if (password === confirmPassword && password.length >= 8) {
        try {
          const response = await axios.post("https://eventsphere-web.azurewebsites.net/users", {
            Accountname: username,
            password: hashedPassword,
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
        router.replace("/loginForm"); // Redirect to login screen after sign-up
      } else {
        Alert.alert("Error", "Passwords do not match or are less than 8 characters.");
      }
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  /**
   * Navigates the user back to the login screen.
   * 
   * @returns {void}
   */
  const handleBackToLogin = () => {
    router.replace("/loginForm"); // Redirect to the login page
  };

  /**
   * Hashes the entered password using SHA256 before sending it for sign-up.
   * The password will be hashed with Crypto.digestStringAsync.
   * 
   * @async
   * @returns {Promise<void>} Resolves when the password is hashed and sign-up is attempted.
   */
  const hashpassword = async() => {  // add salt in future
    console.log("hashing password");
    const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
    console.log(digest);
    handleSignUp(digest); // Pass the hashed password to handleSignUp
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
        textContentType="password"
        autoComplete="off"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        textContentType="password"
        autoComplete="off"
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={hashpassword}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Back to Login Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
        <Text style={styles.backButtonText}>Already have an account? Log in</Text>
      </TouchableOpacity>

      {/* For Testing Purposes */}
      {/* <TouchableOpacity style={styles.signUpButton} onPress={hashpassword}>
        <Text style={styles.signUpButtonText}>Hash Password</Text>
      </TouchableOpacity> */}
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
