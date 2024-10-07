import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import styles from "../styles/styles"; // Import styles

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
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  type Event = {
    id: string;
    name: string;
    organizer: string;
    date: string;
    description: string;
    tags: Tag[];
  };

  const [events, setEvents] = useState<Event[]>([]);

  // Function to handle tag selection
  const handleTagToggle = (tag: Tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const handleCreateEvent = () => {
    if (eventName.trim() && eventDate.trim()) {
      // Add the new event to the list
      setEvents([
        ...events,
        {
          id: Date.now().toString(),
          name: eventName,
          organizer: organizerName,
          date: eventDate,
          description: eventDescription,
          tags: selectedTags,
        },
      ]);
      // Reset inputs
      setEventName("");
      setEventDate("");
      setNameOrganizer("");
      setEventDescription("");
      setSelectedTags([]);
      setModalVisible(false); // Close the modal
    }
  };

  const renderEventCard = ({ item }: { item: Event }) => (
    <View style={styles.card}>
      {/* Event Name and Date */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardText}>{item.name}</Text>
        <Text style={styles.cardText}>{item.organizer}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>

      {/* Separator Line */}
      <View style={styles.separator} />

      {/* Description */}
      <Text style={styles.cardDescription}>{item.description}</Text>

      {/* Tags */}
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
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
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
          <Pressable style={styles.pressable} onPress={() => alert("Go to Home")}
            >
            <Ionicons name="home-outline" size={30} color="black" />
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.pressable} onPress={() => setModalVisible(true)}>
            <Ionicons name="add-circle-outline" size={30} color="black" />
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.pressable} onPress={() => alert("Go to Profile")}>
            <Ionicons name="person-outline" size={30} color="black" />  
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.pressable} onPress={() => alert("Go to Communities")}>
            <Ionicons name="people-outline" size={30} color="black" />  
          </Pressable>
        </View>
      </View>

      {/* Modal for event creation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create New Event</Text>

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

            <TextInput
              style={styles.input}
              placeholder="Date (MM/DD/YYYY)"
              value={eventDate}
              onChangeText={setEventDate}
            />

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Description"
              value={eventDescription}
              onChangeText={setEventDescription}
              multiline
            />

            {/* Tag selection */}
            <Text style={styles.modalText}>Select Tags</Text>
            <View style={styles.tagSelectionContainer}>
              {tags.map((tag) => (
                <Pressable
                  key={tag.label}
                  onPress={() => handleTagToggle(tag)}
                  style={[
                    styles.tagOption,
                    selectedTags.includes(tag)
                      ? { backgroundColor: tag.color }
                      : { backgroundColor: "#eee" },
                  ]}
                >
                  <Text>{tag.label}</Text>
                </Pressable>
              ))}
            </View>

            <Button title="Submit" onPress={handleCreateEvent} />
            <Button
              title="Cancel"
              color="red"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

