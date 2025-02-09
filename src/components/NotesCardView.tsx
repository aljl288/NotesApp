import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Card, Text, TouchableRipple } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

type NotesCardViewProps = {
  noteContent: string
  onPress: () => void
}

export default function NotesCardView({
  noteContent,
  onPress,
}: NotesCardViewProps) {
  return (
    <Card style={styles.cardContainer}>
      <TouchableRipple onPress={onPress} rippleColor="rgba(0, 0, 0, .2)">
        <Card.Content style={styles.cardContent}>
          <Text style={styles.noteContent}>
            {noteContent.split(' ').length > 20
              ? `${noteContent.split(' ').slice(0, 20).join(' ')}...`
              : noteContent}
          </Text>
          <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
            <Ionicons name="chevron-forward" size={24} color="#f54084" />
          </TouchableOpacity>
        </Card.Content>
      </TouchableRipple>
    </Card>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 8,
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
  noteContent: {
    fontSize: 14,
    color: '#FFF',
    flex: 1,
    marginRight: 8,
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
})
