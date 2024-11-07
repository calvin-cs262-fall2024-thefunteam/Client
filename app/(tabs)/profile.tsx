// Import essential libraries and components
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  TextInput,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Import Expo's ImagePicker for image selection

// Main Profile component
const Profile = () => {
  // State to store sample user data, including default profile information
  const [userData, setUserData] = useState({
    username: "username",
    followers: 0, // Initial followers count
    following: 0, // Initial following count
    posts: 0, // Initial posts count
    profilePicture: "https://via.placeholder.com/150", // Placeholder image URL for profile picture
  });

  // State for managing modal visibility and new profile information
  const [modalVisible, setModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState(userData.username); // For editing username
  const [newProfilePicture, setNewProfilePicture] = useState(userData.profilePicture); // For updating profile picture

  // Sample posts array with placeholder images, simulating a list of user's posts
  const posts = [
    { id: "1", imageUrl: "https://via.placeholder.com/150" },
    { id: "2", imageUrl: "https://via.placeholder.com/150" },
    { id: "3", imageUrl: "https://via.placeholder.com/150" },
    { id: "4", imageUrl: "https://via.placeholder.com/150" },
    { id: "5", imageUrl: "https://via.placeholder.com/150" },
    { id: "6", imageUrl: "https://via.placeholder.com/150" },
  ];

  // Function to render each post as an image in a grid layout
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
    </View>
  );

  // Handle profile edits by updating username and profile picture and closing modal
  const handleEditProfile = () => {
    setUserData({
      ...userData,
      username: newUsername,
      profilePicture: newProfilePicture,
    });
    setModalVisible(false); // Hide modal after saving changes
  };

  // Function to open the image picker and allow user to select a profile picture
  const pickImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!"); // Alert if permission denied
      return;
    }

    // Launch image picker and allow user to edit selected image
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setNewProfilePicture(pickerResult.assets[0].uri); // Set selected image URI if not canceled
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Header: Displays profile picture, username, and stats */}
      <View style={styles.header}>
        <Pressable onPress={pickImage}>
          <Image
            source={{ uri: newProfilePicture }}
            style={styles.profilePicture}
          />
        </Pressable>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{userData.username}</Text>
          <View style={styles.statsContainer}>
            <Text style={styles.stats}>
              <Text style={styles.statsCount}>{userData.posts}</Text> Posts
            </Text>
            <Text style={styles.stats}>
              <Text style={styles.statsCount}>{userData.followers}</Text> Followers
            </Text>
            <Text style={styles.stats}>
              <Text style={styles.statsCount}>{userData.following}</Text> Following
            </Text>
          </View>
          <Pressable style={styles.editButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </Pressable>
        </View>
      </View>

      {/* Posts Grid: Displays user's posts in a grid format with 3 columns */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        numColumns={3} // Specifies a 3-column grid layout
        contentContainerStyle={styles.postsGrid}
      />

      {/* Edit Profile Modal: Form for editing username and profile picture */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={newUsername}
              onChangeText={setNewUsername}
            />
            <Button title="Save Changes" onPress={handleEditProfile} />
            <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles for Profile component layout and visuals
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  stats: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
  statsCount: {
    fontWeight: "bold",
    color: "#000",
  },
  editButton: {
    backgroundColor: "#0095f6",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  postsGrid: {
    justifyContent: "center",
    alignItems: "center",
  },
  postContainer: {
    flex: 1,
    margin: 1,
  },
  postImage: {
    width: "100%",
    height: 120,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: "100%",
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Profile;
