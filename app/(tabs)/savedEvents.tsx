import React, { useState } from "react";
import styles from "@/styles/globalStyles"; // Import global styles
import {
  View,
  Text,
  FlatList,
  Pressable,
  RefreshControl,
} from "react-native"; // Import components from React Native
import { Ionicons } from "@expo/vector-icons"; // Import icons from Expo
import { router, useFocusEffect } from "expo-router"; // Import router and useFocusEffect hook from Expo Router
import useSavedEvents from "../../hooks/useSavedEvents"; // Import custom hook to fetch saved events
import { Event, Tag } from "../(tabs)/home"; // Import Event and Tag types

/**
 * Displays a list of saved events.
 * Uses the `useSavedEvents` hook to fetch events and renders them in a scrollable list.
 * Includes functionality to navigate to event details and refresh the list of events.
 *
 * @component
 * @example
 * return <DisplaySavedEvents />
 */
export default function displaySavedEvents() {
  const { savedEvents, fetchSavedEvents } = useSavedEvents(); // Use custom hook to fetch saved events
  const [refreshing, setRefreshing] = useState(false); // State to manage refresh control

  /**
   * Fetches saved events when the component is focused.
   * This hook runs every time the screen is focused, ensuring fresh data.
   */
  useFocusEffect(
    React.useCallback(() => {
      fetchSavedEvents(); // Fetch saved events on focus
    }, [])
  );

  /**
   * Refresh function that fetches the saved events.
   * Sets the `refreshing` state to true while fetching data.
   */
  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing state to true
    await fetchSavedEvents(); // Fetch saved events
    setRefreshing(false); // Set refreshing state to false
  };

  /**
   * Handles navigation to the event details screen.
   * Passes the event object as a parameter for detailed view.
   *
   * @param {Event} event - The event object to navigate with.
   */
  const handleSeeMore = (event: Event) => {
    router.push({
      pathname: "/eventDetails", // Navigate to event details page
      params: { event: JSON.stringify(event) }, // Pass event object as a parameter
    });
  };

  /**
   * Renders an individual event card for display in the FlatList.
   *
   * @param {object} props - The props for the FlatList item.
   * @param {Event} props.item - The event item to render.
   * @returns {JSX.Element} The rendered event card.
   */
  const renderEventCard = ({ item }: { item: Event }) => (
    <Pressable onPress={() => handleSeeMore(item)}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardText}>{item.name}</Text> {/* Display event name */}
        </View>
        <View style={styles.cardDateLocationContainer}>
          <Text style={styles.cardDate}>{item.date}</Text> {/* Display event date */}
          <Text style={styles.cardLocation}>{item.location}</Text> {/* Display event location */}
        </View>

        <View style={styles.separator} />
        <View style={styles.tagAndButtonContainer}>
          <View style={styles.tagContainer}>
            {/* Map through event tags and display them */}
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
      <FlatList
        data={savedEvents} // List of saved events to display
        renderItem={renderEventCard} // Function to render each event card
        keyExtractor={(item) => item.id} // Extract unique key for each item
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Add pull-to-refresh functionality
        }
        ListEmptyComponent={<Text>No saved events.</Text>} // Display message when no saved events are found
      />
    </View>
  );
}
