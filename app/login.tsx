import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/signup"); // Navigate to the signup form page
  };

  const handleLogin = () => {
    router.push("/loginForm"); // Navigate to the login form page
  };

  const handleContinueAsGuest = () => {
    router.push("/home"); // Navigate to the home screen directly as a guest
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to EventSphere</Text>
      <Text style={styles.subtitle}>
        Create an account with us and experience seamless event planning.
      </Text>

      {/* Create Account Button */}
      <TouchableOpacity style={styles.createAccountButton} onPress={handleSignUp}>
        <Text style={styles.createAccountButtonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign in as Guest Button */}
      <TouchableOpacity style={styles.guestButton} onPress={handleContinueAsGuest}>
        <Text style={styles.guestButtonText}>Sign in as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 40,
  },
  createAccountButton: {
    backgroundColor: "#4A6DF7",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  createAccountButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    borderWidth: 1,
    borderColor: "#4A6DF7",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: "80%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#4A6DF7",
    fontSize: 16,
    fontWeight: "bold",
  },
  guestButton: {
    borderWidth: 1,
    borderColor: "#4A6DF7",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  guestButtonText: {
    color: "#4A6DF7",
    fontSize: 16,
    fontWeight: "bold",
  },
});
