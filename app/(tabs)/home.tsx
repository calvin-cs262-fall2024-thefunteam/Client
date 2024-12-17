// Import required libraries and components
import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { useFocusEffect } from "@react-navigation/native";

import { useUser } from "../../components/UserContext";

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
  organizerID: number;
  date: string;
  description: string;
  tags?: Tag[]; // optional
  location: string;
  isSaved: boolean;
};

// Main component rendering the list of events
const Home = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  
  const [events, setEvents] = useState<Event[]>([]); // State for storing events

  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  const flatListRef = useRef<FlatList<Event>>(null);
  const { userID } = useUser();


  useFocusEffect(
    useCallback(() => {
      fetchEvents(); // Fetch events when screen is focused
    }, [])
  );
 

  // Fetch events from the server
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
          organizer: tempEvent.organizer,
          date: tempEvent.date.split("T")[0], // Format date to 'YYYY-MM-DD'
          description: tempEvent.description,
          tags: eventTags,
          location: tempEvent.location,
          organizerID: tempEvent.organizerid,
          isSaved: false, // Default to false
        };
      });

      setEvents(mappedEvents); // Sets the mapped events to state
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Function to navigate to event details page
  const handleSeeMore = (event: Event) => {
    router.push({
      pathname: "/eventDetails",
      params: { event: JSON.stringify(event) }, // Convert event object to string for navigation
    });
  }; 

  // Helper function to truncate long text descriptions
  function truncateText(text: string, charLimit: number) {
    if (text.length > charLimit) {
      return text.slice(0, charLimit) + "...";
    }
    return text;
  }

  // Filter events based on search query
  const filteredEvents = events.filter(
    (event: Event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.tags &&
        event.tags.some((tag: any) =>
          tag.label.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  // Handle bookmark toggle
  const handleToggleBookmark = (event: Event) => {
    // Update event saved status
    setEvents((currentEvents) =>
      currentEvents.map((currentEvent) =>
        currentEvent.id === event.id
          ? { ...currentEvent, isSaved: !currentEvent.isSaved }
          : currentEvent
      )
    );
    
    if (!event.isSaved) {
      handleSaveEvent(event);
    } else {
      handleUnsaveEvent(event);
    }
  };

  // Refresh events list
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

  // Save event to backend
  const handleSaveEvent = async (event: Event) => {
    const eventID = event.id;
    const item = {
      accountID: userID,
      eventID: eventID,
    };
    try {
      const response = await fetch(
        "https://eventsphere-web.azurewebsites.net/savedEvents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  // Unsave event from backend
  const handleUnsaveEvent = async (event: Event) => {
    const eventID = event.id;
    try {
      const response = await fetch(
        `https://eventsphere-web.azurewebsites.net/savedEvents/${userID}/${eventID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Log the raw response for debugging
      const text = await response.text();
      console.log("Raw response:", text);
  
      if (!response.ok) {
        throw new Error(`Failed to unsave event: ${response.statusText}`);
      }
  
      // Parse JSON only if applicable
      if (response.headers.get("Content-Type")?.includes("application/json")) {
        const data = JSON.parse(text);
        console.log("Success:", data);
      } else {
        console.log("Event unsaved successfully with no additional response data.");
      }
    } catch (error) {
      console.error("Error unsaving event:", error);
    }
  };

  // Scroll to top functionality
  const goToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  // Handle scroll to show/hide scroll to top button
  const handleScroll = (event: {
    nativeEvent: { contentOffset: { y: any } };
  }) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsScrollButtonVisible(offsetY > 100);
    // setIsSearchBarVisible(offsetY <= 0); // Hide search bar when scrolling down
  };

  // Render individual event card
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
        <Text style={styles.cardDescription}>
          {truncateText(item.description, 45)}
        </Text>

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

  // Main render method
  return (
    <View style={styles.container}>
      {/* Events list */}
      <FlatList
        data={filteredEvents}
        ref={flatListRef}
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
        ListHeaderComponent={
          // isSearchBarVisible && 
          (
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
          )
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      {isScrollButtonVisible && (
        <Pressable style={styles.scrollToTopButton} onPress={goToTop}>
          <Ionicons name="chevron-up" size={24} color="white" />
        </Pressable>
      )}
    </View>
  );
};

export default Home;