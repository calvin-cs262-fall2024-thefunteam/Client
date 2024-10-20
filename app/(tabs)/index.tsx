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
import styles from "@/styles/globalStyles"; // Import styles

// Import the Profile screen
import Profile from "@/screens/Profile"; // Ensure this path is correct

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

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      name: 'Sample Event 1',
      organizer: 'Organizer 1',
      date: '2023-10-01',
      description: 'Description for Sample Event 1',
      tags: [{ label: "Social", color: "#FFD700" }],
      location: 'Location 1',
    },
    {
      id: '2',
      name: 'Sample Event 2',
      organizer: 'Organizer 2',
      date: '2023-10-15',
      description: 'Description for Sample Event 2',
      tags: [{ label: "Sports", color: "#1E90FF" }],
      location: 'Location 2',
    },
    {
      id: '3',
      name: 'Tech Conference 2024',
      organizer: 'TechOrg Inc.',
      date: '2024-02-12',
      description: 'A conference focused on the latest in technology and innovation.',
      tags: [{ label: "Academic", color: "#FF4500" }, { label: "Workshop", color: "#8A2BE2" }],
      location: 'Tech Park, City Center',
    },
    {
      id: '4',
      name: 'Community Cleanup',
      organizer: 'Green Earth',
      date: '2023-11-05',
      description: 'Join us for a community-wide cleanup event to make our city greener.',
      tags: [{ label: "Social", color: "#FFD700" }],
      location: 'Main Street Park',
    },
    {
      id: '5',
      name: 'University Workshop',
      organizer: 'University Department',
      date: '2023-12-10',
      description: 'Hands-on workshop for students on web development.',
      tags: [{ label: "Workshop", color: "#8A2BE2" }, { label: "Student Org", color: "#32CD32" }],
      location: 'University Lab, Room 101',
    },
  ]);
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
      {/* Logo as a Pressable for Home Navigation */}
      <Pressable onPress={() => alert("Navigate to Home")}>
        <Ionicons name="home-outline" size={30} color="black" />
      </Pressable>

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

      <Pressable
        style={styles.pressable}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add-circle-outline" size={30} color="black" />
      </Pressable>

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
                style={styles.organizerInput}
                placeholder="Organizer Name"
                value={organizerName}
                onChangeText={setNameOrganizer}
              />
              <TextInput
                style={styles.dateInput}
                placeholder="Date (YYYY-MM-DD)"
                value={eventDate}
                onChangeText={setEventDate}
              />
              <TextInput
                style={styles.descriptionInput}
                placeholder="Event Description"
                value={eventDescription}
                onChangeText={setEventDescription}
              />
              <TextInput
                style={styles.locationInput}
                placeholder="Location"
                value={eventLocation}
                onChangeText={setEventLocation}
              />

              <View style={styles.tagSelection}>
                {tags.map((tag) => (
                  <Pressable
                    key={tag.label}
                    onPress={() => handleTagToggle(tag)}
                    style={[
                      styles.tagOption,
                      selectedTags.includes(tag) && styles.selectedTag,
                    ]}
                  >
                    <Text style={styles.tagOptionText}>{tag.label}</Text>
                  </Pressable>
                ))}
              </View>

              <View style={styles.saveOrCancelButton}>
                <View style={styles.saveButton}>
                  <Button
                    title={editingEvent ? "Save Event" : "Create"}
                    onPress={handleCreateEvent}
                  />
                </View>
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
