import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import ROUTES from '../navigation/RouteNames' // Import ROUTES
import Navbar from './Navbar'

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Loop through the ROUTES array and generate Stack Screens */}
        {ROUTES.map((route) => (
          <Stack.Screen
            key={route.name} // Unique key for each screen
            name={route.name} // Route name
            component={route.component} // Corresponding component
            options={{
              header: () =>
                route.name === 'Tabs' ? null : <Navbar title={route.title} />, // Hide Navbar for TabNavigator
              headerShown: route.name !== 'Tabs', // Hide the default header for TabNavigator
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
