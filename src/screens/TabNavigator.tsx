import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingScreen'
import Navbar from '../navigation/Navbar'
import { NavigationProp } from '../types/navigation'
import { useNavigation } from '@react-navigation/native'
import SummaryScreen from './SummaryScreen'

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  const navigation = useNavigation<NavigationProp>()

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        header: () => {
          let title = route.name
          return <Navbar title={title} />
        },
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          backgroundColor: '#301934',
          height: 60,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#FF4081',
        tabBarInactiveTintColor: '#B0B0B0',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NewNote"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'New Note',
          tabBarIcon: ({ color }) => (
            <Ionicons name="add" size={24} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            navigation.navigate('NewNote')
          },
        }}
      />
      <Tab.Screen
        name="Summary"
        component={SummaryScreen}
        options={{
          tabBarLabel: 'Summary',
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
