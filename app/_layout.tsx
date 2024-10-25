import { Stack, useRouter } from "expo-router";
import { Text, Image, View, StyleSheet, TouchableOpacity, Dimensions, Pressable } from "react-native";
import Login from "../app/login";

function LogoTitle() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.replace('/')}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/logo2.png')}
        />
        <Text style={styles.text}>EventSphere</Text>
      </View>
      </Pressable>
      <View style={styles.loginContainer}>
      <TouchableOpacity style={styles.loginButton} onPress={() => router.replace('/login')}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

export default function RootLayout() {
  return (
    <Stack initialRouteName="login"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'maroon',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitle: () => <LogoTitle />, // Use the custom header component
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * .95,
    backgroundColor: 'white',
    height: 'auto',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: 'maroon',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'maroon',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 10,
  },
});