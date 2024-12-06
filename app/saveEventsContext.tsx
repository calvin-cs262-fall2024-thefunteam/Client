import React, { createContext, useState } from "react";

// Create context
export const SavedEventsContext = createContext();

export const SavedEventsProvider = ({ children }) => {
  const [savedEvents, setSavedEvents] = useState([]);

  const addEvent = (event) => {
    // Avoid duplicates
    setSavedEvents((prev) =>
      prev.find((e) => e.id === event.id) ? prev : [...prev, event]
    );
  };

  const removeEvent = (eventId) => {
    setSavedEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  return (
    <SavedEventsContext.Provider value={{ savedEvents, addEvent, removeEvent }}>
      {children}
    </SavedEventsContext.Provider>
  );
};
