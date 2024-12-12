import React, { useState } from "react";
import styles from "@/styles/globalStyles";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";


export default function displaySavedEvents() {
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  

  // const function getSavedEvents() = async (userID: number) => {
  //   try{
  //     const response = await fetch(`https://eventsphere-web.azurewebsites.net/users/savedEvents`);
  //   }
  // }

  return (
    <View style={styles.container}>
      
    </View>
  );
}
