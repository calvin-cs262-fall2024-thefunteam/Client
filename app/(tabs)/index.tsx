import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import SearchBar from "@/components/SearchBar"; // Import SearchBar component
import styles from "@/styles/globalStyles"; // Import styles
import eventsData from "../events.json"; // Import events from events.json
//import savedEvents from "../savedEvents.json"; // Import saved events from savedEvents.json
import { router } from "expo-router";
import eventDetails from "../eventDetails"; // Import event details page


// Predefined tag options with corresponding colors
type Tag = {
  label: string;
  color: string;
};

type Event = {
  id: string;
  name: string;
  organizer: string;
  date: string;
  description: string;
  tags: Tag[];
  location: string;
};

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    setEvents(eventsData); // Load events from events.json
  }, []);

  const handleDeleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const handleSeeMore = (event: Event) => {
    // Navigate to the event details page
    router.push(`../eventDetails/`);
  }

  const truncateText = (text: string, charLimit: number) => {
    if (text.length > charLimit) {
      return text.slice(0, charLimit);
    }
    return text;
  };
  
  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    router.push("/createEvent");
    // You can add more logic here to open a modal or navigate to an edit screen
  };

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some((tag) =>
        tag.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const renderEventCard = ({ item }: { item: Event }) => (
    <Pressable
    onPress={() => handleSeeMore(item)}
    >
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardText}>{item.name}</Text>
        <Text style={styles.cardText}>{item.organizer}</Text>
      </View>
      <View style={styles.cardDateContainer}>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>

      <View style={styles.separator} />
      <Text style={styles.cardDescription}>{truncateText(item.description,200)}</Text>
      <Text style={styles.seeMoreText}>...See More</Text>

      <View style={styles.tagAndButtonContainer}>
        <View style={styles.tagContainer}>
          {item.tags.map((tag) => (
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
        <Pressable onPress={() => {
          alert('Event bookmarked!');
         }}>
            <Ionicons
              name='bookmark-outline'
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      </View>
    </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      
      {/* Search Bar */}
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