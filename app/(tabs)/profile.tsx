import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const ProfileStats = ({ posts, followers, following, colorScheme }) => (
  <View style={styles.statsContainer}>
    {[
      { label: "Posts", value: posts },
      { label: "Followers", value: followers },
      { label: "Following", value: following },
    ].map((stat, index) => (
      <View key={index} style={styles.statBox}>
        <Text
          style={[styles.statNumber, { color: colorScheme === "dark" ? "#fff" : "#000" }]}
        >
          {stat.value}
        </Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
      </View>
    ))}
  </View>
);

const ClubsList = ({ clubs, colorScheme }) => (
  <View style={styles.clubsSection}>
    <Text style={[styles.clubsHeader, { color: colorScheme === "dark" ? "#fff" : "#000" }]}>Part of...</Text>
    {clubs.length > 0 ? (
      clubs.map((club, index) => (
        <View
          key={club.id || index}
          style={[styles.clubRow, { backgroundColor: colorScheme === "dark" ? "#333" : "#f9f9f9" }]}
        >
          <Text style={[styles.clubText, { color: colorScheme === "dark" ? "#fff" : "#000" }]}>
            {club.name || club}
          </Text>
        </View>
      ))
    ) : (
      <Text style={{ color: "#888", fontStyle: "italic" }}>No clubs joined yet</Text>
    )}
  </View>
);

const Profile = ({ route }) => {
  const colorScheme = useColorScheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState("https://via.placeholder.com/100");
  const [username, setUsername] = useState("Guest");
  const [description, setDescription] = useState("Events Enthusiast");
  const [followers, setFollowers] = useState(0);
  const [posts, setPosts] = useState(0);
  const [following, setFollowing] = useState(0);
  const [joinedClubs, setJoinedClubs] = useState([]); // Dynamic list for clubs

  // Initialize username dynamically if provided through login
  useEffect(() => {
    if (route?.params?.username) {
      setUsername(route.params.username);
    }
  }, [route?.params?.username]);

  const handleImageUpload = async () => {
    const result = await launchImageLibrary({ mediaType: "photo", quality: 0.5 });
    if (result.assets && result.assets.length > 0) {
      setProfilePicture(result.assets[0].uri);
    } else {
      Alert.alert("Upload Failed", "No image was selected.");
    }
  };

  const saveProfile = () => {
    if (!username.trim() || !description.trim()) {
      Alert.alert("Validation Error", "Username and description cannot be empty.");
      return;
    }
    setIsEditing(false);
    console.log("Profile saved:", { username, description });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: colorScheme === "dark" ? "#fff" : "#000" }]}>Profile</Text>
        {isEditing ? (
          <TouchableOpacity onPress={saveProfile}>
            <Text style={[styles.editText, { color: "#007bff" }]}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={[styles.editText, { color: "#007bff" }]}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleImageUpload}>
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        </TouchableOpacity>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Name"
            placeholderTextColor="#aaa"
          />
        ) : (
          <Text style={[styles.profileName, { color: colorScheme === "dark" ? "#fff" : "#000" }]}>
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
          <Text style={[styles.profileDescription, { color: "#888" }]}>{description}</Text>
        )}
        <ProfileStats posts={posts} followers={followers} following={following} colorScheme={colorScheme} />
      </View>

      {/* Clubs Section */}
      <ClubsList clubs={joinedClubs} colorScheme={colorScheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
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
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  profileDescription: {
    fontSize: 14,
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
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  statBox: {
    alignItems: "center",
    width: "30%",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
  },
  clubsSection: {
    width: "90%",
    marginTop: 20,
  },
  clubsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  clubRow: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  clubText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
