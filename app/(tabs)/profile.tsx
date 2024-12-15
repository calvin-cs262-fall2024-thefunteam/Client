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
  Dimensions,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Pressable } from "react-native";
import { router } from "expo-router";
import { useUser } from "../../components/UserContext";
import Event, { availableTags, Tag } from "../(tabs)/home";
import axios from "axios";
import savedEvents from "./savedEvents";

const ProfileStats = ({ posts, followers, following, colorScheme }) => (
  <View style={styles.statsContainer}>
    {[
      { label: "Posts", value: posts },
      { label: "Followers", value: followers },
      { label: "Following", value: following },
    ].map((stat, index) => (
      <View key={index} style={styles.statBox}>
        <Text
          style={[
            styles.statNumber,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}
        >
          {stat.value}
        </Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
      </View>
    ))}
  </View>
);

export type Event = {
  id: string;
  name: string;
  organizer: string;
  date: string;
  description: string;
  tags?: Tag[]; // optional
  location: string;
  isSaved: boolean;
};

const Profile = ({ route }) => {
  const colorScheme = useColorScheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/100"
  );
  const [username, setUsername] = useState("Guest");
  const [description, setDescription] = useState("Events Enthusiast");
  const [followers, setFollowers] = useState(0);
  const [posts, setPosts] = useState(0);
  const [following, setFollowing] = useState(0);
  const [joinedClubs, setJoinedClubs] = useState([]); // Dynamic list for clubs
  const { userID } = useUser();
  const [myEvents, setMyEvents] = useState<Event[]>([]); // Dynamic list for events

  // Initialize username dynamically if provided through login
  useEffect(() => {
    if (route?.params?.username) {
      setUsername(route.params.username);
    }
  }, [route?.params?.username]);

  const handleImageUpload = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
    });
    if (result.assets && result.assets.length > 0) {
      setProfilePicture(
        result.assets[0].uri ?? "https://via.placeholder.com/100"
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

  const handleSeeMore = (event: Event) => {
    router.push({
      pathname: "/eventDetails",
      params: { event: JSON.stringify(event) }, // Convert event object to string for navigation
    });
  };

  const fetchmyEvents = async () => {
    try {
      const response = await axios.get(
        `https://eventsphere-web.azurewebsites.net/savedEvents/${userID}`
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
          organizer: `Organizer ${tempEvent.organizerid}`, // Assuming organizer is retrieved this way
          date: tempEvent.date.split("T")[0], // Format date to 'YYYY-MM-DD'
          description: tempEvent.description,
          tags: eventTags,
          location: tempEvent.location,
          isSaved: false, // Default to false
        };
      });

      setMyEvents(mappedEvents); // Sets the mapped events to state
    } catch (error) {
      console.error("Error fetching saved events:", error);
    }
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

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text
            style={[
              styles.headerText,
              { color: colorScheme === "dark" ? "#fff" : "#000" },
            ]}
          >
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
          <TouchableOpacity onPress={handleImageUpload}>
            <Image
              source={{ uri: profilePicture }}
              style={styles.profilePicture}
            />
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
            <Text
              style={[
                styles.profileName,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
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
            <Text style={[styles.profileDescription, { color: "#888" }]}>
              {description}
            </Text>
          )}
          <ProfileStats
            posts={posts}
            followers={followers}
            following={following}
            colorScheme={colorScheme}
          />
        </View>
      </View>
      <View>
        
      </View>

    </>
  );
};

const styles = StyleSheet.create({
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Light background for search bar
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20, // Adds space below the search bar
    width: "100%", // Adjust width to your preference
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5, // Adds a subtle shadow for iOS
  },
  searchIcon: {
    marginRight: 10, // Space between icon and input field
  },
  searchInput: {
    flex: 1,
    height: 40, // Ensures the input field has a consistent height
    fontSize: 16, // Adjust font size for readability
    color: "#333", // Dark text for contrast
    borderRadius: 20, // Rounded corners for input field
    paddingLeft: 10, // Padding to keep the text away from the edges
    backgroundColor: "#fff", // Ensure the text input has a clean white background
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  cardDateLocationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Optional: to vertically center the text
  },
  cardLocation: {
    fontSize: 14,
    color: "gray",
    marginLeft: 160,
  },
  cardDate: {
    fontSize: 14,
    color: "gray",
  },
  cardText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  separator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  cardDescription: {
    marginBottom: 5,
    maxHeight: 60,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginTop: 5,
  },
  tagText: {
    fontSize: 12,
  },

  pressable: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "90%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventNameInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  nameOrgInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  dateAndLocationInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateInput: {
    width: "48%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  locationInput: {
    width: "48%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  descriptionInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    height: 150,
  },
  tagSelectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    padding: 12,
  },
  saveButton: {
    fontSize: 14, //cant change font size for some reason
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14, // Smaller font size
  },
  cancelButton: {
    marginHorizontal: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#FF0000",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
  },
  saveOrCancelButton: {
    paddingVertical: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  buttonContainerCard: {
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    paddingStart: "55%",
    padding: 10,
    paddingBottom: 15,
  },
  tagAndButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    padding: 10,
    marginLeft: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  bookmarkIcon: {
    position: "absolute",
    justifyContent: "flex-end",
    right: 0,
    top: -15,
  },
  seeMoreText: {
    color: "blue",
  },
});

export default Profile;
