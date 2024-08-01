import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export default function TabLayout() {
  NavigationBar.setBackgroundColorAsync("#111111");


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#A0A0A0',
        tabBarStyle: {
          backgroundColor: '#111111',
          height: 60,
          paddingTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'scale' : 'scale-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'moon' : 'moon-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="diagnosis"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'analytics' : 'analytics-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="faq"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'help-circle' : 'help-circle-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
