import { Stack, useRouter } from "expo-router";
import { Text, Image, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Login from "../app/login";

function LogoTitle() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/logo2.png')}
        />
        <Text style={styles.text}>EventSphere</Text>
      </View>
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
    width: '100%',
    backgroundColor: 'white',
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
    padding: 5,
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