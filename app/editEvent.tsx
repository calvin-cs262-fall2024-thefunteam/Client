// Import React and necessary modules from React Native
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { Tag } from "../app/(tabs)/home"; // Import Tag type for type safety
import { useRoute, useNavigation } from "@react-navigation/native"; // Import useRoute for navigation parameters
import axios from "axios"; // Import Axios for API requests
import styles from "@/styles/globalStyles"; // Import global styles

// Define the EditEventScreen component
export default function EditEventScreen() {
  // Get route data to retrieve parameters passed from the previous screen
  const route = useRoute();
  const navigation = useNavigation();

  // Extract 'event' parameter from route parameters, specifying it as a string type
  const { event } = route.params as { event: string };

  // Parse the event data (from JSON string to JavaScript object)
  const parsedEvent = event ? JSON.parse(event) : null;

  // State variables for event details, prefilled with the event data
  const [eventName, setEventName] = useState(parsedEvent.name);
  const [organizer, setOrganizer] = useState(parsedEvent.organizer);
  const [eventDate, setEventDate] = useState(parsedEvent.date);
  const [eventDescription, setEventDescription] = useState(
    parsedEvent.description
  );
  const [selectedTags, setSelectedTags] = useState<Tag[]>(parsedEvent.tags);
  const [location, setLocation] = useState(parsedEvent.location);

  // Function to add or remove a tag from selectedTags
  const handleTagToggle = (tag: Tag) => {
    setSelectedTags(
      (prevSelectedTags) =>
        prevSelectedTags.includes(tag)
          ? prevSelectedTags.filter((t) => t !== tag) // Remove tag if already selected
          : [...prevSelectedTags, tag] // Add tag if not selected
    );
  };

  // Function to handle event update
  const handleUpdateEvent = async () => {
    const updatedEvent = {
      id: parsedEvent.id,
      name: eventName,
      organizer: organizer,
      date: eventDate,
      description: eventDescription,
      tagsArray: selectedTags.map((tag) => tag.id), // Map selected tags to their IDs
      location: location,
    };

    try {
      console.log("Updating event with data:", updatedEvent); // Log the event data
      const response = await fetch(
        "https://eventsphere-web.azurewebsites.net/events/${parsedEvent.id}",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Event updated successfully:", data);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    // Main container with keyboard avoiding functionality for better UX
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Event name input */}
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        placeholderTextColor={"grey"}
        value={eventName}
        onChangeText={setEventName}
      />

      {/* Organizer input */}
      <TextInput
        style={styles.input}
        placeholder="Organizer"
        placeholderTextColor={"grey"}
        value={organizer}
        onChangeText={setOrganizer}
      />

      {/* Date and Location input container */}
      <View style={styles.dateAndLocationInput}>
        {/* Event date input */}
        <TextInput
          style={styles.dateInput}
          placeholder="Event Date (MM/DD/YYYY)"
          placeholderTextColor={"grey"}
          value={eventDate}
          onChangeText={setEventDate}
        />

        {/* Event location input */}
        <TextInput
          style={styles.locationInput}
          placeholder="Location"
          placeholderTextColor={"grey"}
          value={location}
          onChangeText={setLocation}
        />
      </View>

      {/* Event description input */}
      <TextInput
        style={styles.descriptionInput}
        multiline={true}
        numberOfLines={4}
        placeholder="Event Description"
        placeholderTextColor={"grey"}
        value={eventDescription}
        onChangeText={setEventDescription}
      />

      {/* Section to select tags for the event */}
      <Text style={styles.modalText}>Select Tags</Text>
      {/* <View style={styles.tagSelectionContainer}>
        {availableTags.map((tag) => (
          <Pressable
            key={tag.label}
            onPress={() => handleTagToggle(tag)} // Toggle tag selection on press
            style={[
              styles.tag,
              selectedTags.includes(tag) && { backgroundColor: tag.color }, // Highlight tag if selected
            ]}
          >
            <Text style={styles.tagText}>{tag.label}</Text>
          </Pressable>
        ))}
      </View> */}

      {/* Button to update event */}
      <Button title="Update Event" onPress={handleUpdateEvent} />
    </KeyboardAvoidingView>
  );
}
