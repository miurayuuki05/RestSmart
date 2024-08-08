import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';


export default function TabLayout() {
  const mainColor = '#e96f0a';
  NavigationBar.setBackgroundColorAsync(mainColor);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: {
          backgroundColor: mainColor,
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
        name="sleep"
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
