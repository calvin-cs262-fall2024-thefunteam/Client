import React, { useState } from "react";
import styles from "@/styles/globalStyles";
import {
  View,
  Text,
  FlatList,
  Pressable,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import useSavedEvents from "../../hooks/useSavedEvents"; // Import custom hook
import { Event, Tag } from "../(tabs)/home";

export default function displaySavedEvents() {
  const { savedEvents, fetchSavedEvents } = useSavedEvents(); // Use custom hook
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchSavedEvents();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSavedEvents();
    setRefreshing(false);
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
    <View style={styles.container}>
      <FlatList
        data={savedEvents}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<Text>No saved events.</Text>}
      />
    </View>
  );
}