import React, { useState } from "react";
import { Text, View, Button, Modal, TextInput, StyleSheet, FlatList, Dimensions } from "react-native";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [events, setEvents] = useState([]);

  const handleCreateEvent = () => {
    if (eventName.trim()) {
      // Add the new event to the list
      setEvents([...events, { id: Date.now().toString(), name: eventName }]);
      setEventName(''); // Reset input
      setModalVisible(false); // Close the modal
    }
  };

  const renderEventCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No events yet. Create one!</Text>}
        contentContainerStyle={{ width: '2000',flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
      />

      <Button title="Create Event" onPress={() => setModalVisible(true)} />

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
              style={styles.input}
              placeholder="Event Name"
              value={eventName}
              onChangeText={setEventName}
            />
            <Button title="Submit" onPress={handleCreateEvent} />
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}


const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalView: {
    width: '70%',
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    width: '70%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  card: {
    width: 0.8 * width,
    padding: 20,
    backgroundColor: "red",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
  },
});
