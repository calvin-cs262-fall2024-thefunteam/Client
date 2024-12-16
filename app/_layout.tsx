import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import {
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import { UserProvider } from "../components/UserContext";
import React from "react";

// LogoTitle now receives the `isGuest` state as a prop
function LogoTitle() {
  const router = useRouter();

  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.image}
        source={require("@/assets/images/eventSphere.png")}
      />
    </View>
  );
}
// LogoTitle now receives the `isGuest` state as a prop
function HelpInfo({ isGuest }) {
  const router = useRouter(); // Access the router for navigation

  return (
    <View style={styles.logoContainer}>
      <Pressable onPress={() => router.navigate("/help")}>
        <Image
          style={styles.helpIcon}
          source={require("../assets/images/helpIcon.png")} // Replace with your help icon image
        />
      </Pressable>
    </View>
  );
}

// RootLayout component
export default function RootLayout() {
  const [isGuest, setIsGuest] = useState(true); // Assuming the user is a guest by default
  const router = useRouter();

  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "maroon",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <LogoTitle />
            </View>
          ),
          headerBackTitleVisible: false,
          // headerRight: () => (
          //   <Pressable onPress={() => router.push("/calendar")}>
          //     <Ionicons name="calendar" size={24} color="maroon" style={styles.calendarIcon} />
          //   </Pressable>
          // ),
        }}
      >
        {/* Add more screens as needed */}
      </Stack>
    </UserProvider>
  );
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Align items to the start (left)
    flex: 1,
    marginLeft: -60, // Add some margin to the left
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 40,
    resizeMode: "contain",
  },
  calendarIcon: {
    marginRight: 10, // Add some margin to the right
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.95,
    backgroundColor: "white",
    height: "auto",
  },
  text: {
    fontSize: 20,
    color: "maroon",
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  helpIcon: {
    width: 24, // Adjusted for better visibility
    height: 24,
    marginRight: 10, // Optional: Spacing for better layout
  },
});
