import React, { useState } from "react";
import { View, Text, TextInput, Button, KeyboardAvoidingView, StyleSheet } from "react-native";
import styles from "@/styles/globalStyles";

export default function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const handleCreateEvent = () => {
    // Handle event creation logic here
    console.log("Event Created:", { eventName, eventDate, eventDescription });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.modalTitle}>Create Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Date"
        value={eventDate}
        onChangeText={setEventDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Description"
        value={eventDescription}
        onChangeText={setEventDescription}
      />
      <Button title="Create Event" onPress={handleCreateEvent} />
    </KeyboardAvoidingView>
  );
}