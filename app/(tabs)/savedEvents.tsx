import React, { useState } from "react";
import styles from "@/styles/globalStyles";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import Event, { Tag } from "../(tabs)/home";
import tag from "../(tabs)/home";
import { availableTags } from "../(tabs)/home";
import axios from "axios";

export type Event = {
  id: string;
  name: string;
  organizer: string;
  date: string;
  description: string;
  tags?: Tag[]; // optional
  location: string;
  isSaved: boolean;
};

export default function displaySavedEvents() {
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  
  
  const userID = 1; // Temporary user ID for testing

  const fetchSavedEvents = async () => {
    try {
      const response = await axios.get(
        "https://eventsphere-web.azurewebsites.net/savedEvents/{userID}"
      );
      const tempEvents: any[] = response.data; // Store data in a temporary array with type any

      const mappedEvents: Event[] = tempEvents.map((tempEvent) => {
        
        const eventTags = tempEvent.tagsarray
          .map((tagId: number) => {
            return availableTags.find((tag) => tag.id === tagId);
          })
          .filter(Boolean) as Tag[]; // Filters out any null values if no match is found

        return {
          id: String(tempEvent.id),
          name: tempEvent.name,
          organizer: `Organizer ${tempEvent.organizerid}`, // Assuming organizer is retrieved this way
          date: tempEvent.date.split("T")[0], // Format date to 'YYYY-MM-DD'
          description: tempEvent.description,
          tags: eventTags,
          location: tempEvent.location,
          isSaved: false, // Default to false
        };
      });

      setSavedEvents(mappedEvents); // Sets the mapped events to state
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };


  return (
    <View style={styles.container}>
      
    </View>
  );
}
