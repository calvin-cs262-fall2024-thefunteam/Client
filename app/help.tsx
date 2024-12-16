import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const HelpScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Section: Getting Started */}
      <Text style={styles.header}>Getting Started</Text>
      <Text style={styles.text}>
        <Text style={styles.subHeader}>What is EventSphere?</Text>
        {"\n"}
        EventSphere is your go-to platform for exploring campus activities, meeting people, and organizing events. Whether you’re browsing events or creating one, EventSphere helps you stay connected.
      </Text>

      {/* Section: How to Use EventSphere */}
      <Text style={styles.header}>How to Use EventSphere</Text>

      <Text style={styles.subHeader}>Finding Events</Text>
      <Text style={styles.text}>
        <Text style={styles.listItem}>• Explore Events:</Text> Visit the homepage to view event cards. Each card displays:{"\n"}
        - Event Name{"\n"}- Date, Time, Location{"\n"}- Preview Image{"\n"}
        <Text style={styles.listItem}>• Search or Filter Events:</Text> Use filters by category, date, or location. Sort events by relevance, like upcoming dates or nearby locations.{"\n"}
        <Text style={styles.listItem}>• View Details:</Text> Tap an event card to see full details and RSVP.
      </Text>

      <Text style={styles.subHeader}>Joining Clubs</Text>
      <Text style={styles.text}>
        Search for club events, like the Abstraction Kickoff, on the homepage. RSVP to connect with club members. If you missed Cokes and Clubs, don’t worry—you can still join clubs through these events!
      </Text>

      <Text style={styles.subHeader}>Creating Events</Text>
      <Text style={styles.text}>
        <Text style={styles.listItem}>• Simple Event Creation:</Text> Go to the Create Event tab. Fill out a short form with:{"\n"}
        - Event Name{"\n"}- Date/Time/Location{"\n"}- Description{"\n"}- Optional: Add an image.{"\n"}
        <Text style={styles.listItem}>• Finalize Event:</Text> Confirm creation.{"\n"}
        <Text style={styles.listItem}>• Editing Events:</Text> Go to My Events and select the event. Update the title, description, date, or location. Notify attendees about changes with push notifications.
      </Text>

      <Text style={styles.subHeader}>RSVP</Text>
      <Text style={styles.text}>
        <Text style={styles.listItem}>• RSVP to Events:</Text> Tap the RSVP button in the event details. Receive a confirmation of your RSVP.{"\n"}
        <Text style={styles.listItem}>• Cancel RSVP:</Text> Go to My RSVPs > Select the event > Tap Cancel RSVP.
      </Text>

      {/* Section: Frequently Asked Questions */}
      <Text style={styles.header}>Frequently Asked Questions</Text>
      <Text style={styles.text}>
        <Text style={styles.listItem}>• How do I cancel my RSVP?</Text> Go to My RSVPs > Select the event > Tap Cancel RSVP.{"\n"}
        <Text style={styles.listItem}>• What happens after creating an event?</Text> The event you created will appear on the homepage.
      </Text>

      {/* Section: Fostering Community */}
      <Text style={styles.header}>Fostering Community</Text>
      <Text style={styles.text}>
        EventSphere keeps you informed and connected. By making it easy to find and join events, you’ll strengthen your sense of belonging and build lifelong memories.
      </Text>

      {/* Section: User Stories */}
      <Text style={styles.header}>User Stories</Text>
      <Text style={styles.text}>
        <Text style={styles.listItem}>• Story 1:</Text> Jake is a freshman who just got to Calvin and is interested in film and recreational sports. However, Jake didn’t get to see all the tables at Cokes and Clubs due to class and didn’t get to sign up for any of the clubs he wanted.{"\n"}
        <Text style={styles.listItem}>• Story 2:</Text> Jake now uses the EventSphere app to see what events are going on around campus and finds that the film club is having their kickoff event and shows up and gets connected to the people in the film club.{"\n"}
        <Text style={styles.listItem}>• Story 3:</Text> Jake also wants to gather some people to play pick-up basketball, but him and his friends aren’t enough to play a full game. Jake posts the event as a pick-up basketball game and says he needs 5 more people. 5 people RSVP to the event and now Jake and his friends know they can play and then show up to the court and play basketball with 5 random people he’s never met before.{"\n"}
        <Text style={styles.listItem}>• Story 4:</Text> Jake feels a huge connection to Calvin University and feels that he belongs here because he is informed of the many activities that are happening around campus thanks to EventSphere.{"\n"}
        <Text style={styles.listItem}>• Story 5:</Text> As an event organizer, I want to edit the event details after creation, so that I can update information based on any changes or new insights.{"\n"}
        <Text style={styles.listItem}>• Story 6:</Text> As a user of the app, I want to invite guests to my event via email or social media, so that I can ensure that all the important people are aware of the event and can RSVP.{"\n"}
        <Text style={styles.listItem}>• Story 7:</Text> As an event organizer, I want to easily create an event by filling out a simple form, so that I can quickly share the event details with my audience.{"\n"}
        <Text style={styles.listItem}>• Story 8:</Text> As a user, I want to browse through events displayed as cards on the homepage, each card containing key details about the event.
      </Text>
    </ScrollView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
    color: "#555",
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
    marginBottom: 12,
  },
  listItem: {
    fontWeight: "bold",
  },
});
