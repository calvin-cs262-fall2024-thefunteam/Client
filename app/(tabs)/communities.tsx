import React from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/communitiesNavigation"; // Adjust path as needed
import styles from "@/styles/globalStyles";

const communityData = [
  { id: "1", name: "Tech Enthusiasts" },
  { id: "2", name: "Art Lovers" },
  { id: "3", name: "Fitness Group" },
  { id: "4", name: "Foodies United" },
  { id: "5", name: "Book Club" },
];

// Define the navigation prop type for this component
/**
 * @typedef {NativeStackNavigationProp<RootStackParamList, "Communities">} CommunitiesScreenNavigationProp
 */

export default function Communities() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={communityData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.communityItem}
            onPress={
              () =>
                navigation.navigate("communityDetails", {
                  communityId: item.id,
                })
              // ignore this error for now. It still works with it
            }
          >
            <Text style={styles.communityName}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

/**
 * Communities component: Displays a list of communities with navigation to their details.
 * 
 * @component
 * @returns {JSX.Element} A JSX element rendering the list of communities.
 * 
 * @example
 * <Communities />
 * 
 * @description
 * - Uses `FlatList` to display community data.
 * - `Pressable` navigates to the community details screen.
 * - Navigation type is defined by `CommunitiesScreenNavigationProp`.
 * 
 * @requires react
 * @requires react-native
 * @requires @react-navigation/native
 * @requires @react-navigation/native-stack
 * @requires @/app/communitiesNavigation
 * @requires @/styles/globalStyles
 */
