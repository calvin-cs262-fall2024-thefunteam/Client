import React from "react";
import styles from "@/styles/globalStyles";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { savedEvents } from "./home";

const eventSaved = savedEvents;

export default function displaySavedEvents() {
  return (
    <View style={styles.container}>
      {eventSaved && eventSaved.length === 0 ? (
        <Text>No saved events yet.</Text>
      ) : (
        <FlatList
          data={eventSaved}
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
