// Import essential libraries and components
import { Tabs } from 'expo-router';                  // Import Tabs component for tab navigation
import { Ionicons } from "@expo/vector-icons";       // Import Ionicons for tab icons
import { Dimensions } from 'react-native';           // Import Dimensions to access screen dimensions
import React, { useState } from "react";
import { Slot } from "expo-router";
import Login from "@/app/login";

// Get the width of the device's screen for layout styling
const screenWidth = Dimensions.get('window').width;

/**
 * TabLayout component: Manages the bottom tab navigation for the application.
 * 
 * @returns {JSX.Element} A JSX element representing the tab navigation layout.
 */
export default function TabLayout() {
    return (
        <Tabs>
          {/* 
           * Home Tab
           * 
           * @screen home
           * @title Home
           * @icon Ionicons home-outline
           * @headerShown false
           */ }
          <Tabs.Screen
            name="home"                                 
            options={{
              title: 'Home',                           
              tabBarIcon: ({ color, size }) =>         
                <Ionicons name="home-outline" size={size} color={color} />, 
                headerShown: false, 
            }}
            
        />

            {/* /**
             * Communities Tab
             * 
             * @screen communities
             * @title Communities
             * @icon Ionicons people-outline
             */ }
            <Tabs.Screen
                name="communities"                           
                options={{
                    title: 'Communities',                    
                    tabBarIcon: ({ color, size }) =>         
                        <Ionicons name="people-outline" size={size} color={color} />, 
                }}
            />

            {/* /**
             * Create Event Tab
             * 
             * @screen createEvent
             * @title Create Event
             * @icon Ionicons add-circle-outline
             * @headerShown false
             */ }
            <Tabs.Screen
                name="createEvent"                           
                options={{
                    title: 'Create Event',                   
                    tabBarIcon: ({ color, size }) =>         
                        <Ionicons name="add-circle-outline" size={size} color={color} />, 
                        headerShown: false, 
                }}
            />

            {/* /**
             * Saved Events Tab
             * 
             * @screen savedEvents
             * @title Saved Events
             * @icon Ionicons bookmark-outline
             * @headerShown false
             */ }
            <Tabs.Screen
                name="savedEvents"                           
                options={{
                    title: 'Saved Events',                   
                    tabBarIcon: ({ color, size }) =>         
                        <Ionicons name="bookmark-outline" size={size} color={color} />, 
                        headerShown: false, 
                }}
            />

            {/* /**
             * Profile Tab
             * 
             * @screen profile
             * @title Profile
             * @icon Ionicons person-outline
             * @headerShown false
             */ }
            <Tabs.Screen
                name="profile"                               
                options={{
                    title: 'Profile',                        
                    tabBarIcon: ({ color, size }) =>         
                        <Ionicons name="person-outline" size={size} color={color} />, 
                        headerShown: false, 
                }}
            />
        </Tabs>
    );
}
