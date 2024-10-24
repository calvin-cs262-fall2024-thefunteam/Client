import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  Modal,
  TextInput,
  FlatList,
  Pressable,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

const CreateEvent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const handleCreateEvent = () => {
    // Handle event creation logic here
    console.log("Event Created:", { eventName, eventDate, eventDescription });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Create Event" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView style={styles.modalView} behavior="padding">
          <View style={styles.modalContainer}>
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
            <Pressable style={styles.button} onPress={handleCreateEvent}>
              <Text style={styles.buttonText}>Create</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};