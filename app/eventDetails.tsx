// Import React and necessary modules from React Native
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native"; // Import useRoute for navigation parameters

// Define the EventDetailsScreen component
export default function EventDetailsScreen() {
  // Get route data to retrieve parameters passed from the previous screen
  const route = useRoute();

  // Extract 'event' parameter from route parameters, specifying it as a string type
  const { event } = route.params as { event: string };

  // Parse the event data (from JSON string to JavaScript object)
  const parsedEvent = event ? JSON.parse(event) : null;

  return (
    <View style={styles.container}>
      {/* Display event details */}
      <Text style={styles.title}>{parsedEvent.name}</Text>
      <Text style={styles.organizer}>
        Organized by: {parsedEvent.organizer}
      </Text>
      <Text style={styles.date}>{parsedEvent.date}</Text>
      <Text style={styles.description}>{parsedEvent.description}</Text>
      <Text style={styles.location}>{parsedEvent.location}</Text>

      {/* Display event tags */}
      <View style={styles.tagContainer}>
        {/* {parsedEvent.tags.map((tag: Tag) => (
          <View
            key={tag.label}
            style={[styles.tag, { backgroundColor: tag.color }]}
          >
            <Text style={styles.tagText}>{tag.label}</Text>
          </View>
        ))} */}
      </View>
    </View>
  );
}

// Define styling for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  date: {
    fontSize: 18,
    color: "gray",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    marginBottom: 16,
  },
  organizer: {
    fontSize: 16,
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Ensures tags wrap onto the next line if needed
  },
  tag: {
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginTop: 5,
  },
  tagText: {
    fontSize: 12,
  },
});
