import React, { useState } from "react";
import {
  View,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import styles from "../styles/globalStyles.js";


 const default function BottomNavigationBar() {
 {/* Bottom Navigation Bar */}
 <View style={styles.bottomBar}>
        
 <View style={styles.buttonContainer}>
   <Pressable style={styles.pressable} onPress={() => alert("Go to Home")}
     >
     <Ionicons name="home-outline" size={30} color="black" />
   </Pressable>
 </View>

 <View style={styles.buttonContainer}>
   <Pressable style={styles.pressable} onPress={() => setModalVisible(true)}>
     <Ionicons name="add-circle-outline" size={30} color="black" />
   </Pressable>
 </View>

 <View style={styles.buttonContainer}>
   <Pressable style={styles.pressable} onPress={() => alert("Go to Communities")}>
     <Ionicons name="people-outline" size={30} color="black" />  
   </Pressable>
 </View>

 <View style={styles.buttonContainer}>
   <Pressable style={styles.pressable} onPress={() => alert("Go to Profile")}>
     <Ionicons name="person-outline" size={30} color="black" />  
   </Pressable>
 </View>
 
</View>
 };

 export default BottomNavigationBar;