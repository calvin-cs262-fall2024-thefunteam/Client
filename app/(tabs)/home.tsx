// Import required libraries and components
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  RefreshControl,
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
  { id: 6, label: "Concert", color: "#FF69B4" }, // Pink for concerts
  { id: 7, label: "Student Life", color: "#FF6347" }, // Red for student life events
  { id: 8, label: "Food", color: "#4682B4" }, // Steel blue for food events
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
  const [refreshing, setRefreshing] = useState(false);
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
          time: tempEvent.time,
        };
      });

      setEvents(mappedEvents); // Sets the mapped events to state
    } catch (error) {
      console.error("Error fetching events:", error);
    }
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
    .map((events) => ({
      ...events,
      isSaved: savedEvents.some((savedEvent) => savedEvent.id === events.id),
    }));

  const handleToggleBookmark = (event: Event) => {
    
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

  // Renders an individual event card with details and actions (edit, delete, bookmark)
  const renderEventCard = ({ item }: { item: any }) => (
    <Pressable onPress={() => handleSeeMore(item)}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardText}>{item.name}</Text>
          <Text style={styles.cardText}>{item.organizer}</Text>
        </View>
        <View style={styles.cardDateLocationContainer}>
          <Text style={styles.cardDate}>{item.date}</Text>
          <Text style={styles.cardLocation}>{item.location}</Text>
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
          <View style={styles.bookmarkIcon}>
            {/* Add handleSaveEvent here */}
            <Pressable onPress={() => handleToggleBookmark(item)}>
              <Ionicons
                name={item.isSaved ? "bookmark" : "bookmark-outline"}
                size={24}
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
