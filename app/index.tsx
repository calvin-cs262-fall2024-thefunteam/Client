import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

export default function Welcome() {
  const router = useRouter();

  const handleSignUp = async () => {
    router.replace("/signup"); // Navigate to the signup form page
  };

  const handleLogin = async () => {
    router.replace("/loginForm"); // Navigate to the login form page
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  createAccountButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  createAccountButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  guestButton: {
    backgroundColor: "#f0ad4e",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  guestButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});