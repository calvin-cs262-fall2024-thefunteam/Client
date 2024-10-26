import { Tabs } from 'expo-router';
import { Ionicons } from "@expo/vector-icons"; // Import icons

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'maroon', headerShown: true, headerTitleContainerStyle: {width: screen.width, alignItems: 'center'} }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="communities"
                options={{
                    title: 'Communities',
                    tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="createEvent"
                options={{
                    title: 'Create Event',
                    tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="savedEvents"
                options={{
                    title: 'Saved Events',
                    tabBarIcon: ({ color, size }) => <Ionicons name="bookmark-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
                }}
            />

        </Tabs>
    );
}
