// Import essential libraries and components
import { Tabs } from 'expo-router';                  // Import Tabs component for tab navigation
import { Ionicons } from "@expo/vector-icons";       // Import Ionicons for tab icons
import { Dimensions } from 'react-native';           // Import Dimensions to access screen dimensions

// Get the width of the device's screen for layout styling
const screenWidth = Dimensions.get('window').width;

export default function TabLayout() {
    return (
        <Tabs 
            // Apply custom styling to all tabs
            screenOptions={{
                tabBarActiveTintColor: 'maroon',             // Set active tab color to maroon
                headerShown: true,                           // Display header on each tab
                headerTitleContainerStyle: {                 // Center-align header title
                    width: screenWidth,                      // Make header container as wide as the screen
                    alignItems: 'center'                     // Center-align header title within the container
                }
            }}
        >
            {/* Home Tab */}
            <Tabs.Screen
                name="index"                                 // Screen component for home
                options={{
                    title: 'Home',                           // Title displayed in header
                    tabBarIcon: ({ color, size }) =>         // Tab icon using Ionicons
                        <Ionicons name="home-outline" size={size} color={color} />, // Home icon
                }}
            />

            {/* Communities Tab */}
            <Tabs.Screen
                name="communities"                           // Screen component for communities
                options={{
                    title: 'Communities',                    // Title displayed in header
                    tabBarIcon: ({ color, size }) =>         // Tab icon using Ionicons
                        <Ionicons name="people-outline" size={size} color={color} />, // Communities icon
                }}
            />

            {/* Create Event Tab */}
            <Tabs.Screen
                name="createEvent"                           // Screen component for creating events
                options={{
                    title: 'Create Event',                   // Title displayed in header
                    tabBarIcon: ({ color, size }) =>         // Tab icon using Ionicons
                        <Ionicons name="add-circle-outline" size={size} color={color} />, // Add event icon
                }}
            />

            {/* Saved Events Tab */}
            <Tabs.Screen
                name="savedEvents"                           // Screen component for saved events
                options={{
                    title: 'Saved Events',                   // Title displayed in header
                    tabBarIcon: ({ color, size }) =>         // Tab icon using Ionicons
                        <Ionicons name="bookmark-outline" size={size} color={color} />, // Bookmark icon
                }}
            />

            {/* Profile Tab */}
            <Tabs.Screen
                name="profile"                               // Screen component for user profile
                options={{
                    title: 'Profile',                        // Title displayed in header
                    tabBarIcon: ({ color, size }) =>         // Tab icon using Ionicons
                        <Ionicons name="person-outline" size={size} color={color} />, // Profile icon
                }}
            />
        </Tabs>
    );
}
