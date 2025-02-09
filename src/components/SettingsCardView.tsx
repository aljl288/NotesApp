import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Text, TouchableRipple } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

type SettingsCardViewProps = {
  iconContent: string
  noteContent: string
  onPress: () => void
}

export default function SettingsCardView({
  iconContent,
  noteContent,
  onPress,
}: SettingsCardViewProps) {
  return (
    <Card style={styles.cardContainer}>
      <TouchableRipple onPress={onPress} rippleColor="rgba(0, 0, 0, .2)">
        <Card.Content style={styles.cardContent}>
          <View style={styles.titleContent}>
            {/* Display the icon with proper padding */}
            <Ionicons name={iconContent} size={24} color="#FFF" />
            <Text style={styles.noteContent}>{noteContent}</Text>
          </View>
          {/* Chevron icon for navigating */}
          <Ionicons name="chevron-forward" size={24} color="#FFF" />
        </Card.Content>
      </TouchableRipple>
    </Card>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#482454', // Light purple background
    padding: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  titleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Take available space before the chevron icon
  },
  noteContent: {
    fontSize: 14,
    color: '#FFF',
    marginLeft: 8, // Add spacing between the icon and the text
  },
})
