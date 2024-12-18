import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useColorScheme } from "react-native";
import { useUser } from "../../components/UserContext";
import axios from "axios";
import { availableTags, Tag, Event } from "./home";
import { router } from "expo-router";
import styles from "@/styles/globalStyles";
import { useFocusEffect } from "@react-navigation/native";


const Profile = ({ }) => {
  const [events, setEvents] = useState<Event[]>([]); // State for storing events
  const colorScheme = useColorScheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cde468fa-90fa-4d3f-8377-4477c8372e4c/d2dbocx-5a37f544-3f7a-46eb-93af-80d906a6abef.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NkZTQ2OGZhLTkwZmEtNGQzZi04Mzc3LTQ0NzdjODM3MmU0Y1wvZDJkYm9jeC01YTM3ZjU0NC0zZjdhLTQ2ZWItOTNhZi04MGQ5MDZhNmFiZWYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.bb3ZHcqr8Wio7OkHgbxFz4iH1f8eL-C5zWoKdRdvRGE"
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [description, setDescription] = useState("Events Enthusiast");
  const { userID, username: initialUsername } = useUser();
  const [username, setUsername] = useState(initialUsername);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `https://eventsphere-web.azurewebsites.net/eventsbyuser/${userID}`
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
          isSaved: false,
        };
      });

      setEvents(mappedEvents);
    } catch (error) {
      setEvents([]); // If an error occurs, set the state to an empty array
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents(); // Fetch events when screen is focused
    }, [])
  );

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  const handleSeeMore = (event: Event) => {
    router.push({
      pathname: "/eventDetails",
      params: { event: JSON.stringify(event) }, // Convert event object to string for navigation
    });
  };

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
        </View>

      </View>
    </Pressable>
  );

  const handleImageUpload = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
    });
    if (result.assets && result.assets.length > 0) {
      setProfilePicture(
        result.assets[0].uri ?? "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cde468fa-90fa-4d3f-8377-4477c8372e4c/d2dbocx-5a37f544-3f7a-46eb-93af-80d906a6abef.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NkZTQ2OGZhLTkwZmEtNGQzZi04Mzc3LTQ0NzdjODM3MmU0Y1wvZDJkYm9jeC01YTM3ZjU0NC0zZjdhLTQ2ZWItOTNhZi04MGQ5MDZhNmFiZWYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.bb3ZHcqr8Wio7OkHgbxFz4iH1f8eL-C5zWoKdRdvRGE"
      );
    } else {
      Alert.alert("Upload Failed", "No image was selected.");
    }
  };

  const saveProfile = () => {
    if (!username.trim() || !description.trim()) {
      Alert.alert(
        "Validation Error",
        "Username and description cannot be empty."
      );
      return;
    }
    setIsEditing(false);
    console.log("Profile saved:", { username, description });
  };

  const handleLogout = () => {
    // Clear user context or any stored data
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          // Clear the user context
          router.replace("/"); // Replace with your login page route
        },
      },
    ]);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: colorScheme === "dark" ? "white" : "white" },
        ]}
      >
        {/* Header */}
        <View style={profile_styles.header}>
          <Text
            style={[
              profile_styles.headerText,
              { color: colorScheme === "dark" ? "black" : "black" },
            ]}
          >
            Profile
          </Text>
          {isEditing ? (
            <TouchableOpacity onPress={saveProfile}>
              <Text style={[profile_styles.editText, { color: "#007bff" }]}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text style={[profile_styles.editText, { color: "#007bff" }]}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Section */}
        <View style={profile_styles.profileSection}>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Image
              source={{ uri: profilePicture }}
              style={profile_styles.profilePicture}
            />
          </TouchableOpacity>
          {isEditing && (
            <TouchableOpacity onPress={handleImageUpload}>
              <Text style={[profile_styles.editText, { color: "#007bff" }]}>
                Choose Photo
              </Text>
            </TouchableOpacity>
          )}
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Name"
              placeholderTextColor="#aaa"
            />
          ) : (
            <Text
              style={[
                profile_styles.profileName,
                { color: colorScheme === "dark" ? "black" : "black" },
              ]}
            >
              {username}
            </Text>
          )}
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
              placeholderTextColor="#aaa"
            />
          ) : (
            <Text style={[profile_styles.profileDescription, { color: "#888" }]}>
              {description}
            </Text>
          )}

          <TouchableOpacity
            style={{
              backgroundColor: "#ff4d4d",
              padding: 10,
              borderRadius: 5,
              marginVertical: 20,
              alignSelf: "center",
            }}
            onPress={() => {
              // Logic for logging out
              handleLogout();
            }}
          >

            <Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text>
          </TouchableOpacity>

          {/* display event cards */}
          <Text style={profile_styles.myEventsText}>My Events</Text>
          <FlatList
            data={events}
            renderItem={renderEventCard}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>No events yet. Create one!</Text>}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
            scrollEventThrottle={16}
          />
        </View>
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={profile_styles.modalCloseButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={profile_styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: profilePicture }}
            style={profile_styles.enlargedProfilePicture}
          />
        </View>
      </Modal>



    </>

  );
};

const profile_styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
  card: {
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "#EEEEEE",
    padding: 10,
    margin: 10,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    maxHeight: 350,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "white",
    marginLeft: 10,
  },
  editText: {
    fontSize: 16,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 2,
  },
  enlargedProfilePicture: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  profileName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  profileDescription: {
    marginTop: 5,
    fontSize: 17,
    color: "#888",
  },
  input: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalCloseButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: "#007bff",
    fontSize: 16,
  },
  myEventsText: {
    fontSize: 16, // Smaller font size
    color: "#888", // Grey color
    textAlign: "left", // Align to the left
    alignSelf: "flex-start",
    margin: 20,
  },
});

export default Profile;
