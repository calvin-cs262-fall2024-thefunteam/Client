import React, { useState } from "react";
import { View, Text, TextInput, Button, Pressable, KeyboardAvoidingView, StyleSheet } from "react-native";
import styles from "@/styles/globalStyles";

type Tag = {
  label: string;
  color: string;
};

const availableTags: Tag[] = [
  { label: "Social", color: "#FFD700" },
  { label: "Sports", color: "#1E90FF" },
  { label: "Student Org", color: "#32CD32" },
  { label: "Academic", color: "#FF4500" },
  { label: "Workshop", color: "#8A2BE2" },
];

export default function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [location, setLocation] = useState("");

  const handleTagToggle = (tag: Tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const handleCreateEvent = () => {
    const newEvent = { eventName, organizer, eventDate, eventDescription, tags: selectedTags, location };
    setEventName("");
    setOrganizer("");
    setEventDate("");
    setEventDescription("");
    setSelectedTags([]);
    setLocation("");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* <Text style={styles.modalTitle}>Create Event</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        placeholderTextColor={"grey"}
        value={eventName}
        onChangeText={setEventName}
      />
      <TextInput
        style={styles.input}
        placeholder="Organizer"
        placeholderTextColor={"grey"}
        value={organizer}
        onChangeText={setOrganizer}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Date"
        placeholderTextColor={"grey"}
        value={eventDate}
        onChangeText={setEventDate}
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder="Event Description"
        placeholderTextColor={"grey"}
        value={eventDescription}
        onChangeText={setEventDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        placeholderTextColor={"grey"}
        value={location}
        onChangeText={setLocation}
      />
      <Text style={styles.modalText}>Select Tags</Text>
      <View style={styles.tagSelectionContainer}>
        {availableTags.map((tag) => (
          <Pressable
            key={tag.label}
            onPress={() => handleTagToggle(tag)}
            style={[
              styles.tag,
              selectedTags.includes(tag) && { backgroundColor: tag.color },
            ]}
          >
            <Text style={styles.tagText}>{tag.label}</Text>
          </Pressable>
        ))}
      </View>
        <Button title="Create Event" onPress={handleCreateEvent} />
    </KeyboardAvoidingView>
  );
}