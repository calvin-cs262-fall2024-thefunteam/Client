import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../components/UserContext";
import { Event, availableTags, Tag } from "../app/(tabs)/home";

const useSavedEvents = () => {
    const [savedEvents, setSavedEvents] = useState<Event[]>([]);
    const { userID } = useUser();

    const fetchSavedEvents = async () => {
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
                    organizer: tempEvent.organizer,
                    date: tempEvent.date.split("T")[0], // Format date to 'YYYY-MM-DD'
                    description: tempEvent.description,
                    tags: eventTags,
                    location: tempEvent.location,
                    organizerID: tempEvent.organizerid,
                    isSaved: true, // Default to true for saved events
                };
            });

            setSavedEvents(mappedEvents); // Sets the mapped events to state

        } catch (error) {
            setSavedEvents([]); // If an error occurs, set the state to an empty array
        }
    };

    useEffect(() => {
        fetchSavedEvents();
    }, [userID]);

    return { savedEvents, fetchSavedEvents };
};

export default useSavedEvents;