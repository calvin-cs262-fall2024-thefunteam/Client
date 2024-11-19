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

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    Alert.alert("Login", `Username: ${username}, Password: ${password}`);
  };

  const handleSignUp = () => {
    router.replace("/signup");   // Redirect users to the Sing Up page
  }

  const handleContinueAsGuest = () => {
    router.replace("/home");        // Redirect the user to homepage as guest
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

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Section */}
      <View style={styles.signUpSection}>
        <Text style={styles.firstTimeText}>First time user?</Text>
        <TouchableOpacity
          onPress={handleSignUp}
        >
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

      {/* Continue as Guest */}
      <TouchableOpacity onPress={handleContinueAsGuest}>
        <Text style={styles.customButtonText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
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
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    marginBottom: 10,
  },
  firstTimeText: {
    fontSize: 14,
    color: "gray",
    marginRight: 5,
  },
  signUpButton: {
    color: "blue",
    textAlign: "center",
    fontWeight: "bold",
  },
  customButtonText: {
    color: "grey",
    textAlign: "center",
    paddingVertical: 10,
  },
});
