import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";

// LogoTitle now receives the `isGuest` state as a prop
function LogoTitle({ isGuest }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.navigate("/")}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.image}
            source={require("@/assets/images/eventSphere.png")}
          />
        </View>
      </Pressable>
    </View>
  );
}

export default function RootLayout() {
  const [isGuest, setIsGuest] = useState(true); // Assuming the user is a guest by default

  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: "maroon",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitle: () => <LogoTitle isGuest={isGuest} />, // Pass `isGuest` to LogoTitle
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="login" options={{ headerTitle: false }} />
      <Stack.Screen name="signup" options={{ headerTitle: false }} />
      {/* Add more screens as needed */}
    </Stack>
  );
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.95,
    backgroundColor: "white",
    height: "auto",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 40,
    marginRight: 10,
    padding: 5,
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
    marginRight: 50,
  },
  loginButton: {
    backgroundColor: "maroon",
    paddingVertical: 6, // Adjusted for better sizing
    paddingHorizontal: 16, // Adjusted for better sizing
    borderRadius: 5,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
