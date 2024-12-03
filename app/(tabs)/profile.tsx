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
} from "react-native";

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

  // Save edited details and return to view mode
  const saveProfile = () => {
    setIsEditing(false);
    // Add logic here to save details to the backend
    console.log("Profile saved:", { username, description });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: colorScheme === "dark" ? "#fff" : "#000" }]}>
          Profile
        </Text>
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
        <TouchableOpacity>
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
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: colorScheme === "dark" ? "#fff" : "#000" }]}>
              {posts}
            </Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: colorScheme === "dark" ? "#fff" : "#000" }]}>
              {followers}
            </Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: colorScheme === "dark" ? "#fff" : "#000" }]}>
              {following}
            </Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* Clubs Section */}
      <View style={styles.clubsSection}>
        <Text style={[styles.clubsHeader, { color: colorScheme === "dark" ? "#fff" : "#000" }]}>
          Part of...
        </Text>
        {joinedClubs.length > 0 ? (
          joinedClubs.map((club, index) => (
            <View
              key={index}
              style={[
                styles.clubRow,
                { backgroundColor: colorScheme === "dark" ? "#333" : "#f9f9f9" },
              ]}
            >
              <Text
                style={[
                  styles.clubText,
                  { color: colorScheme === "dark" ? "#fff" : "#000" },
                ]}
              >
                {club}
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ color: "#888", fontStyle: "italic" }}>No clubs joined yet</Text>
        )}
      </View>

      {/* Bottom Lines */}
      <View style={styles.bottomSection}>
        <View
          style={[
            styles.bottomLine,
            { backgroundColor: colorScheme === "dark" ? "#333" : "#ccc" },
          ]}
        />
        <View
          style={[
            styles.bottomLine,
            { backgroundColor: colorScheme === "dark" ? "#333" : "#ccc" },
          ]}
        />
      </View>
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
    justifyContent: "space-around",
    width: "80%",
    marginTop: 20,
  },
  statBox: {
    alignItems: "center",
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
  bottomSection: {
    width: "90%",
    marginTop: 20,
  },
  bottomLine: {
    height: 2,
    width: "100%",
    marginVertical: 5,
  },
});

export default Profile;
