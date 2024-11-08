import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Make multiple of this for different communities !!

export default function CommunityDetails() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is a blank community details page.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 18,
    color: "gray",
  },
});
