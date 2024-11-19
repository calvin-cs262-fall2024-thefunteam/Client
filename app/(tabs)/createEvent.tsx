
// Import essential libraries and components
import React, { useState } from "react";
import { View, Text, TextInput, Button, Pressable, KeyboardAvoidingView, StyleSheet } from "react-native";
import styles from "@/styles/globalStyles"; // Import global styles for consistent styling
import { Tag } from "../(tabs)/home"; // Import Tag type for tags
import availableTags from "../(tabs)/home"; // Import availableTags array for tag selection
import axios from "axios"; // Import Axios for API requests
import Index from "/Users/danyeolchae/Desktop/funteam/Client/app/(tabs)/index";
import { Event } from "../(tabs)/home";


const tags = availableTags

// Main CreateEvent component
export default function CreateEvent() {
  // State variables for event details
  const [eventName, setEventName] = useState("");             // Event name
  const [organizer, setOrganizer] = useState("");             // Organizer name
  const [eventDate, setEventDate] = useState("");             // Date of event
  const [eventDescription, setEventDescription] = useState(""); // Event description
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);  // Selected tags for event
  const [location, setLocation] = useState("");               // Location of event

  // Function to add or remove a tag from selectedTags
  const handleTagToggle = (tag: Tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag) // Remove tag if already selected
        : [...prevSelectedTags, tag]               // Add tag if not selected
    );
  };

  // Function to handle event creation
  const handleCreateEvent = () => {
    const newEvent: Event = { id:"", name: eventName, organizer, date: eventDate, description: eventDescription, tags: selectedTags, location }; // Create new event object
    setEventName("");             // Clear event name input
    setOrganizer("");             // Clear organizer input
    setEventDate("");             // Clear event date input
    setEventDescription("");      // Clear description input
    setSelectedTags([]);          // Clear selected tags
    setLocation("");              // Clear location input

    createEvent(newEvent); // Call createEvent function with new event object
    
  };

  const createEvent = async (event: Event) => {
    try {
      const response = await axios.post('https://eventsphere-web.azurewebsites.net/events', event);
      console.log("Event created successfully:", response.data);
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
          placeholder="Event Date"
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
      {/* <Text style={styles.modalText}>Select Tags</Text>
      <View style={styles.tagSelectionContainer}>
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
          </Pressable>/
        ))}
      </View> */}

      {/* Button to create event */}
      <Button title="Create Event" onPress={handleCreateEvent} />
    </KeyboardAvoidingView>
  );
}
