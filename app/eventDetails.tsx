import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tag } from '../app/(tabs)/index'; // Import Event type
import { useRoute } from '@react-navigation/native';





export default function EventDetailsScreen() {
  const route = useRoute();
  const { event } = route.params as { event: string };
  const parsedEvent = event ? JSON.parse(event) : null;

  // if (!parsedEvent) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.title}>Event not found</Text>
  //     </View>
  //   );
  // }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{parsedEvent.name}</Text>
      <Text style={styles.date}>{parsedEvent.date}</Text>
      <Text style={styles.description}>{parsedEvent.description}</Text>
      <Text style={styles.location}>{parsedEvent.location}</Text>
      <Text style={styles.organizer}>Organized by: {parsedEvent.organizer}</Text>
      <View style={styles.tagContainer}>
        {parsedEvent.tags.map((tag: Tag) => (
          <View key={tag.label} style={[styles.tag, { backgroundColor: tag.color }]}>
            <Text style={styles.tagText}>{tag.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  date: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    marginBottom: 16,
  },
  organizer: {
    fontSize: 16,
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginTop: 5,
  },
  tagText: {
    fontSize: 12,
  },
});