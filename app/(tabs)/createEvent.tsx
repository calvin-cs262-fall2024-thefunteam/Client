import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import DateTimePicker
import styles from "@/styles/globalStyles";
import { Tag } from "../(tabs)/home";
import { availableTags } from "../(tabs)/home";
import { router } from "expo-router";
import { userID } from "../loginForm";
// import TimePicker from 'react-time-picker'

const tags = availableTags;

export default function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [eventDate, setEventDate] = useState<Date | null>(new Date()); // Default to current date
  const [eventDescription, setEventDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [location, setLocation] = useState("");
  //const [time, setTime] = useState<>();

  const handleTagToggle = (tag: Tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setEventDate(selectedDate); // Update the event date
    }
  };

  const handleCreateEvent = async () => {
    const newEvent = {
      name: eventName,
      organizer: organizer,
      date: eventDate ? eventDate.toISOString() : null, // Convert date to ISO string
      description: eventDescription,
      tagsArray: selectedTags.map((tag) => {
        const foundTag = availableTags.find((availableTag) => availableTag.label === tag.label);
        return foundTag ? foundTag.id : null;
      }).filter(tagId => tagId !== null), // Reverse map tags to their IDs
      location: location,
      organizerid: userID,
    };
    try {
      console.log("Creating event with data:", newEvent);
      const response = await fetch("https://eventsphere-web.azurewebsites.net/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Event created successfully:", data);

      setEventName("");
      setOrganizer("");
      setEventDate(new Date());
      setEventDescription("");
      setSelectedTags([]);
      setLocation("");
    } catch (error) {
      console.error("Error creating event:", error);
    }
    router.navigate("/home");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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

      <View style={styles.dateAndLocationInput}>
        {/* Always visible DateTimePicker */}
        <DateTimePicker
          value={eventDate || new Date()}
          mode="date"
          display="default" //
          onChange={handleDateChange}
          // style={styles.datePicker} // Optional custom styling
        />

        <TextInput
          style={styles.locationInput}
          placeholder="Location"
          placeholderTextColor={"grey"}
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <TextInput
        style={styles.descriptionInput}
        multiline={true}
        numberOfLines={3}
        placeholder="Event Description"
        placeholderTextColor={"grey"}
        value={eventDescription}
        onChangeText={setEventDescription}
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

      <Pressable style={styles.createButton} onPress={handleCreateEvent}>
        <Text style={styles.createButtonText}>Create Event</Text>
      </Pressable>

    </KeyboardAvoidingView>
  );
}