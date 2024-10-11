import { Stack, useRouter } from "expo-router";
import { Text, Image, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

function LogoTitle() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.image}
          source={{ uri: 'https://media.istockphoto.com/id/1424054284/vector/circle-logo-digital-target-round-shape-swirl-orbit-loop-globe.jpg?s=612x612&w=0&k=20&c=qYvxFX0MXms9H6lDeKwMT21F9z__K3JW6smm-ePmpz8=' }}
        />
        <Text style={styles.text}>EventSphere</Text>
      </View>
      <View style={styles.loginContainer}>
      <TouchableOpacity style={styles.loginButton} onPress={() => router.replace('/login')}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity></View>
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
      }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="index" />
    </Stack>
  );
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    height: 'auto',
    paddingHorizontal: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#168af0',
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