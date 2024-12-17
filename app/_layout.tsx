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
import AntDesign from '@expo/vector-icons/AntDesign';

// LogoTitle now receives the `isGuest` state as a prop
function LogoTitle() {
  const router = useRouter();

  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.image}
        source={require("@/assets/images/eventSphere.png")}
      />
      <Pressable onPress={() => router.push("/help")}><AntDesign style={styles.questionIcon} name="questioncircleo" size={24} color="black" /></Pressable>
    </View>
  );
}

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
    justifyContent: "space-between", // Align items to the start (left) and end (right)
    flex: 1,
    marginLeft: -60, // Add some margin to the left
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  image: {
    width: 150,
    height: 40,
    resizeMode: "contain",
  },
  questionIcon: {
    marginRight: 0, // Add some margin to the right
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
});