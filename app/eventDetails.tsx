// Import React and necessary modules from React Native
import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { Tag } from "../app/(tabs)/home"; // Import Tag type for type safety
import { useRoute } from "@react-navigation/native"; // Import useRoute for navigation parameters
import { useRouter } from "expo-router";
import axios from "axios";
import { useUser } from "@/components/UserContext";

// Define the EventDetailsScreen component
export default function EventDetailsScreen() {
  // Get route data to retrieve parameters passed from the previous screen
  const route = useRoute();
  const {userID} = useUser();

  // Extract 'event' parameter from route parameters, specifying it as a string type
  const { event } = route.params as { event: string };

  // Parse the event data (from JSON string to JavaScript object)
  const parsedEvent = event ? JSON.parse(event) : null;

  const router = useRouter();

  console.log("organizerID:",parsedEvent.organizerID);
  console.log(userID);

  const handleEditEvent = (event: Event) => {
    router.push({
      pathname: "/editEvent",
      params: { event: JSON.stringify(event) }, // Convert event object to string for navigation
    });
  }

  const handleDeleteEvent = async (id: string) => {
    try {
      const response = await axios.delete(`https://eventsphere-web.azurewebsites.net/events/${id}`);
      if (response.status >= 200 && response.status < 300) {
        setEvents((prevEvents) => prevEvents.filter((event: { id: string; }) => event.id !== id));
        console.log(`Event with id ${id} deleted successfully.`);
      } else {
        console.error(`Failed to delete event with id ${id}. Status code: ${response.status}`);
      }
    } catch (error) { 
      //console.error(`An error occurred while deleting the event with id ${id}: ${error}`);
    }

    // Navigate back to the home screen after deleting the event
    router.replace("/home");

  };

  const confirmDelete = (id: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this event?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDeleteEvent(id),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  
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
        {parsedEvent.tags.map((tag: Tag) => (
          <View
            key={tag.label}
            style={[styles.tag, { backgroundColor: tag.color }]}
          >
            <Text style={styles.tagText}>{tag.label}</Text>
          </View>
        ))}
      </View>

         {/* Conditional rendering of Edit and Delete buttons */}
      { (userID === 4 || userID === parsedEvent.organizerID) && (
        <View style={styles.editAndDeleteButton}>
          <Pressable
            style={styles.editButton}
            onPress={() => handleEditEvent(parsedEvent)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </Pressable>
          <Pressable
            style={styles.deleteButton}
            onPress={() => confirmDelete(parsedEvent.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </Pressable>
        </View>
      )}
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
    paddingVertical: 20,
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
  deleteButton: {
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
    backgroundColor: 'red',
    width: 80, // Set a fixed width
    alignItems: 'center', // Center the text horizontally
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
  },
  editButton: {
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: 'blue',
    width: 80, // Set a fixed width
    alignItems: 'center', // Center the text horizontally
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
  },
  editAndDeleteButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
function setEvents(arg0: (prevEvents: any) => any) {
  throw new Error("Function not implemented.");
}

