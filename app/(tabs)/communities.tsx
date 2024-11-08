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
type CommunitiesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Communities"
>;

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
