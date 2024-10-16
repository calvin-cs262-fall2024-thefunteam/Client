import React, { useState } from "react";
import {
    Text,
    View,
} from "react-native";
import styles from "../styles/globalStyles.js";


const EventCard = () => {
    // Predefined tag options with corresponding colors
    type Tag = {
        label: string;
        color: string;
    };

    const tags: Tag[] = [
        { label: "Social", color: "#FFD700" },
        { label: "Sports", color: "#1E90FF" },
        { label: "Student Org", color: "#32CD32" },
        { label: "Academic", color: "#FF4500" },
        { label: "Workshop", color: "#8A2BE2" },
    ];

    const [modalVisible, setModalVisible] = useState(false);
    const [eventName, setEventName] = useState("");
    const [organizerName, setNameOrganizer] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [eventLocation, setEventLocation] = useState("");

    type Event = {
        id: string;
        name: string;
        organizer: string;
        date: string;
        description: string;
        tags: Tag[];
        location: string;
    };

    const [events, setEvents] = useState<Event[]>([]);

    // Function to handle tag selection
    const handleTagToggle = (tag: Tag) => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.includes(tag)
                ? prevSelectedTags.filter((t) => t !== tag)
                : [...prevSelectedTags, tag]
        );
    };

    const handleCreateEvent = () => {
        if (eventName.trim() && eventDate.trim()) {
            // Add the new event to the list
            setEvents([
                ...events,
                {
                    id: Date.now().toString(),
                    name: eventName,
                    organizer: organizerName,
                    date: eventDate,
                    description: eventDescription,
                    tags: selectedTags,
                    location: eventLocation, // Add location here
                },
            ]);
            // Reset inputs
            setEventName("");
            setEventDate("");
            setNameOrganizer("");
            setEventDescription("");
            setSelectedTags([]);
            setEventLocation("");
            setModalVisible(false); // Close the modal
        }
    };

    const filteredEvents = events.filter(
        (event) =>
            event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.tags.some((tag) =>
                tag.label.toLowerCase().includes(searchQuery.toLowerCase())
            )
    );

    const renderEventCard = ({ item }: { item: Event }) => (
        <View style={styles.card}>
            {/* Event Name and Date */}
            <View style={styles.cardHeader}>
                <Text style={styles.cardText}>{item.name}</Text>
                <Text style={styles.cardText}>{item.organizer}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
            </View>

            {/* Separator Line */}
            <View style={styles.separator} />

            {/* Description */}
            <Text style={styles.cardDescription}>{item.description}</Text>

            {/* Tags */}
            <View style={styles.tagContainer}>
                {item.tags.map((tag) => (
                    <View
                        key={tag.label}
                        style={[styles.tag, { backgroundColor: tag.color }]}
                    >
                        <Text style={styles.tagText}>{tag.label}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default EventCard;