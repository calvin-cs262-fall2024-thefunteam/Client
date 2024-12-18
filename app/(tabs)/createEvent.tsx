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
import { useUser } from "../../components/UserContext";

const tags = availableTags;

/**
 * The CreateEvent component allows users to create and submit a new event with various attributes.
 * 
 * @component
 * @returns {JSX.Element} A JSX element rendering the event creation form.
 * 
 * @example
 * <CreateEvent />
 * 
 * @description
 * - This component provides input fields for event details such as name, organizer, date, description, tags, and location.
 * - Selected tags are highlighted dynamically.
 * - Includes form submission logic for sending the event data to a remote server.
 * 
 * @requires react
 * @requires react-native
 * @requires @react-native-community/datetimepicker
 * @requires @/styles/globalStyles
 * @requires @/components/UserContext
 * @requires expo-router
 */
export default function CreateEvent() {
  const [eventName, setEventName] = useState(""); // Event name state
  const [organizer, setOrganizer] = useState(""); // Organizer name state
  const [eventDate, setEventDate] = useState<Date | null>(new Date()); // Event date state, defaults to current date
  const [eventDescription, setEventDescription] = useState(""); // Event description state
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]); // Selected tags state
  const [location, setLocation] = useState(""); // Event location state
  const { userID } = useUser(); // User ID from the UserContext
  const { username } = useUser(); // Username from the UserContext

  /**
   * Toggles the selection state of a tag.
   * @param {Tag} tag - The tag object to toggle.
   */
  const handleTagToggle = (tag: Tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  /**
   * Handles the change of the event date using the DateTimePicker.
   * @param {any} event - The event object from the DateTimePicker.
   * @param {Date} [selectedDate] - The selected date object.
   */
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setEventDate(selectedDate); // Update the event date
    }
  };

  /**
   * Submits the event creation form and sends the event data to the server.
   * @async
   * @function
   */
  const handleCreateEvent = async () => {
    const newEvent = {
      name: eventName,
      organizer: organizer,
      date: eventDate ? eventDate.toISOString() : null, // Convert date to ISO string
      description: eventDescription,
      tagsArray: selectedTags
        .map((tag) => {
          const foundTag = availableTags.find(
            (availableTag) => availableTag.label === tag.label
          );
          return foundTag ? foundTag.id : null;
        })
        .filter((tagId) => tagId !== null), // Reverse map tags to their IDs
      location: location,
      organizerid: userID,
    };
    try {
      console.log("Creating event with data:", newEvent);
      const response = await fetch(
        "https://eventsphere-web.azurewebsites.net/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Event created successfully:", data);

      // Reset form state after successful submission
      setEventName("");
      setOrganizer("");
      setEventDate(new Date());
      setEventDescription("");
      setSelectedTags([]);
      setLocation("");
    } catch (error) {
      console.error("Error creating event:", error);
    }
    router.navigate("/home"); // Navigate to the home screen after submission
  };

  return (
    <KeyboardAvoidingView style={styles.createContainer} behavior="padding">
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        placeholderTextColor={"grey"}
        value={eventName}
        onChangeText={setEventName}
      />

      <TextInput
        style={styles.input}
        placeholder={"Organizer"}
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
        placeholder="Event Description"
        placeholderTextColor={"grey"}
        value={eventDescription}
        onChangeText={setEventDescription}
        multiline
        numberOfLines={3}
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
