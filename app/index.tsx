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
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import SearchBar from "../components/SearchBar"; // Import SearchBar component

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
          location: eventLocation, // Add location here
        },
      ]);
      // Reset inputs
      setEventName("");
      setEventDate("");
      setNameOrganizer("");
      setEventDescription("");
      setSelectedTags([]);
      setEventLocation("");
      setModalVisible(false); // Close the modal
    }
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
      {/* Search bar at the top */}
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

      {/* Event List */}
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
                placeholder="Location: e.g. Johnny's Cave"
                value={eventLocation}
                onChangeText={setEventLocation}
              />
            </View>

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

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "70%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  eventNameInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  nameOrgInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  input: {
    width: "70%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },

  descriptionInput: {
    width: "100%",
    height: 80,
  },
  tagSelectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  tagOption: {
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  card: {
    width: 0.8 * width,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDate: {
    fontSize: 14,
    color: "gray",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "gray",
    marginVertical: 10,
  },
  cardDescription: {
    fontSize: 16,
    textAlign: "left",
    width: "100%",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 14,
    color: "#fff",
  },
  bottomBar: {
    width: "100%",
    height: 70,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ddd",
    paddingVertical: 10,
  },
  buttonContainer: {
    alignItems: "center",
  },
  pressable: {
    backgroundColor: "", // Background color for the pressable buttons
    padding: 10,

    borderRadius: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%', // Adjust based on your layout requirements
    marginBottom: 20, // Optional margin to space it from the rest of the content
  },
  searchIcon: {
    marginRight: 10, // Space between the icon and the SearchBar
  },
  searchInput: {
    flex: 1, // Makes the SearchBar take the remaining space
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
});
``;
