import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const Profile = ({ route }) => {
  const colorScheme = useColorScheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState("https://via.placeholder.com/100");
  const [username, setUsername] = useState("Guest");
  const [description, setDescription] = useState("Events Enthusiast");
  const [followers, setFollowers] = useState(0);
  const [posts, setPosts] = useState(0);
  const [following, setFollowing] = useState(0);
  const [joinedClubs, setJoinedClubs] = useState([]);

  useEffect(() => {
    if (route?.params?.username) {
      setUsername(route.params.username);
    }
  }, [route?.params?.username]);

  const saveProfile = () => {
    setIsEditing(false);
    console.log("Profile saved:", { username, description, profilePicture });
  };

  const handleProfilePictureChange = async () => {
    const result = await launchImageLibrary({ mediaType: "photo" });
    if (result?.assets?.length > 0) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
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
        <TouchableOpacity onPress={isEditing ? saveProfile : () => setIsEditing(true)}>
          <Text style={[styles.editText, { color: "#007bff" }]}>
            {isEditing ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={isEditing ? handleProfilePictureChange : null}>
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
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        {["Posts", "Followers", "Following"].map((label, index) => (
          <View style={styles.statBox} key={index}>
            <Text style={[styles.statNumber, { color: colorScheme === "dark" ? "#fff" : "#000" }]}>
              {label === "Posts" ? posts : label === "Followers" ? followers : following}
            </Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
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

      {/* Navigation Links */}
      <View style={styles.navigationContainer}>
        {["Notifications", "FAQs", "Contact Us", "Sign Out"].map((item, index) => (
          <View style={styles.navigationRow} key={index}>
            <Text style={styles.navigationText}>{item}</Text>
            <Text style={styles.arrow}>→</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  editText: {
    fontSize: 16,
    color: "#007bff",
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    color: "#000",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
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
    paddingHorizontal: 20,
  },
  clubsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  clubRow: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  navigationContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  navigationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  navigationText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 16,
    color: "#888",
  },
});

export default Profile;
