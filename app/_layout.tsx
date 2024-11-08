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
import Login from "../app/login";
import EventDetailsScreen from "./eventDetails";

function LogoTitle() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.replace("/")}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/eventSphere.png")}
          />
        </View>
      </Pressable>

      {/* Login button in the top-right corner */}
      <View style={styles.loginContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function RootLayout() {
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
        headerTitle: () => <LogoTitle />, // Use the custom header component
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="EventDetails" options={{ title: "Event Details" }} />
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
