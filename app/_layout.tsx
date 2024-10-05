import { Stack } from "expo-router";
import { Text, Image, View, StyleSheet } from "react-native";

function LogoTitle() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: 'https://media.istockphoto.com/id/1424054284/vector/circle-logo-digital-target-round-shape-swirl-orbit-loop-globe.jpg?s=612x612&w=0&k=20&c=qYvxFX0MXms9H6lDeKwMT21F9z__K3JW6smm-ePmpz8=' }}
      />
      <Text style={styles.text}>EventSphere</Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'maroon',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitle: () => <LogoTitle />, // Use the custom header component
    }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 'auto',
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
  }
});