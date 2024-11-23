import React from "react";
import styles from "@/styles/globalStyles";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { savedEvents } from "./home";

const eventSaved = savedEvents;

export default function displaySavedEvents() {
  return (
    <View style={styles.container}>
      {eventSaved.length === 0 ? (
        <Text>No saved events yet.</Text>
      ) : (
        <FlatList
          data={eventSaved}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardText}>{item.date}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

// const FavoriteScreen = ({ route }) => {
//   const { favoriteTutors } = route.params;  // Favori tutorlar, önceki ekrandan geliyor

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Favorite Tutors</Text>
//       <FlatList
//         data={favoriteTutors}
//         renderItem={({ item }) => (
//           <View style={styles.tutorItem}>
//             <Text style={styles.tutorName}>{item.name}</Text>
//             <Text style={styles.tutorEmail}>{item.email}</Text>
//           </View>
//         )}
//         keyExtractor={(item) => item.name}
//       />
//     </View>
//   );
// };

// // PropTypes checking
// FavoriteScreen.propTypes = {
//   route: PropTypes.shape({
//     params: PropTypes.shape({
//       favoriteTutors: PropTypes.arrayOf(
//         PropTypes.shape({
//           name: PropTypes.string.isRequired, // Tutor names is string ? ?
//           email: PropTypes.string.isRequired, // Tutor email is string ?  ?
//         })
//       ).isRequired,
//     }).isRequired,
//   }).isRequired,
// };
