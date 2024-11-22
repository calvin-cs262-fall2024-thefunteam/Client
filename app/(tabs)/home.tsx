// Import required libraries and components
import React, { Stack, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import SearchBar from "@/components/SearchBar"; // Custom SearchBar component
import styles from "@/styles/globalStyles"; // Import global styles
import axios from "axios"; // Import Axios for API requests
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native"; // Navigation hook

// Define the structure of tags with label and color properties
export type Tag = {
  id: number;
  label: string;
  color: string;
};

// Array of available tags, each with a label and color
export const availableTags: Tag[] = [
  { id: 1, label: "Social", color: "#FFD700" }, // Yellow for social events
  { id: 2, label: "Sports", color: "#1E90FF" }, // Blue for sports events
  { id: 3, label: "Student Org", color: "#32CD32" }, // Green for student organization events
  { id: 4, label: "Academic", color: "#FF4500" }, // Orange for academic events
  { id: 5, label: "Workshop", color: "#8A2BE2" }, // Purple for workshops
];

// Define the structure of an event with various properties, including tags
export type Event = {
  id: string;
  name: string;
  organizer: string;
  date: string;
  description: string;
  tags?: Tag[]; // optiional
  location: string;
};

// Main component rendering the list of events
export default function Index() {
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  const [events, setEvents] = useState<Event[]>([]); // State for storing events
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);

  //const [editingEvent, setEditingEvent] = useState<Event | null>(null); // Track the currently edited event

  const navigation = useNavigation();

  //Pull in data from server URL
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "https://eventsphere-web.azurewebsites.net/events"
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
        };
      });

      setEvents(mappedEvents); // Sets the mapped events to state
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  // Function to navigate to event details page, passing selected event as parameter
  const handleSeeMore = (event: Event) => {
    router.push({
      pathname: "/eventDetails",
      params: { event: JSON.stringify(event) }, // Convert event object to string for navigation
    });
  };

  // Helper function to truncate long text descriptions to a character limit
  function truncateText(text: string, charLimit: number) {
    if (text.length > charLimit) {
      return text.slice(0, charLimit) + "...";
    }
    return text;
  }

  // Filter events based on search query across name, organizer, and tags
  const filteredEvents = events
    .filter(
      (event: Event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.tags &&
          event.tags.some((tag: any) =>
            tag.label.toLowerCase().includes(searchQuery.toLowerCase())
          ))
    )
    .map((event) => ({
      ...event,
      isSaved: savedEvents.some((savedEvent) => savedEvent.id === event.id),
    }));

  const handleBookmark = (item: Event) => {
    const isSaved = savedEvents.some((event) => event.id === item.id);
    if (isSaved) {
      setSavedEvents((prev) => prev.filter((event) => event.id !== item.id));
    } else {
      const updatedSavedEvents = [...savedEvents, item];
      setSavedEvents(updatedSavedEvents);

      // Navigate to SavedEvents tab and pass the updated savedEvents
      navigation.navigate("savedEvents", { savedEvents });
    }
  };

  // Renders an individual event card with details and actions (edit, delete, bookmark)
  const renderEventCard = ({ item }: { item: any }) => (
    <Pressable onPress={() => handleSeeMore(item)}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardText}>{item.name}</Text>
          <Text style={styles.cardText}>{item.organizer}</Text>
        </View>
        <View style={styles.cardDateContainer}>
          <Text style={styles.cardDate}>{item.date}</Text>
        </View>

        <View style={styles.separator} />
        <Text style={styles.cardDescription}>
          {truncateText(item.description, 140)}
        </Text>
        <Text style={styles.seeMoreText}>See More</Text>

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
          <View style={styles.buttonContainerCard}>
            <Pressable
              style={styles.editButton}
              onPress={() => handleEditEvent(item)}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </Pressable>
            <Pressable
              style={styles.deleteButton}
              onPress={() => handleDeleteEvent(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </View>
          <View style={styles.bookmarkIcon}>
            {/* Add handleSaveEvent here */}
            <Pressable onPress={() => handleBookmark(item)}>
              <Ionicons
                name={item.isSaved ? "bookmark" : "bookmark-outline"}
                size={24}
                color={item.isSaved ? "blue" : "black"}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );

  // Main component rendering the search bar and event list
  return (
    <View style={styles.container}>
      {/* Render search bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={24}
          color="black"
          style={styles.searchIcon}
        />
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      {/* Render filtered events in a scrollable list */}
      <FlatList
        data={filteredEvents}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No events yet. Create one!</Text>}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </View>
  );
}
