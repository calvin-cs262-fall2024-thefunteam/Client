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
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await axios.post("https://eventsphere-web.azurewebsites.net/users", {
        Accountname: accountName,
        password: password,
        name: name,
      });
      if (response.status === 201) {
        Alert.alert("Success", "User created successfully");
        router.push("/loginForm"); // Navigate to the login form page
      }
    } catch (error) {
      console.error("Error creating user:", error);
      Alert.alert("Error", "Failed to create user");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.get(`https://eventsphere-web.azurewebsites.net/users/${accountName}/${password}`);
      const userData = response.data;
      if (userData && userData.Accountname === accountName && userData.password === password) {
        Alert.alert("Success", "Login successful");
        router.push("/home"); // Navigate to the home screen
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Error", "Failed to log in");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to EventSphere</Text>
      <Text style={styles.subtitle}>
        Create an account with us and experience seamless event planning.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Account Name"
        value={accountName}
        onChangeText={setAccountName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

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