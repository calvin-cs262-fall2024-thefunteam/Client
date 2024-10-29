import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EventDetailsScreen({  }) {
  return (
    <Text>hello</Text>
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