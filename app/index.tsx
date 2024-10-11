import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  Modal,
  TextInput,
  FlatList,
  Pressable,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import SearchBar from "@/components/SearchBar"; // Import SearchBar component
import styles from "@/styles/indexStyles"; // Import styles

// Predefined tag options with corresponding colors
type Tag = {
  label: string;
  color: string;
};

const tags: Tag[] = [
  { label: "Social", color: "#FFD700" },
  { label: "Sports", color: "#1E90FF" },
  { label: "Student Org", color: "#32CD32" },
  { label: "Academic", color: "#FF4500" },
  { label: "Workshop", color: "#8A2BE2" },
];

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState("");
  const [organizerName, setNameOrganizer] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [eventLocation, setEventLocation] = useState("");

  type Event = {
    id: string;
    name: string;
    organizer: string;
    date: string;
    description: string;
    tags: Tag[];
    location: string;
  };

  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleTagToggle = (tag: Tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const handleCreateEvent = () => {
    if (eventName.trim() && eventDate.trim()) {
      if (editingEvent) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === editingEvent.id
              ? {
                ...event,
                name: eventName,
                organizer: organizerName,
                date: eventDate,
                description: eventDescription,
                tags: selectedTags,
                location: eventLocation,
              }
              : event
          )
        );
        setEditingEvent(null);
      } else {
        setEvents([
          ...events,
          {
            id: Date.now().toString(),
            name: eventName,
            organizer: organizerName,
            date: eventDate,
            description: eventDescription,
            tags: selectedTags,
            location: eventLocation,
          },
        ]);
      }

      setEventName("");
      setEventDate("");
      setNameOrganizer("");
      setEventDescription("");
      setSelectedTags([]);
      setEventLocation("");
      setModalVisible(false);
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setEventName(event.name);
    setNameOrganizer(event.organizer);
    setEventDate(event.date);
    setEventDescription(event.description);
    setSelectedTags(event.tags);
    setEventLocation(event.location);
    setModalVisible(true);
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
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardText}>{item.name}</Text>
        <Text style={styles.cardText}>{item.organizer}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>

      <View style={styles.separator} />

      <Text style={styles.cardDescription}>{item.description}</Text>

      <View style={styles.tagContainer}>
        {item.tags.map((tag) => (
          <View
            key={tag.label}
            style={[styles.tag, { backgroundColor: tag.color }]}
          >
            <Text style={styles.tagText}>{tag.label}</Text>
          </View>
        ))}

        <Pressable
          style={styles.deleteButton}
          onPress={() => handleDeleteEvent(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete Event</Text>
        </Pressable>

        <Pressable
          style={styles.editButton}
          onPress={() => handleEditEvent(item)}
        >
          <Text style={styles.editButtonText}>Edit Event</Text>
        </Pressable>
      </View>
    </View>
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

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.pressable}
            onPress={() => alert("Go to Home")}
          >
            <Ionicons name="home-outline" size={30} color="black" />
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.pressable}
            onPress={() => alert("Go to Communities")}
          >
            <Ionicons name="people-outline" size={30} color="black" />
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.pressable}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add-circle-outline" size={30} color="black" />
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.pressable}
            onPress={() => alert("Go to Communities")}
          >
            <Ionicons name="bookmark-outline" size={30} color="black" />
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.pressable}
            onPress={() => alert("Go to Profile")}
          >
            <Ionicons name="person-outline" size={30} color="black" />
          </Pressable>
        </View>
      </View>

      {/* Modal for Creating/Editing Event */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {editingEvent ? "Edit Event" : "Create New Event"}
              </Text>

              <TextInput
                style={styles.eventNameInput}
                placeholder="Event Name"
                value={eventName}
                onChangeText={setEventName}
              />

              <TextInput
                style={styles.nameOrgInput}
                placeholder="Name of Organizer"
                value={organizerName}
                onChangeText={setNameOrganizer}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <TextInput
                  style={[styles.input, { flex: 1, marginRight: 10 }]} // Make Date input take up half the space
                  placeholder="(MM/DD/YYYY)"
                  value={eventDate}
                  onChangeText={setEventDate}
                />

                <TextInput
                  style={[styles.input, { flex: 1 }]} // Make Location input take up half the space
                  placeholder="Location"
                  value={eventLocation}
                  onChangeText={setEventLocation}
                />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Event Description"
                value={eventDescription}
                onChangeText={setEventDescription}
              />

              <View style={styles.tagSelectionContainer}>
                {tags.map((tag) => (
                  <Pressable
                    key={tag.label}
                    onPress={() => handleTagToggle(tag)}
                    style={[
                      styles.tag,
                      selectedTags.some((t) => t.label === tag.label) && {
                        backgroundColor: tag.color,
                      },
                    ]}
                  >
                    <Text style={styles.tagText}>{tag.label}</Text>
                  </Pressable>
                ))}
              </View>

              <Button
                title={editingEvent ? "Save Event" : "Create Event"}
                onPress={handleCreateEvent}
              />

              {/* Cancel Button */}
              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)} // Close modal
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
``;
