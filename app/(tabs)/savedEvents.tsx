import React, { useCallback, useEffect, useState } from "react";
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
import { useUser } from "../../components/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

export type Event = {
  id: string;
  name: string;
  organizer: string;
  date: string;
  description: string;
  tags?: Tag[]; // optional
  location: string;
  isSaved: boolean;
  organizerID: number;
};

export default function displaySavedEvents() {
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const { userID } = useUser();

  useEffect(() => {
    fetchSavedEvents();
  }, []);


  useFocusEffect(
    useCallback(() => {
      fetchSavedEvents(); // Fetch events when screen is focused
    }, [])
  );

  const fetchSavedEvents = async () => {

    const response = await axios.get(
      `https://eventsphere-web.azurewebsites.net/savedEvents/${userID}`
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
        organizerID: tempEvent.organizerid,
        isSaved: false, // Default to false
      };
    });

    setSavedEvents(mappedEvents); // Sets the mapped events to state

  };

  const handleSeeMore = (event: Event) => {
    router.push({
      pathname: "/eventDetails",
      params: { event: JSON.stringify(event) }, // Convert event object to string for navigation
    });
  };

  const renderEventCard = ({ item }: { item: Event }) => (
    <Pressable onPress={() => handleSeeMore(item)}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardText}>{item.name}</Text>
          {/* <Text style={styles.cardText}>{item.organizer}</Text> */}
        </View>
        <View style={styles.cardDateLocationContainer}>
          <Text style={styles.cardDate}>{item.date}</Text>
          <Text style={styles.cardLocation}>{item.location}</Text>
        </View>

        <View style={styles.separator} />
        <View style={styles.tagAndButtonContainer}>
          <View style={styles.tagContainer}>
            {item.tags!.map((tag: Tag) => (
              <View
                key={tag.label}
                style={[styles.tag, { backgroundColor: tag.color }]}
              >
                <Text style={styles.tagText}>{tag.label}</Text>
              </View>
            ))}
          </View>
        </View>

      </View>
    </Pressable>
  );


  return (
    <View style={styles.container}>
      {/* display event cards */}
      <FlatList
        data={savedEvents}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id}
      />

    </View>
  );
}

