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

const Profile = ({}) => {
  const [events, setEvents] = useState<Event[]>([]);
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
    const response = await axios.get(
      `https://eventsphere-web.azurewebsites.net/eventsbyuser/${userID}`
    );
    const tempEvents: any[] = response.data;

    const mappedEvents: Event[] = tempEvents.map((tempEvent) => {
      const eventTags = tempEvent.tagsarray
        .map((tagId: number) => {
          return availableTags.find((tag) => tag.id === tagId);
        })
        .filter(Boolean) as Tag[];

      return {
        id: String(tempEvent.id),
        name: tempEvent.name,
        organizer: tempEvent.organizer,
        date: tempEvent.date.split("T")[0],
        description: tempEvent.description,
        tags: eventTags,
        location: tempEvent.location,
        organizerID: tempEvent.organizerid,
        isSaved: false,
      };
    });

    setEvents(mappedEvents);
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents(); // Fetch events when screen is focused
    }, [])
  );

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handleSeeMore = (event: Event) => {
    router.push({
      pathname: "/eventDetails",
      params: { event: JSON.stringify(event) },
    });
  };

  const renderEventCard = ({ item }: { item: Event }) => (
    <Pressable onPress={() => handleSeeMore(item)}>
      <View style={profile_styles.eventCard}>
        <View style={profile_styles.eventHeader}>
          <Text style={profile_styles.eventTitle}>{item.name}</Text>
        </View>
        <Text style={profile_styles.eventDate}>{item.date}</Text>
        <Text style={profile_styles.eventLocation}>{item.location}</Text>
        <Text style={profile_styles.eventDescription}>{truncateText(item.description, 60)}</Text>

        <View style={profile_styles.tagContainer}>
          {item.tags.map((tag: Tag) => (
            <View key={tag.label} style={[profile_styles.tag, { backgroundColor: tag.color }]}>
              <Text style={profile_styles.tagText}>{tag.label}</Text>
            </View>
          ))}
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
      const imageUri = result.assets[0].uri;
      setProfilePicture(imageUri);
    }
  };

  const saveProfile = async () => {
    if (!username.trim() || !description.trim()) {
      Alert.alert("Validation Error", "Username and description cannot be empty.");
      return;
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          router.replace("/"); // Replace with your login page route
        },
      },
    ]);
  };

  return (
    <>
      <View style={profile_styles.container}>
        {/* Header */}
        <View style={profile_styles.header}>
          <Text style={profile_styles.headerText}>Profile</Text>
          {isEditing ? (
            <TouchableOpacity onPress={saveProfile} style={profile_styles.saveButton}>
              <Text style={profile_styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)} style={profile_styles.editButton}>
              <Text style={profile_styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Section */}
        <View style={profile_styles.profileSection}>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Image source={{ uri: profilePicture }} style={profile_styles.profilePicture} />
          </TouchableOpacity>
          {isEditing && (
            <TouchableOpacity onPress={handleImageUpload} style={profile_styles.changePhotoButton}>
              <Text style={profile_styles.changePhotoButtonText}>Change Photo</Text>
            </TouchableOpacity>
          )}
          {isEditing ? (
            <TextInput
              style={profile_styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
            />
          ) : (
            <Text style={profile_styles.username}>{username}</Text>
          )}
          {isEditing ? (
            <TextInput
              style={profile_styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
            />
          ) : (
            <Text style={profile_styles.description}>{description}</Text>
          )}
        </View>

        {/* Event List */}
        <FlatList
          data={events}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.id}
        />

        {/* Modal for Image Upload */}
        <Modal
          visible={isModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <Pressable
            style={profile_styles.modalBackground}
            onPress={() => setIsModalVisible(false)}
          >
            <View style={profile_styles.modalContent}>
              <Text style={profile_styles.modalTitle}>Choose Profile Picture</Text>
              <TouchableOpacity onPress={handleImageUpload} style={profile_styles.modalButton}>
                <Text style={profile_styles.modalButtonText}>Choose Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={profile_styles.modalButton}
              >
                <Text style={profile_styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </View>
    </>
  );
};

const profile_styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9", // Softer background color for better contrast
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    marginBottom: 15,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  saveButtonText: {
    color: "#007bff", // Blue text for Save
    fontSize: 16,
    fontWeight: "600",
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  editButtonText: {
    color: "#e74c3c", // Red text for Edit
    fontSize: 16,
    fontWeight: "600",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 25,
    flexDirection: "column", // Ensures that the profile picture and button stack vertically
    justifyContent: "center", // Centers the items vertically within the section
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#ddd", // Soft border to make the image stand out
    marginBottom: 10,
  },
  changePhotoButton: {
    marginTop: 15, // Increased margin to ensure there's enough space between the profile image and the button
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 5,
    backgroundColor: "#007bff",
  },
  changePhotoButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    marginTop: 5,
  },
  input: {
    width: 250,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    textAlign: "center",
  },
  eventCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  eventHeader: {
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  eventDate: {
    fontSize: 14,
    color: "#888",
  },
  eventLocation: {
    fontSize: 14,
    color: "#888",
  },
  eventDescription: {
    fontSize: 14,
    marginTop: 5,
    color: "#555",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tag: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: "#333",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 10,
    width: Dimensions.get("window").width - 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Profile;
