// Import required libraries and components
import React, { useState, useEffect } from "react";
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
import { useNavigation } from '@react-navigation/native'; // Navigation hook

// Define the structure of tags with label and color properties
export type Tag = {
  label: string;
  color: string;
};

// Define the structure of an event with various properties, including tags
export type Event = {
  id: string;
  name: string;
  organizer: string;
  date: string;
  description: string;
  tags?: Tag[];
  location: string;
};

// Main component rendering the list of events
export default function Index() {
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [events, setEvents] = useState<Event[]>([]); // State for storing events
  //const [editingEvent, setEditingEvent] = useState<Event | null>(null); // Track the currently edited event
  const navigation = useNavigation(); // Initialize navigation

  //Pull in data from server URL
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://eventsphere-web.azurewebsites.net/events');
      const tempEvents: any[] = response.data; // Store data in a temporary object
      const mappedEvents: Event[] = tempEvents.map((tempEvent) => ({
        id: tempEvent.id,
        name: tempEvent.name,
        organizer: tempEvent.organizer,
        date: tempEvent.date,
        description: tempEvent.description,
        tags: tempEvent.tags,
        location: tempEvent.location,
      }));
      setEvents(mappedEvents); // Map to Event type and set state
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };


  // Function to delete an event by ID from the events list
  const handleDeleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };
  
  // Function to navigate to event details page, passing selected event as parameter
  const handleSeeMore = (event: Event) => {
    router.push({
      pathname: '/eventDetails', 
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
  const filteredEvents = events.filter(
    (event: Event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags?.some((tag: any) =>
        tag.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

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
        <Text style={styles.cardDescription}>{truncateText(item.description, 140)}</Text>
        <Text style={styles.seeMoreText}>See More</Text>

        <View style={styles.tagAndButtonContainer}>
          <View style={styles.tagContainer}>
            {/* {item.tags!.map((tag) => (
              <View key={tag.label} style={[styles.tag, { backgroundColor: tag.color }]}>
                <Text style={styles.tagText}>{tag.label}</Text>
              </View>
            ))} */}
          </View>
          <View style={styles.buttonContainerCard}>
            <Pressable style={styles.editButton} onPress={() => handleEditEvent(item)}>
              <Text style={styles.editButtonText}>Edit</Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={() => handleDeleteEvent(item.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </View>
          <View style={styles.bookmarkIcon}>
            <Pressable onPress={() => alert('Event bookmarked!')}>
              <Ionicons name="bookmark-outline" size={24} color="black" />
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
        <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
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
