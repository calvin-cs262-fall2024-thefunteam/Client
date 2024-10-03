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

// Predefined tag options with corresponding colors
const tags = [
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
  const [selectedTags, setSelectedTags] = useState([]);
  const [events, setEvents] = useState([]);

  // Function to handle tag selection
  const handleTagToggle = (tag) => {
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

  const renderEventCard = ({ item }) => (
    <View style={styles.card}>
      {/* Event Name, Organizer, and Date */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardText}>{item.name}</Text>
        <Text style={styles.cardText}>by {item.organizer}</Text>
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
        <Button title="Home" onPress={() => alert("Go to Home")} />
        <Button title="Create Event" onPress={() => setModalVisible(true)} />
        <Button title="Profile" onPress={() => alert("Go to Profile")} />
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
    width: "70%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  nameOrgInput: {
    width: "70%",
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
    height: 60,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ddd",
    paddingVertical: 10,
  },
});
``
