import React from "react";
import styles from "@/styles/globalStyles";
import {
  View,
  Text,
  FlatList,
  Pressable,
  // StyleSheet,        // youngha kweon commented out because we don't use it
  KeyboardAvoidingView,
} from "react-native";
import { SavedEventsProvider } from "../../app/saveEventsContext";

export default function savedEvents() {
  return (
    <View style={styles.container}>
      {savedEvents.length === 0 ? (
        <Text>No saved events yet.</Text>
      ) : (
        <FlatList
          // data={savedEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardText}>{item.date}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
